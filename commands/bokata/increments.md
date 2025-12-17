---
description: Generate incremental implementation options for each step
---

# BOKATA:INCREMENTS - Incremental Option Generator Specialist

Generates 5-10 incremental implementation options per step using 20+ breakdown strategies.

# INPUT FORMAT

```bash
/bokata:increments ./path/to/analysis.md
```

Takes a markdown file with:
- Features Backbone section
- Steps Analysis sections
- Quality attributes for each step

# EXECUTION

1. Validates: File has features, steps, and quality attributes
2. Loads specialist: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/increment-generator-specialist.md`
3. Generates: 5-10 incremental options per step using breakdown strategies
4. Modifies file: Appends `### Incremental Options` sections under each step

# QUALITY REQUIREMENTS

- 5-10 incremental options per step (enforced)
- All REQUIRES/PROVIDES/COMPATIBLE WITH specified
- Multiple strategies applied across options
- Clear rationale for each

# NEXT STEPS

After increment generation for further analysis:
```bash
/bokata:paths ./analysis.md              # Generate implementation paths
/bokata:matrix ./analysis.md             # Generate selection matrix
```
