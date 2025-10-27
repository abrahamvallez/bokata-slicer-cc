# Increments Slicer

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![npm version](https://img.shields.io/npm/v/increments-slicer.svg)](https://www.npmjs.com/package/increments-slicer)

**Intelligent vertical slicing and feature decomposition for Claude Code** using the **Hamburger Method** and radical vertical slicing techniques.

## 🚀 Quick Start

### Installation

**Option 1: NPM (Node.js projects)**
```bash
npm install -D increments-slicer
npx increments-slicer install
```

**Option 2: Claude Code Plugin (any project)**
```
/plugin marketplace add abrahamvallez/increments-slicer
/plugin install increments-slicer
```

**Option 3: Global**
```bash
npm install -g increments-slicer
cd your-project
increments-slicer install
```

### Usage

**Analyze a single feature:**
```
/slice Feature: User can reset their password via email
```

**Analyze a full project:**
```
/slice Project: E-commerce platform with catalog, cart, checkout, and orders
```

**Output:** Comprehensive markdown document in `./docs/slicing-analysis/`

---

## 📖 What is Increments Slicer?

Increments Slicer automatically analyzes features or projects and generates:

- ✅ **Walking Skeleton** - The absolute minimum implementation
- ✅ **Multiple Implementation Paths** - Choose based on your priorities
- ✅ **Decision Guide** - Clear framework for choosing the right path
- ✅ **Selection Matrix** - Complete increment catalog with scoring
- ✅ **Professional Documentation** - Ready to share with your team

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
- **One feature** → Focused analysis (~10-20 min)
- **Multiple features** → Complete project analysis (~30-60 min)

### Complete Analysis Workflow

1. **Feature Breakdown** - Identifies all features in user journey
2. **Steps Analysis** - Decomposes into UI → Logic → Data steps
3. **Increments Generation** - Creates 5-10 deployable increments per step
4. **Walking Skeleton** - Suggests absolute minimum implementation
5. **Implementation Paths** - Provides 3-5 options (Speed, Quality, Features)
6. **Decision Framework** - Maps priorities to recommendations
7. **Selection Matrix** - Complete catalog for custom paths

### Example Output Structure

```markdown
# Your Feature - Vertical Slicing Analysis

## Executive Summary
[Quick stats and metrics]

## Feature Breakdown
[Complete steps and increments]

## Walking Skeleton (Suggested)
[Minimum implementation with rationale]

## Implementation Paths
- Speed to Market (2-4 days)
- Balanced Approach (5-8 days)
- Quality First (10-15 days)

## Decision Guide
[How to choose based on priorities]

## Selection Matrix
[All increments with effort/value/risk scores]
```

---

## 💡 Key Features

### Intelligent Scope Detection
- Automatically identifies single feature vs project
- No need to choose between different commands
- Adapts analysis depth to your needs

### Walking Skeleton Composition
- Selects simplest increments across all steps
- Guarantees end-to-end functionality
- Answers: "What would we ship if deadline was tomorrow?"

### Multiple Implementation Paths
- **Speed:** Fastest to next deployment
- **Balanced:** Speed + quality mix
- **Quality:** Polished experience
- **Feature-by-Feature:** Complete one feature at a time (projects)
- **Cross-Feature:** Improve one aspect across all features (projects)

### Decision Support
- Priority-based recommendations
- Pros/cons for each path
- Real-world scenarios
- Red flags and anti-patterns

### Custom Path Building
- Selection matrix with all increments
- Effort/value/risk scoring
- Visual indicators (⭐⚡🔥⚠️💎)
- Sprint planning guidance

### Professional Documentation
- Markdown format
- Shareable with team
- Ready for implementation
- Version controlled

---

## 📚 Documentation

- **[INSTALL.md](INSTALL.md)** - Complete installation guide
- **[CLAUDE.md](CLAUDE.md)** - Full usage guide and command reference
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development and contribution guide
- **[Agents Documentation](agents/vertical-slicer/)** - Technical details

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
/slice Feature: Export user data to CSV
```

**Analysis:**
- 3 steps identified
- 18 increments generated
- Walking Skeleton: 3 increments (~4 hours)
- Output: `export-user-data-2025-10-26.md`

### Example 2: Complex Feature

**Input:**
```
/slice Feature: Real-time notifications with preferences and history
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
/slice

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
- [Agents documentation](agents/vertical-slicer/) - Technical details

---

## 💬 Support

- **Issues:** [Report bugs or request features](https://github.com/abrahamvallez/increments-slicer/issues)
- **Discussions:** [Ask questions or share ideas](https://github.com/abrahamvallez/increments-slicer/discussions)

---

## 🌟 Show Your Support

If Increments Slicer helps your team, consider:
- ⭐ Starring this repository
- 🐛 Reporting issues
- 🤝 Contributing improvements
- 📢 Sharing with your network

---

**Built with ❤️ using Augmented Coding principles**

Happy slicing! 🍔⚡