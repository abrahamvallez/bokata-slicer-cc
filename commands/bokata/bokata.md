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

Load and execute: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/project-explorer.md`

Pass context:
- `user_input`: [original user input]
- `file_path`: [./docs/slicing-analysis/{name}-{date}.md path]

Wait for specialist to complete and append:
- ✓ `## Context Analysis` section exists
- ✓ `### Project Context` subsection filled
- ✓ `### Technical Analysis` subsection filled
- ✓ `### Functional Requirements` subsection filled
- ✓ `### Recommendations` subsection filled

### 1.2 Validate Context Analysis

If any subsection missing:
```
ERROR: project-explorer did not complete Context Analysis
ACTION: Re-invoke specialist with explicit request to complete missing sections
```

---

## Phase 2: Feature Identification

### 2.1 Invoke feature-backbone-specialist

Load and execute: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/feature-backbone-specialist.md`

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

**For each feature**.

### 3.1 Step Analysis Loop

FOR EACH feature in features_list invoke a step-analyzer-specialist in parallel:

#### 3.1.1 Invoke step-analyzer-specialist

Load and execute: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/step-analyzer-specialist.md`

Pass context:
- `file_path`: [./docs/slicing-analysis/{name}-{date}.md path]
- `feature_name`: [current feature]

#### 3.1.2 Wait for Steps Completion

Monitor `./docs/slicing-analysis/{name}-{date}.md` for:
- ✓ `## Feature {N}: Steps` section exists
- ✓ Contains 3-7 steps (verify count)
- ✓ Each step has:
  - Description
  - Quality Attributes (factors, tradeoffs, options)

#### 3.1.3 Validate Steps

For each step:
- ✓ Has distinct responsibility
- ✓ Clear input/output
- ✓ Quality attributes defined
- ✓ NOT implementation-focused (concept, not code)

**If validation fails:**
```
ERROR: Steps validation failed for Feature "{feature}"
ACTION: Re-invoke step-analyzer with feedback to fix issues
```

### 3.2 Incremental Options Generation Loop

FOR EACH feature in features_list:

#### 3.2.1 Invoke increment-generator-specialist

Load and execute: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/increment-generator-specialist.md`

Pass context:
- `file_path`: [./docs/slicing-analysis/{name}-{date}.md path]
- `feature_name`: [current feature]
- `output_format`: "checklist" (NEW: enables progress tracking)

#### 3.2.2 Wait for Incremental Options Completion

Monitor `./docs/slicing-analysis/{name}-{date}.md` for:
- ✓ `## Feature {N}: Incremental Options` section exists
- ✓ For EACH step:
  - ✓ 3-5 incremental options generated
  - ✓ Each option has:
    - Description
    - REQUIRES specification
    - PROVIDES specification
    - COMPATIBLE WITH list
  - ✓ **Checklist format: `| [ ] | N.1 | [Option] | ...`** (NEW)
  - ✓ **Progress counter: `0/N incremental options completed`** (NEW)

#### 3.2.3 Validate Incremental Options

For each incremental option:
- ✓ Specific, not generic
- ✓ Deployable independently
- ✓ Dependencies explicit
- ✓ Compatibility declared
- ✓ Has clear value

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
