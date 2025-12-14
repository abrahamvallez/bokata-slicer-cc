# Contributing to Bokata Slicer CC

Thank you for your interest in contributing to Bokata Slicer CC! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)
- [Style Guidelines](#style-guidelines)

---

## Code of Conduct

This project follows the principles of respectful collaboration:

- **Be respectful** - Treat all contributors with respect
- **Be constructive** - Provide helpful feedback
- **Be patient** - Remember that everyone is learning
- **Be inclusive** - Welcome contributors of all backgrounds

---

## Getting Started

### Prerequisites

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0
- **Git**
- **Claude Code** (for testing commands)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/bokata-slicer-cc.git
   cd bokata-slicer-cc
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/abrahamvallez/bokata-slicer-cc.git
   ```

---

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Link Package Locally

```bash
npm link
```

This makes the `bokata-slicer-cc` command available globally for testing.

### 3. Test Installation

In a test project directory:
```bash
cd /path/to/test-project
npm link bokata-slicer-cc
npx bokata-slicer-cc install
```

### 4. Verify Commands

In Claude Code:
```
/bokata Feature: Test feature
```

---

## Project Structure

```
bokata-slicer-cc/
├── .claude-plugin/              # Plugin configuration
│   ├── plugin.json             # Plugin manifest
│   └── marketplace.json        # Marketplace config
│
├── commands/                    # Slash commands
│   └── slice.md                # Main command
│
├── agents/bokata-slicer/      # Agent implementations
│   ├── project-analyzer.md          # Multi-feature coordinator
│   ├── feature-analyzer.md          # Single feature coordinator
│   ├── feature-backbone-specialist.md
│   ├── step-analyzer-specialist.md
│   ├── increment-generator-specialist.md
│   ├── path-composer-specialist.md
│   ├── iteration-planner-specialist.md
│   ├── decision-guide-specialist.md
│   ├── selection-matrix-specialist.md
│   └── doc-generator.md
│
├── bin/                         # Scripts
│   └── install.js              # Installation script
│
├── docs/                        # Documentation
│   ├── README.md
│   ├── INSTALL.md
│   ├── CLAUDE.md
│   └── CONTRIBUTING.md (this file)
│
├── package.json                 # NPM configuration
└── .npmignore                   # NPM publish configuration
```

### Key Files

- **commands/bokata.md** - Entry point, scope detection
- **agents/project-analyzer.md** - Multi-feature orchestration
- **agents/feature-analyzer.md** - Single feature orchestration
- **agents/*-specialist.md** - Specialized processing agents
- **bin/install.js** - Installation logic

---

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes

### 2. Make Changes

#### Modifying Commands

Commands are in `commands/bokata.md`. Key sections:
- **Scope Detection** - Logic for single vs multi-feature
- **Agent Loading** - Coordination calls
- **Output Generation** - Markdown creation

#### Modifying Agents

Agents are in `agents/bokata-slicer/`. Follow this structure:

```markdown
---
name: agent-name
description: What this agent does
model: sonnet
color: blue
---

# YOUR ROLE
[Clear role statement]

# YOUR TASK
[What this agent accomplishes]

# EXPECTED INPUT
[Input format and requirements]

# WORKFLOW
[Step-by-step process]

# OUTPUT FORMAT
[Expected output structure]

# VALIDATION RULES
[Quality checks]
```

**Important:**
- Use `${CLAUDE_PLUGIN_ROOT}` for agent paths
- Maintain YAML frontmatter
- Document input/output clearly
- Include examples

#### Modifying Installation

Installation logic is in `bin/install.js`:
- Keep it platform-independent
- Graceful fallbacks (symlink → copy)
- Clear console output
- Error handling

### 3. Test Your Changes

#### Local Testing

```bash
# Re-link if you changed package files
npm link

# Test installation
cd /path/to/test-project
npx bokata-slicer-cc install

# Test in Claude Code
/bokata Feature: Your test case
```

#### Test Multiple Scenarios

- Single simple feature
- Single complex feature
- Multi-feature project
- Invalid input (error handling)
- Edge cases

### 4. Document Changes

Update documentation:
- README.md - If user-facing changes
- CLAUDE.md - If agent/command behavior changes
- INSTALL.md - If installation changes
- Inline comments - For complex logic

---

## Testing

### Manual Testing Checklist

Before submitting:

- [ ] Installation works (`npx bokata-slicer-cc install`)
- [ ] Command appears in Claude Code
- [ ] Single feature analysis works
- [ ] Multi-feature analysis works
- [ ] Output markdown is generated
- [ ] Error messages are clear
- [ ] Works on your OS (note in PR)

### Test Cases

**Test Case 1: Simple Feature**
```
/bokata Feature: Export data to CSV
```
Expected: Quick analysis, ~3 steps, ~18 increments

**Test Case 2: Complex Feature**
```
/bokata Feature: Real-time notifications with preferences
```
Expected: Detailed analysis, ~6 steps, ~40 increments

**Test Case 3: Project**
```
/bokata Project: Task management with projects, tasks, and progress
```
Expected: Multi-feature, ~4 features, ~16 steps, ~90 increments

**Test Case 4: Ambiguous Input**
```
/bokata Shopping cart
```
Expected: Clarification requested

**Test Case 5: Invalid Input**
```
/bokata
```
Expected: Helpful error message

---

## Submitting Changes

### 1. Commit Your Changes

Follow conventional commit format:

```bash
git commit -m "type(scope): description"
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `refactor` - Code refactoring
- `test` - Test changes
- `chore` - Maintenance tasks

**Examples:**
```bash
git commit -m "feat(agents): add risk assessment to increment-generator"
git commit -m "fix(install): handle Windows symlink permissions"
git commit -m "docs(readme): update installation instructions"
```

### 2. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 3. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill out PR template:

```markdown
## Description
[What does this PR do?]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
[How was this tested?]

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tested locally
- [ ] No breaking changes (or documented)
```

### 4. Code Review

- Respond to feedback promptly
- Make requested changes
- Update PR description if scope changes
- Be open to suggestions

---

## Release Process

### Version Numbering

We use [Semantic Versioning](https://semver.org/):
- **MAJOR** - Breaking changes
- **MINOR** - New features (backwards compatible)
- **PATCH** - Bug fixes

### Creating a Release

**For maintainers:**

1. Update version in `package.json`:
   ```json
   "version": "0.2.0"
   ```

2. Update version in `.claude-plugin/plugin.json`:
   ```json
   "version": "0.2.0"
   ```

3. Update CHANGELOG.md (create if doesn't exist):
   ```markdown
   ## [0.2.0] - 2025-10-27
   ### Added
   - New feature X
   ### Fixed
   - Bug Y
   ```

4. Commit changes:
   ```bash
   git commit -m "chore(release): bump version to 0.2.0"
   ```

5. Create git tag:
   ```bash
   git tag v0.2.0
   git push origin main --tags
   ```

6. Publish to NPM:
   ```bash
   npm publish --access public
   ```

7. Create GitHub Release:
   - Go to Releases on GitHub
   - Click "Create new release"
   - Select tag `v0.2.0`
   - Copy CHANGELOG entry
   - Publish release

---

## Working with the Dependency System (NEW in v0.2.0)

The core innovation in v0.2.0 is the **Dependency and Compatibility System**. This ensures every increment is:
- ✅ Independently deployable
- ✅ Provides clear feedback to users
- ✅ Compatible with other selected increments

### Understanding Dependencies

Each increment specifies three key attributes:

**REQUIRES**: External dependencies or preconditions
```
REQUIRES: None                    # Standalone, no dependencies
REQUIRES: Supabase setup          # Needs external service
REQUIRES: Authentication working  # Needs another step's increment
```

**PROVIDES**: Capabilities offered to other steps
```
PROVIDES: User session            # Other steps can depend on this
PROVIDES: OAuth tokens            # What this increment enables
PROVIDES: Basic sync mechanism    # Functionality provided
```

**COMPATIBLE WITH**: Which increments from other steps work together
```
COMPATIBLE WITH: 1.1, 2.1, 3.1   # These form a valid E2E flow
COMPATIBLE WITH: 1.2, 2.2, 3.2   # These form another valid flow
```

### Maintaining Dependency Integrity

When modifying agents that handle increments:

1. **In `increment-generator-specialist.md`:**
   - Every increment MUST specify REQUIRES and PROVIDES
   - REQUIRES should be "None" or specific service/precondition
   - PROVIDES should describe what downstream steps can use
   - Mark simplest increment with ⭐ and REQUIRES: None when possible

2. **In `path-composer-specialist.md`:**
   - Validate that selected increments are compatible
   - Check that each increment's REQUIRES are satisfied by other selected increments or marked as "None"
   - Verify all COMPATIBLE WITH constraints are honored
   - Flag incompatible combinations and suggest alternatives

3. **In `doc-generator.md`:**
   - Display REQUIRES | PROVIDES | COMPATIBLE WITH columns in tables
   - Show "Dependency Analysis" section with validation details
   - Create "Compatibility Maps" showing which paths are valid
   - Ensure all suggested paths have validated dependencies

### Example: Adding a Breakdown Strategy

When adding a new breakdown strategy to `increment-generator-specialist.md`, ensure increments follow this pattern:

```markdown
**1.2: Real OAuth Flow**
| # | Increment | Requires | Provides | Compatible With |
|---|-----------|----------|----------|-----------------|
| 1.2 | Real OAuth | LinkedIn app credentials | OAuth tokens | 2.2, 3.2 |

- **REQUIRES:** LinkedIn developer app configured
- **PROVIDES:** Valid OAuth tokens for authenticated users
- **COMPATIBLE WITH:** 2.2 (Real API calls), 3.2 (Secure storage)
- **Effort:** 3 (medium)
- **Value:** 4 (high)
```

### Testing Dependency System

When testing changes to dependency-related code:

```bash
# Test 1: Walking Skeleton validation
/bokata Feature: Simple authentication
# Verify: All selected increments are compatible
# Verify: REQUIRES are satisfied or "None"

# Test 2: Path composition
/bokata --with-paths Feature: Complex real-time sync
# Verify: Multiple valid E2E flows shown
# Verify: All paths have validated dependencies

# Test 3: Incompatible combinations
/bokata Feature: Multi-step feature with complex requirements
# Verify: Incompatible suggestions are flagged
# Verify: User guidance includes alternatives
```

### Common Mistakes to Avoid

❌ **Don't:** Create increments that don't specify REQUIRES/PROVIDES
```
❌ 2.1: Send email  # Missing REQUIRES/PROVIDES
```

✅ **Do:** Explicitly declare dependencies
```
✅ 2.1: Send email (mock)
   REQUIRES: None
   PROVIDES: Email sending capability
```

❌ **Don't:** Mark incompatible increments as COMPATIBLE WITH
```
❌ 1.1 (hardcoded) COMPATIBLE WITH 2.3 (real API) - These don't work together
```

✅ **Do:** Group compatible increments by tier
```
✅ 1.1 (hardcoded) COMPATIBLE WITH 2.1 (hardcoded) - Both are mocks
✅ 1.2 (real) COMPATIBLE WITH 2.2 (real) - Both are production-ready
```

---

## Style Guidelines

### Markdown Files (Agents, Commands, Docs)

**DO:**
- Use clear, concise language
- Include examples
- Document edge cases
- Use consistent formatting
- Add validation rules

**DON'T:**
- Use vague descriptions
- Skip error handling
- Leave TODOs in committed code
- Use inconsistent terminology

### JavaScript (bin/install.js)

**DO:**
- Use clear variable names
- Add comments for complex logic
- Handle errors gracefully
- Provide helpful console output
- Use modern JavaScript (ES6+)

**DON'T:**
- Use `var` (use `const`/`let`)
- Ignore errors
- Use magic numbers
- Write cryptic code

### Agent Markdown Structure

**Required sections:**
1. YAML frontmatter (name, description, model, color)
2. YOUR ROLE
3. YOUR TASK
4. EXPECTED INPUT
5. WORKFLOW
6. OUTPUT FORMAT
7. VALIDATION RULES
8. Examples

**Agent Path References:**
```markdown
**Coordinate with:** `${CLAUDE_PLUGIN_ROOT}/agents/agent-name.md`
```

---

## Common Tasks

### Adding a New Breakdown Strategy

1. Edit `agents/bokata-slicer/increment-generator-specialist.md`
2. Add strategy to the toolkit section
3. Include description, when to use, and example
4. Update strategy count in documentation

### Improving Walking Skeleton Logic

1. Edit `agents/bokata-slicer/path-composer-specialist.md`
2. Update selection rules or validation
3. Add examples of new behavior
4. Test with various features

### Adding New Implementation Path

1. Edit `agents/bokata-slicer/iteration-planner-specialist.md`
2. Add new option with clear focus
3. Document when to use
4. Update decision guide

### Fixing Installation Issues

1. Edit `bin/install.js`
2. Add error handling or fallback
3. Test on affected platform
4. Document fix in commit message

---

## Getting Help

### Resources

- **Documentation:** [README.md](README.md), [CLAUDE.md](CLAUDE.md)
- **Examples:** Check `agents/` for existing patterns
- **Issues:** Search [existing issues](https://github.com/abrahamvallez/bokata-slicer-cc/issues)
- **Discussions:** [GitHub Discussions](https://github.com/abrahamvallez/bokata-slicer-cc/discussions)

### Ask Questions

Don't hesitate to:
- Open an issue with `question` label
- Start a discussion
- Comment on existing issues
- Ask for clarification in PRs

---

## Recognition

Contributors are recognized in:
- Release notes
- README (if significant contribution)
- Git history

Thank you for contributing to Bokata Slicer CC!

---

## License

By contributing, you agree that your contributions will be licensed under the MIT license.

---

**Happy contributing! 🍔⚡**
