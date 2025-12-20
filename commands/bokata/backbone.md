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
2. Loads specialist: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/feature-backbone-specialist.md`
   - Passes: file_path and context data
3. Captures: Feature backbone markdown output from specialist
4. Writes: Appends output to file as `## Features Backbone` section
5. Verifies: Features Backbone section now exists in file

# VALID ACTORS

User, Player, Coach, Admin, System, Customer, Manager, Developer, etc.

# NEXT STEPS

After backbone extraction:
```bash
/bokata:steps ./analysis.md              # Decompose features into steps
/bokata ./analysis.md                    # Run full orchestrator
```
