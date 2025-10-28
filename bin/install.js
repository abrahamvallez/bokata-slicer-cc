#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CLAUDE_DIR = '.claude';
const COMMANDS_DIR = path.join(CLAUDE_DIR, 'commands');
const AGENTS_DIR = path.join(CLAUDE_DIR, 'agents');
const DOCS_DIR = 'docs';
const SLICING_DOCS_DIR = path.join(DOCS_DIR, 'slicing-analysis');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function main() {
  const args = process.argv.slice(2);

  // If called during npm install, just exit
  if (args.includes('--check')) {
    return;
  }

  log('\n🔧 Increments Slicer Installation\n', 'bright');

  // Check if we're in a reasonable project directory
  const hasPackageJson = fs.existsSync('package.json');
  const hasGit = fs.existsSync('.git');

  if (!hasPackageJson && !hasGit) {
    log('⚠️  Warning: Not in a project directory (no package.json or .git found)', 'yellow');
    log('   Continue anyway? This will create .claude/ directory here.\n', 'yellow');
    // In a real implementation, you'd add interactive prompt here
    // For now, we'll continue
  }

  // Get package installation path
  const packageRoot = path.resolve(__dirname, '..');
  log(`📦 Package location: ${packageRoot}`, 'blue');

  // 1. Create .claude/commands directory
  if (!fs.existsSync(COMMANDS_DIR)) {
    fs.mkdirSync(COMMANDS_DIR, { recursive: true });
    log('✅ Created .claude/commands directory', 'green');
  } else {
    log('✓  .claude/commands already exists', 'blue');
  }

  // 2. Install all commands from package commands/ directory
  const packageCommandsDir = path.join(packageRoot, 'commands');
  let installedCommands = [];
  if (fs.existsSync(packageCommandsDir)) {
    const commandFiles = fs.readdirSync(packageCommandsDir).filter(f => f.endsWith('.md'));
    commandFiles.forEach(file => {
      const src = path.join(packageCommandsDir, file);
      const dest = path.join(COMMANDS_DIR, file);

      if (fs.existsSync(dest)) {
        log(`⏭️  /${path.basename(file, '.md')} command already exists (skipping)`, 'yellow');
        return;
      }

      try {
        try {
          // Try symlink first for easier dev iteration
          fs.symlinkSync(src, dest);
          log(`✅ Installed /${path.basename(file, '.md')} command (symlink)`, 'green');
        } catch (symlinkErr) {
          // Fallback to copying the file
          fs.copyFileSync(src, dest);
          log(`✅ Installed /${path.basename(file, '.md')} command (copy)`, 'green');
        }
        installedCommands.push(path.basename(file, '.md'));
      } catch (err) {
        log(`❌ Failed to install /${path.basename(file, '.md')} command: ${err.message}`, 'red');
      }
    });
  } else {
    log('⚠️  No commands/ directory found in package, skipping commands installation', 'yellow');
  }

  // 3. Install agents
  if (!fs.existsSync(AGENTS_DIR)) {
    fs.mkdirSync(AGENTS_DIR, { recursive: true });
    log('✅ Created .claude/agents directory', 'green');
  } else {
    log('✓  .claude/agents already exists', 'blue');
  }

  const packageAgentsDir = path.join(packageRoot, 'agents');
  let installedAgents = [];
  if (fs.existsSync(packageAgentsDir)) {
    const agentEntries = fs.readdirSync(packageAgentsDir).filter(e => e !== '.DS_Store');
    agentEntries.forEach(entry => {
      const srcPath = path.join(packageAgentsDir, entry);
      const destPath = path.join(AGENTS_DIR, entry);

      if (fs.existsSync(destPath)) {
        log(`⏭️  agent ${entry} already exists (skipping)`, 'yellow');
        return;
      }

      try {
        const stat = fs.statSync(srcPath);
        if (stat.isDirectory()) {
          try {
            // Prefer creating a symlink for directories
            fs.symlinkSync(srcPath, destPath, 'dir');
            log(`✅ Installed agent ${entry} (symlink)`, 'green');
          } catch (symlinkErr) {
            // Fallback: copy directory recursively (Node 16.7+)
            if (fs.cpSync) {
              fs.cpSync(srcPath, destPath, { recursive: true });
              log(`✅ Installed agent ${entry} (copied)`, 'green');
            } else {
              // Minimal recursive copy for older Node versions
              const copyRecursive = (src, dst) => {
                if (!fs.existsSync(dst)) fs.mkdirSync(dst);
                const items = fs.readdirSync(src);
                items.forEach(i => {
                  const s = path.join(src, i);
                  const d = path.join(dst, i);
                  const sStat = fs.statSync(s);
                  if (sStat.isDirectory()) copyRecursive(s, d);
                  else fs.copyFileSync(s, d);
                });
              };
              copyRecursive(srcPath, destPath);
              log(`✅ Installed agent ${entry} (copied recursive)`, 'green');
            }
          }
        } else if (stat.isFile()) {
          // Single file agent (rare) - symlink or copy
          try {
            fs.symlinkSync(srcPath, destPath);
            log(`✅ Installed agent file ${entry} (symlink)`, 'green');
          } catch (symlinkErr) {
            fs.copyFileSync(srcPath, destPath);
            log(`✅ Installed agent file ${entry} (copy)`, 'green');
          }
        }

        installedAgents.push(entry);
      } catch (err) {
        log(`❌ Failed to install agent ${entry}: ${err.message}`, 'red');
      }
    });
  } else {
    log('✓  No agents directory in package (skipping)', 'blue');
  }

  // 3. Create docs directory structure
  if (!fs.existsSync(SLICING_DOCS_DIR)) {
    fs.mkdirSync(SLICING_DOCS_DIR, { recursive: true });
    log('✅ Created docs/slicing-analysis directory', 'green');
  } else {
    log('✓  docs/slicing-analysis already exists', 'blue');
  }

  // 4. Update .gitignore if it exists
  const gitignorePath = '.gitignore';
  const defaultIgnoreEntries = [
    '\n# Increments Slicer',
    'docs/slicing-analysis/',
    '.claude/'
  ];

  if (fs.existsSync(gitignorePath)) {
    const gitignore = fs.readFileSync(gitignorePath, 'utf8');
    let needsUpdate = false;
    defaultIgnoreEntries.forEach(entry => {
      if (!gitignore.includes(entry.trim())) {
        fs.appendFileSync(gitignorePath, entry + '\n');
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      log('✅ Updated .gitignore', 'green');
    } else {
      log('✓  .gitignore already configured', 'blue');
    }
  } else {
    // Create .gitignore if it doesn't exist
    fs.writeFileSync(gitignorePath, defaultIgnoreEntries.join('\n') + '\n');
    log('✅ Created .gitignore', 'green');
  }

  // 5. Create a README in slicing-analysis if it doesn't exist
  const readmePath = path.join(SLICING_DOCS_DIR, 'README.md');
  if (!fs.existsSync(readmePath)) {
    const commandsList = installedCommands.length ? installedCommands.map(c => `- /${c}`).join('\n') : '- /slice'
    const agentsList = installedAgents.length ? installedAgents.map(a => `- ${a}`).join('\n') : '- bokata-slicer'
    const readmeContent = `# Slicing Analysis Documents

This directory contains vertical slicing analysis documents generated by Increments Slicer.

## Commands installed

${commandsList}

## Agents available

${agentsList}

## Usage

Run one of the commands above in Claude Code to generate analysis. Example:

\`/slice Feature: Your feature description\`

## Output

Each analysis generates a markdown document with:
- Complete feature/project breakdown
- Walking Skeleton suggestion
- Multiple implementation paths
- Decision guide
- Selection matrix

## Git

These analysis documents are ignored by default (see .gitignore). If you want to commit them, remove the entry from .gitignore.
`;
    fs.writeFileSync(readmePath, readmeContent);
    log('✅ Created docs/slicing-analysis/README.md', 'green');
  }

  // Success summary
  log('\n✨ Installation complete!\n', 'bright');
  log('Installed commands:', 'bright');
  if (installedCommands.length) installedCommands.forEach(c => log(`  /${c}`, 'green'));
  else log('  /slice (default)', 'green');

  log('\nInstalled agents:', 'bright');
  if (installedAgents.length) installedAgents.forEach(a => log(`  ${a}`, 'green'));
  else log('  bokata-slicer (default)', 'green');

  log('\nTry a command:', 'bright');
  log('  /slice Feature: User authentication', 'blue');
  log('  /slice Project: Task management with projects and tasks\n', 'blue');

  log('Output location:', 'bright');
  log('  ./docs/slicing-analysis/\n', 'blue');

  log('Need help? Check:', 'bright');
  log('  https://github.com/abrahamvallez/increments-slicer\n', 'blue');
}

// Run if called directly
if (require.main === module) {
  try {
    main();
  } catch (err) {
    log(`\n❌ Installation failed: ${err.message}`, 'red');
    log(`\nPlease report this issue at: https://github.com/abrahamvallez/increments-slicer/issues\n`, 'yellow');
    process.exit(1);
  }
}

module.exports = { main };
