# Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
# https://www.blueview.ai

from pathlib import Path
from typing import Dict, List, Iterable
import json


def load_manifest(manifest_path: str) -> Dict:
    return json.loads(Path(manifest_path).read_text())


def diff_manifest(
    source: str,
    manifest_path: str,
) -> Dict[str, List[str]]:
    """
    Compare current source state to a previous manifest.
    Very first version: just path set diff.
    """
    src = Path(source)
    manifest = load_manifest(manifest_path)

    prev_files = {Path(f["path"]).as_posix() for f in manifest.get("files", [])}
    current_files = {p.as_posix() for p in src.rglob("*") if p.is_file()}

    added = sorted(current_files - prev_files)
    removed = sorted(prev_files - current_files)
    unchanged = sorted(current_files & prev_files)

    return {
        "added": added,
        "removed": removed,
        "unchanged": unchanged,
    }
