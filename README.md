# Bokata Slicer CC

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![npm version](https://img.shields.io/npm/v/bokata-slicer-cc.svg)](https://www.npmjs.com/package/bokata-slicer-cc)

**Intelligent vertical slicing and feature decomposition for Claude Code** using the **Hamburger Method** and radical vertical slicing techniques.

## 🚀 Quick Start

### Installation

**Option 1: NPM (Node.js projects)**
```bash
npm install -D bokata-slicer-cc
npx bokata-slicer-cc install
```

**Option 2: Claude Code Plugin (any project)**
```
/plugin marketplace add abrahamvallez/bokata-slicer-cc
/plugin install bokata-slicer-cc
```

**Option 3: Global**
```bash
npm install -g bokata-slicer-cc
cd your-project
bokata-slicer-cc install
```

### Usage

Bokata v0.3.0 provides **three complementary commands** for different analysis needs:

**1. Project Analysis (multiple features):**
```
/bokata Project: E-commerce platform with catalog, cart, checkout, and orders
/bokata ./docs/project-requirements.md  # Can also read from file
```

**2. Single Feature Analysis:**
```
/bokata-feature Feature: Coach Records Audio
/bokata-feature ./docs/feature-spec.md  # Can also read from file
```

**3. Implementation Strategies (optional, after running /bokata or /bokata-feature):**
```
/bokata-iterations-paths  # Generates 3-5 implementation path options
```

**4. Selection Matrix (optional, after running /bokata or /bokata-feature):**
```
/bokata-matrix  # Generates complete increment matrix with dependencies
```

**Output:** Markdown documents in `./docs/slicing-analysis/`

### Recommended Workflow

1. **Start with project or feature analysis:**
   - Use `/bokata` for projects with multiple features
   - Use `/bokata-feature` for a single feature

2. **Optionally generate implementation strategies:**
   - Run `/bokata-iterations-paths` to see 3-5 different implementation approaches

3. **Optionally generate selection matrix:**
   - Run `/bokata-matrix` for complete dependency reference and custom path building

---

## 📖 What is Bokata Slicer CC?

Bokata Slicer CC automatically analyzes features or projects and generates:

**Core Analysis (/bokata or /bokata-feature):**
- ✅ **Executive Summary** - Quick stats and metrics
- ✅ **Feature Breakdown** - Complete steps and increments with dependencies
- ✅ **Walking Skeleton** - The absolute minimum implementation
- ✅ **Dependency Analysis** - What each increment requires and provides

**Optional Analysis (separate commands):**
- ✅ **Implementation Paths** (/bokata-iterations-paths) - 3-5 strategic options
- ✅ **Selection Matrix** (/bokata-matrix) - Complete increment catalog with dependencies

### No Estimations in Core Documents

**Important:** Core analysis documents (from `/bokata` and `/bokata-feature`) contain **NO effort/value/risk scores**. This is intentional:

- **Core documents focus on dependencies and compatibility** - What each increment needs and provides
- **Use `/bokata-iterations-paths`** for estimated timelines and implementation strategies
- **Use `/bokata-matrix`** for complete dependency reference and custom path building

This separation ensures core analysis remains clean and focused on deliverables, while strategic planning happens in dedicated commands.

### Feature Naming Convention

All features must follow the **Actor + Action** format for clarity and consistency:

**Format:** `[Actor] [Action]`

**Valid Actors:** User, Player, Coach, Admin, System, Customer, Manager, etc.

**Examples:**
- ✅ Good: "Coach Records Audio"
- ✅ Good: "User Resets Password"
- ✅ Good: "Admin Manages Users"
- ❌ Bad: "Audio Recording" (missing actor)
- ❌ Bad: "Password Reset Feature" (not actor-focused)
- ❌ Bad: "System for User Authentication" (too verbose)

This convention is **enforced by all commands** to maintain clarity throughout the analysis.

### Based on Augmented Coding Principles

As Kent Beck explains in ["Augmented Coding: Beyond the Vibes"](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes), this approach:

- **Prioritizes code quality** over simple system behavior
- **Maintains human control** while leveraging AI speed
- **Reduces "yak shaving"** (tedious setup work)
- **Enables more strategic programming decisions** per hour
- **Transforms programmers** into strategic architects

---

## 🎯 How It Works

### Three Complementary Commands

Bokata v0.3.0 provides specialized commands for different analysis needs:

**1. `/bokata` - Project Analysis**
- Analyzes projects with multiple features
- Generates cross-feature Walking Skeleton
- Provides feature breakdown and dependencies
- No effort/value/risk scoring (dependencies only)

**2. `/bokata-feature` - Single Feature Analysis**
- Focused analysis of a single feature
- Generates feature-specific Walking Skeleton
- Detailed step and increment breakdown
- No effort/value/risk scoring (dependencies only)

**3. `/bokata-iterations-paths` - Implementation Strategies**
- Generates 3-5 implementation path options
- Includes estimated timelines
- Strategic recommendations based on priorities
- Run after `/bokata` or `/bokata-feature`

**4. `/bokata-matrix` - Selection Matrix**
- Complete increment catalog with dependencies
- Enables custom path building
- Detailed dependency reference
- Run after `/bokata` or `/bokata-feature`

### Analysis Workflow

**Step 1: Core Analysis (/bokata or /bokata-feature)**
1. **Feature Breakdown** - Identifies all features in user journey
2. **Steps Analysis** - Decomposes into UI → Logic → Data steps
3. **Increments Generation** - Creates 5-10 deployable increments per step
4. **Walking Skeleton** - Suggests absolute minimum implementation
5. **Dependency Analysis** - What each increment requires and provides

**Step 2: Optional Strategies (/bokata-iterations-paths)**
6. **Implementation Paths** - 3-5 options based on priorities
7. **Decision Framework** - How to choose the right path
8. **Timeline Estimates** - Realistic delivery expectations

**Step 3: Optional Matrix (/bokata-matrix)**
9. **Selection Matrix** - Complete increment catalog
10. **Dependency Reference** - Detailed compatibility information
11. **Custom Path Building** - Mix and match increments

### Example Output Structure

**Core Analysis Output (/bokata or /bokata-feature):**
```markdown
# Feature Name - Vertical Slicing Analysis

## 1. Executive Summary
[Quick stats and metrics - NO ESTIMATES]

## 2. Feature Breakdown
[Complete steps and increments with dependencies]

## 3. Walking Skeleton
[Minimum implementation with dependency rationale]

## 4. Dependency Analysis
[What each increment REQUIRES and PROVIDES]
```

**Implementation Paths Output (/bokata-iterations-paths):**
```markdown
# Feature Name - Implementation Paths

## 1. Speed to Market (2-4 days)
[Fast path with timeline]

## 2. Balanced Approach (5-8 days)
[Balanced path with timeline]

## 3. Quality First (10-15 days)
[Quality path with timeline]

## 4. Decision Guide
[How to choose based on priorities]
```

**Selection Matrix Output (/bokata-matrix):**
```markdown
# Feature Name - Selection Matrix

## Complete Increment Catalog
[All increments with dependency details]

## Compatibility Maps
[Which increments work together]

## Custom Path Building Guide
[How to build your own path]
```

---

## 🔗 Dependency and Compatibility System (NEW in v0.2.0)

Every increment now explicitly specifies its dependencies and compatibility:

### How It Works

**Each increment defines:**
```
REQUIRES:       What external dependencies it needs (or "None" for zero-dependency paths)
PROVIDES:       Capabilities it offers to other steps
COMPATIBLE WITH: Which increments from other steps it works with
```

### What This Enables

✅ **Guaranteed Deployable Paths** - Walking Skeleton is always a valid, complete E2E flow
✅ **Coordinated Increments** - All selected increments work together seamlessly
✅ **Multiple Valid Options** - Several implementation paths automatically identified
✅ **Transparent Dependencies** - Clear visibility of what each increment needs
✅ **Automatic Validation** - Incompatible combinations are detected and flagged

### Example

```markdown
Step 1: UI Form
| Increment | Requires | Provides | Compatible With |
|-----------|----------|----------|-----------------|
| 1.1 Form (client) | None | User input | 2.1, 3.1 |
| 1.2 Form (API) | POST /api/save | HTTP request | 2.2, 2.3 |

Step 2: Backend
| Increment | Requires | Provides | Compatible With |
|-----------|----------|----------|-----------------|
| 2.1 None | None | Nothing | 1.1, 3.1 |
| 2.2 API endpoint | Database | POST /api/save | 1.2, 3.2 |

Step 3: Storage
| Increment | Requires | Provides | Compatible With |
|-----------|----------|----------|-----------------|
| 3.1 localStorage | None | Persistence | 1.1, 2.1 |
| 3.2 Supabase | Backend ready | Database | 1.2, 2.2 |

✅ Valid Paths:
- 1.1 + 2.1 + 3.1 (all client-side, zero dependencies)
- 1.2 + 2.2 + 3.2 (API + database, coordinated)
```

---

## 💡 Key Features

### Specialized Commands for Different Needs
- **`/bokata`** for multi-feature projects
- **`/bokata-feature`** for single feature analysis
- **`/bokata-iterations-paths`** for strategic planning
- **`/bokata-matrix`** for custom path building
- Each command focused on specific analysis type

### Walking Skeleton Composition
- Selects simplest increments across all steps
- **Guarantees compatibility** - all selected increments work together
- Validates that Walking Skeleton is deployable with zero external dependencies
- Answers: "What would we ship if deadline was tomorrow?"

### Dependency and Compatibility Validation
- **Automatic detection** of incompatible increment combinations
- **Clear mapping** of what each increment requires and provides
- **Multiple valid paths** automatically identified and coordinated
- **Transparent dependency analysis** in generated documents
- **Central to core analysis** - no effort/value/risk distractions

### Multiple Implementation Paths (Optional)
- **Speed:** Fastest to next deployment
- **Balanced:** Speed + quality mix
- **Quality:** Polished experience
- **Feature-by-Feature:** Complete one feature at a time (projects)
- **Cross-Feature:** Improve one aspect across all features (projects)
- **All paths use compatible increments** across features
- **Generated by `/bokata-iterations-paths`** command

### Decision Support (Optional)
- Priority-based recommendations
- Pros/cons for each path
- Real-world scenarios
- Red flags and anti-patterns
- **Generated by `/bokata-iterations-paths`** command

### Custom Path Building (Optional)
- Selection matrix with all increments
- **Dependency information** for each increment
- **Compatibility constraints** clearly shown
- Sprint planning guidance
- **Generated by `/bokata-matrix`** command

### Professional Documentation
- Markdown format with dependency tables
- **Includes dependency analysis section**
- Shareable with team
- Ready for implementation
- Version controlled
- Clean separation between core analysis and strategic planning

---

## 📚 Documentation

- **[INSTALL.md](INSTALL.md)** - Complete installation guide
- **[CLAUDE.md](CLAUDE.md)** - Full usage guide and command reference
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development and contribution guide
- **[Agents Documentation](agents/bokata-slicer/)** - Technical details

---

## 🏗️ Architecture

### Commands
- **`/bokata`** - Project analysis (multiple features)
- **`/bokata-feature`** - Single feature analysis
- **`/bokata-iterations-paths`** - Implementation strategies
- **`/bokata-matrix`** - Selection matrix and dependencies

### Coordinator Agents
- **project-analyzer** - Multi-feature projects
- **feature-analyzer** - Single feature analysis
- **iteration-planner** - Implementation paths
- **matrix-generator** - Selection matrix

### Specialist Agents
- **feature-backbone-specialist** - Feature identification
- **step-analyzer-specialist** - Steps decomposition
- **increment-generator-specialist** - Increments generation
- **path-composer-specialist** - Walking Skeleton composition
- **doc-generator** - Documentation generation

---

## 🎓 Methodology

### Hamburger Method

Every slice must:
- ✅ Answer: **"What would we ship if the deadline was tomorrow?"**
- ✅ Cut through all technical layers (UI → Logic → Data)
- ✅ Deliver real, observable value to the user
- ✅ Build the smallest that works, not the "best" version first
- ✅ Can be deployed independently
- ✅ Enable early feedback

### Breakdown Strategies

20+ strategies including:
- Start with outputs - Begin with visible results
- Zero/One/Many progression - Hardcode → single → multiple
- Dummy to dynamic - Static → configurable → dynamic
- Workflow simplification - Skip optional steps
- User segment narrowing - Target specific user type
- Capacity-based splitting - Limit initial capacity
- Extract basic utility - Core functionality only
- Defer edge cases - Handle happy path first
- Manual before automated - Automation comes later
- And more...

**Note:** These strategies are applied during increment generation in core analysis. Timeline estimates are only provided in the `/bokata-iterations-paths` output.

---

## 📊 Example Usage

### Example 1: Simple Feature Analysis

**Input:**
```
/bokata-feature Feature: User Exports Data to CSV
```

**Core Analysis Output:**
- 3 steps identified
- 18 increments generated
- Walking Skeleton: 3 increments (dependencies specified)
- Output: `user-exports-data-2025-10-28.md`
- No timeline estimates (dependencies only)

**Optional Follow-up:**
```
/bokata-iterations-paths  # Get 3 implementation paths with timelines
/bokata-matrix           # Get complete selection matrix
```

### Example 2: Complex Feature Analysis

**Input:**
```
/bokata-feature Feature: Coach Records Audio

Context: Mobile app, first time using audio APIs
Priorities: Speed to market, need validation
```

**Core Analysis Output:**
- 6 steps identified
- 42 increments generated
- Walking Skeleton: 6 increments (all compatible, zero external dependencies)
- Output: `coach-records-audio-2025-10-28.md`
- Dependency analysis included

**Optional Follow-up:**
```
/bokata-iterations-paths  # Get 3 paths: Speed, Balanced, Quality (with timelines)
/bokata-matrix           # Get full increment catalog with dependencies
```

### Example 3: Full Project Analysis

**Input:**
```
/bokata Project: Task management app for remote teams

Features:
- User Creates Projects
- User Adds Tasks
- User Tracks Progress
- Team Collaborates

Tech: React + Node.js
```

**Core Analysis Output:**
- 4 features identified (using Actor+Action format)
- 16 steps across features
- 96 total increments
- Walking Skeleton: 4 increments (cross-feature compatible)
- Output: `task-management-app-2025-10-28.md`
- Complete dependency analysis

**Optional Follow-up:**
```
/bokata-iterations-paths  # Get 5 paths including Feature-by-Feature and Cross-Feature
/bokata-matrix           # Get complete project matrix
```

### Example 4: File Input

**Input:**
```
/bokata ./docs/project-requirements.md
/bokata-feature ./docs/feature-spec.md
```

**Benefits:**
- Parse existing PRDs and specifications
- Maintain documentation in version control
- Consistent analysis from documented requirements

---

## 🤝 Contributing

We welcome contributions! This project is licensed under GPL-3.0, which means:

- ✅ You can use, modify and distribute freely
- ✅ You must maintain the same license in derivative works
- ✅ You must include the original copyright notice
- ✅ Any improvements benefit the entire community

To contribute:

1. Fork the repository
2. Create a branch for your feature
3. Follow existing structure and documentation
4. Submit a Pull Request with detailed description

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

```
Copyright (C) 2025 Abraham Vallez

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
```

---

## 📚 Additional Resources

- [Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes) - Kent Beck
- [INSTALL.md](INSTALL.md) - Installation guide
- [CLAUDE.md](CLAUDE.md) - Full command reference
- [Agents documentation](agents/bokata-slicer/) - Technical details

---

## 💬 Support

- **Issues:** [Report bugs or request features](https://github.com/abrahamvallez/bokata-slicer-cc/issues)
- **Discussions:** [Ask questions or share ideas](https://github.com/abrahamvallez/bokata-slicer-cc/discussions)

---

## 🌟 Show Your Support

If Bokata Slicer CC helps your team, consider:
- ⭐ Starring this repository
- 🐛 Reporting issues
- 🤝 Contributing improvements
- 📢 Sharing with your network

---

**Built with ❤️ using Augmented Coding principles**

Happy slicing! 🍔⚡