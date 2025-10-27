# Example 2: Complex Feature Analysis

## Input

```
/bokata --with-paths Feature: Real-time collaboration with conflict resolution
Context: Document editing app, React + Node.js, first WebSocket experience
```

## Output Overview

A complex feature with new technology introduces risk. Analysis with paths takes 15-20 minutes.

### Executive Summary

| Metric | Value |
|--------|-------|
| **Feature** | Real-time collaboration |
| **Complexity** | High (new WebSocket tech) |
| **Total Steps** | 6 |
| **Total Increments** | 48 |
| **Walking Skeleton** | 6 increments (~2-3 days) |
| **Analysis Time** | ~18 minutes |
| **Paths Analyzed** | 3 options (Speed, Balanced, Quality) |

### Feature Breakdown (excerpt)

**Step 1: WebSocket Connection**

| # | Increment | Requires | Provides | Compatible With |
|---|-----------|----------|----------|-----------------|
| 1.1 | ⭐ Mock connection | None | Connection object | 2.1, 3.1 |
| 1.2 | Real WebSocket | Server endpoint | Live connection | 2.2, 3.2 |
| 1.3 | Connection + retry | Server + health checks | Resilient connection | 2.3, 3.3 |

**Step 2: Data Synchronization**

| # | Increment | Requires | Provides | Compatible With |
|---|-----------|----------|----------|-----------------|
| 2.1 | ⭐ Hardcoded sync | None | Sync mock | 1.1, 4.1 |
| 2.2 | Simple merge | Server logic | Basic merge | 1.2, 4.2 |
| 2.3 | Conflict-free CRDT | Algorithm lib | Advanced sync | 1.3, 4.3 |

**Step 3: Conflict Resolution**

| # | Increment | Requires | Provides | Compatible With |
|---|-----------|----------|----------|-----------------|
| 3.1 | ⭐ "Last write wins" | None | Simple resolution | 1.1, 2.1 |
| 3.2 | Vector clocks | Sync meta | Causal ordering | 1.2, 2.2 |
| 3.3 | Automatic merging | CRDT + rules | Smart resolution | 1.3, 2.3 |

**Step 4: UI Updates**

| # | Increment | Requires | Provides | Compatible With |
|---|-----------|----------|----------|-----------------|
| 4.1 | ⭐ Full page refresh | None | Updated view | 1.1, 2.1, 3.1 |
| 4.2 | Partial updates | Change detection | Smooth updates | 1.2, 2.2, 3.2 |
| 4.3 | Optimistic updates | Local mutations | Zero-latency UX | 1.3, 2.3, 3.3 |

### Walking Skeleton (Risk Reduction Focus)

```
**Selected to minimize risk:**
├── Step 1: 1.1 - Mock WebSocket (REQUIRES: None)
├── Step 2: 2.1 - Hardcoded sync (REQUIRES: None)
├── Step 3: 3.1 - Last write wins (REQUIRES: None)
└── Step 4: 4.1 - Full page refresh (REQUIRES: None)

✅ ZERO external dependencies
✅ Proves WebSocket architecture works
✅ Allows UX/flow validation before complexity
✅ Timeline: 2-3 days (including learning)

🎯 This path reduces risk by validating basic flow
   before committing to CRDT complexity
```

### Implementation Paths

**Path A: Speed to Market (3-4 days)**
```
1.2 + 2.2 + 3.1 + 4.2
- Basic real-time with simple conflict resolution
- Acceptable for most documents
- Minimal complexity
```

**Path B: Balanced (6-8 days)**
```
1.2 + 2.2 + 3.2 + 4.3
- Vector clocks for causal ordering
- Optimistic UI updates for smoothness
- Production-ready for most scenarios
```

**Path C: Quality First (10-12 days)**
```
1.3 + 2.3 + 3.3 + 4.3
- Full CRDT with automatic merging
- Resilient connections
- Smooth, zero-latency UX
- Premium user experience
```

### Dependency Analysis

**Critical Dependencies Identified:**

```
WebSocket Connection → Must be working before:
  ├─ Data synchronization
  ├─ Conflict resolution
  └─ Real-time UI updates

Conflict Resolution strength → Determines acceptable sync model:
  ├─ Simple (3.1) → Basic sync OK (2.1, 2.2)
  ├─ Vector clocks (3.2) → Advanced sync OK (2.2, 2.3)
  └─ CRDT (3.3) → Full CRDT needed (2.3)

UI Performance → Depends on sync strategy:
  ├─ Full refresh (4.1) → Works with any sync
  ├─ Partial updates (4.2) → Needs ordered changes
  └─ Optimistic (4.3) → Requires conflict-free merge
```

### Dependency Maps for Each Path

**Path A Compatibility Map:**
```
1.2 (Real WebSocket)
├─→ 2.2 (Simple merge) ✅
│   └─→ 3.1 (Last write wins) ✅
│       └─→ 4.2 (Partial updates) ✅
All compatible, valid E2E flow
```

**Path B Compatibility Map:**
```
1.2 (Real WebSocket)
├─→ 2.2 (Simple merge) ✅
│   └─→ 3.2 (Vector clocks) ✅
│       └─→ 4.3 (Optimistic updates) ✅
All compatible, valid E2E flow with enhanced features
```

### Decision Guide

| Priority | Recommendation | Why |
|----------|---|---|
| **Ship ASAP** | Path A | Fastest with acceptable functionality |
| **Balanced** | Path B | Good mix of features and speed |
| **Premium** | Path C | Best UX, longest timeline |
| **Learning** | Walking Skeleton | Lowest risk, validates approach |

---

## Key Insights

✅ **Walking Skeleton reduces risk** - Validates WebSocket approach before complexity
✅ **Clear upgrade paths** - Each increment level builds on previous
✅ **Explicit dependencies** - Know exactly what each path requires
✅ **Three credible options** - Not just "fast" vs "good"

## Implementation Strategy

1. **Start with Walking Skeleton** (~2-3 days)
   - Validates WebSocket and basic flow
   - Gathers real user feedback
   - Identifies actual conflict patterns

2. **Gather Feedback** (~1 week)
   - How often do conflicts occur?
   - Is "last write wins" acceptable?
   - Do users notice the refresh UI?

3. **Choose Path** (Based on learnings)
   - If conflicts rare → Stay with Path A
   - If conflicts common → Upgrade to Path B
   - If premium UX critical → Commit to Path C

---

This complex feature example demonstrates how dependency tracking and multiple paths help manage risk with new technology, enabling confident decisions at each milestone.
