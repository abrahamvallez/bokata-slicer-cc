---
name: bokata:bokata
description: "Project analysis with command-based orchestration - faster, transparent execution"
allowed-tools: Bash(mkdir:*)
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
[Phase 2] Features Backbone Identification
    ↓ invokes → story-mapping-backbone-specialist
    ↓
[Phase 3] User Task Decomposition
    ├─ FOR EACH User Task (from Features Backbone):
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

!`mkdir -p ./docs/slicing-analysis`

### 0.2 Initialize Working Markdown File

Create file `./docs/slicing-analysis/{name}-{date}.md` with structure:

```markdown
# Working Analysis: {name}
Date: {date}
Status: In Progress

---

## Context Analysis
[To be filled by project-explorer]

## Features Backbone
[To be filled by story-mapping-backbone-specialist]

## User Task Sections
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

### 1.1b Capture and Write Output

Specialist returns markdown for `## Context Analysis` section

Append to file_path:
- ✓ `## Context Analysis` section now exists
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

## Phase 2: Features Backbone Identification

### 2.1 Invoke story-mapping-backbone-specialist

Load and execute: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/story-mapping-backbone-specialist.md`

Pass context:
- `file_path`: [./docs/slicing-analysis/{name}-{date}.md path]

### 2.1b Capture and Write Output

Specialist returns markdown for `## Features Backbone` section

Append to file_path:
- ✓ `## Features Backbone` section now exists
- ✓ `### Features Map` with Feature [Actor]+[Action] naming
- ✓ `### Feature Overview` narrative
- ✓ `### Feature Dependencies`

### 2.2 Validate Naming & Structure

For each **Feature** in the map:
- ✓ Follows `[Actor] [Action]` format
- ✓ MIN 2 Features present (WARNING if exactly 2)

For each **User Task** in the map:
- ✓ Follows `[Actor] [Action]` format
- ✓ MIN 3 User Tasks per Feature (WARNING if exactly 3)
- ✓ Actor is concrete (not vague like "System")
- ✓ Action is specific (not generic like "Handle" or "Process")

**If violations found:**
```
ERROR: Feature/User Task naming or count violation
ACTION: Request correction before proceeding to next phase
```

### 2.3 Extract User Task List

Parse the `### Features Map` section to get all User Tasks across all Features:
```yaml
user_tasks:
  - name: "User Task 1"
    feature: "Parent Feature 1"
    description: "..."
  - name: "User Task 2"
    feature: "Parent Feature 1"
    description: "..."
```

Store User Task names for Phase 3 iterations.

---

## Phase 3: User Task Decomposition

### 3.1 Step Analysis

Invoke 1 step-analyzer-specialist per each **User Task**:

#### 3.1.1 Invoke step-analyzer-specialist

Load and execute: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/step-analyzer-specialist.md`

Pass context:
- `file_path`: [./docs/slicing-analysis/{name}-{date}.md path]
- `user_task`: [name of the current user task to analyze]

#### 3.1.1b Capture and Write Output

Specialist returns markdown for `### Steps` sections

Append to file_path under each User Task:
- ✓ `### Steps` sections now exist for all user tasks

#### 3.1.2 Validate Steps Completion (All User Tasks)

Monitor `./docs/slicing-analysis/{name}-{date}.md` for:
- ✓ `### Steps` sections added under EACH user task
- ✓ Each user task has MIN 3 steps (WARNING if exactly 3)
- ✓ Each step has:
  - Description
  - Layer assignment (UI/Logic/Data/Integration)
  - Quality Attributes (factors, tradeoffs, options)

#### 3.1.3 Validate Steps (All User Tasks)

For ALL user tasks and their steps:
- ✓ Has distinct responsibility
- ✓ Clear input/output
- ✓ Quality attributes defined
- ✓ NOT implementation-focused (concept, not code)
- ✓ Consistent naming across tasks

---

### 3.2 Incremental Options Generation

Invoke 1 increment-generator-specialist per each **User Task**

#### 3.2.1 Invoke increment-generator-specialist

Load and execute: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/increment-generator-specialist.md`

Pass context:
- `file_path`: [./docs/slicing-analysis/{name}-{date}.md path]
- `user_task`: [name of the current user task]

#### 3.2.1b Capture and Write Output

Specialist returns markdown for `### Incremental Options` sections

Append to file_path under each step:
- ✓ `### Incremental Options` sections now exist for all steps

#### 3.2.2 Validate Incremental Options Completion (All User Tasks)

Monitor `./docs/slicing-analysis/{name}-{date}.md` for:
- ✓ `### Incremental Options` sections added under EACH step in EACH user task
- ✓ For EACH step:
  - ✓ MIN 3 incremental options (WARNING if exactly 3)
  - ✓ Each option has:
    - Description
    - REQUIRES specification

#### 3.2.3 Validate Incremental Options (All User Tasks)

For ALL incremental options across ALL user tasks:
- ✓ Specific, not generic
- ✓ Deployable independently
- ✓ Dependencies explicit
- ✓ Compatibility declared
- ✓ Has clear value
- ✓ Cross-feature compatibility verified

---

## Phase 4: Verify all phases completed

Verify all phases completed:

```
✓ ## Context Analysis - PRESENT
✓ ## Features Backbone - PRESENT
✓ ## User Task {N}: Steps - PRESENT (for each user task)
✓ ## User Task {N}: Incremental Options - PRESENT (with checklists)
```
