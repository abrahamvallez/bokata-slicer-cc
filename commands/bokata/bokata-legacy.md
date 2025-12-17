---
name: bokata:bokata-legacy
description: "Project analysis with agent-based orchestration - classic approach (legacy)"
---

# BOKATA:BOKATA-LEGACY - Agent-Based Project Orchestrator

⚠️ **LEGACY COMMAND** - For backward compatibility only. Use `/bokata:bokata` for faster, transparent command-based orchestration.

Full vertical slicing analysis pipeline using agent-based orchestration. Processes a file end-to-end through all analysis phases.

**For new projects, use:** `/bokata:bokata` (recommended)
**For single features, use:** `/bokata:feature`

# INPUT FORMATS

```bash
# Option 1: Text description (creates new analysis file)
/bokata:bokata-legacy E-commerce platform with catalog, cart, and checkout

/bokata:bokata-legacy Project: Task Manager
Features: User Creates Project, User Adds Task, User Tracks Progress
Tech: React + Node.js

# Option 2: Existing analysis file (processes file through all phases)
/bokata:bokata-legacy ./docs/slicing-analysis/my-project-2025-10-28.md
```

# EXECUTION MODE

**Single mode: File-based processing with orchestrator agent**
1. Accept: Text input OR file path
2. If text: Create new analysis file in `./docs/slicing-analysis/`
3. Load orchestrator: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/orchestrator.md`
4. Orchestrator invokes specialists sequentially:
   - **Phase 1:** Project Investigation (project-explorer)
   - **Phase 2:** Feature Identification (feature-backbone-specialist)
   - **Phase 3:** Feature Decomposition (step-analyzer, increment-generator)
   - **Phase 4:** Walking Skeleton Composition (path-composer)
5. Output: File with all sections appended

# ORCHESTRATOR FLOW

The orchestrator agent **always**:
1. Calls project-explorer specialist
2. Calls feature-backbone-specialist
3. Calls step-analyzer-specialist (per feature)
4. Calls increment-generator-specialist (per feature)
5. Calls path-composer-specialist
6. Composes Walking Skeleton from simplest options
7. Validates all dependencies

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
[From feature-backbone-specialist]

## Feature 1: [Name]

### Steps
[From step-analyzer specialist]

#### Incremental Options
[From increment-generator specialist]

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
- ✅ "E-commerce with catalog, cart, checkout" → Use `/bokata:bokata-legacy`
- ✅ "Task manager with projects, tasks, tracking" → Use `/bokata:bokata-legacy`
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
- `/bokata:bokata-legacy [description|file]` - Full orchestrator with agent (legacy)
- `/bokata:bokata [description|file]` - Full orchestrator with command (recommended)
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
/bokata:bokata-legacy (command calls agent orchestrator)
     ↓
Orchestrator Agent invokes specialists sequentially:
     ↓
calls → project-explorer specialist
     ↓ (file modified)
calls → feature-backbone-specialist
     ↓ (file modified)
calls → step-analyzer-specialist
     ↓ (file modified)
calls → increment-generator-specialist
     ↓ (file modified)
calls → path-composer-specialist
     ↓ (file modified)
Output: Complete analysis file
```

# COMPARISON: COMMAND-BASED vs AGENT-BASED

## `/bokata:bokata` (Command-based) - RECOMMENDED

**Advantages:**
- ✅ 9% faster (no orchestrator agent overhead)
- ✅ More transparent (all logic visible in command file)
- ✅ Easier debugging (single file to understand)
- ✅ Clearer user understanding
- ✅ Lower token usage

**Disadvantages:**
- ❌ Larger command file (~860 lines)
- ❌ Orchestration logic coupled with entry point

## `/bokata:bokata-legacy` (Agent-based) - LEGACY

**Advantages:**
- ✅ Separation of concerns (command vs orchestration)
- ✅ Reusable orchestrator pattern
- ✅ Agent can evolve independently

**Disadvantages:**
- ❌ More complex (orchestrator agent overhead)
- ❌ Harder to debug (logic in agent)
- ❌ Slower execution (9% more tokens)
- ❌ Less transparent flow

**Recommendation:** Use `/bokata:bokata` for new projects.

---

**Version:** 1.0 (Legacy - Agent-based)
**Status:** Supported for Backward Compatibility
**Recommendation:** Use `/bokata:bokata` instead
