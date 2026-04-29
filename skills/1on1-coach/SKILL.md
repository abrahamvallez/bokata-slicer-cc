---
name: 1on1-coach
description: 'Analyze a 1on1 meeting transcript and generate three output documents: a shareable summary for the team member, a private meeting analysis, and Socratic coaching questions for the manager. Use this skill whenever the user mentions a 1on1, one-on-one, manager meeting, team meeting transcript, or feedback session, or wants to process, summarize, or analyze any meeting between a manager and a team member — even if they do not use the word "transcript" or "1on1" explicitly. Also use it when the user provides a Fathom, Otter, or similar transcript file.'
argument-hint: 'Path to transcript (e.g. transcripts/2026-04-28-carlos.txt). Optionally add: lang=es to force output language.'
---

# 1on1 Meeting Analyzer

Analyzes a 1on1 transcript and produces three output files using portable prompts in `./references/`.

## When to Use

- Processing a 1on1 meeting transcript
- Generating a shareable summary for the team member
- Creating private coaching material for the manager

## Procedure

### Step 1 — Read the transcript

Read the transcript file the user indicated. If no file was specified, ask for the path.
Verify the file exists and has content. If it is empty or missing, inform the user and stop.

### Step 2 — Extract metadata

From the transcript content, extract:
- **Meeting date**: look for an explicit date in the text or filename. If not found, use today's date in `YYYY-MM-DD` format.
- **Team member name**: the participant who is NOT the manager.
- **Manager name**: the other participant (the one conducting the 1on1).
- **Base filename**: `{date}-{dev-name-lowercase-no-spaces}` (e.g. `2026-04-28-carlos`)
- **Output language**: if the user specified a language (e.g. `lang=fr`, "en español"), use that. Otherwise detect the transcript language automatically.
- **1on1 type**: classify the meeting using the type taxonomy in [base-rules.md](./references/base-rules.md). Examples: `check-in`, `career`, `unblocking`, `feedback`, `conflict`, `onboarding`, or `mixed: [type1] + [type2]`.

### Step 3 — Ensure output folders exist

Make sure these folders exist, create them if needed:
- `outputs/shareable/`
- `outputs/coaching/`

### Step 4 — Generate the three outputs

For each output, load the corresponding reference prompt and apply it to the transcript:

| Output file | Reference prompt | Audience |
|---|---|---|
| `outputs/shareable/{base-name}-summary.md` | [prompt-summary.md](./references/prompt-summary.md) | Team member (shareable) |
| `outputs/coaching/{base-name}-analysis.md` | [prompt-analysis.md](./references/prompt-analysis.md) | Manager (private) |
| `outputs/coaching/{base-name}-coaching.md` | [prompt-coaching.md](./references/prompt-coaching.md) | Manager (private) |

> Output file names always use English suffixes (`-summary`, `-analysis`, `-coaching`) regardless of the output language. Only the file **content** is translated.

Apply shared formatting and language rules from [base-rules.md](./references/base-rules.md) to all three outputs.

Pass to each prompt:
- Full transcript content
- Extracted metadata (date, developer name, manager name, base filename)
- Resolved output language
- Detected `1on1-type`

### Step 5 — Confirm results

Report to the user:

```
✅ Analysis complete for the meeting on {date} with {dev-name}. [Language: {language}]

Generated files:

📄 SHAREABLE (send to the team member):
   outputs/shareable/{base-name}-summary.md

🔒 PRIVATE (Manager only):
   outputs/coaching/{base-name}-analysis.md
   outputs/coaching/{base-name}-coaching.md
```


