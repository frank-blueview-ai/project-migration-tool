
from pathlib import Path
from typing import List, Dict, Iterable, Callable
import shutil
import logging
import os
import threading

from .logging_config import configure_logging
from .ignores import load_ignore_patterns, build_spec, is_ignored
from .manifest import write_manifest
from .parallel import run_in_parallel

logger = logging.getLogger(__name__)


def discover_files(source: str, patterns: List[str]) -> Iterable[Path]:
    src = Path(source)
    spec = build_spec(patterns)

    for root, dirs, files in os.walk(src):
        # Filter directories in-place to prevent recursion
        # We must iterate a copy of dirs since we modify it
        for d in list(dirs):
            dir_path = Path(root) / d
            if is_ignored(dir_path, src, spec):
                logger.debug("Ignoring directory %s", dir_path)
                dirs.remove(d)

        for f in files:
            file_path = Path(root) / f
            if is_ignored(file_path, src, spec):
                logger.debug("Ignoring file %s", file_path)
                continue
            yield file_path


def make_copy_func(source: Path, destination: Path, dry_run: bool):
    def _copy_one(f: Path) -> None:
        rel = f.relative_to(source)
        target = destination / rel
        if not dry_run:
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(f, target)
        logger.info("%s copy %s -> %s", "[DRY-RUN]" if dry_run else "Will", f, target)

    return _copy_one


def run_migration(
    source: str,
    destination: str,
    dry_run: bool = True,
    parallelism: int = 4,
    global_ignores: List[str] | None = None,
    project_ignore_file: str | None = None,
    progress_callback: Callable[[int, int], None] | None = None,
    cancel_event: threading.Event | None = None,
) -> Dict:
    configure_logging()
    global_ignores = global_ignores or []
    src = Path(source)
    dest = Path(destination)

    # Auto-discover ignore file if not provided
    if not project_ignore_file:
        for possible_name in [".migrateignore", ".path_migrator_ignore"]:
            possible_path = src / possible_name
            if possible_path.exists() and possible_path.is_file():
                project_ignore_file = str(possible_path)
                logger.info("Found project ignore file: %s", project_ignore_file)
                break

    patterns = load_ignore_patterns(global_ignores, project_ignore_file)
    logger.info("Starting migration: %s -> %s (dry_run=%s)", src, dest, dry_run)
    logger.info("Ignore patterns: %s", patterns)

    files = list(discover_files(source, patterns))
    total_files = len(files)
    logger.info("Discovered %d files to consider", total_files)
    
    # Initial status update
    if progress_callback:
        progress_callback(total_files, 0)
    
    if cancel_event and cancel_event.is_set():
        logger.info("Migration cancelled during discovery")
        return {"success": False, "message": "Job cancelled"}

    # Bridge between (processed) -> None and (total, processed) -> None
    def _p_cb(processed: int):
        if progress_callback:
            progress_callback(total_files, processed)

    copy_func = make_copy_func(src, dest, dry_run)
    copied = run_in_parallel(files, copy_func, max_workers=parallelism, progress_callback=_p_cb, cancel_event=cancel_event)

    if cancel_event and cancel_event.is_set():
        logger.warning("Migration cancelled by user")
        return {
            "success": False,
            "message": "Job cancelled by user",
            "total_files": len(files),
            "copied_files": len(copied),
            "dry_run": dry_run,
            "manifest_path": None,
        }

    manifest_path = None
    if not dry_run:
        # Convert source paths (from discovery) to destination paths for the manifest
        # This ensures the manifest tracks the *created* files, not the source files
        dest_files = []
        for source_path in copied:
            rel = source_path.relative_to(src)
            dest_files.append(dest / rel)
        
        manifest_path = write_manifest(destination, dest_files)

    return {
        "success": True,
        "message": "Dry-run completed" if dry_run else "Migration completed",
        "total_files": len(files),
        "copied_files": len(copied),
        "dry_run": dry_run,
        "manifest_path": manifest_path,
    }
