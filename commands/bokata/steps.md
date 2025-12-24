---
description: Decompose User Tasks into actionable steps with quality attributes
---

# BOKATA:STEPS - Step Analyzer Specialist

Decomposes User Tasks into technical, business, and logical steps covering all layers.

# INPUT FORMAT

```bash
/bokata:steps ./path/to/analysis.md
```

Takes a markdown file with:
- Features Backbone section (containing User Tasks)

# EXECUTION

1. Validates: File has User Task information in Features Backbone
2. Loads specialist: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/step-analyzer-specialist.md`
   - Passes: file_path
3. Captures: Steps markdown output from specialist
4. Writes: Appends output to file under each User Task as `### Steps` sections
5. Verifies: Steps sections now exist for all User Tasks in file

# OUTPUT FORMAT

For each User Task, appends:

```markdown
### Steps

#### Step 1: [Name]
**Description:** [What this step accomplishes]
**Quality Attributes:**
- **Quality factors:** [Performance, etc.]
- **Tradeoffs:** [Tradeoffs]
- **Implementation options:** [Options]
```

# NEXT STEPS

After step analysis:
```bash
/bokata:increments ./analysis.md         # Generate implementation options
/bokata:bokata ./analysis.md             # Run full orchestrator
```
