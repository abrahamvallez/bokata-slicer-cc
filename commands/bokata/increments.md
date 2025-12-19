---
description: Generate incremental implementation options for each step
---

# BOKATA:INCREMENTS - Incremental Option Generator Specialist

Generates 3-5 incremental implementation options per step using 20+ breakdown strategies.

# INPUT FORMAT

```bash
/bokata:increments ./path/to/analysis.md
```

Takes a markdown file with:
- Features Backbone section
- Steps Analysis sections
- Quality attributes for each step

# EXECUTION

1. **Validate** file has Features Backbone and Steps sections
2. **Load** specialist agent: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/increment-generator-specialist.md`
3. **Execute** agent with `<input_file>` parameter (processes ALL steps in ALL features)
4. **Capture** agent's structured output (Incremental Options for ALL steps)
5. **Write** captured output to file using Write tool, appending under each step

**Note:** Agent only reads and returns output. This command handles file writing.

# QUALITY REQUIREMENTS

- 3-5 incremental options per step (enforced)
- All REQUIRES/PROVIDES/COMPATIBLE WITH specified
- Multiple strategies applied across options
- Clear rationale for each

# NEXT STEPS

After increment generation for further analysis:
```bash
/bokata:paths ./analysis.md              # Generate implementation paths
/bokata:matrix ./analysis.md             # Generate selection matrix
```
