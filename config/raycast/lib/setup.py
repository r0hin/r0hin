#!/usr/bin/python3
import datetime
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys

HOME = Path.home()
REPO = HOME / 'Github/r0hin'
CLOUD = HOME / 'Library/Mobile Documents/com~apple~CloudDocs/Downloads'
MANIFEST = REPO / 'config/macbook-manifest.json'

def unique(path):
    candidate = path
    n = 1
    while candidate.exists() or candidate.is_symlink():
        candidate = path.with_name(f'{path.stem} ({n}){path.suffix}')
        n += 1
    return candidate

def move(source, directory):
    directory.mkdir(parents=True, exist_ok=True)
    shutil.move(str(source), str(unique(directory / source.name)))

def downloads():
    if not CLOUD.is_dir():
        raise RuntimeError('iCloud Downloads is unavailable; no files moved.')
    count = 0
    root = HOME / 'Downloads'
    for source in sorted(root.rglob('*')):
        if source.is_symlink() or not source.is_file() or any(p.startswith('.') for p in source.relative_to(root).parts):
            continue
        if source.suffix.lower() in {'.png', '.jpg', '.jpeg'}:
            move(source, HOME / 'Documents/Screenshots')
        elif source.stat().st_size > 30 * 1024 * 1024:
            move(source, HOME / 'Working')
        else:
            continue
        count += 1
    for source in sorted(root.iterdir()):
        if source.name.startswith('.') or source.is_symlink():
            continue
        move(source, CLOUD)
        count += 1
    print(f'Moved {count} items. Images → Screenshots; large files → Working; remaining items → iCloud Downloads.')

def clear():
    if not CLOUD.is_dir():
        raise RuntimeError('iCloud Downloads is unavailable; no files moved.')
    count = 0
    for source in sorted(CLOUD.iterdir()):
        if source.name.startswith('.'):
            continue
        move(source, HOME / '.Trash')
        count += 1
    print(f'Moved {count} iCloud Downloads items to Trash.')

def selected_files():
    paths = [HOME / '.gitconfig', HOME / '.gnupg/gpg-agent.conf', HOME / '.zprofile', HOME / '.config/zed/settings.json', HOME / '.config/zed/keymap.json']
    for name in ['aerospace', 'kitty', 'fish']:
        root = HOME / '.config' / name
        if root.exists():
            paths.extend(p for p in root.rglob('*') if p.is_file() and not p.is_symlink()
                         and not any(part in {'extensions', '__pycache__', '.git'} for part in p.relative_to(root).parts)
                         and not p.name.startswith('fish_variables')
                         and p.suffix not in {'.log', '.pyc'})
    raycast = REPO / 'config/raycast'
    if raycast.exists():
        paths.extend(p for p in raycast.rglob('*') if p.is_file() and not p.is_symlink() and '__pycache__' not in p.parts and p.suffix != '.pyc')
    return sorted(set(p for p in paths if p.is_file()))

def backup():
    if not (REPO / '.git').is_dir():
        raise RuntimeError(f'Repository missing: {REPO}')
    records = []
    for source in selected_files():
        if source.is_relative_to(REPO / 'config/raycast'):
            rel = Path('.config/raycast') / source.relative_to(REPO / 'config/raycast')
            target_rel = source.relative_to(REPO)
            records.append({'home': str(rel), 'repo': str(target_rel)})
            continue
        rel = source.relative_to(HOME)
        target_rel = Path('config/home') / rel if str(rel) in {'.zprofile', '.gitconfig', '.gnupg/gpg-agent.conf'} else Path('config') / source.relative_to(HOME / '.config')
        target = REPO / target_rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        records.append({'home': str(rel), 'repo': str(target_rel)})
    MANIFEST.write_text(json.dumps({'version': 1, 'files': records}, indent=2) + '\n')
    result = subprocess.run(['/opt/homebrew/bin/brew', 'bundle', 'dump', '--force', '--file=' + str(REPO / 'config/Brewfile.macbook')], capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError('Configs saved, but package inventory failed: ' + result.stderr)
    print(f'Backed up {len(records)} files and package inventory to {REPO}. Review and commit/push when ready.')

def restore():
    data = json.loads(MANIFEST.read_text())
    if data.get('version') != 1 or not data.get('files'):
        raise RuntimeError('No valid MacBook backup manifest. Run Backups first.')
    pairs = []
    for record in data['files']:
        rel, repo_rel = Path(record['home']), Path(record['repo'])
        if rel.is_absolute() or repo_rel.is_absolute() or '..' in rel.parts or '..' in repo_rel.parts:
            raise RuntimeError('Invalid backup path')
        if str(rel) not in {'.zprofile', '.gitconfig', '.gnupg/gpg-agent.conf'} and not (len(rel.parts) >= 3 and rel.parts[0] == '.config' and rel.parts[1] in {'fish', 'kitty', 'aerospace', 'zed', 'raycast'}):
            raise RuntimeError('Unexpected restore target: ' + str(rel))
        source, target = REPO / repo_rel, HOME / rel
        if not source.is_file() or source.is_symlink() or target.is_symlink() or source.resolve().is_relative_to(REPO.resolve()) is False or target.resolve().is_relative_to(HOME.resolve()) is False:
            raise RuntimeError('Missing or unsafe restore path: ' + str(rel))
        pairs.append((source, target, rel))
    recovery = HOME / 'Library/Application Support/MacSetup/restore-backups' / datetime.datetime.now().strftime('%Y%m%d-%H%M%S-%f')
    for _, target, rel in pairs:
        if target.exists():
            saved = recovery / rel
            saved.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(target, saved)
    for source, target, _ in pairs:
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
    result = subprocess.run(['/opt/homebrew/bin/aerospace', 'reload-config'], capture_output=True, text=True)
    print(f'Restored {len(pairs)} files. Previous files saved in {recovery}.')
    if result.returncode:
        print('AeroSpace reload needs attention: ' + result.stderr)
    print('Packages were not installed. Open a new terminal to load restored shell settings.')

if __name__ == '__main__':
    try:
        {'downloads': downloads, 'clear': clear, 'backup': backup, 'restore': restore}[sys.argv[1]]()
    except Exception as error:
        print(f'Error: {error}', file=sys.stderr)
        sys.exit(1)
