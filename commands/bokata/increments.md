---
description: Generate incremental implementation options for each step
---

# BOKATA:INCREMENTS - Incremental Option Generator Specialist

Generates MIN 3 incremental implementation options per step using breakdown strategies.

# INPUT FORMAT

```bash
/bokata:increments ./path/to/analysis.md
```

Takes a markdown file with:
- Features Backbone section (User Tasks)
- Steps Analysis sections

# EXECUTION

1. Validates: File has User Tasks and Steps
2. Loads specialist: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/increment-generator-specialist.md`
   - Passes: file_path
3. Captures: Incremental options markdown output from specialist
4. Writes: Appends output to file under each step as `### Incremental Options`
5. Verifies: Incremental Options sections now exist in file

# QUALITY REQUIREMENTS

- MIN 3 incremental options per step (no maximum)
- All REQUIRES/PROVIDES/COMPATIBLE WITH specified where necessary
- Includes checkbox checkboxes for implementation tracking

# NEXT STEPS

After increment generation:
```bash
/bokata:paths ./analysis.md              # Generate implementation paths
/bokata:bokata ./analysis.md             # Run full orchestrator
```
