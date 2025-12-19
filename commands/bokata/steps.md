---
description: Decompose features into actionable steps with quality attributes
---

# BOKATA:STEPS - Step Analyzer Specialist

Decomposes features into technical, business, and logical steps covering all layers.

# INPUT FORMAT

```bash
/bokata:steps ./path/to/analysis.md
```

Takes a markdown file with:
- Features Backbone section (from `/bokata:backbone`)
- Or direct feature descriptions

# EXECUTION

1. Validates: File has feature information
2. Loads specialist: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/step-analyzer-specialist.md`
   - Passes: file_path and feature data
3. Captures: Steps markdown output from specialist
4. Writes: Appends output to file under each feature as `### Steps` sections
5. Verifies: Steps sections now exist for all features in file

# OUTPUT FORMAT

For each feature, appends:

```markdown
### [Feature Name]

#### Steps

**Step 1: [Name]** - [Layer/Type]
- Description: [What happens]
- Quality Attributes: [Performance, Security, UX, etc.]
- Dependencies: [What it needs]

**Step 2: [Name]** - [Layer/Type]
...

```

# STEP LAYERS

- **UI Layer:** User interface, interactions, forms, navigation
- **Logic Layer:** Business rules, calculations, workflows
- **Data Layer:** Storage, retrieval, persistence, integration

# NEXT STEPS

After step analysis:
```bash
/bokata:increments ./analysis.md         # Generate implementation options
/bokata ./analysis.md                    # Run full orchestrator
```
