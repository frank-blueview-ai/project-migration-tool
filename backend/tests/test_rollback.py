# Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
# https://www.blueview.ai

from pathlib import Path
from project_migrate.engine import migrator, rollback


def test_rollback_dry_run(tmp_path: Path):
    src = tmp_path / "src"
    dest = tmp_path / "dest"
    src.mkdir()
    (src / "file.txt").write_text("hello")

    migrator.run_migration(str(src), str(dest), dry_run=False)
    manifest_path = dest / "migration_manifest.json"

    assert manifest_path.is_file()

    result = rollback.run_rollback(str(dest), str(manifest_path), dry_run=True)
    assert result["success"]
    assert result["dry_run"]
    assert (dest / "file.txt").exists()
