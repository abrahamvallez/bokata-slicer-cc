# Research Guide: Feature Slicer

Use this guide before decomposing a Feature into Steps and Increments.
Document answers inline. Mark unresolved items as `UNRESOLVED: <default used>`.

---

## 1. Existing Codebase Patterns

**Questions to answer:**
- What patterns already exist in the codebase for this type of decomposition?
- Are there similar features already implemented that can be referenced?
- What naming conventions, file structures, or module boundaries are already established?

**Research actions:**
- Use Glob/Grep to find analogous features in the codebase
- Read existing implementations for similar UI → Logic → Data → Integration flows
- Identify reusable abstractions or utilities already present

---

## 2. Available Libraries & Frameworks

**Questions to answer:**
- Which libraries/frameworks are already installed that trivialize certain increment options?
- Are there state management solutions already in use?
- Are there UI component libraries that reduce frontend step complexity?
- Are there ORM/query layers that simplify Data steps?

**Research actions:**
- Read `package.json`, `Cargo.toml`, `go.mod`, or equivalent
- Identify key libraries that affect what's "simple" vs "complex" for this feature

---

## 3. Architecture Layer Requirements

**Questions to answer:**
- Which layers (UI / Logic / Data / Integration) are ALWAYS required for this tech stack?
- Are there mandatory middleware layers? (auth, validation, logging, error handling)
- Are there layers that can be skipped for certain increment options?
- What is the minimum viable implementation that touches all required layers?

**Format:**
```
ALWAYS REQUIRED: [layers list]
OPTIONAL: [layers with conditions]
WALKING SKELETON LAYERS: [minimum set for end-to-end flow]
```

---

## 4. Constitution Constraints

**Questions to answer:**
- What patterns are REQUIRED or PROHIBITED according to project docs?
- Are there architectural decisions that restrict certain increment options?
- Are there performance requirements that affect which simplest option is acceptable?

**Research actions:**
- Run `bash .claude/agents/scripts/find-project-context.sh` to discover which project docs exist, then read only those
- From whichever exist, extract relevant `Patterns Required`, `Patterns Prohibited`, and tech stack constraints

---

## 5. Security Implications

**Questions to answer:**
- What are the security implications of the SIMPLEST proposed increment options?
- Do the simplest options introduce SQL injection, XSS, IDOR, or auth bypass risks?
- Are there data validation requirements that must appear even in baby steps?
- Are there secrets or sensitive data flows that need protection from step 1?

**Format:**
```
SECURITY RISK: [option] — risk: [type] — mitigation: [required even in simple version]
SAFE DEFAULTS: [security measures that must be in all increment options]
```

---

## Research Output Format

After completing research, document as:

```markdown
## Slicer Research Summary: [Feature Name]

**Existing patterns:** [relevant codebase patterns found]
**Key libraries:** [libraries that simplify specific steps]
**Required layers:** [always required for this stack]
**Project constraints:** [relevant rules from CLAUDE.md/AGENTS.md/PRD/constitution or NONE if no docs found]
**Security notes:** [risks in simple options + required mitigations]
**Unresolved:** UNRESOLVED: X — defaulting to Y
```
