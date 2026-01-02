#!/usr/bin/env python3
import os
from pathlib import Path

# Configuration
SOURCE_DIRS = [
    "backend",
    "frontend",  # Changed from frontend/src to frontend to catch root config files
]

EXCLUDE_DIRS = {
    "node_modules",
    "dist",
    "build",
    ".git",
    "__pycache__",
    ".pytest_cache",
    ".venv",
    "venv",
    "coverage",
}

EXTENSIONS = {
    ".py": {"style": "hash", "comment": "#"},
    ".ts": {"style": "slash", "comment": "//"},
    ".tsx": {"style": "slash", "comment": "//"},
    ".js": {"style": "slash", "comment": "//"},
    ".jsx": {"style": "slash", "comment": "//"},
    ".html": {"style": "xml", "comment": "<!--"},
    ".css": {"style": "css", "comment": "/*"},
    ".scss": {"style": "css", "comment": "/*"},
}

COPYRIGHT_TEXT = """Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
https://www.blueview.ai"""

def get_header(style):
    lines = COPYRIGHT_TEXT.split('\n')
    if style == "hash":
        return "\n".join([f"# {line}" for line in lines]) + "\n\n"
    elif style == "slash":
        return "\n".join([f"// {line}" for line in lines]) + "\n\n"
    elif style == "xml":
        # Compact XML style
        return "<!--\n" + "\n".join([f"  {line}" for line in lines]) + "\n-->\n\n"
    elif style == "css":
        return "/*\n" + "\n".join([f" * {line}" for line in lines]) + "\n */\n\n"
    return ""

def has_header(content, header_snippet):
    # Check if the first few non-empty lines match our header
    # Simple check: does the file start with the first line of our copyright?
    # We strip empty lines at the start for the check
    return header_snippet in content

import sys

# ... (imports)

def process_file(path):
    # ... (existing logic)
    # Return True if changed, False otherwise
    ext = path.suffix
    if ext not in EXTENSIONS:
        return False

    config = EXTENSIONS[ext]
    header = get_header(config["style"])
    
    # Check for the copyright text specifically to avoid duplication
    # regardless of the comment style
    unique_substring = "Copyright (c) 2026 Frank Perez"

    try:
        content = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        print(f"Skipping binary or non-utf8 file: {path}")
        return False

    if unique_substring in content:
        # Header already present
        return False

    # Handle shebangs or encoding cookies for Python
    lines = content.splitlines(keepends=True)
    insert_idx = 0
    
    if lines and (lines[0].startswith("#!") or lines[0].startswith("# -*-")):
        insert_idx += 1
        if len(lines) > 1 and (lines[1].startswith("#!") or lines[1].startswith("# -*-")):
            insert_idx += 1
            
    # For HTML, if it starts with <!DOCTYPE, maybe put it after?
    # Usually comments before doctype are fine, but inside <html> is sometimes preferred?
    # Standard practice is top of file.
    
    new_content = "".join(lines[:insert_idx]) + header + "".join(lines[insert_idx:])
    path.write_text(new_content, encoding="utf-8")
    print(f"Added copyright header to {path}")
    return True

def main():
    root = Path.cwd()
    changed_count = 0
    
    for src_dir in SOURCE_DIRS:
        base_path = root / src_dir
        if not base_path.exists():
            print(f"Directory not found: {base_path}")
            continue
            
        # Manual walk to respect exclusions
        for parent, dirs, files in os.walk(base_path):
            # Modify dirs in-place to skip excluded directories
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            
            for file in files:
                path = Path(parent) / file
                if process_file(path):
                    changed_count += 1
    
    if changed_count > 0:
        print(f"\nChecked source files. Added headers to {changed_count} files.")
        print("Please stage these changes and commit again.")
        sys.exit(1)
    else:
        print("Copyright checks passed.")
        sys.exit(0)

if __name__ == "__main__":
    main()
