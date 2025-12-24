---
description: Extract and identify features backbone using Story Mapping (Feature-UserTask hierarchy)
---

# BOKATA:BACKBONE - Features Backbone Specialist

Analyzes project context and extracts the core features backbone representing the user journey using User Story Mapping (Feature → User Task hierarchy).

# INPUT FORMAT

```bash
/bokata:backbone ./path/to/analysis.md
```

Takes a markdown file with:
- Project/context information
- Functional requirements

# EXECUTION

1. Validates: File exists and has context information
2. Loads specialist: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/story-mapping-backbone-specialist.md`
   - Passes: file_path and context data
3. Captures: Features backbone markdown output from specialist
4. Writes: Appends output to file as `## Features Backbone` section
5. Verifies:
   - `## Features Backbone` section exists
   - Features follow [Actor] [Action] format
   - User Tasks follow [Actor] [Action] format
   - MIN 2 Features, MIN 3 User Tasks per Feature

# NEXT STEPS

After backbone extraction:
```bash
/bokata:steps ./analysis.md              # Decompose User Tasks into steps
/bokata:bokata ./analysis.md             # Run full orchestrator
```
