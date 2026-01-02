# Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
# https://www.blueview.ai


from pathlib import Path
from typing import Iterable, Dict, Any
import json
import time
import hashlib
import os


def file_checksum(path: Path, algo: str = "sha256", chunk_size: int = 1024 * 1024) -> str:
    h = hashlib.new(algo)
    with path.open("rb") as f:
        while chunk := f.read(chunk_size):
            h.update(chunk)
    return h.hexdigest()


def build_manifest(destination: str, files: Iterable[Path]) -> Dict[str, Any]:
    dest = Path(destination)
    entries = []
    for f in files:
        if not f.is_file():
            continue
        stat = f.stat()
        entries.append(
            {
                "path": str(f),
                "size": stat.st_size,
                "mtime": stat.st_mtime,
                "checksum": file_checksum(f),
            }
        )

    return {
        "created_at": time.time(),
        "hostname": os.uname().nodename if hasattr(os, "uname") else None,
        "destination": str(dest),
        "files": entries,
    }


def write_manifest(destination: str, files: Iterable[Path]) -> str:
    dest = Path(destination)
    manifest = build_manifest(destination, files)
    manifest_path = dest / "migration_manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2))
    return str(manifest_path)
