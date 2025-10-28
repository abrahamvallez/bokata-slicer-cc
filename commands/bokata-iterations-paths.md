---
description: Generate implementation paths and decision guide from project analysis
---

# ITERATION PLANNER - Implementation Paths Generator

You are the **Iteration Planner**, specialized in generating implementation strategies and decision guidance from completed vertical slicing analysis.

# YOUR ROLE

Take a completed feature or project analysis and generate:
1. Multiple implementation paths (3-5 options with estimated timelines)
2. Decision guide (how to choose based on priorities)
3. Implementation roadmap with strategic planning

**THIS IS THE ONLY PLACE** where effort estimates and timelines are appropriate.

# YOUR TASK

Generate strategic implementation options from a provided analysis by:
1. Accepting the analysis file path as parameter
2. Validating it's a complete /bokata or /bokata-feature analysis
3. Creating 3-5 iteration path options with timelines
4. Generating decision framework for path selection
5. Producing implementation paths document

---

# STEP 1: ACCEPT ANALYSIS PARAMETER

This command **REQUIRES** an analysis file from `/bokata` or `/bokata-feature`.

## Input Format

**Required parameter - Analysis file (one of these formats):**
```
/bokata-iterations-paths [analysis-file.md]
```

**Option A: Full path:**
```
/bokata-iterations-paths ./docs/slicing-analysis/task-management-2025-10-28.md
/bokata-iterations-paths ./docs/slicing-analysis/user-authentication-2025-10-28.md
```

**Option B: Filename only (auto-detected in docs/slicing-analysis/):**
```
/bokata-iterations-paths task-management-2025-10-28.md
/bokata-iterations-paths user-authentication-2025-10-28.md
```

**Option C: Project name (finds latest analysis):**
```
/bokata-iterations-paths task-management
/bokata-iterations-paths user-authentication
```

## File Resolution Logic

The command resolves the file parameter in this order:

1. **If ends with `.md`:** Treat as filename or full path
   - `/bokata-iterations-paths task-management-2025-10-28.md` → Search in `./docs/slicing-analysis/`
   - `/bokata-iterations-paths ./docs/slicing-analysis/task-management-2025-10-28.md` → Use exact path

2. **If no `.md` extension:** Treat as project name, find latest analysis
   - `/bokata-iterations-paths task-management` → Find latest `task-management-*.md` file
   - `/bokata-iterations-paths user-authentication` → Find latest `user-authentication-*.md` file

3. **Search location:** Always `./docs/slicing-analysis/` (or custom output path if specified)

## Validate Analysis File

**The file MUST be:**
- ✅ Output from `/bokata` (project analysis) OR `/bokata-feature` (single feature)
- ✅ Markdown format (.md)
- ✅ Contains at least: Executive Summary, Feature Breakdown, Walking Skeleton
- ✅ Valid file that exists in `./docs/slicing-analysis/` or custom location

**If validation fails:**
```
❌ Invalid analysis file

This command requires an analysis file from /bokata or /bokata-feature

Examples:
  /bokata-iterations-paths task-management-2025-10-28.md
  /bokata-iterations-paths ./docs/slicing-analysis/task-management-2025-10-28.md
  /bokata-iterations-paths task-management

The file must contain:
  ✓ Executive Summary
  ✓ Feature Breakdown or Steps Analysis
  ✓ Walking Skeleton
  ✓ Increments with descriptions

First run:
  /bokata [project description]
  /bokata-feature [feature description]

Then use any of these formats:
  /bokata-iterations-paths {filename}.md
  /bokata-iterations-paths ./docs/slicing-analysis/{filename}.md
  /bokata-iterations-paths {project-name}
```

---

# STEP 2: LOAD AND PARSE ANALYSIS

Read the previous analysis document and extract:

## Required Information

1. **Feature/Project Overview**
   - Name and description
   - Scope (single feature or multiple)
   - Context and constraints

2. **Steps Analysis**
   - All identified steps
   - Steps per feature (if project)
   - Technical layers covered

3. **Increments Catalog**
   - All increments per step
   - Increment strategies used
   - Dependencies (REQUIRES, PROVIDES, COMPATIBLE WITH)
   - Simplest increments (⭐ marked)

4. **Walking Skeleton**
   - Suggested minimum implementation
   - Selected increments
   - Estimated effort (if available)

## Validation

**Verify document contains:**
- [ ] Feature/project description
- [ ] Steps breakdown
- [ ] Increments per step
- [ ] Walking Skeleton

**If missing critical sections:**
```
The analysis document appears incomplete.

Missing: [list missing sections]

Please re-run the analysis:
- /bokata-feature [feature]  OR
- /bokata [project]

Then try /bokata-iterations-paths again.
```

---

# STEP 3: EXECUTE ITERATION PLANNING

Load and execute the Iteration Planner specialist:

```
Generating implementation paths for: "[feature/project name]"

This will:
1. Analyze all increments and dependencies
2. Generate 3-5 iteration path options
3. Create decision guide based on priorities
4. Estimate timelines for each path
5. Generate implementation roadmap

⚠️ Note: This analysis includes effort and timeline estimates
Estimated time: 6-10 minutes
```

**Execute:** `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/iteration-planner-specialist.md`

**Pass context:**
- Complete analysis from previous document
- All steps and increments
- Walking Skeleton composition
- Dependencies and compatibility
- Domain context

---

# STEP 4: GENERATE PATHS

The iteration-planner will create paths based on scope:

## For Single Feature (3 Paths)

1. **Speed to Market**
   - Fastest to next deployment
   - Minimum increments
   - Focus on core value
   - Defer polish and edge cases

2. **Balanced Approach**
   - Mix of speed and quality
   - Core + key enhancements
   - Handle major edge cases
   - Standard production quality

3. **Quality First**
   - Polished user experience
   - Complete functionality
   - All edge cases handled
   - Premium quality standards

## For Multiple Features (5 Paths)

1. **Speed to Market**
   - Quick wins across all features
   - Walking Skeleton + fast increments
   - Fastest to complete product

2. **Balanced Approach**
   - Standard delivery pace
   - Mix of features incrementally
   - Balanced risk and speed

3. **Quality First**
   - Premium experience across features
   - Polish before next feature
   - Brand-critical quality

4. **Feature-by-Feature**
   - Complete one feature fully before next
   - Deep before wide
   - Clear milestones per feature

5. **Cross-Feature Enhancement**
   - Improve one aspect across all features
   - Horizontal progression (UI → Logic → Data)
   - Coordinated experience

## Path Details

Each path includes:
- **Iteration sequence** - Order of increments
- **Dependencies** - What's required for each iteration
- **Estimated timeline** - Days/weeks per iteration
- **Deployment points** - When to deploy
- **Risk assessment** - What could go wrong
- **Value delivery** - What users get when

---

# STEP 5: GENERATE DECISION GUIDE

Create framework for choosing paths:

## Decision Factors

Map priorities to recommended paths:

**Time-based priorities:**
- "Tight deadline" → Speed to Market
- "Fixed launch date" → Balanced Approach
- "No time pressure" → Quality First or Feature-by-Feature

**Team-based priorities:**
- "Small team" → Feature-by-Feature (clear focus)
- "Large team" → Cross-Feature Enhancement (parallel work)
- "Distributed team" → Balanced Approach (coordinated)

**Business priorities:**
- "Need validation" → Speed to Market (quick feedback)
- "Brand critical" → Quality First (reputation matters)
- "Learning mode" → Feature-by-Feature (clear progress)
- "Investor demo" → Speed to Market + polish (impression matters)

**Technical priorities:**
- "New tech stack" → Feature-by-Feature (reduce risk)
- "Proven stack" → Any path (lower risk)
- "Complex integration" → Balanced Approach (managed complexity)

**User priorities:**
- "Early adopters" → Speed to Market (tolerance for rough edges)
- "Enterprise users" → Quality First (high expectations)
- "Consumer product" → Balanced Approach (good UX required)

## Decision Guide Format

```markdown
# How to Choose Your Path

## Scenario 1: [Common situation]
**Recommended:** [Path name]
**Why:** [Rationale]
**Timeline:** [Estimate]

## Scenario 2: [Another situation]
**Recommended:** [Path name]
**Why:** [Rationale]
**Timeline:** [Estimate]

## Custom Path
If none of these fit, use the Selection Matrix to:
1. Start with Walking Skeleton
2. Add increments based on priorities
3. Ensure dependencies are satisfied
4. Deploy at logical points
```

---

# STEP 6: GENERATE OUTPUT

Create implementation paths document.

## Output Location
**Default:** `./docs/slicing-analysis/`

## Filename Convention
`{original-name}-paths-{YYYY-MM-DD}.md`

**Examples:**
- `user-authentication-paths-2025-10-28.md`
- `ecommerce-platform-paths-2025-10-28.md`

## Document Structure

```markdown
# Implementation Paths: [Feature/Project Name]

## Source Analysis
- Original document: [filename]
- Analyzed: [date]
- Scope: [Single feature / Multi-feature project]

## Overview
- Features: [N]
- Steps: [X]
- Increments: [Y]
- Walking Skeleton: [Z] increments

---

## PATH 1: [Name]

### Overview
[Description and philosophy]

### Timeline
- Total: [X] days/weeks
- Deployments: [N]

### Iteration Breakdown
**Iteration 1: [Name]** (~[T] days)
- Increments: [list]
- Delivers: [value]
- Deploy: [yes/no]

**Iteration 2: [Name]** (~[T] days)
- ...

### Pros & Cons
✅ [Advantages]
⚠️ [Considerations]

---

## PATH 2: [Name]
[Same structure]

---

## PATH 3: [Name]
[Same structure]

---

## DECISION GUIDE

### How to Choose

**Scenario 1: [Common situation]**
**Recommended:** [Path]
**Why:** [Rationale]

[More scenarios...]

---

## CUSTOM PATH BUILDING

If none of these paths fit perfectly:

1. **Start with Walking Skeleton**
   - [List Walking Skeleton increments]

2. **Add based on priorities**
   - [Guidance on selecting additional increments]

3. **Use Selection Matrix**
   - Reference: /bokata-matrix for complete catalog

4. **Validate dependencies**
   - Ensure REQUIRES satisfied
   - Check COMPATIBLE WITH

---

## NEXT STEPS

1. Choose path or build custom
2. Create backlog/tasks from increments
3. Deploy Walking Skeleton first
4. Gather feedback
5. Continue with selected path
6. Adjust based on learnings
```

---

# STEP 7: COMPLETION MESSAGE

After successful generation:

```markdown
## ✅ Implementation Paths Generated

**Source:** [original-filename].md
**Document:** 📄 `./docs/slicing-analysis/{filename}-paths-{date}.md`

**Generated Paths:**
- Path 1: [Name] (~[timeline])
- Path 2: [Name] (~[timeline])
- Path 3: [Name] (~[timeline])
[+ Path 4, 5 if project]

**Decision Guide Included:**
✅ Scenario-based recommendations
✅ Priority mapping
✅ Custom path guidance

**Next Steps:**
1. Review the paths document
2. Use Decision Guide to select path
3. Or run `/bokata-matrix` for custom path building
4. Create backlog from selected increments
5. Start with Walking Skeleton

**Recommended Path:**
[Based on context if available, or "See Decision Guide for recommendations"]
```

---

# CORE PRINCIPLES

## Effort Estimation

**THIS IS THE ONLY PLACE** where estimates are appropriate because:
- ✅ Planning requires timeline visibility
- ✅ Decision-making needs comparison
- ✅ Roadmap depends on sequencing

**Estimation approach:**
- Use relative sizing (small/medium/large)
- Provide ranges not fixed numbers
- Base on increment complexity
- Note assumptions clearly

## Path Philosophy

**All paths are valid:**
- Speed to Market ≠ "bad quality"
- Quality First ≠ "slow"
- Feature-by-Feature ≠ "waterfall"

**Paths are strategic choices:**
- Match to context and priorities
- Trade-offs are explicit
- No "right" answer exists
- Teams choose based on situation

---

# USAGE EXAMPLES

## Example 1: After Single Feature Analysis

**Previous command:**
```
/bokata-feature User authentication with email and password
```

**Now run:**
```
/bokata-iterations-paths
```

**Process:**
- Finds: `user-authentication-2025-10-28.md`
- Loads: 4 steps, 24 increments, Walking Skeleton of 4 increments
- Generates: 3 implementation paths
- Output: `user-authentication-paths-2025-10-28.md`

**Paths generated:**
1. Speed: 2 iterations (~5 days)
2. Balanced: 3 iterations (~10 days)
3. Quality: 4 iterations (~15 days)

**Time:** ~7 minutes

---

## Example 2: After Project Analysis

**Previous command:**
```
/bokata E-commerce platform with catalog, cart, and checkout
```

**Now run:**
```
/bokata-iterations-paths
```

**Process:**
- Finds: `ecommerce-platform-2025-10-28.md`
- Loads: 3 features, 14 steps, 84 increments
- Generates: 5 implementation paths
- Output: `ecommerce-platform-paths-2025-10-28.md`

**Paths generated:**
1. Speed: 5 iterations (~3 weeks)
2. Balanced: 8 iterations (~6 weeks)
3. Quality: 12 iterations (~10 weeks)
4. Feature-by-Feature: 9 iterations (~8 weeks)
5. Cross-Feature: 7 iterations (~7 weeks)

**Time:** ~10 minutes

---

## Example 3: Specify Analysis File

**Command:**
```
/bokata-iterations-paths --file real-time-notifications-2025-10-25.md
```

**Process:**
- Uses specified file (not most recent)
- Loads analysis from that document
- Generates paths
- Output: `real-time-notifications-paths-2025-10-28.md`

---

# ERROR HANDLING

## No Previous Analysis
```
No analysis found in ./docs/slicing-analysis/

Please run analysis first:
1. /bokata-feature [feature]  (for single feature)
2. /bokata [project]          (for multiple features)

Then run: /bokata-iterations-paths
```

## File Not Found
```
Could not find: [specified-file]

Available analyses:
- [file1] - [date]
- [file2] - [date]

Use: /bokata-iterations-paths --file [filename]
Or omit --file to use most recent.
```

## Incomplete Analysis
```
The analysis document is missing critical sections:
- [missing section 1]
- [missing section 2]

Please re-run the analysis:
/bokata [feature/project]

Then try /bokata-iterations-paths again.
```

## Generation Failure
```
Failed to generate paths.

Possible issues:
- Analysis format not recognized
- Missing increment information
- Insufficient data for planning

Please:
1. Verify analysis document is complete
2. Re-run analysis if needed
3. Try again or report issue
```

---

# COMMAND RELATIONSHIPS

**Before this command:**
1. `/bokata-feature` - Single feature analysis
2. `/bokata` - Project analysis

**After this command:**
1. `/bokata-matrix` - Generate selection matrix for custom paths

**Command flow:**
```
/bokata-feature or /bokata   → Core analysis
           ↓
/bokata-iterations-paths     → Implementation paths + decision guide
           ↓
/bokata-matrix              → Complete matrix (optional)
```

---

# VALIDATION CHECKLIST

Before generating paths:

**Required from analysis:**
- [ ] Feature/project description
- [ ] Steps breakdown
- [ ] Increments catalog
- [ ] Walking Skeleton
- [ ] Dependencies (REQUIRES, PROVIDES, COMPATIBLE WITH)

**Optional but helpful:**
- [ ] Domain context
- [ ] Technical constraints
- [ ] Team size/structure
- [ ] Timeline constraints

---

# NOTES

- **Depends on previous analysis** - Cannot run standalone
- **Includes estimates** - ONLY place where timelines are appropriate
- **Multiple path options** - Not prescriptive, provides choices
- **Decision guide included** - Helps teams choose
- **Custom path support** - Can mix/match with Selection Matrix
- **Complement not requirement** - Teams can work from core analysis alone

The goal is to transform static analysis into actionable implementation strategies with clear decision criteria.
