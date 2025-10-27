# Installation Guide - Increments Slicer

Complete installation guide for Increments Slicer - Intelligent vertical slicing and feature decomposition for Claude Code.

## Prerequisites

- **Node.js** >= 14.0.0 (for NPM installation method)
- **Claude Code** (latest version recommended)
- **Git** (optional, for development)

## Installation Methods

Choose the method that best fits your workflow:

1. **NPM Package** (recommended for Node.js projects)
2. **Claude Code Plugin** (recommended for non-Node.js projects)
3. **Global Installation** (for system-wide access)

---

## Method 1: NPM Package Installation

Best for Node.js/JavaScript projects with `package.json`.

### Step 1: Install Package

```bash
# Install as dev dependency (recommended)
npm install -D increments-slicer

# Or with yarn
yarn add -D increments-slicer

# Or with pnpm
pnpm add -D increments-slicer

# Or with bun
bun add -d increments-slicer
```

### Step 2: Setup Commands

```bash
npx increments-slicer install
```

**What this does:**
- Creates `.claude/commands/` directory
- Installs `/slice` command
- Creates `docs/slicing-analysis/` directory for outputs
- Updates `.gitignore` (adds slicing analysis docs)
- Creates README in docs directory

### Step 3: Verify Installation

In Claude Code, try:
```
/slice Feature: Test feature
```

You should see the command execute and analysis begin.

### Expected Directory Structure

```
your-project/
├── .claude/
│   └── commands/
│       └── slice.md          # ← Installed command
├── docs/
│   └── slicing-analysis/     # ← Output directory
│       └── README.md
├── node_modules/
│   └── increments-slicer/    # ← Package files
├── package.json
└── .gitignore                # ← Updated
```

---

## Method 2: Claude Code Plugin Installation

Best for any project type (Python, Ruby, Go, etc.) or if you don't use npm.

### Step 1: Add Marketplace

In Claude Code, run:
```
/plugin marketplace add abrahamvallez/increments-slicer
```

### Step 2: Install Plugin

```
/plugin install increments-slicer
```

### Step 3: Verify Installation

Check installed plugins:
```
/plugin list
```

You should see `increments-slicer` in the list.

### Step 4: Test Command

```
/slice Feature: Test feature
```

### Plugin Location

Commands and agents are installed in Claude Code's plugin directory (managed automatically).

---

## Method 3: Global Installation

Install once, use in any project.

### Step 1: Install Globally

```bash
npm install -g increments-slicer
```

### Step 2: Setup in Project

Navigate to your project directory:
```bash
cd your-project
increments-slicer install
```

### Step 3: Verify

```
/slice Feature: Test feature
```

### Benefits

- No need to install per-project
- One command to setup in any project
- Easy to update: `npm update -g increments-slicer`

---

## Verification Checklist

After installation, verify:

- [ ] `.claude/commands/slice.md` exists
- [ ] `docs/slicing-analysis/` directory exists
- [ ] `/slice` command works in Claude Code
- [ ] `.gitignore` includes `docs/slicing-analysis/`

---

## Usage

### Basic Usage

**Single feature:**
```
/slice Feature: User authentication
```

**Full project:**
```
/slice Project: E-commerce with catalog, cart, and checkout
```

### Output

Every analysis generates a markdown document:
- **Location:** `./docs/slicing-analysis/`
- **Format:** `{feature|project-name}-YYYY-MM-DD.md`
- **Contents:**
  - Complete breakdown
  - Walking Skeleton suggestion
  - Implementation paths
  - Decision guide
  - Selection matrix

---

## Configuration

### Custom Output Directory

Currently, output is always in `./docs/slicing-analysis/`.

To change this, modify `.claude/commands/slice.md` and update the output location section.

**Future:** `--output` flag support coming in v0.2.0

### Git Configuration

By default, analysis documents are **gitignored**.

**To commit analysis documents:**
1. Open `.gitignore`
2. Remove or comment out: `docs/slicing-analysis/`
3. Commit analysis documents as needed

**Recommendation:** Keep analysis documents in git for team collaboration.

---

## Updating

### NPM Package

```bash
# Local installation
npm update increments-slicer

# Global installation
npm update -g increments-slicer
```

After update, re-run setup:
```bash
npx increments-slicer install  # or just `increments-slicer install` if global
```

### Claude Code Plugin

```
/plugin update increments-slicer
```

---

## Uninstallation

### NPM Package

```bash
# Remove package
npm uninstall increments-slicer

# Manually remove (if desired):
rm -rf .claude/commands/slice.md
rm -rf docs/slicing-analysis/
# Remove entry from .gitignore
```

### Claude Code Plugin

```
/plugin uninstall increments-slicer
```

### Global Installation

```bash
npm uninstall -g increments-slicer

# Manually remove from projects:
rm -rf .claude/commands/slice.md
rm -rf docs/slicing-analysis/
```

---

## Troubleshooting

### Command Not Found

**Problem:** `/slice` command doesn't work in Claude Code

**Solutions:**
1. Verify installation:
   ```bash
   ls .claude/commands/
   ```
   Should show `slice.md`

2. Restart Claude Code

3. Re-run setup:
   ```bash
   npx increments-slicer install
   ```

---

### Permission Errors (Symlink)

**Problem:** Error creating symlink during installation

**Solution:** Installation automatically falls back to file copy. No action needed.

**For developers:** If you want symlinks (for development), ensure you have permission to create symlinks on your OS.

---

### Module Not Found

**Problem:** `Cannot find module 'increments-slicer'`

**Solutions:**
1. Verify installation:
   ```bash
   npm list increments-slicer
   ```

2. Reinstall:
   ```bash
   npm install increments-slicer
   ```

3. Check node_modules:
   ```bash
   ls node_modules/ | grep increments
   ```

---

### Output Directory Not Created

**Problem:** `docs/slicing-analysis/` directory doesn't exist

**Solution:**
```bash
mkdir -p docs/slicing-analysis
```

Or re-run setup:
```bash
npx increments-slicer install
```

---

### Analysis Fails to Save

**Problem:** Analysis completes but document isn't saved

**Possible causes:**
1. No write permission to `docs/` directory
2. Disk space full
3. Path doesn't exist

**Solutions:**
1. Check permissions:
   ```bash
   ls -la docs/
   ```

2. Create directory manually:
   ```bash
   mkdir -p docs/slicing-analysis
   ```

3. Check disk space:
   ```bash
   df -h
   ```

---

## Platform-Specific Notes

### Windows

- Use PowerShell or Command Prompt
- Paths use backslashes: `.claude\commands\`
- Symlinks require Administrator privileges (installer handles this)

### macOS

- Standard installation works out of the box
- If using older Node.js (<14), update first: `brew upgrade node`

### Linux

- Standard installation works
- If permission issues, check file ownership:
  ```bash
  ls -la .claude/
  ```

---

## Development Installation

For contributing to Increments Slicer:

### Clone Repository

```bash
git clone https://github.com/abrahamvallez/increments-slicer.git
cd increments-slicer
```

### Link Locally

```bash
npm link
```

### Test in Project

```bash
cd your-test-project
npm link increments-slicer
npx increments-slicer install
```

### Make Changes

Edit files in `increments-slicer/` directory. Changes reflect immediately (due to symlink).

### Unlink

```bash
cd your-test-project
npm unlink increments-slicer

cd increments-slicer
npm unlink
```

---

## Getting Help

### Documentation

- **README.md** - Overview and quick start
- **CLAUDE.md** - Detailed usage guide for Claude Code
- **CONTRIBUTING.md** - Development guide

### Support

- **Issues:** https://github.com/abrahamvallez/increments-slicer/issues
- **Discussions:** https://github.com/abrahamvallez/increments-slicer/discussions

### Reporting Bugs

Include:
1. Installation method used
2. Operating system
3. Node.js version: `node --version`
4. Error messages (full output)
5. Steps to reproduce

---

## FAQ

**Q: Do I need npm to use Increments Slicer?**
A: No, you can use Claude Code Plugin installation (Method 2).

**Q: Can I use this in non-JavaScript projects?**
A: Yes! Use Claude Code Plugin installation or global npm install.

**Q: Where are analysis documents saved?**
A: `./docs/slicing-analysis/` by default.

**Q: Are analysis documents committed to git?**
A: No by default (gitignored). You can change this in `.gitignore`.

**Q: Can I customize the analysis?**
A: The `/slice` command uses the agents as-is. For custom analysis, you can modify the agent files after installation.

**Q: How do I update to latest version?**
A: `npm update increments-slicer` or `/plugin update increments-slicer`

**Q: Can I install in multiple projects?**
A: Yes, each project can have its own installation.

**Q: Does this work offline?**
A: Commands and agents work offline, but Claude Code itself requires internet.

---

## Next Steps

After installation:

1. **Read the guides:**
   - [README.md](README.md) - Quick start
   - [CLAUDE.md](CLAUDE.md) - Full command reference

2. **Try it out:**
   ```
   /slice Feature: Simple test feature
   ```

3. **Review output:**
   - Open generated markdown in `docs/slicing-analysis/`
   - Review Walking Skeleton
   - Choose implementation path

4. **Use in real project:**
   ```
   /slice Feature: [Your actual feature]
   ```

Happy slicing! 🍔⚡
