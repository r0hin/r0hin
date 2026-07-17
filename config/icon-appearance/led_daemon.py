#!/usr/bin/env python3
# continuous led daemon for the skydimo g100 monitor backlight.
#
# light mode -> light blue, dark mode -> warm red. appearance is polled (not
# event-subscribed) so it stays in sync with auto-switch.sh, which reads the
# same AppleInterfaceStyle pref. on a mode change the color fades over FADE_SECS.
#
# the g100 goes dark without a continuous frame, so we re-send a keep-alive
# frame every REFRESH seconds. to stay reliable under heavy cpu load the
# appearance poll runs on its own thread (so the `defaults` subprocess can't
# stall the feed) and the launchagent runs us at interactive priority.
#
# frame format is skydimo adalight: 'Ada' 0x00 0x00 <led count>, then rgb bytes
# per led (this unit is rgb order).
import glob, subprocess, threading, time
import serial

LED_COUNT  = 54
BAUD       = 115200
BRIGHTNESS = 1.0        # 0.0-1.0; lower if it flickers under load (power headroom)
FADE_SECS  = 4.0        # transition length on a light/dark change
POLL_SECS  = 3.0        # appearance check cadence (runs off the feed thread)
REFRESH    = 0.5        # keep-alive interval; small for margin against cpu stalls
RECONNECT  = 1.0        # backoff after a serial error before reopening

DAY   = (120, 150, 255) # light mode -> light blue (cornflower; not turquoise)
NIGHT = (255, 55, 0)    # dark mode  -> red with a hint of orange

HEADER = bytes([ord('A'), ord('d'), ord('a'), 0x00, 0x00, LED_COUNT & 0xFF])

def log(msg):
    print(f"{time.strftime('%Y-%m-%d %H:%M:%S')} {msg}", flush=True)

def find_port():
    # the ftdi port can rename on replug (usbserial-XXXX); pick whatever's there.
    ports = sorted(glob.glob("/dev/cu.usbserial-*"))
    return ports[0] if ports else "/dev/cu.usbserial-1330"

def frame(color):
    r, g, b = (int(c * BRIGHTNESS) for c in color)
    return HEADER + bytes([r, g, b]) * LED_COUNT

def read_target():
    out = subprocess.run(["defaults", "read", "-g", "AppleInterfaceStyle"],
                         capture_output=True, text=True)
    return NIGHT if out.stdout.strip() == "Dark" else DAY

# target color, updated by the poll thread, read by the feed loop. assigning and
# reading a tuple reference is atomic under the gil, so no lock is needed.
target = read_target()

def poll_loop():
    global target
    while True:
        try:
            target = read_target()
        except Exception:
            pass
        time.sleep(POLL_SECS)

def fade(ser, start, end):
    steps = int(FADE_SECS / 0.08)
    for i in range(1, steps + 1):
        t = i / steps
        mix = tuple(int(round(start[j] + (end[j] - start[j]) * t)) for j in range(3))
        ser.write(frame(mix)); ser.flush()
        time.sleep(0.08)

def main():
    threading.Thread(target=poll_loop, daemon=True).start()
    while True:  # reconnect loop: survive unplug / boot-time device delay
        ser = None
        try:
            port = find_port()
            ser = serial.Serial(port, BAUD, timeout=0.5)
            time.sleep(2)  # let the controller boot after the port opens
            current = target
            ser.write(frame(current)); ser.flush()
            log(f"connected on {port}")
            while True:
                want = target
                if want != current:
                    fade(ser, current, want)
                    current = want
                ser.write(frame(current)); ser.flush()  # keep-alive
                time.sleep(REFRESH)
        except (serial.SerialException, OSError) as e:
            if ser is not None:
                try: ser.close()
                except Exception: pass
            log(f"serial error: {e} -- reconnecting")
            time.sleep(RECONNECT)

if __name__ == "__main__":
    main()
