# Base Rules for 1on1 Agents

Shared formatting and language rules applied to all three output documents (summary, analysis, coaching).

---

## Language

Use the **same language as the transcript**. If the user explicitly specifies a language when invoking, use that language instead.

The orchestrator must detect the transcript language and pass it to all sub-prompts as a `language` parameter.

Examples:
- Transcript in Spanish → all output files in Spanish
- Transcript in English → all output files in English
- User says "generate in French" → all output files in French regardless of transcript language

---

## Timestamps

Timestamps in the transcript may use `M:SS`, `MM:SS` or `H:MM:SS` format. **Do not convert them**: use the timestamp exactly as it appears in the transcript. Never convert to seconds or any other unit.

### How to find the timestamp

The timestamp is always in the **speaker turn header line** — the line that introduces who is speaking:

- Format `M:SS - Speaker Name` → use `[M:SS]`
- Format `[HH:MM:SS] Speaker:` → use `[HH:MM:SS]`
- Format `Speaker (HH:MM:SS):` → use `[HH:MM:SS]`

Examples:
- Turn header `4:49 - Brais: ...` → reference: `[4:49]`
- Turn header `[00:01:10] Laura:` → reference: `[00:01:10]`
- Turn header `17:30 - Speaker:` → reference: `[17:30]`

Every reference to a moment in the meeting must include the original timestamp in brackets immediately after the quoted text.

---

## Verbatim Quotes

Quotes must be **exactly identical** to the transcript text — no paraphrasing, no spelling corrections, no grammar fixes, even if the speech is informal, interrupted, or contains filler words. This is especially important with informal or spoken transcripts where sentences may be incomplete.

Use the format:

```
> "literal text from the transcript" — Speaker Name [MM:SS]
```

Where `[MM:SS]` is the timestamp from the **speaker turn header** (not from any URL or annotation). If the transcript includes the speaker name before their text (e.g. `4:49 - Brais: "Text..."`) extract only the text for the quote and the name for the attribution.

If a quote includes speech artifacts ("esto... bueno, o sea"), keep them as-is. Do not clean up the quote.

---

## Action Items

```
- [ ] @OwnerName: concise description of the action
```

- `@OwnerName` uses the real participant name (e.g. `@Carlos`, `@Ana`).
- If the owner is unclear, use `@Pending`.

---

## Strict Separation: Internal Analysis vs. Final Output

The detailed analysis performed internally to identify topics, quotes, risks, and coaching questions is **only for internal thinking**. This analysis **must NEVER appear in the final output**.

The final output consists **only** of:
1. Meeting Summary — shareable with the team member
2. Meeting Analysis — Manager only
3. Socratic Coaching — Manager only

---

## Long Transcripts

If a transcript exceeds ~4000 tokens, prioritise:
1. Quotes and timestamps from the most relevant moments (agreements, blockers, decisions)
2. Topics that generated the most substantive dialogue
3. All explicit action items regardless of length

---

## 1on1 Type Taxonomy

Classify every meeting into one primary type before generating outputs. This affects which sections are emphasised in the analysis and which coaching questions are prioritised.

| Type | Primary signals |
|---|---|
| `check-in` | Emotional/motivational state, wellbeing, no specific agenda, relationship building |
| `career` | Career goals, promotion, IDP, skill development, growth path, strengths/gaps |
| `unblocking` | Blockers, process problems, delivery/execution issues, dependencies, priorities |
| `feedback` | Formal or informal feedback exchange (manager→team member, team member→manager, or both) |
| `conflict` | Interpersonal conflict, incident post-mortem, team tensions, role/value disagreements |
| `onboarding` | First weeks in the role or team, role clarity, team integration, expectations setting |
| `mixed` | Substantive content in 2+ types — record both dominant types, e.g. `mixed: unblocking + feedback` |

### Type-specific focus areas

When generating analysis and coaching documents, emphasise the sections most relevant to the detected type:

| Type | Sections to emphasise |
|---|---|
| `check-in` | Psychological Safety · Career & Development · Coaching Style |
| `career` | Career & Development · Coaching Style (Agency vs. Dependency) · RC Analysis |
| `unblocking` | Problem Classification · Previous Commitments · Agency vs. Dependency |
| `feedback` | Radical Candor Analysis · Feedback Quality · Psychological Safety |
| `conflict` | Conflict Analysis · Radical Candor Analysis · Psychological Safety |
| `onboarding` | Career & Development · Psychological Safety · Meeting Effectiveness |
| `mixed` | Cover all relevant sections proportionally |

---

## Framework References

All theoretical frameworks used in analysis and coaching (Radical Candor, SBI, Thomas-Kilmann, Psychological Safety, GROW, Situational Leadership, etc.) are defined in full in:

→ [framework-references.md](./framework-references.md)

**Do not fetch URLs at runtime.** Use the frameworks as known conceptual foundations for internal reasoning only.
