#!/usr/bin/env python3
"""
Validate and process markdown files in a directory.

For each .md file:
  1. Verifies the front matter contains: title, date, category, author, synopsis
  2. Verifies the date is in YYYY-MM-DD format
  3. Adds `layout: page` and `back_to_top: true` to the front matter
  4. Wraps the body with header/footer includes separated by `---` lines

Exits with status 1 if any file fails validation (no files are modified
in that case).

Usage:
    python format_submission.py /path/to/directory
"""

import sys
from datetime import datetime
from pathlib import Path

import frontmatter

REQUIRED_FIELDS = ["title", "date", "category", "author", "synopsis"]
DATE_FORMAT = "%Y-%m-%d"  # e.g. 2026-06-11

HEADER_INCLUDE = "{{ include workflow_page/header.html }}"
FOOTER_INCLUDE = "{{ include workflow_page/footer.html }}"


def validate(post: frontmatter.Post, filename: str) -> list[str]:
    """Return a list of validation error messages (empty if valid)."""
    errors = []

    # Check required fields exist and are non-empty
    for field in REQUIRED_FIELDS:
        value = post.metadata.get(field)
        if value is None or (isinstance(value, str) and not value.strip()):
            errors.append(f"{filename}: missing required field '{field}'")

    # Check date format
    date_value = post.metadata.get("date")
    if date_value is not None:
        # PyYAML may auto-parse valid dates into date objects; if it's
        # still a string, verify the format explicitly.
        if isinstance(date_value, str):
            try:
                datetime.strptime(date_value.strip(), DATE_FORMAT)
            except ValueError:
                errors.append(
                    f"{filename}: date '{date_value}' is not in "
                    f"YYYY-MM-DD format"
                )
        elif not hasattr(date_value, "year"):
            errors.append(
                f"{filename}: date '{date_value}' is not a valid date"
            )

    return errors


def transform(post: frontmatter.Post) -> frontmatter.Post:
    """Add layout fields and wrap the body with header/footer includes."""
    post.metadata["layout"] = "page"
    post.metadata["back_to_top"] = True

    body = post.content.strip()

    # Idempotency guard: don't double-wrap if already processed
    if not body.startswith(HEADER_INCLUDE):
        post.content = (
            f"{HEADER_INCLUDE}\n"
            f"---\n"
            f"{body}\n"
            f"---\n"
            f"{FOOTER_INCLUDE}\n"
        )

    return post


def main() -> int:
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <directory>", file=sys.stderr)
        return 1

    directory = Path(sys.argv[1])
    if not directory.is_dir():
        print(f"Error: '{directory}' is not a directory", file=sys.stderr)
        return 1

    md_files = sorted(directory.glob("*.md"))
    if not md_files:
        print(f"Error: no .md files found in '{directory}'", file=sys.stderr)
        return 1

    # Pass 1: load and validate everything before touching any file,
    # so a failure partway through doesn't leave a half-processed set.
    posts = {}
    all_errors = []
    for path in md_files:
        try:
            post = frontmatter.load(path)
        except Exception as exc:
            all_errors.append(f"{path.name}: failed to parse ({exc})")
            continue
        all_errors.extend(validate(post, path.name))
        posts[path] = post

    if all_errors:
        print("Validation failed:", file=sys.stderr)
        for err in all_errors:
            print(f"  - {err}", file=sys.stderr)
        return 1

    # Pass 2: transform and write back
    for path, post in posts.items():
        transform(post)
        path.write_text(frontmatter.dumps(post) + "\n", encoding="utf-8")
        print(f"Processed: {path.name}")

    print(f"\nDone. {len(posts)} file(s) processed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())