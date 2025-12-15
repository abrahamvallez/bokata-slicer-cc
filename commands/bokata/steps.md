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
2. Loads specialist: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/step-analyzer-specialist.md`
3. Decomposes: Each feature into 3-7 steps covering UI → Logic → Data
4. Modifies file: Appends `### Steps` sections under each feature

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

# NOTES

- File is both input and output
- Appends results, doesn't overwrite
- Steps are sequential and coherent
- 3-7 steps per feature (quality requirement)
- All technical layers are represented
