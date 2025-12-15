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

# OUTPUT FORMAT

For each step, appends:

```markdown
#### Incremental Options

**Option 1: [Name]** ⭐ (Simplest)
- Description: [What it does]
- REQUIRES: [External dependencies or "None"]
- PROVIDES: [Capabilities offered]
- COMPATIBLE WITH: [Other options that work with this]
- Strategy: [Which strategy was used]

**Option 2: [Name]**
- Description: [What it does]
- REQUIRES: [Dependencies]
- PROVIDES: [Capabilities]
- COMPATIBLE WITH: [Compatible options]
- Strategy: [Strategy used]

...

**Option N: [Name]**
[Same format]
```

# BREAKDOWN STRATEGIES

20+ strategies including:
- Start with outputs → Hardcode basic → Add configuration → Make dynamic
- Zero/One/Many → Handle one → Handle multiple
- Dummy to dynamic → Static → Dynamic
- Workflow simplification → Skip optional steps
- User segment narrowing → Target specific users
- Capacity-based splitting → Limit initial capacity
- Extract basic utility → Core only
- Defer edge cases → Happy path first
- Manual before automated → Manual first → Automation
- And more...

# QUALITY REQUIREMENTS

- 5-10 incremental options per step (enforced)
- First option marked ⭐ (simplest)
- All REQUIRES/PROVIDES/COMPATIBLE WITH specified
- Multiple strategies applied across options
- Clear rationale for each

# NEXT STEPS

After increment generation:
```bash
/bokata ./analysis.md                    # Run full orchestrator to compose Walking Skeleton
```

Or for further analysis:
```bash
/bokata:paths ./analysis.md              # Generate implementation paths
/bokata:matrix ./analysis.md             # Generate selection matrix
```

# NOTES

- File is both input and output
- Appends results, doesn't overwrite
- Each option is independently deployable
- Dependencies and compatibility tracked
- No effort/value/risk scoring in this phase
