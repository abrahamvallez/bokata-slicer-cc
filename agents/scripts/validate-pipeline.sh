#!/usr/bin/env bash
# validate-pipeline.sh
# Validates cross-artifact consistency for an initiative pipeline.
# Usage: ./validate-pipeline.sh <initiative-dir>
# Output: PASS / FAIL with ERRORs and WARNINGs listed

set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <initiative-dir>" >&2
  exit 1
fi

DIR="$1"
ERRORS=()
WARNINGS=()

# ── 1. features.md exists ─────────────────────────────────────────────────────
FEATURES_FILE="${DIR}/features.md"
if [ ! -f "$FEATURES_FILE" ]; then
  ERRORS+=("ERROR: features.md not found at ${FEATURES_FILE}")
else
  # ── 2. features.md has at least one ## Feature section ────────────────────
  FEATURE_COUNT=$(grep -c "^## Feature:" "$FEATURES_FILE" 2>/dev/null || echo "0")
  if [ "$FEATURE_COUNT" -eq 0 ]; then
    ERRORS+=("ERROR: features.md has no '## Feature:' sections")
  fi

  # ── 3. features.md has at least one User Task section ─────────────────────
  TASK_COUNT=$(grep -c "^### User Task:" "$FEATURES_FILE" 2>/dev/null || echo "0")
  if [ "$TASK_COUNT" -eq 0 ]; then
    ERRORS+=("ERROR: features.md has no '### User Task:' sections")
  fi

  # ── 4. Each User Task must have at least 1 Gherkin Scenario ───────────────
  # Find all User Task names and check each has a Scenario below it
  TASK_WITHOUT_SCENARIO=0
  while IFS= read -r line; do
    TASK_NAME="${line#\#\#\# User Task: }"
    # Check if there's a 'Scenario:' keyword after this task header in the file
    AFTER_TASK=$(awk "/^### User Task: ${TASK_NAME}/,/^### |^## /" "$FEATURES_FILE" | grep -c "^Scenario:" || echo "0")
    if [ "$AFTER_TASK" -eq 0 ]; then
      WARNINGS+=("WARNING: User Task '${TASK_NAME}' has no Gherkin Scenario")
      TASK_WITHOUT_SCENARIO=$((TASK_WITHOUT_SCENARIO + 1))
    fi
  done < <(grep "^### User Task:" "$FEATURES_FILE")
fi

# ── 5. Each Feature ID in features.md appears in at least one slice file ──────
if [ -f "$FEATURES_FILE" ]; then
  SLICES_DIR="${DIR}/slices"
  while IFS= read -r id_line; do
    FEAT_ID=$(echo "$id_line" | grep -oE '[A-Z]{3}-FEAT-[0-9a-f]{4}' || true)
    if [ -n "$FEAT_ID" ]; then
      FOUND=$(grep -rl "$FEAT_ID" "${SLICES_DIR}" 2>/dev/null | wc -l || echo "0")
      FOUND=$(echo "$FOUND" | tr -d ' ')
      if [ "$FOUND" -eq 0 ]; then
        WARNINGS+=("WARNING: Feature ID '${FEAT_ID}' from features.md not found in any slice file")
      fi
    fi
  done < <(grep "<!-- ID: " "$FEATURES_FILE" 2>/dev/null || true)
fi

# ── Report ────────────────────────────────────────────────────────────────────
echo ""
if [ ${#ERRORS[@]} -gt 0 ]; then
  echo "FAIL — ${#ERRORS[@]} error(s), ${#WARNINGS[@]} warning(s)"
  echo ""
  for err in "${ERRORS[@]}"; do
    echo "  ✗ $err"
  done
  for warn in "${WARNINGS[@]}"; do
    echo "  ⚠ $warn"
  done
  exit 1
else
  echo "PASS — 0 errors, ${#WARNINGS[@]} warning(s)"
  if [ ${#WARNINGS[@]} -gt 0 ]; then
    echo ""
    for warn in "${WARNINGS[@]}"; do
      echo "  ⚠ $warn"
    done
  fi
fi
