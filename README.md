# Bokata: Vertical Slicing & Task Decomposition Prompt Framework

**Bokata** is a prompt engineering framework designed to guide Large Language Models (LLMs) in decomposing complex software requirements into incremental, high-value, and actionable development plans.

Using techniques like **Vertical Slicing** and **User Story Mapping**, Bokata transforms vague ideas or large PRDs into a structured "Walking Skeleton" and a prioritized backlog of functional increments.

---

## 🏗️ Project Structure & Skills

The system is organized into specialized **Skills**. Each Skill is a self-contained prompt (located in its respective directory as `SKILL.md`) that defines a specific role and workflow.

### 1. `project-explorer`
**Goal:** Deep investigation of the technical and functional context.
- **Analysis:** Scans existing codebases (if any) to identify tech stacks, patterns, and architectural constraints.
- **Requirements extraction:** Distills user descriptions into core capabilities, user goals, and business rules.
- **Output:** Produces the `## Context Analysis`, the foundation for all subsequent steps.

### 2. `feature-backbone-specialist`
**Goal:** Map the user journey using User Story Mapping.
- **Features:** Identifies broad high-level goals in `[Actor] [Action] [Result] [Object]` format.
- **User Tasks:** Breaks Features into concrete, value-delivering actions (`[Action] [Result] [Object]`).
- **Narrative:** Organizes tasks according to the chronological user journey.
- **Output:** Produces the `## Features Backbone`.

### 3. `acceptance-criteria-generator`
**Goal:** Formalize behavior using Gherkin (Given/When/Then).
- **Example Mapping:** Discovers hidden business logic, rules, and edge cases.
- **Validation:** Ensures every User Task has a clear "Happy Path" and "Sad Path".
- **Output:** Executable specifications that bridge the gap between requirements and testing.

### 4. `bokata-feature-slicer`
**Goal:** The core decomposition engine. It processes a specific Feature through three mandatory phases:
- **Phase 1: Step Analysis:** Decomposes User Tasks into functional steps across all layers (UI, Logic, Data, Integration).
- **Phase 2: Incremental Options:** Generates multiple development options for each step (from "Mocked/Basic" to "Full Production").
- **Phase 3: Baby Steps Plan:** Synthesizes the simplest possible end-to-end version (**Walking Skeleton**) and a prioritized backlog of increments.

---

## 🛠️ Methodology

Bokata is built on industry-proven software design principles:

### Vertical Slicing (The Hamburger Method)
Instead of building horizontal layers (Database first, then API, then UI), Bokata encourages **Vertical Slices**. A slice is a thin piece of functionality that touches all layers and is deployable/testable on its own.

### Walking Skeleton
A "Walking Skeleton" is the tiniest possible implementation of the vertical slice that connects all main components. It "walks" through the system end-to-end, proving the architecture before adding meat (complexity) to the bones.

### Linguistic Pattern Detection
The system uses "Linguistic Cues" to identify where a task needs further splitting:
- **Conjunctions:** "And/Or" usually mean two tasks.
- **Generic Verbs:** "Manage" or "Handle" always hide multiple CRUD operations.
- **Exceptions:** "Unless/Except" point to hidden business rules.

### Breakdown Strategies Toolkit
The `bokata-feature-slicer` applies 16+ specific strategies to create increments:
- **Zero/One/Many:** Handle empty states first, then one item, then lists.
- **Dummy to Dynamic:** Use hardcoded data before building full integrations.
- **Workflow Simplification:** Skip optional steps or validations in the first increment.

---

## 🚀 How to Execute

You can use the agents individually or follow the recommended "Full Loop" for maximum precision.

### Individual Execution
- **Individual Agents:** You can launch `project-explorer`, `feature-backbone-specialist`, or `acceptance-criteria-generator` independently to analyze specific parts of your project.
- **The Slicer:** `bokata-feature-slicer` is a specialized workflow. It **requires** a `## Features Backbone` as input. If it doesn't find the necessary info, it will recommend running the previous agents first.

### Recommended "Full Loop" Workflow
For the best results, launch the agents in sequence:
1. **Explore:** Run `project-explorer` to understand the domain and tech stack.
2. **Backbone:** Use the output from Explorer to run `feature-backbone-specialist`.
3. **Criteria:** (Optional but Recommended) Run `acceptance-criteria-generator` to define rules.
4. **Slice:** Run `bokata-feature-slicer` on a target feature to get your incremental roadmap.

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
