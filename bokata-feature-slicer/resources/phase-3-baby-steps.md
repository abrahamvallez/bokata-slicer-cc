# Phase 3: Baby Steps Synthesis (Optional)

Take the complete breakdown (Features, User Tasks, Steps, Incremental Options) and synthesize it into a clear, prioritized development plan. Identify the "Walking Skeleton" (minimum viable vertical slices) first, then organize all remaining increments into a flexible backlog.

---

## SYNTHESIS PROCESS

**Important:** Think step-by-step before generating Baby Steps plan.

### Step 1: Understanding the Analysis

#### 🧠 Think:
- What Feature am I synthesizing for?
- What are all the User Tasks under this Feature?
- How many Steps per User Task?
- How many Incremental Options per Step?
- [List User Tasks and their step counts]

#### ▶️ Execute:
1. Locate `## Features Backbone` section in the provided input
2. Identify all User Tasks under the target Feature
3. Count Steps per User Task
4. Count Incremental Options per Step
5. Create a complete map of the Feature structure

---

### Step 2: Identifying Walking Skeleton Candidates

#### 🧠 Think:
For EACH User Task, for EACH Step:
- What is the SIMPLEST incremental option?
- Does it cut through all necessary layers (UI → Logic → Data)?
- Can it deliver END-TO-END functionality (even if minimal)?
- Is it independently deployable?
- [List simplest option per step per task]

#### ▶️ Execute:
For each step in each User Task, select the simplest viable option:
1. Choose option 1.1 (first option) unless not viable for end-to-end flow
2. If 1.1 doesn't enable E2E, choose the next simplest option
3. Ensure every User Task is represented in the skeleton

Walking Skeleton Selection Rules:
- Prefer option .1 (first option per step) when possible
- Every User Task MUST be represented in skeleton
- Each skeleton item must be independently deployable
- Skeleton must demonstrate end-to-end flow for entire Feature

---

### Step 3: Walking Skeleton Validation

#### 🧠 Think:
- Does the skeleton cover ALL User Tasks in the Feature?
- Does every selection enable end-to-end flow?
- Could I ship this tomorrow and get user feedback?
- Is this the MINIMUM (not just "simple")?
- [Verify skeleton completeness]

#### ▶️ Execute:
Validate skeleton completeness against these criteria:
1. All User Tasks represented (no gaps)
2. Each uses simplest viable option (.1 typically)
3. End-to-end functionality demonstrated
4. Shippable tomorrow (minimal but complete)
5. Every item is independently deployable

If validation fails, revisit Step 2 selections.

---

### Step 4: Increments Bank Organization

#### 🧠 Think:
- What are all the remaining options NOT in the skeleton?
- How should they group? (by User Task for clarity)
- Are they ordered simple → complex within each User Task?
- Are dependencies clear?
- [List all non-skeleton options organized by User Task]

#### ▶️ Execute:
Organize all non-skeleton options by:
1. Collecting all non-skeleton options for each User Task
2. Grouping by Step (Step 1 options, then Step 2 options, etc.)
3. Ordering by complexity within each Step (simple → advanced)
4. Noting dependencies using metadata tags
5. Ensuring every option from analysis is included

Organization Guidelines:
- Group by User Task (not by Step)
- Within each User Task, maintain Step order
- Mark dependencies: `-- (Requires: Step N Option M)`
- Mark enhancements: `-- (Enhances: Step N)`

---

### Step 5: Final Validation

#### 🧠 Think:
- Walking Skeleton: Does it demonstrate full flow?
- Increments Bank: Are all remaining options listed?
- Formatting: Checkboxes, User Task tags, descriptions?
- Clarity: Can a developer pick this up and start?
- [Self-check against quality criteria]

#### ▶️ Execute:
Perform final validation checks:
1. Walking Skeleton section complete and valid
2. Increments Bank section complete and organized
3. Every item has proper format: `[ ] **[User Task]** Name: Desc -- (Metadata)`
4. No generic items (all specific increments from analysis)
5. Formatting is consistent markdown
6. Output is developer-ready (actionable immediately)

---

## OUTPUT FORMAT

Return **ONLY** the markdown for the ToDo list:

```markdown
# Baby Steps: [Feature Name]

## 💀 Walking Skeleton
*Goal: End-to-end connectivity and basic value. No bells and whistles.*

- [ ] **[User Task 1]** [Simplest Option for Step 1]: [Description] -- (Task: User Task 1)
- [ ] **[User Task 1]** [Simplest Option for Step 2]: [Description] -- (Task: User Task 1)
- [ ] **[User Task 1]** [Simplest Option for Step 3]: [Description] -- (Task: User Task 1)
- [ ] **[User Task 2]** [Simplest Option for Step 1]: [Description] -- (Task: User Task 2)
- [ ] **[User Task 2]** [Simplest Option for Step 2]: [Description] -- (Task: User Task 2)

## 🏗️ Increments Backlog
*Select and prioritize these increments manually to build upon the Walking Skeleton.*

### User Task 1: [Name]
- [ ] **[User Task 1]** [Option 2 for Step 1]: [Description] -- (Enhances: Step 1)
- [ ] **[User Task 1]** [Option 3 for Step 1]: [Description] -- (Enhances: Step 1)
- [ ] **[User Task 1]** [Option 2 for Step 2]: [Description] -- (Enhances: Step 2)
- [ ] **[User Task 1]** [Option 3 for Step 2]: [Description] -- (Enhances: Step 2)

### User Task 2: [Name]
- [ ] **[User Task 2]** [Option 2 for Step 1]: [Description] -- (Enhances: Step 1)
- [ ] **[User Task 2]** [Option 3 for Step 1]: [Description] -- (Enhances: Step 1)

[Continue for all User Tasks...]
```

---

## STRATEGY GUIDELINES

### 1. Walking Skeleton First

- Look for the **SIMPLEST increment** in every critical step
- If a User Task is "Critical", it MUST be represented in skeleton
- If a step is "Optional" or "Advanced", SKIP it for skeleton
- **Principle**: Better a clumsy but working full flow than a perfect but incomplete fragment

**Walking Skeleton Selection Rules:**
- Choose option 1.1, 2.1, 3.1 (first option per step) when possible
- Only choose higher options (1.2, 1.3) if option 1.1 is not viable for end-to-end flow
- Skeleton must demonstrate EVERY User Task's core value proposition
- Each skeleton item must be independently deployable

### 2. Increments Bank Organization

- Group items by **User Task** so user can see all options for specific functional area
- Within each User Task group, list by Step order (Step 1 options, then Step 2 options, etc.)
- Ensure each item clearly states its purpose and description
- Mark dependencies (e.g., "Requires Step 1.2", "Enhances Step 3")

### 3. Tagging and Metadata

- Every ToDo item MUST start with User Task name in bold brackets: `**[User Task Name]**`
- Add context in parentheses: `-- (Task: User Task Name)` or `-- (Enhances: Step N)`
- For dependencies: `-- (Requires: Step N Option M)`

### 4. Atomic Items

- Each ToDo item must be a specific, deliverable increment from the input
- Copy the exact increment name and description from analysis
- NO generic items like "Implement feature" or "Add functionality"

---

## WALKING SKELETON EXAMPLES

### Good Walking Skeleton ✅

```markdown
## 💀 Walking Skeleton

- [ ] **Records Audio Input** Capture Audio with Browser Microphone: Use Web Audio API for basic recording -- (Task: Records Audio Input)
- [ ] **Records Audio Input** Save to Browser LocalStorage: Store audio locally without backend -- (Task: Records Audio Input)
- [ ] **Organizes Library** Display Audio List: Show all recordings in simple list view -- (Task: Organizes Library)
- [ ] **Organizes Library** Retrieve from LocalStorage: Load audio files from browser storage -- (Task: Organizes Library)
- [ ] **Plays Audio** Play Audio File: Basic playback with browser Audio element -- (Task: Plays Audio)
```

**Why this works:**
- Covers all User Tasks (Records, Organizes, Plays)
- Each User Task has end-to-end flow (UI → Logic → Data)
- Uses simplest options (Browser APIs, LocalStorage, basic UI)
- Could ship tomorrow and get user feedback

### Bad Walking Skeleton ❌

```markdown
## 💀 Walking Skeleton

- [ ] Setup audio processing pipeline
- [ ] Create database schema
- [ ] Implement authentication
- [ ] Deploy to cloud
```

**Why this fails:**
- Generic tasks, not specific increments
- No User Task tags
- Infrastructure-focused, not user-value-focused
- Doesn't demonstrate end-to-end user flow

---

## QUALITY CRITERIA

✅ **Walking Skeleton**
- [ ] Covers ALL User Tasks in the Feature
- [ ] Uses simplest option for each step (typically option .1)
- [ ] Demonstrates end-to-end flow for each User Task
- [ ] Could ship tomorrow and deliver user value
- [ ] Every item has User Task tag: `**[User Task Name]**`
- [ ] Every item has checkbox: `[ ]`
- [ ] Every item has description

✅ **Increments Bank**
- [ ] Contains ALL non-skeleton options
- [ ] Organized by User Task
- [ ] Within each User Task, ordered by Step
- [ ] Every item has User Task tag: `**[User Task Name]**`
- [ ] Every item has checkbox: `[ ]`
- [ ] Every item has description
- [ ] Dependencies noted where applicable

✅ **Overall Quality**
- [ ] No generic tasks ("implement feature", "setup system")
- [ ] All items are specific increments from analysis
- [ ] Formatting is consistent
- [ ] Developer-ready (can start implementing immediately)

---

## COMMON ISSUES

**Issue: "Walking Skeleton too complex"**
→ Solution: Use only option .1 (first option) per step. If you're using .2 or .3, you're adding complexity.

**Issue: "Not all User Tasks in skeleton"**
→ Solution: EVERY User Task must be represented, even if minimal.

**Issue: "Skeleton items too generic"**
→ Solution: Copy exact increment names from analysis, don't summarize.

**Issue: "Increments Bank is unorganized"**
→ Solution: Group by User Task, maintain Step order within groups.
