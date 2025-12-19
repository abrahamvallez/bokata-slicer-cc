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

1. Validates: File has features, steps, and quality attributes
2. Loads specialist: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/increment-generator-specialist.md`
   - Passes: file_path and analysis data
3. Captures: Incremental options markdown output from specialist
4. Writes: Appends output to file under each step's section
5. Verifies: Incremental Options sections now exist in file

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
