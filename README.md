# Bokata: A Prompt System for Task Decomposition and Vertical Slicing

**Bokata** is a prompt engineering framework designed to guide Large Language Models (LLMs) in the task of decomposing complex software requirements into incremental and actionable development plans.

This repository does not contain an executable application, but rather a set of "prompts" (instructions) in Markdown format that orchestrate a software analysis and design process.

## Core Concepts

The system is based on the interaction of three main components:

1.  **Commands (`/commands`):** These are the system's entry points. A "command" is a high-level prompt that initiates a workflow. The user loads the content of a command into the LLM along with the description of their project or feature.
2.  **Specialist Agents (`/agents`):** These are "role prompts" that turn the LLM into a specialist with a very specific task (e.g., analyzing steps, generating options, exploring the project). They are coordinated by a main agent, the **Orchestrator**.
3.  **"Bokata Slicer" Methodology:** Inspired by vertical slicing techniques like the "Hamburger Method," the goal is to produce software increments that are small, functional end-to-end, and deliver real value to the user at each step.

## Repository Structure

-   `📁 /agents`: Contains the role definitions for each specialist agent.
    -   `bokata/*.md`: The specialized agents for the Bokata workflow (Orchestrator not included as a single file anymore, but concept remains).
-   `📁 /commands`: Contains the main prompts that act as entry points.
    -   `bokata/*.md`: Commands to initiate different scopes of the Bokata analysis.

## Model Recommendations & Benchmarks

Based on extensive testing, here is how different LLMs perform with the Bokata prompts:

-   **Sonnet 4.5**: Highly recommended.
    -   *Pros*: Performs well, very explanatory.
    -   *Cons*: Can be verbose (writes more output than strictly necessary), consuming more tokens. Introduction of the analysis can be slow.
-   **Gemini 3 Pro**: **Top Recommendation**.
    -   *Pros*: Follows instructions precisely, extremely fast, and produces very correct analysis.
    -   *Cons*: None significant observed.
-   **Haiku**:
    -   *Pros*: Follows instructions.
    -   *Cons*: Steps can be overly refined (too granular), and full analysis is somewhat slow.
-   **Gemini Flash**:
    -   *Pros*: Fast and correct analysis.

**Current Advice**: Use **Sonnet 4.5** for agentic workflows where explanation is key, or **Gemini 3 Pro** for speed and precision.

## Recommended Workflows

While the `bokata` command performs the entire analysis in one go, it can be token-intensive. For better control and efficiency, we recommend the following modular approach:

1.  **Phase 1: Analysis**: Start by performing a high-level analysis of your requirements. You can use the specific agent or another analysis agent for this.
2.  **Phase 2: Backbone**: Use the analysis result with the `backbone` command to generate the Story Map structure.
3.  **Phase 3: Detailing**:
    *   **Fast Track (Checklist only)**: If you only need the task checklist without deep reasoning, run the `babysteps` command directly with the Backbone output.
    *   **Deep Dive (Full Reasoning)**: For a comprehensive breakdown, execute the commands in this order:
        1.  `steps` (Decompose user tasks)
        2.  `increments` (Define slices)
        3.  `baby-steps-specialist` agent (Final refined checklist)

## How to Use

The use of this system is conceptual and is performed within the interface of an advanced language model (such as Google Gemini, Claude, etc.). The general process is as follows:

1.  **Select a Command:** Choose a prompt from the `/commands` directory. For example, `commands/bokata/bokata.md` for a full project analysis.
2.  **Load the Prompt:** Copy and paste the entire content of the command file into your LLM's chat window.
3.  **Add Context:** Immediately after the command prompt, add the description of the feature or project you want to analyze.
4.  **Execute:** Send the combined prompt to the LLM. The model will follow the instructions to perform the analysis.
5.  **Result:** The LLM will generate a Markdown document with the detailed analysis, including the incremental options.

This system is designed to be an "augmented thinking" tool, where the LLM not only gives an answer but follows a structured and transparent process to arrive at it.

## License

This project is under the MIT License. You can use, modify, and distribute it freely. For more details, see the `LICENSE` file.
