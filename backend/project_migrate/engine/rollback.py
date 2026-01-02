# Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
# https://www.blueview.ai

from pathlib import Path
from typing import Dict
import json
import logging

from .logging_config import configure_logging

logger = logging.getLogger(__name__)


def run_rollback(target: str, manifest_path: str, dry_run: bool = True) -> Dict:
    configure_logging()
    logger.info("Starting rollback for %s using manifest %s (dry_run=%s)", target, manifest_path, dry_run)

    mp = Path(manifest_path)
    if not mp.is_file():
        return {"success": False, "message": f"Manifest not found: {manifest_path}"}

    data = json.loads(mp.read_text())
    entries = data.get("files", [])

    removed = 0
    skipped = 0

    target_path = Path(target).resolve()

    for entry in entries:
        path = Path(entry["path"]).resolve()
        
        # Security/Safety Check: Ensure we are only touching files inside the target directory
        try:
            path.relative_to(target_path)
        except ValueError:
            logger.error("Security alert: Attempting to modify path outside target: %s (target: %s)", path, target_path)
            skipped += 1
            continue

        if not path.is_file():
            logger.info("Skipping missing %s", path)
            skipped += 1
            continue

        # Simple safety check: size & mtime comparison
        stat = path.stat()
        if stat.st_size != entry["size"]:
            logger.warning("Skipping %s (size mismatch)", path)
            skipped += 1
            continue

        if dry_run:
            logger.info("[DRY-RUN] Would remove %s", path)
        else:
            logger.info("Removing %s", path)
            path.unlink()
        removed += 1

    return {
        "success": True,
        "message": f"Rollback {'dry-run' if dry_run else 'completed'}, removed {removed}, skipped {skipped}",
        "removed_files": removed,
        "skipped_files": skipped,
        "dry_run": dry_run,
    }
