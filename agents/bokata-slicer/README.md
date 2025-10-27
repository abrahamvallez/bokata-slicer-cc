# Vertical Slicer Agents

Collection of specialized agents for radical feature decomposition using the **Hamburger Method** and vertical slicing techniques.

## 🎯 Objective

These agents implement a systematic methodology to decompose complex features into the **smallest possible increments** that deliver immediate value, following the fundamental principle:

> **"What would we ship if the deadline was tomorrow?"**

## 🏗️ System Architecture

### Main Coordinator

**[vertical-slicer-orchestrator.md](vertical-slicer-orchestrator.md)**
- Coordinates the complete analysis flow in 5 sequential phases
- Manages context between specialized agents
- Validates coherence and completeness of analysis
- Handles errors and retries processes when necessary

### All-in-One Solution

**[vertical-slice-planner.md](vertical-slice-planner.md)**
- Implements the complete 4-phase process in a single agent
- Ideal for medium projects that don't require complex coordination
- Directly generates final planning documents

### Specialized Agents

#### 1. **[feature-backbone-specialist.md](feature-backbone-specialist.md)**
**Purpose**: Feature identification and organization

- Identifies all features at higher objective level
- Organizes features in narrative sequence of user journey
- Separates CRUD into distinct features (Create, Read, Update, Delete)
- **Output**: Structured list of features with narrative flow

#### 2. **[step-analyzer-specialist.md](step-analyzer-specialist.md)**
**Purpose**: Decomposition into technical and business steps

- Decomposes each feature into technical, business and logical steps
- Defines quality attributes for each step
- Identifies simpler forms that still deliver value
- **Output**: Steps per feature with quality attributes and trade-offs

#### 3. **[increment-generator-specialist.md](increment-generator-specialist.md)** (ENHANCED v0.2.0)
**Purpose**: Increment generation using breakdown strategies with dependency specifications

- Applies the **Breakdown Strategies Toolkit** (20+ strategies)
- Generates 5-10 increments per step (MANDATORY)
- **NEW:** Each increment specifies:
  - **REQUIRES**: External dependencies (or "None")
  - **PROVIDES**: Capabilities offered to other steps
  - **COMPATIBLE WITH**: Which increments from other steps work together
- Filters increments by viability (fast, testable, reversible)
- **Output**: Multiple incremental implementations per step with full dependency specs

#### 4. **[path-composer-specialist.md](path-composer-specialist.md)** (ENHANCED v0.2.0)
**Purpose**: Vertical slice composition with automatic compatibility validation

- **NEW:** Validates all dependencies and compatibility before suggesting paths
- **NEW:** Checks that REQUIRES are satisfied by PROVIDES
- **NEW:** Verifies all selected increments are mutually compatible
- **NEW:** Flags incompatible combinations and suggests alternatives
- Combines cross-feature and cross-step increments
- Creates the **Walking Skeleton** (minimal viable combination)
- Designs iterations that improve a single aspect
- **Output**: Slice plan with validated dependencies and compatibility analysis

#### 5. **[doc-generator.md](doc-generator.md)** (ENHANCED v0.2.0)
**Purpose**: Final documentation generation with dependency visibility

- **NEW:** Increments tables show REQUIRES | PROVIDES | COMPATIBLE WITH
- **NEW:** Includes "Dependency Analysis" section
- **NEW:** Shows compatibility maps indicating valid paths
- Generates **Development Plan** (checklist format)
- Creates **Slicing Analysis** (detailed breakdown with dependencies)
- Validates consistency between phases
- **Output**: Implementation-ready documents with full dependency visibility

## 📋 Methodology: 4-Phase Process

### Phase 1: Features Backbone
Create the feature skeleton that represents the user journey:
- Identify all features at higher objective level
- Organize in narrative flow
- Separate CRUD as distinct features

### Phase 2: Hamburger Analysis
**CRITICAL: This is where radical and merciless slicing happens**

For EACH feature:
1. **Identify Steps** (the hamburger layers)
2. **Define Quality Attributes** (what makes this step "good"?)
3. **Breakdown into multiple increments** (5-10 per step using strategies)
4. **Filter and prioritize** (eliminate costly, unnecessary, redundant)

### Phase 3: Compose Vertical Slices
- Select one increment per step (cross-step and cross-feature combination)
- Create **Walking Skeleton**: minimal viable combination
- Each slice must deliver observable value to the user

### Phase 4: Iterate by Adding Increments
- Create new iterations by adding minimal necessary increments
- Improve only ONE aspect while maintaining functionality
- Each iteration must be independently valuable

## 🧰 Breakdown Strategies Toolkit

Key strategies include:

### Fundamentals
- **Start with outputs**: Deliver specific outputs incrementally
- **Zero/One/Many**: Build for zero → one → many cases
- **Dummy to dynamic**: Interface first with hardcoded data, then dynamic

### Simplification
- **Workflow simplification**: Remove optional steps, validations
- **Extract basic utility**: Minimal functionality even sacrificing usability
- **Simplify outputs**: Simple formats before complex ones

### Segmentation
- **User segment narrowing**: Specific user group first
- **Split by capacity**: Limit scope by system capacity
- **Use case isolation**: Most common scenario first

### Advanced
- **Split learning from earning**: Separate research from value delivery
- **SPIDR Pattern**: Spikes, Paths, Interfaces, Data, Rules
- **Coordinating Conjunctions**: Identify "and", "or" to separate stories

[Ver lista completa en increment-generator-specialist.md](increment-generator-specialist.md#breakdown-strategies-toolkit)

## 🎯 Fundamental Principles

Every slice must:
- **Cut through all technical layers** (UI → Logic → Data)
- **Deliver real and observable value** to the user
- **Be independently deployable**
- **Enable early feedback**
- **Answer**: "What would you ship if the deadline was tomorrow?"

## 🚀 Use Cases

### Complete Analysis
Use `vertical-slicer-orchestrator` when you need:
- Comprehensive decomposition of complex features
- Coordination of multiple specialists
- Rigorous validation between phases
- Error handling and refinement

### Quick Planning
Use `vertical-slice-planner` when you need:
- End-to-end planning in a single session
- Medium projects without extreme complexity
- Quick output documents

### Specific Analysis
Use individual agents when you need:
- Refinement of a specific phase
- Deep analysis of a particular area
- Iteration over existing results

## 📤 Output Documents

### 1. Development Plan (Checklist)
```markdown
# Development Plan: [Feature Name]

## Quick Start
**Ship Tomorrow Answer:** [24hr deadline response]

## Walking Skeleton
### Feature: [Name]
- [ ] **Step 1:** Increment X - Description
- [ ] **Step 2:** Increment Y - Description

## Iteration 2: [Enhancement]
### Feature: [Name]
- [ ] **Increment Z:** New capability
```

### 2. Slicing Analysis (Detailed Breakdown)
```markdown
# Slicing Analysis: [Feature Name]

## Feature 1: [Name]
### Step 1: [Name] | Strategy: [Strategy Used]
**Increments:**
- **1.1:** Specific implementation
- **1.2:** Alternative approach
[...]

**Rationale:** Why this strategy for this step
```

## 🔧 Usage with Augmented Coding

These agents are designed to implement Augmented Coding techniques:

1. **Detailed prompts** that guide AI toward high-quality analysis
2. **Active human control** in each phase of the process
3. **Architectural focus** instead of manual implementation
4. **Clear separation** between structure and behavior
5. **Reuse** of systematized expert knowledge

---

**Key principle**: You don't need to build the "best" version first, just the smallest that works.