#!/usr/bin/env bash
# find-project-context.sh
# Discovers project context documents that define architecture, tech stack, and constraints.
# Usage: ./find-project-context.sh [root-dir] [initiative-dir]
# Example: ./find-project-context.sh . docs/competitive-mode
# Output: List of found files with first heading line as hint

set -euo pipefail

ROOT="${1:-.}"
INITIATIVE_DIR="${2:-}"

CANDIDATES=(
  "$ROOT/CLAUDE.md"
  "$ROOT/AGENTS.md"
  "$ROOT/README.md"
  "$ROOT/PRD.md"
  "$ROOT/docs/PRD.md"
)

# Add initiative-specific candidates if provided
if [ -n "$INITIATIVE_DIR" ]; then
  CANDIDATES+=(
    "$INITIATIVE_DIR/PRD.md"
  )
fi

FOUND=()

for f in "${CANDIDATES[@]}"; do
  if [ -f "$f" ]; then
    FOUND+=("$f")
  fi
done

# Also find any architecture/ADR docs under docs/
while IFS= read -r f; do
  FOUND+=("$f")
done < <(find "$ROOT/docs" -maxdepth 2 \( -name "architecture*.md" -o -name "adr*.md" -o -name "*.adr.md" \) 2>/dev/null | sort)

if [ ${#FOUND[@]} -eq 0 ]; then
  echo "NO_PROJECT_CONTEXT_FOUND"
  exit 0
fi

echo "PROJECT_CONTEXT_FILES:"
for f in "${FOUND[@]}"; do
  # Print filename + first non-empty heading as hint
  HEADING=$(grep -m1 "^#" "$f" 2>/dev/null | sed 's/^#* *//' || echo "(no heading)")
  SIZE=$(wc -l < "$f" | tr -d ' ')
  echo "  $f  [${SIZE}L] — $HEADING"
done
