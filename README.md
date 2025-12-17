# Bokata: A Prompt System for Task Decomposition and Vertical Slicing

**Bokata** is a prompt engineering framework designed to guide Large Language Models (LLMs) in the task of decomposing complex software requirements into incremental and actionable development plans.

This repository does not contain an executable application, but rather a set of "prompts" (instructions) in Markdown format that orchestrate a software analysis and design process.

## Core Concepts

The system is based on the interaction of three main components:

1.  **Commands (`/commands`):** These are the system's entry points. A "command" is a high-level prompt that initiates a workflow. The user loads the content of a command into the LLM along with the description of their project or feature.
2.  **Specialist Agents (`/agents`):** These are "role prompts" that turn the LLM into a specialist with a very specific task (e.g., analyzing steps, generating options, exploring the project). They are coordinated by a main agent, the **Orchestrator**.
3.  **"Bokata Slicer" Methodology:** Inspired by vertical slicing techniques like the "Hamburger Method," the goal is to produce software increments that are small, functional end-to-end, and deliver real value to the user at each step.

## Repository Structure

-   `📁 /agents`: Contains the role definitions for each specialist agent. The `orchestrator.md` is the main agent that directs the workflow.
-   `📁 /commands`: Contains the main prompts that act as entry points to start an analysis.

## How to Use

The use of this system is conceptual and is performed within the interface of an advanced language model (such as Google Gemini, Claude, etc.). The general process is as follows:

1.  **Select a Command:** Choose a prompt from the `/commands` directory. For example, `commands/bokata/bokata.md` for a full project analysis.
2.  **Load the Prompt:** Copy and paste the entire content of the command file into your LLM's chat window.
3.  **Add Context:** Immediately after the command prompt, add the description of the feature or project you want to analyze.
4.  **Execute:** Send the combined prompt to the LLM. The model will follow the "Orchestrator's" instructions, conceptually loading the specialist agents' prompts to perform the complete analysis step by step.
5.  **Result:** The LLM will generate a Markdown document with the detailed analysis, including the incremental options.

This system is designed to be an "augmented thinking" tool, where the LLM not only gives an answer but follows a structured and transparent process to arrive at it.

## License

This project is under the MIT License. You can use, modify, and distribute it freely. For more details, see the `LICENSE` file.
