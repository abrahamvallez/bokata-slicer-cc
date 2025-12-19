---
name: bokata:bokata
description: "Project analysis with command-based orchestration - faster, transparent execution"
---

# BOKATA:BOKATA - Command-Based Project Orchestrator

Full vertical slicing analysis pipeline with command-based orchestration. Processes input end-to-end through all analysis phases.

**For single features, use:** `/bokata:feature`
**For legacy agent-based approach, use:** `/bokata:bokata-legacy`

---

# INPUT FORMATS

```bash
# Option 1: Text description (creates new analysis file)
/bokata:bokata E-commerce platform with catalog, cart, and checkout

/bokata:bokata Project: Task Manager
Features: User Creates Project, User Adds Task, User Tracks Progress
Tech: React + Node.js

# Option 2: Existing analysis file (processes through all phases)
/bokata:bokata ./docs/slicing-analysis/my-project-2025-10-28.md
```

---

# ORCHESTRATION FLOW

This command orchestrates directly (no agent needed):

```
Input (Text or File)
    ↓
[Phase 0] Setup & Initialization
    ↓
[Phase 1] Project Investigation
    ↓ invokes → project-explorer specialist
    ↓
[Phase 2] Feature Identification
    ↓ invokes → feature-backbone-specialist
    ↓
[Phase 3] Feature Decomposition
    ├─ FOR EACH feature:
    ├─ invokes → step-analyzer-specialist
    ├─ invokes → increment-generator-specialist (with checklist format)
    ↓
[Phase 4] Output Generation & Cleanup
    ↓
Final Document with Progress Checklists
```

---

# ORCHESTRATION WORKFLOW

## Phase 0: Setup & Initialization

### 0.1 Create Working Directory

- Ensure `./docs/slicing-analysis/` exists
- Prepare file path: `./docs/slicing-analysis/{name}-{date}.md`

### 0.2 Initialize Working Markdown File

Create `./docs/slicing-analysis/{name}-{date}.md` with structure:

```markdown
# Working Analysis: {name}
Date: {date}
Status: In Progress

---

## Context Analysis
[To be filled by project-explorer]

## Features Backbone
[To be filled by feature-backbone-specialist]

## Feature Sections
[To be filled by step-analyzer and incremental-options-generator]

## Metadata
[Generated at completion]
```

---

## Phase 1: Project Investigation

**Always run first** - Investigates requirements and codebase.

### 1.1 Invoke project-explorer specialist

Load and execute: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/project-explorer.md`

Pass context:
- `user_input`: [original user input]
- `file_path`: [./docs/slicing-analysis/{name}-{date}.md path]

Wait for specialist to complete and append:
- ✓ `## Context Analysis` section exists
- ✓ `### Project Context` subsection filled
- ✓ `### Technical Analysis` subsection filled
- ✓ `### Functional Requirements` subsection filled

### 1.2 Validate Context Analysis

If any subsection missing:
```
ERROR: project-explorer did not complete Context Analysis
ACTION: Re-invoke specialist with explicit request to complete missing sections
```

---

## Phase 2: Feature Identification

### 2.1 Invoke feature-backbone-specialist

Load and execute: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/feature-backbone-specialist.md`

Pass context:
- `file_path`: [./docs/slicing-analysis/{name}-{date}.md path]

Wait for specialist to complete and append:
- ✓ `## Features Backbone` section exists
- ✓ `### Features List` with Actor+Action naming
- ✓ `### Feature Flow Narrative`
- ✓ `### Dependencies and Relationships`

### 2.2 Validate Feature Naming

For each feature in the list:
- ✓ Follows `[Actor] [Action]` format
- ✓ Actor is concrete (not vague like "System")
- ✓ Action is specific (not generic like "Handle" or "Process")

**If violations found:**
```
WARNING: Feature "{name}" doesn't follow Actor+Action convention
ACTION: Request correction before proceeding to next phase
```

### 2.3 Extract Feature List

Parse the `### Features List` section to get:
```yaml
features:
  - name: "Feature 1"
    description: "..."
  - name: "Feature 2"
    description: "..."
```

Store feature names for Phase 3 iterations.

---

## Phase 3: Feature Decomposition

### 3.1 Step Analysis

Invoke 1 step-analyzer-specialist agents per each feature:

#### 3.1.1 Invoke step-analyzer-specialist

Load and execute: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/step-analyzer-specialist.md`

Pass context:
- `file_path`: [./docs/slicing-analysis/{name}-{date}.md path]

#### 3.1.2 Wait for Steps Completion (All Features)

Monitor `./docs/slicing-analysis/{name}-{date}.md` for:
- ✓ `### Steps` sections added under EACH feature
- ✓ Each feature has 3-7 steps (verify count per feature)
- ✓ Each step has:
  - Description
  - Layer assignment (UI/Logic/Data/Integration)
  - Quality Attributes (factors, tradeoffs, options)

#### 3.1.3 Validate Steps (All Features)

For ALL features and their steps:
- ✓ Has distinct responsibility
- ✓ Clear input/output
- ✓ Quality attributes defined
- ✓ NOT implementation-focused (concept, not code)
- ✓ Consistent naming across features

**If validation fails:**
```
ERROR: Steps validation failed
ACTION: Re-invoke step-analyzer with feedback to fix issues
```

### 3.2 Incremental Options Generation

Invoke 1 increment-generator-specialist per each feature

#### 3.2.1 Invoke increment-generator-specialist

Load and execute: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/increment-generator-specialist.md`

Pass context:
- `file_path`: [./docs/slicing-analysis/{name}-{date}.md path]

#### 3.2.2 Wait for Incremental Options Completion (All Features)

Monitor `./docs/slicing-analysis/{name}-{date}.md` for:
- ✓ `### Incremental Options` sections added under EACH step in EACH feature
- ✓ For EACH step:
  - ✓ 3-5 incremental options generated
  - ✓ Each option has:
    - Description
    - REQUIRES specification

#### 3.2.3 Validate Incremental Options (All Features)

For ALL incremental options across ALL features:
- ✓ Specific, not generic
- ✓ Deployable independently
- ✓ Dependencies explicit
- ✓ Compatibility declared
- ✓ Has clear value
- ✓ Cross-feature compatibility verified

**If validation fails:**
```
ERROR: Incremental options validation failed
ACTION: Re-invoke specialist with specific feedback
```

---

## Phase 4: Verify all phases completed

Verify all phases completed:

```
✓ ## Context Analysis - PRESENT
✓ ## Features Backbone - PRESENT
✓ ## Feature {N}: Steps - PRESENT (for each feature)
✓ ## Feature {N}: Incremental Options - PRESENT (with checklists)
```
