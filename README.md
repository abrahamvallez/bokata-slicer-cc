# Bokata Slicer CC

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![npm version](https://img.shields.io/npm/v/bokata-slicer-cc.svg)](https://www.npmjs.com/package/bokata-slicer-cc)

**Intelligent vertical slicing and feature decomposition for Claude Code** using the **Hamburger Method** and radical vertical slicing techniques.

> **Version:** v0.6.0 (Latest improvements to installation and command workflow)

## 🎯 New: JSON Output by Default

**Bokata Slicer now outputs structured JSON for seamless integration with your tools and workflows!**

- ✅ **JSON by default** - Machine-readable, API-ready output
- ✅ **Markdown on demand** - Use `--verbose` flag for human-readable docs
- ✅ **Schema-validated** - All outputs follow strict JSON schemas
- ✅ **Integration-ready** - Works with CI/CD, project management tools, scripts

```bash
# Default: JSON output
/bokata-feature "User authentication"
# Output: user-authentication-2025-11-16.json

# With markdown docs
/bokata-feature --verbose "User authentication"
# Output: user-authentication-2025-11-16.json + .md

# Query JSON
cat user-authentication-*.json | jq '.walkingSkeleton'
```

📚 **[Read the JSON Output Guide](./docs/JSON_OUTPUT.md)** for integration examples and best practices.

---

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

### Basic Usage

Bokata provides **four specialized commands** for different analysis needs:

```bash
# 1. Analyze a full project (multiple features)
/bokata E-commerce platform with catalog, cart, checkout

# 2. Analyze a single feature
/bokata-feature Feature: Coach Records Audio

# 3. Generate implementation strategies (after step 1 or 2)
/bokata-iterations-paths

# 4. Build custom implementation paths (after step 1 or 2)
/bokata-matrix

# Can also read from files
/bokata ./docs/project-requirements.md
/bokata-feature ./docs/feature-spec.md

# Add --verbose for markdown documentation
/bokata-feature --verbose "Feature description"
```

**Output:**
- **Default:** JSON files in `./docs/slicing-analysis/*.json`
- **With --verbose:** JSON + Markdown in `./docs/slicing-analysis/*`

### Recommended Workflow

1. **Run core analysis** with `/bokata` or `/bokata-feature`
2. **Review Walking Skeleton** - the minimum implementation needed
3. *(Optional)* Run `/bokata-iterations-paths` for implementation strategies
4. *(Optional)* Run `/bokata-matrix` for custom path building
5. **Start implementing** based on your priorities

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

### The Four Commands

**1. `/bokata` - Project Analysis**
- Analyzes projects with multiple features
- Generates cross-feature Walking Skeleton
- Provides complete feature breakdown with dependencies
- No effort/value/risk scores (dependencies only)

**2. `/bokata-feature` - Single Feature Analysis**
- Focused analysis of a single feature
- Generates feature-specific Walking Skeleton
- Detailed step and increment breakdown with dependencies
- No effort/value/risk scores (dependencies only)

**3. `/bokata-iterations-paths` - Implementation Strategies**
- Generates 3-5 implementation path options
- Includes estimated timelines and story points
- Strategic recommendations based on priorities
- Must run after `/bokata` or `/bokata-feature`

**4. `/bokata-matrix` - Selection Matrix**
- Complete increment catalog with detailed dependencies
- Shows which increments work together
- Enables custom path building
- Must run after `/bokata` or `/bokata-feature`

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

## 📚 Documentation

- **[INSTALL.md](INSTALL.md)** - Complete installation guide
- **[CLAUDE.md](CLAUDE.md)** - Full command reference and detailed methodology
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development and contribution guide

---

## 🤝 Contributing

We welcome contributions! This project is licensed under **GPL-3.0**, which means:

- ✅ You can use, modify, and distribute freely
- ✅ You must maintain the same license in derivative works
- ✅ You must include the original copyright notice
- ✅ Any improvements benefit the entire community

**To contribute:**

1. Fork the repository
2. Create a branch for your feature
3. Follow existing structure and documentation
4. Submit a Pull Request with detailed description

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

---

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

## 💬 Support & Resources

- **Issues:** [Report bugs or request features](https://github.com/abrahamvallez/bokata-slicer-cc/issues)
- **Discussions:** [Ask questions or share ideas](https://github.com/abrahamvallez/bokata-slicer-cc/discussions)
- **Further Reading:** [Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes) - Kent Beck

---

**Built with ❤️ using Augmented Coding principles**

Happy slicing! 🍔⚡
