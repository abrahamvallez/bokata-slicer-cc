---
name: bokata:feature
description: Single feature vertical slicing analysis - analyze one capability in detail
---

# BOKATA:FEATURE - Single Feature Analyzer

Analyzes ONE feature in isolation with focused, detailed decomposition.

**For multiple features/projects, use:** `/bokata`

# INPUT FORMATS

```bash
# Option 1: Text description (creates new analysis file)
/bokata:feature User records audio with microphone

/bokata:feature Feature: Add to wishlist
Description: Users can save products for later
Context: E-commerce app, React frontend

# Option 2: Existing analysis file (processes with feature-specific analyzer)
/bokata:feature ./docs/slicing-analysis/user-records-audio-2025-10-28.md
```

# EXECUTION MODE

**Single mode: File-based processing**
1. Accept: Text input OR file path
2. If text: Create new analysis file in `./docs/slicing-analysis/`
3. Load orchestrator: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/feature-analyzer.md`
4. Execute phases sequentially (same as project, but single feature):
   - **Phase 1:** Steps decomposition (feature-specific)
   - **Phase 2:** Incremental options generation (feature-specific)
   - **Phase 3:** Walking Skeleton composition
5. Output: File with all sections appended

Each specialist:
- Receives file with previous context
- Extracts information needed
- Appends new section to file
- Returns control to orchestrator

# SCOPE VALIDATION

This command is for **ONE FEATURE ONLY**:
- ✅ "User records audio" → FEATURE
- ✅ "Export data to CSV" → FEATURE
- ❌ "User auth with login and registration" → USE `/bokata` instead (multiple features)

If ambiguous, ask: "Is this one user action or multiple?"

# OUTPUT LOCATION

`./docs/slicing-analysis/{feature-name}-{date}.md`

# OUTPUT STRUCTURE

```markdown
# Feature Analysis: [Name]

## Context Analysis
[Input context]

### Steps
[Feature-specific steps]

#### Incremental Options
[Feature-specific options]

## Walking Skeleton
[Simplest implementation]

## Dependency Analysis
[Validation of dependencies]
```

# NEXT STEPS

After analysis completes:
```bash
/bokata:paths ./analysis.md    # Implementation strategies (3 paths)
/bokata:matrix ./analysis.md   # Complete increment reference
```

See: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/CORE_PRINCIPLES.md` for methodology.
