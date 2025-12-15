---
description: Extract and identify features backbone from project context
---

# BOKATA:BACKBONE - Features Backbone Specialist

Analyzes project context and extracts the core features backbone representing the user journey.

# INPUT FORMAT

```bash
/bokata:backbone ./path/to/analysis.md
```

Takes a markdown file with:
- Project/context information
- Feature descriptions (if available)

# EXECUTION

1. Validates: File exists and has context information
2. Loads specialist: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/feature-backbone-specialist.md`
3. Extracts: Feature backbone using Actor+Action naming convention
4. Modifies file: Appends `## Features Backbone` section

# OUTPUT FORMAT

The specialist appends to the file:

```markdown
## Features Backbone

All features follow Actor+Action format:

### Feature 1: [Actor] [Action]
[Description]

### Feature 2: [Actor] [Action]
[Description]

...
```

# VALID ACTORS

User, Player, Coach, Admin, System, Customer, Manager, Developer, etc.

# NEXT STEPS

After backbone extraction:
```bash
/bokata:steps ./analysis.md              # Decompose features into steps
/bokata ./analysis.md                    # Run full orchestrator
```

# NOTES

- File is both input and output
- Appends results, doesn't overwrite
- Enforces Actor+Action naming convention
- Extracts from existing context sections
