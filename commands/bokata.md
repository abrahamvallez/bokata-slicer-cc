---
description: "Intelligent vertical slicing - project analysis orchestrator"
---

# BOKATA - Project Analysis Orchestrator

Full vertical slicing analysis pipeline. Processes a file end-to-end through all analysis phases.

**For single features, use:** `/bokata:feature`

# INPUT FORMATS

```bash
# Option 1: Text description (creates new analysis file)
/bokata E-commerce platform with catalog, cart, and checkout

/bokata Project: Task Manager
Features: User Creates Project, User Adds Task, User Tracks Progress
Tech: React + Node.js

# Option 2: Existing analysis file (processes file through all phases)
/bokata ./docs/slicing-analysis/my-project-2025-10-28.md
```

# EXECUTION MODE

**Single mode: File-based processing**
1. Accept: Text input OR file path
2. If text: Create new analysis file in `./docs/slicing-analysis/`
3. Load orchestrator: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/project-analyzer.md`
4. Execute phases sequentially:
   - **Phase 1:** Feature Backbone extraction
   - **Phase 2:** Steps decomposition
   - **Phase 3:** Incremental options generation
   - **Phase 4:** Walking Skeleton composition
5. Output: File with all sections appended

# ORCHESTRATOR FLOW

The orchestrator **always**:
1. Calls `/bokata:backbone` specialist
2. Calls `/bokata:steps` specialist
3. Calls `/bokata:increments` specialist
4. Composes Walking Skeleton from simplest options
5. Validates all dependencies

Each specialist:
- Receives file with previous context
- Extracts information needed
- Appends new section to file
- Returns control to orchestrator

# OUTPUT LOCATION

`./docs/slicing-analysis/{project-name}-{date}.md`

# OUTPUT STRUCTURE

```markdown
# Project Analysis: [Name]

## Context Analysis
[Input context]

## Features Backbone
[From /bokata:backbone specialist]

## Feature 1: [Name]

### Steps
[From /bokata:steps specialist]

#### Incremental Options
[From /bokata:increments specialist]

## Feature 2: [Name]
[Same structure]

...

## Walking Skeleton
[Composed from simplest options]

## Dependency Analysis
[Validation that all dependencies work]
```

# SCOPE

For **MULTIPLE FEATURES**:
- ✅ "E-commerce with catalog, cart, checkout" → Use `/bokata`
- ✅ "Task manager with projects, tasks, tracking" → Use `/bokata`
- ❌ "User Records Audio" → Use `/bokata:feature` instead

# NEXT STEPS

After orchestrator completes:
```bash
/bokata:paths ./analysis.md    # Generate implementation strategies (3-5 paths)
/bokata:matrix ./analysis.md   # Generate complete reference matrix
```

# ADVANCED: INDIVIDUAL PHASES

To process only specific phases:

```bash
/bokata:backbone ./analysis.md    # Extract features only
/bokata:steps ./analysis.md       # Decompose into steps only
/bokata:increments ./analysis.md  # Generate options only
```

This allows:
- Iterating on specific phases
- Building analysis incrementally
- Fine-grained control over each step

# ALL COMMANDS

**Core Analysis:**
- `/bokata [description|file]` - Full orchestrator (all phases)
- `/bokata:backbone [file]` - Feature backbone extraction only
- `/bokata:steps [file]` - Step decomposition only
- `/bokata:increments [file]` - Option generation only

**Single Feature:**
- `/bokata:feature [description|file]` - Complete single feature analysis

**Strategic Planning:**
- `/bokata:paths [file]` - Implementation strategies with timelines
- `/bokata:matrix [file]` - Selection matrix with dependencies

# ARCHITECTURE

All specialists work in **single mode**:
- Always receive file as input
- Always modify file as output
- Always append results (no overwrites)
- Agnostic to how they're called (orchestrator or direct)

Example flow:
```
Text/File Input
     ↓
/bokata (orchestrator)
     ↓
calls → /bokata:backbone specialist
     ↓ (file modified)
calls → /bokata:steps specialist
     ↓ (file modified)
calls → /bokata:increments specialist
     ↓ (file modified)
Output: Complete analysis file
```
