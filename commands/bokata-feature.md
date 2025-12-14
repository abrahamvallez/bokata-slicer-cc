---
description: Single feature vertical slicing analysis - analyze one capability in detail
---

# BOKATA:FEATURE - Single Feature Slicer

Analyzes ONE feature in isolation with focused, detailed decomposition.

**For multiple features/projects, use:** `/bokata`

# INPUT FORMATS

Accept any of these:
```bash
/bokata:feature User records audio with microphone

/bokata:feature ./docs/feature-spec.md

/bokata:feature Feature: Add to wishlist
Description: Users can save products for later
Context: E-commerce app, React frontend
```

# SCOPE VALIDATION

This command is for **ONE FEATURE**:
- ✅ "User records audio" → FEATURE
- ✅ "Export data to CSV" → FEATURE
- ❌ "User auth with login and registration" → USE `/bokata` instead (multiple features)

If ambiguous, ask: "Is this one user action or multiple?"

# EXECUTION

1. Validate: Input describes single feature
2. Load orchestrator: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/orchestrator.md`
3. Pass: `scope="feature"`, user_input, working_dir
4. Output: `./docs/slicing-analysis/{name}-{date}.md`

Orchestrator will coordinate all specialists to produce:
- Executive Summary
- Feature Breakdown (Steps + Increments)
- Walking Skeleton (Minimum viable implementation)

# OUTPUT LOCATION

`./docs/slicing-analysis/{feature-name}-{date}.md`

# NEXT STEPS

After analysis completes:
```bash
/bokata-iterations-paths {feature-name}   # Implementation strategies
/bokata-matrix {feature-name}              # Complete increment reference
```

See: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/CORE_PRINCIPLES.md` for methodology.
