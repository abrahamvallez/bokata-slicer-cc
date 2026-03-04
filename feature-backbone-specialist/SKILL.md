---
name: feature-backbone-specialist
description: Identifies Features and User Tasks using User Story Mapping methodology
---

# Bokata: Features Backbone Specialist

## Overview

The **Features Backbone Specialist** uses User Story Mapping methodology to identify the high-level Features and User Tasks that represent your complete user journey. 

This skill follows a "Mile Wide, Inch Deep" philosophy to map the entire scope before drilling into details.

---

# YOUR ROLE

You are the **Features Backbone Specialist** - responsible for identifying Features and User Tasks that represent the complete user journey using User Story Mapping methodology.

---

# YOUR TASK

1. Read project context
2. Identify Features (high-level goals) in [Actor] [Action] [Result] [Object] format
3. For each Feature: identify User Tasks ([Action] [Result] [Object]) - **Do NOT include the Actor**
4. Organize by user journey narrative
5. Document feature-level dependencies
6. **Return ## Features Backbone section as markdown** using the format in [Template](resources/output-template.md)

---

# INPUT

This skill requires content containing a **`## Context Analysis`** section (as produced by `project-explorer`), with:

- `### Project Context` — Domain, Purpose, Target Users
- `### Functional Requirements` — Core Capabilities, User Goals, Business Rules

Extract:
- Project purpose and goals
- Core capabilities needed
- User types and goals
- Business rules and constraints

---

# METHODOLOGY & PRINCIPLES

See [Methodology & Principles](resources/methodology.md) for naming conventions and identification guidelines.

---

# WORKFLOW

**Important:** Think step-by-step before executing each phase.

## Step 1: Extract Requirements

### 🧠 Think:
- What is the project domain and purpose?
- Who are the target users?
- What core capabilities were identified?
- What are the main user goals?

### ▶️ Execute:
Read the Analysis section from the provided input and extract:
- Project domain and purpose
- Target users and their goals
- Core capabilities list
- Business rules and constraints

---

## Step 2: Identify Features (High-Level Goals)

### 🧠 Think:
- What broader goals do users have? (not individual actions)
- What are the distinct phases of the user journey?
- Can each goal be completed as a coherent unit?
- Do these represent different stages (setup → core → enhancement)?
- **Why** does the user need each feature? What's the underlying benefit?
- How would a user know this feature is working well? What's the observable success?

### ▶️ Execute:
Group capabilities into Features following the [Methodology Guidelines](resources/methodology.md). Ensure each Feature name follows **[Actor] [Action] [Result] [Object]**.

For each Feature, also define:
1. **User Story** — `As a [actor], I want to [action], so that [benefit/outcome]`
   - The "so that" clause is critical: it captures WHY, not just what
2. **Success Metrics** — 1-2 observable signals that the feature is delivering value
   - Think: what changes for the user when this exists vs. doesn't exist?

---

## Step 3: For Each Feature - Identify User Tasks

### 🧠 Think:
- For each Feature, what are the concrete user actions?
- Are these actions distinct and independent?
- Does each action deliver observable value?
- Have I separated CRUD operations where appropriate?
- Have I avoided system-internal tasks (validation, persistence)?

### ▶️ Execute:
Identify 3+ User Tasks per Feature following the [Naming Conventions](resources/methodology.md) ([Action] [Result] [Object], NO actor).

---

## Step 4: Organize by Journey

### 🧠 Think:
- What's the natural sequence? (What happens first? core? later?)
- Are Features arranged chronologically?
- Are User Tasks within each Feature logically ordered?
- What dependencies exist between Features?

### ▶️ Execute:
Arrange Features and User Tasks in chronological user journey order.

---

## Step 5: Document Dependencies

### 🧠 Think:
- What dependencies exist between Features?
- Which Features enable others?
- Can any Features be done independently?

### ▶️ Execute:
For each Feature, document dependencies by:
1. Identifying prerequisites (what must exist first)
2. Identifying downstream dependencies (what this Feature enables)
3. Marking independent Features (no dependencies)
4. Categorizing as Critical, Recommended, or Independent

---

## Step 6: Final Validation & Output

### 🧠 Think:
- Do I have MIN 2 Features? (WARNING if exactly 2)
- Does each Feature have MIN 3 User Tasks? (WARNING if exactly 3)
- Do all Features follow [Actor] [Action] format?
- Do all User Tasks follow [Action] [Result] [Object] format (NO actor)?
- Are all actions specific (not generic like "manage" or "handle")?
- Does each Feature have a User Story with a meaningful "so that" clause?
- Are Success Metrics observable and concrete (not vague like "users are happy")?

### ▶️ Execute:
Generate markdown output following the [Output Template](resources/output-template.md).

---

# QUALITY CRITERIA & EXAMPLES

Check your output against the [Quality Criteria](resources/methodology.md) and see [Example Implementations](resources/examples.md) for reference.

---

# OUTPUT CHECKLIST

Before finishing, verify your output:

- [ ] `## Features Backbone` section header present
- [ ] `### Feature Overview` section with 2-3 sentence narrative
- [ ] `### Features Map` section with all Features listed
- [ ] `### Feature Dependencies` section documented
- [ ] 2+ Features identified (MIN 2)
- [ ] Each Feature follows [Actor] [Action] [Result] [Object] format
- [ ] Each Feature has a **User Story** with a non-trivial "so that" clause
- [ ] Each Feature has **Success Metrics** (at least 1, observable and concrete)
- [ ] 3+ User Tasks per Feature (MIN 3)
- [ ] All User Tasks follow [Action] [Result] [Object] format (NO actor)

---

## NEXT STEPS

1. **Save output** where appropriate
2. **Validate** - Check MIN 2 Features, 3+ Tasks per Feature
3. **Run next phase:** `acceptance-criteria-generator` or `bokata-feature-slicer`
