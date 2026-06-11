import yaml
import logging
from pathlib import Path
import sys

logging.basicConfig(level=logging.INFO, format="%(message)s")
log = logging.getLogger(__name__)

def main():
    workflows_dir = Path("_workflows")

    if not workflows_dir.exists():
        sys.exit("_workflows directory not found")

    out_path = Path("docs/submission/assets/search_terms.yml")

    # Read existing tags if file exists
    tags = {}
    if out_path.exists():
        with open(out_path) as f:
            existing = (yaml.safe_load(f) or {}).get('category', {})
        for k, v_list in existing.items():
            tags[k] = set(v_list)
        log.info(f"Loaded existing search_terms.yml with {sum(len(v) for v in tags.values())} tags across {len(tags)} categories")
    else:
        log.info("No existing search_terms.yml found, starting fresh")

    index_files = list(workflows_dir.rglob("**/index.md"))
    log.info(f"Found {len(index_files)} index files")

    total_added = 0
    for p in index_files:
        lines = []
        counter = 0
        with open(p) as f:
            for line in f:
                if line.strip() == "---":
                    counter += 1
                    if counter == 2:
                        break
                elif counter == 1:
                    lines.append(line)

        frontmatter = yaml.safe_load("".join(lines))
        before = sum(len(v) for v in tags.values())
        for k, v_list in frontmatter.get('category', {}).items():
            tags.setdefault(k, set()).update(v_list)
        after = sum(len(v) for v in tags.values())
        added = after - before
        total_added += added
        log.info(f"  {p} — {added} new tag(s) added")

    log.info(f"Done: {total_added} total new tags added, {sum(len(v) for v in tags.values())} tags across {len(tags)} categories")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w") as f:
        yaml.dump({'category': {k: sorted(v) for k, v in sorted(tags.items())}}, f, default_flow_style=False)
    log.info(f"Saved to {out_path}")

if __name__ == "__main__":
    main()