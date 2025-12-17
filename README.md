# Bokata Slicer CC

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/bokata-slicer-cc.svg)](https://www.npmjs.com/package/bokata-slicer-cc)

**Intelligent vertical slicing and feature decomposition for Claude Code** using the **Hamburger Method** and radical vertical slicing techniques.

> **Version:** v0.4.0 (Command-based orchestration & implementation checklists)
> **Latest:** Command-based analysis (`/bokata:bokata`) - 9% faster, more transparent

## 🚀 Quick Start

### Installation

**Option 1: NPM (Node.js projects)**
```bash
npm install -D bokata-slicer-cc
npx bokata-slicer-cc install
```

**Option 2: Global**
```bash
npm install -g bokata-slicer-cc
cd your-project
bokata-slicer-cc install
```

### Basic Usage

Bokata provides **specialized commands** for different analysis needs:

```bash
# 1. Analyze a full project (multiple features) - RECOMMENDED
/bokata:bokata E-commerce platform with catalog, cart, checkout

# 2. Analyze a single feature
/bokata:feature Feature: Coach Records Audio

# 3. Generate implementation strategies (after step 1 or 2)
/bokata:paths

# 4. Build custom implementation paths (after step 1 or 2)
/bokata:matrix

# Can also read from files
/bokata:bokata ./docs/project-requirements.md
/bokata:feature ./docs/feature-spec.md

# Legacy option (agent-based - still supported)
/bokata:bokata-legacy E-commerce platform...
```

**Output:** Markdown analysis documents in `./docs/slicing-analysis/` with **implementation checklists**

### Implementation Checklists

All outputs now include progress tracking:

```markdown
| Status | # | Incremental Option | Requires | Provides |
|--------|---|---------|----------|----------|
| [ ] | 1.1 | Manual Export ⭐ | None | CSV |
| [ ] | 1.2 | Button Export | API | Button |

**Progress: 0/2 incremental options completed**
```

Check off boxes as you implement each option!

### Recommended Workflow

1. **Run core analysis** with `/bokata:bokata` (or `/bokata:feature`)
2. **Review Walking Skeleton** - the minimum implementation needed
3. **Check off implemented incremental options** as you work
4. *(Optional)* Run `/bokata:paths` for implementation strategies
5. *(Optional)* Run `/bokata:matrix` for custom path building
6. **Track progress** directly in the analysis document

---

## 📖 What is Bokata Slicer CC?

Bokata automatically breaks down features and projects into the smallest deployable increments using vertical slicing techniques.

### Core Analysis Output

**Every `/bokata` or `/bokata-feature` analysis generates:**
- ✅ **Executive Summary** - Quick overview and metrics
- ✅ **Feature Breakdown** - All steps and increments with dependencies
- ✅ **Walking Skeleton** - Minimum viable implementation path
- ✅ **Dependency Analysis** - What each increment requires and provides

### Optional Strategic Planning

**Run after core analysis to get:**
- ✅ **Implementation Paths** (`/bokata-iterations-paths`) - 3-5 strategic options with timelines
- ✅ **Selection Matrix** (`/bokata-matrix`) - Complete increment catalog for custom path building

### Feature Naming Convention

All features follow the **Actor + Action** format for clarity:

```
Format: [Actor] [Action]
Examples: "Coach Records Audio", "User Resets Password", "Admin Manages Users"
```

This convention is enforced by all commands to maintain consistency throughout analysis.

---

## 🎯 How It Works

### The Commands (v0.4.0)

**1. `/bokata:bokata` - Project Analysis** ⭐ RECOMMENDED
- Analyzes projects with multiple features
- Generates cross-feature Walking Skeleton with **implementation checklists**
- Command-based orchestration (9% faster)
- Complete feature breakdown with dependencies
- No effort/value/risk scores (dependencies only)

**1b. `/bokata:bokata-legacy` - Project Analysis (Agent-Based)**
- Legacy agent-based orchestration option
- Same analysis output as `/bokata:bokata`
- For users who prefer agent-based approach
- Still fully supported

**2. `/bokata:feature` - Single Feature Analysis**
- Focused analysis of a single feature
- Generates feature-specific Walking Skeleton with **implementation checklists**
- Detailed step and increment breakdown with dependencies
- No effort/value/risk scores (dependencies only)

**3. `/bokata:paths` - Implementation Strategies**
- Generates 3-5 implementation path options
- Includes estimated timelines and story points
- Strategic recommendations based on priorities
- Must run after `/bokata:bokata` or `/bokata:feature`

**4. `/bokata:matrix` - Selection Matrix**
- Complete increment catalog with detailed dependencies
- Shows which increments work together
- Enables custom path building
- Must run after `/bokata:bokata` or `/bokata:feature`

**5. Individual Phase Commands (Advanced)**
- `/bokata:backbone` - Extract features only
- `/bokata:steps` - Decompose into steps only
- `/bokata:increments` - Generate options only

### Guaranteed Deployable Paths

Every increment explicitly specifies:
- **REQUIRES:** External dependencies needed (or "None" for zero-dependency options)
- **PROVIDES:** Capabilities offered to other steps
- **COMPATIBLE WITH:** Which increments from other steps work together

This ensures the Walking Skeleton always delivers end-to-end functionality with guaranteed compatibility.

---

## 🎓 Methodology

### The Hamburger Method

Every vertical slice must answer: **"What would we ship if the deadline was tomorrow?"**

**Walking Skeleton** is ONE specific vertical slice—the simplest one using the most straightforward increment from each step. It's your minimum viable implementation that proves the architecture works end-to-end.

Each slice must:
- ✅ Cut through all technical layers (UI → Logic → Data)
- ✅ Deliver real, observable value to the user
- ✅ Can be deployed independently
- ✅ Enable early feedback and validation

### Breakdown Strategies

Bokata uses 20+ decomposition strategies, including:

- **Start with outputs** - Begin with visible results
- **Zero/One/Many** - Hardcode → single → multiple
- **Dummy to dynamic** - Static → configurable → dynamic
- **Workflow simplification** - Skip optional steps
- **Defer edge cases** - Handle happy path first
- And many more...

All strategies are automatically applied during increment generation to create the most practical decomposition.

---

## 📊 Quick Examples

### Example 1: Simple Feature Analysis

```bash
/bokata-feature Feature: User Exports Data to CSV
```

**Result:**
- 3 steps identified
- 18 increments generated
- Walking Skeleton: 3 deployable increments
- Complete dependency analysis
- Output: `./docs/slicing-analysis/user-exports-data.md`

### Example 2: Project Analysis from File

```bash
/bokata ./docs/project-requirements.md
```

**Result:**
- Multiple features identified (Actor+Action format)
- Cross-feature Walking Skeleton
- All dependencies documented
- Ready for implementation planning
- Output: `./docs/slicing-analysis/project-analysis.md`

**Then optionally:**
```bash
/bokata-iterations-paths  # See 3-5 implementation strategies
/bokata-matrix           # Get complete selection matrix
```

---

## 🔧 Advanced Usage: Independent Agent Execution

For fine-grained control, three core agents can run independently without the full orchestrator:

| Subcommand | Purpose | Input | Output |
|---|---|---|---|
| `/bokata:backbone` | Identify features | Context Analysis | Features Backbone |
| `/bokata:steps` | Decompose features | Context + Features | Steps breakdown |
| `/bokata:increments` | Generate options | Context + Steps | Implementation options |

**Example workflow:**
```bash
/bokata:backbone ./context.md    # Generate features
/bokata:steps ./context.md       # Generate steps
/bokata:increments ./context.md  # Generate options
```

**When to use:**
- ✅ Iterating on specific sections
- ✅ Extending existing analysis
- ✅ Fine-grained control

**When NOT to use:**
- ❌ Need Walking Skeleton (use `/bokata` instead)
- ❌ Need cross-feature validation
- ❌ Starting from scratch

See [CLAUDE.md](CLAUDE.md#independent-agent-execution-advanced) for full documentation.

---

## 📚 Documentation

- **[INSTALL.md](INSTALL.md)** - Complete installation guide
- **[CLAUDE.md](CLAUDE.md)** - Full command reference and detailed methodology
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development and contribution guide

---

## 🤝 Contributing

We welcome contributions! This project is licensed under **MIT**, which means:

- ✅ You can use, modify, and distribute freely
- ✅ You can use it in proprietary projects
- ✅ You must include the original copyright notice
- ✅ The software is provided as-is without warranty

**To contribute:**

1. Fork the repository
2. Create a branch for your feature
3. Follow existing structure and documentation
4. Submit a Pull Request with detailed description

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

---

## License

This project is licensed under the [MIT License](LICENSE).

```
Copyright (c) 2025 Abraham Vallez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

---

## 💬 Support & Resources

- **Issues:** [Report bugs or request features](https://github.com/abrahamvallez/bokata-slicer-cc/issues)
- **Discussions:** [Ask questions or share ideas](https://github.com/abrahamvallez/bokata-slicer-cc/discussions)
- **Further Reading:** [Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes) - Kent Beck

---

**Built with ❤️ using Augmented Coding principles**

Happy slicing! 🍔⚡
