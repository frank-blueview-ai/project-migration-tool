# Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
# https://www.blueview.ai

from pathlib import Path
from project_migrate.engine import migrator, manifest as manifest_mod


def test_dry_run_does_not_create_manifest(tmp_path: Path):
    src = tmp_path / "src"
    dest = tmp_path / "dest"
    src.mkdir()
    (src / "file.txt").write_text("hello")

    result = migrator.run_migration(str(src), str(dest), dry_run=True)
    assert result["success"]
    assert result["manifest_path"] is None
    assert not (dest / "migration_manifest.json").exists()


def test_real_migration_creates_manifest(tmp_path: Path):
    src = tmp_path / "src"
    dest = tmp_path / "dest"
    src.mkdir()
    (src / "file.txt").write_text("hello")

    result = migrator.run_migration(str(src), str(dest), dry_run=False)
    assert result["success"]
    manifest_path = result["manifest_path"]
    assert manifest_path is not None
    assert Path(manifest_path).is_file()

    data = manifest_mod.json.loads(Path(manifest_path).read_text())
    assert any(f["path"].endswith("file.txt") for f in data["files"])
