#!/usr/bin/env bash
# generate-artifact-id.sh
# Generates a deterministic artifact ID from project prefix, type, and name.
# Usage: ./generate-artifact-id.sh <project> <type> "<name>"
# Output: BKC-FEAT-0a3b
# Method: 3-char project prefix + type + 4-char MD5 of normalized name

set -euo pipefail

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <project> <type> \"<name>\"" >&2
  exit 1
fi

PROJECT="$1"
TYPE="$2"
NAME="$3"

# Normalize: lowercase, trim whitespace, collapse spaces to hyphens
NORMALIZED=$(echo "$NAME" | tr '[:upper:]' '[:lower:]' | tr -s ' ' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')

# 4-char hash from MD5 of normalized name
HASH=$(echo -n "$NORMALIZED" | md5sum | cut -c1-4)

# 3-char uppercase project prefix
PREFIX=$(echo "$PROJECT" | tr '[:lower:]' '[:upper:]' | cut -c1-3)

echo "${PREFIX}-${TYPE}-${HASH}"
