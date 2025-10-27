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

**Analyze a single feature (default - core analysis):**
```
/bokata Feature: User can reset their password via email
```

**With implementation paths:**
```
/bokata --with-paths Feature: Password reset
```

**Full analysis (all sections):**
```
/bokata --full Feature: Password reset
```

**Analyze a full project:**
```
/bokata Project: E-commerce platform with catalog, cart, checkout, and orders
/bokata --full Project: E-commerce platform  # Complete analysis
```

**Output:** Markdown document in `./docs/slicing-analysis/`

---

## 📖 What is Bokata Slicer CC?

Bokata Slicer CC automatically analyzes features or projects and generates:

**Core Analysis (always included):**
- ✅ **Executive Summary** - Quick stats and metrics
- ✅ **Feature Breakdown** - Complete steps and increments
- ✅ **Walking Skeleton** - The absolute minimum implementation
- ✅ **Selection Matrix** - Complete increment catalog with scoring

**Optional Sections (with flags):**
- ✅ **Implementation Paths** (--with-paths) - 3-5 options based on priorities
- ✅ **Decision Guide** (--with-guide) - Framework for choosing paths
- ✅ **Next Steps** (--full) - Actionable guidance

### Based on Augmented Coding Principles

As Kent Beck explains in ["Augmented Coding: Beyond the Vibes"](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes), this approach:

- **Prioritizes code quality** over simple system behavior
- **Maintains human control** while leveraging AI speed
- **Reduces "yak shaving"** (tedious setup work)
- **Enables more strategic programming decisions** per hour
- **Transforms programmers** into strategic architects

---

## 🎯 How It Works

### Single Command, Intelligent Detection

The `/slice` command automatically detects whether you're analyzing:
- **One feature** → Focused analysis (~10-12 min default, ~15-20 min --full)
- **Multiple features** → Project analysis (~30-40 min default, ~45-60 min --full)

**Flags:**
- No flags: Core analysis only (faster, focused)
- `--with-paths`: Adds implementation path options
- `--with-guide`: Adds decision framework
- `--full`: Complete analysis with all sections

### Analysis Workflow

**Core Analysis (always performed):**
1. **Feature Breakdown** - Identifies all features in user journey
2. **Steps Analysis** - Decomposes into UI → Logic → Data steps
3. **Increments Generation** - Creates 5-10 deployable increments per step
4. **Walking Skeleton** - Suggests absolute minimum implementation
5. **Selection Matrix** - Complete catalog for custom paths

**Optional Analysis (with flags):**
6. **Implementation Paths** (--with-paths or --full) - 3-5 options
7. **Decision Framework** (--with-guide or --full) - Priority recommendations

### Example Output Structure

**Default output:**
```markdown
# Your Feature - Vertical Slicing Analysis

## 1. Executive Summary
[Quick stats and metrics]

## 2. Feature Breakdown
[Complete steps and increments with dependencies]

## 3. Walking Skeleton
[Minimum implementation with rationale]

## 4. Dependency Analysis
[What each increment requires and provides]

## 5. Selection Matrix
[All increments with effort/value/risk scores]
```

**With --full flag:**
```markdown
[... same as above, plus:]

## 6. Implementation Paths
- Speed to Market (2-4 days)
- Balanced Approach (5-8 days)
- Quality First (10-15 days)

## 7. Decision Guide
[How to choose based on priorities]

## 8. Next Steps
[Actionable guidance]
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

### Intelligent Scope Detection
- Automatically identifies single feature vs project
- No need to choose between different commands
- Adapts analysis depth to your needs

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

### Multiple Implementation Paths
- **Speed:** Fastest to next deployment
- **Balanced:** Speed + quality mix
- **Quality:** Polished experience
- **Feature-by-Feature:** Complete one feature at a time (projects)
- **Cross-Feature:** Improve one aspect across all features (projects)
- **All paths use compatible increments** across features

### Decision Support
- Priority-based recommendations
- Pros/cons for each path
- Real-world scenarios
- Red flags and anti-patterns

### Custom Path Building
- Selection matrix with all increments
- Effort/value/risk scoring
- **Dependency information** for each increment
- **Compatibility constraints** clearly shown
- Sprint planning guidance

### Professional Documentation
- Markdown format with dependency tables
- **Includes dependency analysis section**
- Shareable with team
- Ready for implementation
- Version controlled

---

## 📚 Documentation

- **[INSTALL.md](INSTALL.md)** - Complete installation guide
- **[CLAUDE.md](CLAUDE.md)** - Full usage guide and command reference
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development and contribution guide
- **[Agents Documentation](agents/bokata-slicer/)** - Technical details

---

## 🏗️ Architecture

### Single Command
- `/slice` - Intelligent vertical slicing (auto-detects scope)

### Coordinator Agents
- **project-analyzer** - Multi-feature projects
- **feature-analyzer** - Single feature analysis

### Specialist Agents
- **feature-backbone-specialist** - Feature identification
- **step-analyzer-specialist** - Steps decomposition
- **increment-generator-specialist** - Increments generation
- **path-composer-specialist** - Walking Skeleton composition
- **iteration-planner-specialist** - Implementation paths
- **decision-guide-specialist** - Decision framework
- **selection-matrix-specialist** - Increment matrix
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
- Start with outputs
- Zero/One/Many progression
- Dummy to dynamic
- Workflow simplification
- User segment narrowing
- Capacity-based splitting
- And more...

---

## 📊 Example Usage

### Example 1: Simple Feature

**Input:**
```
/bokata Feature: Export user data to CSV
```

**Analysis:**
- 3 steps identified
- 18 increments generated
- Walking Skeleton: 3 increments (~4 hours)
- Output: `export-user-data-2025-10-26.md`

### Example 2: Complex Feature

**Input:**
```
/bokata Feature: Real-time notifications with preferences and history
```

**Analysis:**
- 6 steps identified
- 42 increments generated
- Walking Skeleton: 6 increments (~2 days)
- 3 implementation paths (emphasizing risk reduction for WebSocket tech)
- Output: `real-time-notifications-2025-10-26.md`

### Example 3: Full Project

**Input:**
```
/bokata

Project: Task management app for remote teams

Features needed:
- Create and organize projects
- Add tasks with assignments
- Track progress
- Team collaboration

Tech: React + Node.js
Timeline: 3 months MVP
```

**Analysis:**
- 4 features identified
- 16 steps across features
- 96 total increments
- Walking Skeleton: 4 increments (~3 days)
- 5 implementation paths
- Output: `task-management-app-2025-10-26.md`

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