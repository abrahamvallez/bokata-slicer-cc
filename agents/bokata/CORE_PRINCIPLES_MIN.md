---
name: core-principles-min
description: Condensed principles and methodology for Bokata agents (Token Optimized)
---

# Core Principles (Condensed)

## 1. The Fundamental Question
"What would we ship if the deadline was tomorrow?"
- **Incremental Option**: Smallest implementation unit within a step.
- **Vertical Slice**: Selection of options forming a complete end-to-end feature.
- **Walking Skeleton**: Simplest possible vertical slice (using ⭐ options).

## 2. Slice Requirements
1. **Vertical**: Cut through UI, Logic, and Data layers.
2. **Value**: Deliver observable user value.
3. **Independent**: Must work standalone (deployable).
4. **Feedback**: Enable early validation.
5. **Minimal**: Start with the smallest that works.
6. **Explicit**: Declare REQUIRES, PROVIDES, COMPATIBLE WITH.

## 3. Naming: [Actor] [Action]
- **Actors**: User, Admin, System, Customer, Analyst, etc. (Concrete only).
- **Actions**: Create, Search, Sync, Record, etc. (Specific verbs).
- *Bad: "Audio Recording" | Good: "Coach Records Audio"*

## 4. Step Decomposition
- 3-7 steps per feature.
- Distinct responsibility, clear input/output.
- Functional layers: **UI | Logic | Data | Integration**.
- Define: Quality Factors, Tradeoffs, Implementation Options.

## 5. Incremental Option Generation
- **Exactly 3-5 options per step.**
- Name describes specific approach (e.g., "Manual CSV Export").
- Apply breakdown strategies (see list below).
- Mark simplest with ⭐.
- Explicit dependencies:
  - **REQUIRES**: Prerequisite caps/status.
  - **PROVIDES**: Resulting capability.
  - **COMPATIBLE WITH**: List of option IDs.

## 6. Breakdown Strategies (Toolkit)
- **Data**: Zero/One/Many, Start with Dummy, Simplify Outputs, Narrow Segment.
- **Process**: Workflow Simplification, Manual Before Automated, Extract Basic Utility, Split Learning.
- **Rules**: Business Rule Progression, Start with Outputs, Capacity-Based Splitting.
- **Analysis**: SPIDR (Spikes, Paths, Interfaces, Data, Rules), Connectors (and, or, before).

---
*End of Minified Principles*
