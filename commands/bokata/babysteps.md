---
name: bokata:babysteps
description: "Generates a 'Baby Steps' ToDo list for a single feature by analyzing steps and increments"
allowed-tools: Read, Write, Bash(rm)
---

# BOKATA:BABYSTEPS - Single Feature Orchestrator

Orchestrates the decomposition and planning for a **single feature**.
It takes a feature definition, identifies steps and increments interactively (using temporary context), and produces a prioritized development list.

# INPUT FORMAT

```bash
/bokata:babysteps ./docs/slicing-analysis/my-feature.md "Feature 1"
```

Arguments:
- Arg 1: Path to markdown file with features backbone
- Arg 2: (Optional) Specific feature to analyze (e.g., "Feature 1")

# ORCHESTRATION WORKFLOW

## Phase 0: Context Preparation

1.  **Identify Input File**: [Argument 1] - absolute or relative path
2.  **Identify Target Feature**: [Argument 2] - optional feature filter
3.  **Create Temporary Context**:
    - Use Read tool to load content from input file
    - Use Write tool to create `./temp_analysis.md` with the content
    - If Argument 2 provided, extract only that feature's section

## Phase 1: Step Analysis

Invoke `step-analyzer-specialist` on the temporary file to generate steps.

- **Load**: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/step-analyzer-specialist.md`
- **Context**: `file_path` = `./temp_analysis.md`, `user_task` = "ALL" (Iterate through all found user tasks)
- **Action**: Append output `### Steps` to `./temp_analysis.md`
- **STRICTLY follow agent output format**: DO NOT add analysis not specified in agent instructions."

## Phase 2: Increment Generation

Invoke `increment-generator-specialist` on the temporary file to generate options.

- **Load**: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/increment-generator-specialist.md`
- **Context**: `file_path` = `./temp_analysis.md`
- **Action**: Append output `### Incremental Options` to `./temp_analysis.md`
- **STRICTLY follow agent output format**: DO NOT add analysis not specified in agent instructions."

## Phase 3: Baby Steps Synthesis

Invoke `baby-steps-specialist` to create the ToDo list.

- **Load**: `${CLAUDE_PLUGIN_ROOT}/agents/bokata/baby-steps-specialist.md`
- **Context**: `input_file` = `./temp_analysis.md`
- **Action**: Write the agent's output DIRECTLY to `OUTPUT_FILE`.
- **STRICTLY follow agent output format**: DO NOT add analysis not specified in agent instructions."

## Phase 4: Cleanup

1.  **Remove Temporary Context**:
    - Use Bash tool: `rm ./temp_analysis.md`

2.  **Notify User**:
    - Report the output file path where the Baby Steps ToDo list was generated
