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

1. **Validate** file exists and has context information
2. **Load** specialist agent: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/feature-backbone-specialist.md`
3. **Execute** agent with `<input_file>` parameter
4. **Capture** agent's structured output (Features Backbone section)
5. **Write** captured output to file using Write tool, appending to existing content

**Note:** Agent only reads and returns output. This command handles file writing.

# VALID ACTORS

User, Player, Coach, Admin, System, Customer, Manager, Developer, etc.

# NEXT STEPS

After backbone extraction:
```bash
/bokata:steps ./analysis.md              # Decompose features into steps
/bokata ./analysis.md                    # Run full orchestrator
```