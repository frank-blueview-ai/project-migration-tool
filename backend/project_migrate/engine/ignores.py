# Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
# https://www.blueview.ai

from pathlib import Path
from typing import Iterable, List

import pathspec  # add to pyproject dependencies


def load_ignore_patterns(
    global_patterns: Iterable[str],
    project_ignore_file: str | None,
) -> List[str]:
    patterns: List[str] = list(global_patterns)

    if project_ignore_file:
        path = Path(project_ignore_file)
        if path.is_file():
            patterns.extend(
                line.strip()
                for line in path.read_text().splitlines()
                if line.strip() and not line.strip().startswith("#")
            )

    return patterns


def build_spec(patterns: Iterable[str]) -> pathspec.PathSpec:
    """
    Build a .gitignore-style matcher.
    """
    return pathspec.PathSpec.from_lines("gitwildmatch", patterns)


def is_ignored(path: Path, root: Path, spec: pathspec.PathSpec) -> bool:
    rel = path.relative_to(root).as_posix()
    return spec.match_file(rel)
