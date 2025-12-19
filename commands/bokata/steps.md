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

1. **Validate** file has Features Backbone section
2. **Load** specialist agent: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/step-analyzer-specialist.md`
3. **Execute** agent with `<input_file>` parameter (processes ALL features in one pass)
4. **Capture** agent's structured output (Steps sections for ALL features)
5. **Write** captured output to file using Write tool, appending under each feature

**Note:** Agent only reads and returns output. This command handles file writing.

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
