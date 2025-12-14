---
description: Project analysis with vertical slicing - analyzes multi-feature systems and applications
---

# BOKATA - Project Vertical Slicer

Analyzes complete projects and systems with **multiple features** using vertical slicing.

**For single features, use:** `/bokata:feature`

# INPUT FORMATS

Accept any of these:
```bash
/bokata E-commerce platform with catalog, cart, and checkout

/bokata ./docs/project-prd.md

/bokata Project: Task Manager
Features: User Creates Project, User Adds Task, User Tracks Progress
Tech: React + Node.js
```

# SCOPE VALIDATION

This command is for **MULTIPLE FEATURES**:
- ✅ "E-commerce with catalog, cart, checkout" → PROJECT
- ✅ "Task manager with projects, tasks, tracking" → PROJECT
- ❌ "User Records Audio" → USE `/bokata:feature` instead

If ambiguous, ask: "Is this one feature or multiple capabilities?"

# EXECUTION

1. Validate: Input describes multiple features
2. Load orchestrator: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/orchestrator.md`
3. Pass: `scope="project"`, user_input, working_dir
4. Output: `./docs/slicing-analysis/{name}-{date}.md`

Orchestrator will coordinate all specialists to produce:
- Executive Summary
- Features Backbone (Actor+Action naming)
- Complete Feature Breakdown (Steps + Increments)
- Walking Skeleton (Minimum viable implementation)

# OUTPUT LOCATION

`./docs/slicing-analysis/{project-name}-{date}.md`

# NEXT STEPS

After analysis completes:
```bash
/bokata-iterations-paths {project-name}   # Implementation strategies
/bokata-matrix {project-name}              # Complete increment reference
