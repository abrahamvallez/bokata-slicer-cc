# Vertical Slicing Architecture Guide

## Overview

This document explains the architecture of the vertical slicing system, how commands and agents work together, and how to use them effectively.

## Architecture Philosophy

### User Control First
**Key Principle:** All agents provide OPTIONS and SUGGESTIONS, never mandates.

- ✅ Agents suggest Walking Skeletons → You decide if you follow them
- ✅ Agents generate increments → You choose which to implement
- ✅ Agents recommend paths → You select based on your priorities
- ❌ Agents never force specific implementations

### Consistent Output Format
All major workflows generate a markdown document with:
- Complete breakdown (features → steps → increments)
- Suggested Walking Skeleton marked clearly as suggestion
- Multiple implementation options
- Decision guides based on different priorities
- Selection matrices for choosing increments

### Modular & Composable
- Use complete workflows OR individual pieces
- Chain specialist agents together
- Iterate on any phase independently
- No forced dependencies

---

## System Layers

### Layer 1: Commands (User Interface)
Location: `.claude/commands/`

**Purpose:** Entry points for users. Commands are slash commands in Claude Code.

```
/vertical-slice    → Complete project analysis
/quick-slice      → Single feature rapid analysis
/analyze-features → Feature identification only
/analyze-steps    → Step analysis only
/generate-increments → Increment generation only
/compose-slices   → Slice composition only
/generate-docs    → Documentation generation
```

### Layer 2: Coordinator Agents (Orchestration)
Location: `agents/vertical-slicer/`

**Purpose:** Coordinate workflows and manage context between specialists.

#### Vertical Slicer Orchestrator
- For: Multi-feature projects
- Time: ~30-60 minutes
- Output: Comprehensive analysis
- Coordinates all specialist agents sequentially

#### Quick Slicer
- For: Single features (quick decision)
- Time: ~10 minutes
- Output: Concise analysis with 3 options
- Streamlined process, minimal overhead
- Direct execution, no sub-agent coordination

#### Feature Deep Analyzer ⭐ NEW
- For: Single features (thorough understanding)
- Time: ~15-20 minutes
- Output: Comprehensive feature analysis
- Coordinates Step Analyzer + Increment Generator
- Detailed quality attributes and strategies
- 3 implementation paths + custom worksheet

### Layer 3: Specialist Agents (Building Blocks)
Location: `agents/vertical-slicer/`

**Purpose:** Execute specific phases of analysis independently.

```
Feature Backbone Specialist → Identifies features
Step Analyzer Specialist → Decomposes into steps
Increment Generator Specialist → Creates 5-10 increments per step
Slice Composer Specialist → Suggests slice combinations
```

**Key Feature:** Each can be used standalone or coordinated.

### Layer 4: Output Generation
Location: `agents/vertical-slicer/doc-slicer-generator.md`

**Purpose:** Generate consistent, comprehensive markdown documents.

**Improved Features:**
- Executive summary with metrics
- Complete breakdown with all increments
- Suggested Walking Skeleton (clearly marked as suggestion)
- Multiple implementation options
- Decision guides for different priorities
- Increment selection matrix
- Next steps guidance

---

## Decision Tree: Which Command to Use?

### Starting Point: What Are You Analyzing?

```
┌─────────────────────────────────────────┐
│    Complete Project                     │
│    (Multiple features)                  │
│                                         │
│    Use: /vertical-slice                 │
│    Output: Full analysis + docs         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│    Single Feature                       │
│    (One specific functionality)         │
│                                         │
│    Use: /quick-slice                    │
│    Output: Fast analysis + options      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│    Already Have Partial Analysis        │
│    (Want to refine/extend)              │
│                                         │
│    Use: Individual specialist commands  │
│    ├─ /analyze-features                 │
│    ├─ /analyze-steps                    │
│    ├─ /generate-increments              │
│    └─ /compose-slices                   │
└─────────────────────────────────────────┘
```

---

## Common Workflows

### Workflow 1: Complete Project from Scratch

**Best for:** New projects, comprehensive planning

```bash
/vertical-slice

# PROJECT REQUIREMENTS DOCUMENT

## Project Overview
[Your project description]

## Domain Context
[Industry, business area]

## User Requirements
[What users need to accomplish]

## Business Objectives
[Success criteria]

## Technical Constraints
[Tech stack, performance, etc.]
```

**Output:** Complete Vertical Slicing Analysis with:
1. Features backbone
2. Steps breakdown per feature
3. 5-10 increments per step
4. Suggested Walking Skeleton
5. Multiple iteration options
6. Implementation decision guide

**Next Steps:**
1. Review suggested Walking Skeleton
2. Use decision guide to pick path that fits your priorities
3. Mark your choices in increment selection matrix
4. Start implementing chosen increments

---

### Workflow 2: Quick Feature Analysis

**Best for:** Individual features, rapid prototyping

```bash
/quick-slice

Feature: Add product to wishlist
Description: Users can save products for later
Context: E-commerce, React + Node.js, mobile-first
```

**Output:** Quick Slice Analysis with:
1. 3-7 steps identified
2. 5-10 increments per step
3. 3 implementation path options:
   - Option 1: Absolute minimum (ship tomorrow)
   - Option 2: Balanced approach
   - Option 3: Custom (you pick)
4. Ready-to-use checklist

**Next Steps:**
1. Pick one of the 3 suggested paths
2. Or create your own combination
3. Start with first increment
4. Deploy and gather feedback

---

### Workflow 3: Progressive Refinement

**Best for:** Step-by-step building, iterative refinement

```bash
# Phase 1: Identify Features
/analyze-features
[Project description]
→ Get: Features backbone

# Phase 2: Analyze Steps
/analyze-steps
[Features from phase 1]
→ Get: Steps with quality attributes

# Phase 3: Generate Increments
/generate-increments
[Steps from phase 2]
→ Get: 5-10 increments per step

# Phase 4: Compose Slices
/compose-slices
[Increments from phase 3]
→ Get: Walking Skeleton suggestions

# Phase 5: Generate Docs (optional)
/generate-docs
[All outputs from phases 1-4]
→ Get: Comprehensive documentation
```

**Benefits:**
- Full control over each phase
- Can iterate on specific phases
- Easy to refine individual parts

---

### Workflow 4: Targeted Deep-Dive

**Best for:** Refining specific parts of existing analysis

```bash
# Scenario A: Have features, want better steps
/analyze-steps
[Your existing features list]

# Scenario B: Have steps, want more increment options
/generate-increments
[Your existing steps analysis]

# Scenario C: Have increments, want composition guidance
/compose-slices
[Your existing increments list]
```

---

## Output Documents Explained

### Vertical Slicing Analysis Document
Generated by: `/vertical-slice`, `/quick-slice`, `/generate-docs`

**Structure:**
```markdown
# Vertical Slicing Analysis: [Project Name]

## Executive Summary
High-level metrics and overview

## Features Backbone
All features identified, user journey

## Detailed Breakdown
For each feature:
  For each step:
    - Purpose
    - Tech layers covered
    - Increments available (5-10 per step)
    - ⭐ Simplest marked
    - Strategy rationale

## 🎯 Suggested Walking Skeleton
**Clearly marked as suggestion**
- Purpose and ship-tomorrow answer
- Specific increment combination
- Validation criteria
- Rationale

## 🚀 Suggested Iterations
Optional evolution paths

## 📋 Implementation Options
4 different approaches:
1. Follow suggested Walking Skeleton
2. Custom Walking Skeleton
3. Single increment implementation
4. Custom iteration path

## 🧭 Decision Guide
Based on your priority:
- Speed to market → Follow suggestion
- Quality/Polish → Start simple, iterate
- Risk Reduction → Address unknowns first
- Learning/Validation → Ship ASAP for feedback
- Team Coordination → Parallelize increments

## 📊 Increment Selection Matrix
Table for marking your choices

## 📝 Next Steps
Concrete action items
```

---

## Key Differences: Command Comparison

| Aspect | `/vertical-slice` | `/analyze-feature-deep` ⭐ | `/quick-slice` |
|--------|-------------------|----------------------------|----------------|
| **Scope** | Multiple features | Single feature | Single feature |
| **Time** | 30-60 minutes | ~15-20 minutes | ~10 minutes |
| **Coordination** | All specialists | 2 specialists (Steps + Increments) | Direct execution |
| **Documentation** | Comprehensive, formal | Detailed, professional | Concise, actionable |
| **Quality Analysis** | Detailed | Very detailed with tradeoffs | Basic |
| **Strategies** | Documented | Documented with rationale | Applied |
| **Walking Skeleton** | Cross-feature integration | 3 paths + custom worksheet | 3 implementation options |
| **Use Case** | Project planning | Feature deep-dive | Quick decisions |
| **Output Size** | Large | Medium | Compact |
| **Decision Support** | Complete framework | Decision guide + worksheet | Basic guidance |

---

## Implementation Decision Framework

### Step 1: Review Analysis Output
- Read through all identified increments
- Note the ⭐ simplest increments
- Review suggested Walking Skeleton

### Step 2: Identify Your Priority
- **Speed?** → Follow suggested Walking Skeleton exactly
- **Quality?** → Start with Walking Skeleton, add polish in iteration 2
- **Risk?** → Build increments that address biggest unknowns first
- **Learning?** → Ship minimal version ASAP for user feedback
- **Team?** → Choose increments that can be parallelized

### Step 3: Select Increments
Use the Increment Selection Matrix:
1. For each step, pick ONE increment
2. Ensure combination delivers real user value
3. Validate it cuts through UI → Logic → Data layers

### Step 4: Validate Selection
Ask yourself:
- ✅ Can this be deployed independently?
- ✅ Does it deliver observable user value?
- ✅ Can we build it if deadline is tomorrow?
- ✅ Does it enable early feedback?

### Step 5: Implement & Iterate
1. Build selected increments
2. Deploy to users
3. Gather feedback
4. Choose next increments based on learning
5. Repeat

---

## Best Practices

### For Project Planning
1. Start with `/vertical-slice` for complete view
2. Review all generated increments before committing
3. Use decision guide to pick path matching your constraints
4. Share analysis document with team for alignment
5. Revisit and adjust as you learn

### For Feature Development

**Quick Decision (10 min):**
1. Use `/quick-slice` for rapid feature breakdown
2. Pick the "ship tomorrow" option first
3. Actually deploy and get user feedback
4. Use feedback to guide next increment selection
5. Iterate based on real usage

**Deep Understanding (15-20 min):**
1. Use `/analyze-feature-deep` for comprehensive analysis
2. Review quality attributes and tradeoffs
3. Use decision guide to select appropriate path
4. Leverage selection worksheet for custom combinations
5. Understand strategies for future similar features

### For Team Collaboration
1. Generate analysis document early
2. Share increment selection matrix with team
3. Let team pick increments based on skills/capacity
4. Use increments as sprint planning input
5. Track which increments are implemented

### For Risk Management
1. Identify highest-risk/unknown areas in requirements
2. Generate increments for those areas first
3. Build "spike" increments (learning-focused)
4. Validate assumptions before building "earning" increments
5. Adjust plan based on discoveries

---

## Extending the System

### Adding New Breakdown Strategies
Location: `agents/vertical-slicer/increment-generator-specialist.md`

Add new strategy to the Breakdown Strategies Toolkit section.

### Creating Custom Coordinators
Pattern: See `quick-slicer.md` as example

1. Define clear scope and use case
2. Specify expected input format
3. Coordinate specialist agents as needed
4. Define consistent output structure
5. Add corresponding command in `.claude/commands/`

### Adding New Specialist Agents
Pattern: Follow existing specialist structure

1. Define role and task clearly
2. Specify input requirements (multiple formats)
3. Define workflow/process
4. Specify output structure
5. Add quality criteria
6. Document when to use vs alternatives

---

## Troubleshooting

### "Analysis is too shallow"
→ Use `/analyze-feature-deep` instead of `/quick-slice` (adds quality analysis and strategies)
→ Use `/vertical-slice` if analyzing complete project
→ Or use `/generate-increments` for deeper increment breakdown of specific steps

### "Too many increments, overwhelming"
→ Focus only on ⭐ simplest increments first
→ Use decision guide to filter based on priority
→ Remember: you don't have to implement all increments

### "Walking Skeleton suggestion doesn't fit my needs"
→ That's OK! It's a suggestion, not a requirement
→ Use increment selection matrix to create custom combination
→ Refer to decision guide for alternatives

### "Feature is too large/complex"
→ Try `/analyze-feature-deep` first (handles medium-complex features)
→ If still too large, use `/analyze-features` to break into sub-features
→ Then use `/quick-slice` or `/analyze-feature-deep` on each
→ Or use `/vertical-slice` for complete multi-feature analysis

### "Need more options for specific step"
→ Use `/generate-increments` with just that step
→ Ask for specific strategies to be applied
→ Iterate until you have enough options

---

## Version History

- **v2.1** (Current): Added feature-deep-analyzer, optimized all agents, enhanced consistency
- **v2.0**: Added quick-slicer, improved doc-generator, enhanced user control
- **v1.0**: Initial release with orchestrator and specialist agents

---

## License

GPL-3.0 - See [LICENSE](LICENSE) file for details.
