# Example 3: Project Analysis

## Input

```
/bokata --full

Project: Fact-CV MVP - AI-powered CV creator

Features:
1. LinkedIn authentication
2. Experience creation with AI STAR formatting
3. Experience management (list, detail, edit)
4. User dashboard

Tech: Next.js 14, React 19, TypeScript, Supabase, OpenAI
Timeline: 3 months to MVP
Priority: Quick user validation
```

## Output Overview

A multi-feature project analysis takes 35-45 minutes. The full flag includes implementation paths and decision guide.

### Executive Summary

| Metric | Value |
|--------|-------|
| **Project Type** | Multi-feature SaaS MVP |
| **Total Features** | 4 |
| **Total Steps** | 15-18 |
| **Total Increments** | 70-80 |
| **Walking Skeleton** | 4 increments (~1 day) |
| **Paths Identified** | 3 major options |
| **Analysis Time** | ~40 minutes |

### Features Breakdown

```
├── Feature 1: LinkedIn Authentication
│   ├── Step 1: UI - OAuth Button
│   ├── Step 2: Logic - OAuth Flow
│   └── Step 3: Data - Session Management
│
├── Feature 2: Experience Creation with AI
│   ├── Step 1: UI - Text Input Form
│   ├── Step 2: Logic - OpenAI Integration
│   ├── Step 3: Logic - STAR Formatting
│   └── Step 4: Data - Experience Storage
│
├── Feature 3: Experience Management
│   ├── Step 1: UI - Dashboard Layout
│   ├── Step 2: Logic - List Fetching
│   ├── Step 3: UI - Experience Cards
│   └── Step 4: Data - Detail View
│
└── Feature 4: User Dashboard
    ├── Step 1: UI - Dashboard Layout
    ├── Step 2: Logic - Data Aggregation
    └── Step 3: Data - Session Persistence
```

### Cross-Feature Walking Skeleton

```
**Minimum to Ship (1 day, ~4-6 hours):**

Feature 1 - LinkedIn Auth:
├── Step 1: 1.1 ⭐ Hardcoded "login" button (REQUIRES: None)
├── Step 2: 2.1 ⭐ Mock OAuth response (REQUIRES: None)
└── Step 3: 3.1 ⭐ In-memory session flag (REQUIRES: None)

Feature 2 - AI Experience Creation:
├── Step 1: 1.1 ⭐ Simple textarea (REQUIRES: None)
├── Step 2: 2.1 ⭐ Hardcoded STAR format (REQUIRES: None)
└── Step 3: 3.1 ⭐ localStorage storage (REQUIRES: None)

Feature 3 - Experience Management:
├── Step 1: 1.1 ⭐ Hardcoded experience list (REQUIRES: None)
├── Step 2: 2.1 ⭐ Mock data fetching (REQUIRES: None)
└── Step 3: 3.1 ⭐ Static detail view (REQUIRES: None)

Feature 4 - Dashboard:
├── Step 1: 1.1 ⭐ Simple layout (REQUIRES: None)
├── Step 2: 2.1 ⭐ Hardcoded aggregation (REQUIRES: None)
└── Step 3: 3.1 ⭐ Session check (REQUIRES: In-memory session)

✅ ZERO external dependencies
✅ Demonstrates full flow
✅ Pure frontend prototype
✅ Timeline: 1 day
✅ All features working end-to-end
```

### Implementation Paths

**Path A: Client-Side Prototype (1-2 days)**
```
All 1.1 increments (Hardcoded data, localStorage)
REQUIRES: None
PROVIDES: Complete working UX prototype
USE WHEN: Validating user flow, pitching to stakeholders
```

**Path B: Basic Backend (3-5 days)**
```
Mix of 1.2 increments (Real OAuth, basic API)
REQUIRES: Supabase setup, OpenAI API key
PROVIDES: Real authentication, basic AI functionality
USE WHEN: User testing, gathering feedback
```

**Path C: Production Ready (10-14 days)**
```
Mix of 1.3 increments (Optimized, secure, polished)
REQUIRES: Full infrastructure, security hardening
PROVIDES: Market-ready product
USE WHEN: Public launch, paying users
```

### Cross-Feature Dependency Map

```
LinkedIn Auth (Feature 1)
├─→ Required by: All other features (need user context)
├─→ Path A: Hardcoded mock (REQUIRES: None)
├─→ Path B: Real OAuth (REQUIRES: LinkedIn app)
└─→ Path C: OAuth + MFA (REQUIRES: Full setup)

AI Experience Creation (Feature 2)
├─→ Depends on: LinkedIn Auth (need user)
├─→ Path A: Hardcoded responses (REQUIRES: None)
├─→ Path B: Real OpenAI (REQUIRES: API key + credits)
└─→ Path C: Optimized OpenAI (REQUIRES: Production setup)

Experience Management (Feature 3)
├─→ Depends on: Auth + Creation
├─→ Path A: Hardcoded list (REQUIRES: None)
├─→ Path B: Database queries (REQUIRES: Supabase)
└─→ Path C: Optimized queries (REQUIRES: Indexing, caching)

Dashboard (Feature 4)
├─→ Depends on: All other features
├─→ Completes: User journey
└─→ All paths parallel to Features 1-3
```

### Validation Timeline

```
Day 1-2: Deploy Path A
├─→ Can users understand the concept?
├─→ Is the STAR format helpful?
└─→ Would they use this?

Day 3-5: Deploy Path B
├─→ Does LinkedIn OAuth work well?
├─→ Is AI formatting good enough?
└─→ Can we scale to 100 users?

Week 3-4: Choose Path C or iterate Path B
├─→ Based on actual usage data
├─→ Decide on security/feature priorities
└─→ Plan marketing launch
```

### Decision Matrix

| Scenario | Path | Reasoning |
|----------|------|-----------|
| **Investor demo next week** | A | Fastest, shows concept |
| **User testing with friends** | B | Real OAuth/AI proves value |
| **Beta launch (100 users)** | B→C | Start B, upgrade based on feedback |
| **Public launch (1000+ users)** | C | Production-ready required |

---

## Key Insights for Multi-Feature Project

✅ **Walking Skeleton crosses ALL features** - Not just one feature, but all 4 working together
✅ **Clear feature dependencies** - Auth must work before other features can rely on user context
✅ **Coordinated paths** - Path A uses all 1.1 increments, Path B uses consistent 1.2 increments, etc.
✅ **Incremental validation** - Deploy as soon as possible, gather real feedback, decide next steps
✅ **Risk management** - Start with zero dependencies, add complexity based on validation

## Recommended Approach

1. **Week 1:** Deploy Walking Skeleton (Path A)
   - Hardcoded auth, hardcoded AI, localStorage
   - Perfect for internal testing and pitching
   - ~1 day development

2. **Week 2:** Deploy Path B
   - Real OAuth integration
   - Basic AI with OpenAI
   - Real Supabase storage
   - ~3-5 days development

3. **Week 3-4:** Gather feedback
   - How do users interact with STAR format?
   - Are there bugs in real OAuth?
   - Is localStorage enough or need more?
   - What's the biggest blocker?

4. **Week 4-8:** Iterate to Path C
   - Based on user feedback
   - Security hardening
   - Performance optimization
   - Polish UX

---

This project example demonstrates how dependency tracking across multiple features enables:
- **Faster initial deployment** (1 day vs 2 weeks)
- **Risk reduction** (validate concept before big investment)
- **Clear decision points** (feedback-driven evolution)
- **Quality outcome** (deliberate paths, not rushed)
