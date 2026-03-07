# Research Guide: Feature Backbone

Use this guide to answer domain questions before generating the backbone.
Document your answers inline and mark unresolved items as `UNRESOLVED: <default used>`.

---

## 1. Vocabulary & Terminology

**Questions to answer:**
- What are the domain-specific terms this project uses? (e.g., "player" vs "user", "match" vs "game")
- Which terms are preferred and which should be avoided for consistency?
- Are there existing conventions in the codebase or docs that define the vocabulary?

**Research actions:**
- Check for these files in order and read only those that exist: `CLAUDE.md`, `AGENTS.md`, `README.md`, `PRD.md`, `docs/PRD.md`, then any `docs/**/*architecture*.md` or `docs/**/*.adr.md`
- Scan existing code/docs for recurring terminology patterns

---

## 2. Actors & Roles

**Questions to answer:**
- Who are all the actors in this system? (not just the primary user)
- Are there non-obvious actors? (Admin, Guest, System, External API, Webhook, Scheduler)
- What can each actor do that others cannot?
- Are there role hierarchies or permission levels?

**Research actions:**
- Look for auth/permission configurations
- Check for admin panels or management interfaces
- Identify system-triggered workflows (notifications, state machines)

---

## 3. Domain Benchmarking

**Questions to answer:**
- What analogous systems exist in this domain? (for feature completeness reference)
- What are the standard features users expect in this type of application?
- Are there any features commonly present in competitors that should be explicitly excluded here?

**Research actions:**
- For each domain, identify 2-3 reference systems
- List the "table stakes" features for this domain
- Flag any missing standard features as risks

---

## 4. Scope Confirmation

**Questions to answer:**
- What is explicitly IN scope for this initiative?
- What is explicitly OUT of scope? (document to avoid scope creep)
- What is ambiguous and needs clarification from the user?

**Format:**
```
IN SCOPE: [list confirmed capabilities]
OUT OF SCOPE: [list confirmed exclusions]
AMBIGUOUS: [list items needing clarification — will surface in Phase 0a]
```

---

## 5. Dependency & Risk Mapping

**Questions to answer:**
- Which features depend on external systems, APIs, or third-party services?
- Which features have the most unknowns or technical uncertainty?
- Are there features that block others from being developed independently?

**Format:**
```
HIGH RISK: [Feature name] — reason: [unknown/external dependency/complexity]
MEDIUM RISK: [Feature name] — reason: [...]
EXTERNAL DEPS: [Feature name] → [external system/API]
```

---

## Research Output Format

After completing research, document findings as:

```markdown
## Feature Research Summary

**Domain vocabulary:** [key terms decided]
**Actors confirmed:** [list all actors]
**Scope boundary:** [in/out/ambiguous]
**Key risks:** [list high-risk items]
**Benchmark reference:** [analogous systems used]
**Unresolved items:** [UNRESOLVED: X — defaulting to Y]
```
