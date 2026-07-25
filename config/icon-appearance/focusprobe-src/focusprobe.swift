// focusprobe - report macOS Focus (Do Not Disturb) state for auto-switch.sh
//
// writes "on", "off", or "unknown" to ~/.config/icon-appearance/.focus-state
// and echoes the same to stdout. auto-switch.sh treats anything other than
// "on" as off, so a failure degrades safely rather than sticking on a stale value.
//
// WHY NOT INFocusStatusCenter:
// that is the documented API and was the first implementation, but on macOS 26 a
// locally (adhoc) signed helper gets authorizationStatus == .authorized while
// focusStatus.isFocused stays false forever, even with Settings > Focus > Focus
// Status > Share Focus Status enabled and a Focus genuinely active. no TCC prompt
// is ever shown and `tccutil reset Focus <bundle-id>` reports no entry to reset.
// the shared-status path appears to require a Developer ID signed + notarized app.
//
// SO: read the assertion store instead. macOS records the active Focus in
// ~/Library/DoNotDisturb/DB/Assertions.json; a non-empty storeAssertionRecords
// array means a Focus is on. that file is protected, so this binary needs
// Full Disk Access (System Settings > Privacy & Security > Full Disk Access,
// add focusprobe.app). without it the read fails and we report "unknown".
//
// exit codes: 0 = state determined, 1 = could not read (writes "unknown").

import Foundation

let statePath = ("~/.config/icon-appearance/.focus-state" as NSString).expandingTildeInPath
let assertionsPath = ("~/Library/DoNotDisturb/DB/Assertions.json" as NSString).expandingTildeInPath

func emit(_ value: String) {
    let dir = (statePath as NSString).deletingLastPathComponent
    try? FileManager.default.createDirectory(atPath: dir, withIntermediateDirectories: true)
    try? (value + "\n").write(toFile: statePath, atomically: true, encoding: .utf8)
    print(value)
}

func fail(_ message: String) -> Never {
    FileHandle.standardError.write(Data("focusprobe: \(message)\n".utf8))
    emit("unknown")
    exit(1)
}

// the exact nesting of Assertions.json has moved between OS releases, so rather
// than hard-coding data[0].storeAssertionRecords, walk the whole tree and look
// for any non-empty storeAssertionRecords array.
func hasActiveAssertion(_ node: Any) -> Bool {
    if let dict = node as? [String: Any] {
        for (key, value) in dict {
            if key == "storeAssertionRecords", let records = value as? [Any], !records.isEmpty {
                return true
            }
            if hasActiveAssertion(value) { return true }
        }
    } else if let array = node as? [Any] {
        for element in array where hasActiveAssertion(element) { return true }
    }
    return false
}

guard FileManager.default.fileExists(atPath: assertionsPath) else {
    // the file is absent when no Focus has ever been asserted this boot
    emit("off")
    exit(0)
}

guard let data = FileManager.default.contents(atPath: assertionsPath) else {
    fail("cannot read Assertions.json - grant focusprobe.app Full Disk Access in System Settings > Privacy & Security")
}

guard let parsed = try? JSONSerialization.jsonObject(with: data) else {
    fail("Assertions.json is not valid JSON (\(data.count) bytes)")
}

emit(hasActiveAssertion(parsed) ? "on" : "off")
exit(0)
