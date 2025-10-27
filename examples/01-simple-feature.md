# Example 1: Simple Feature Analysis

## Input

```
/bokata Feature: User password reset via email
```

## Output Overview

A simple feature that typically takes 8-12 minutes to analyze.

### Executive Summary

| Metric | Value |
|--------|-------|
| **Feature** | User password reset via email |
| **Type** | Single feature |
| **Total Steps** | 4 |
| **Total Increments** | 32 |
| **Walking Skeleton** | 4 increments (~4-5 hours) |
| **Analysis Time** | ~10 minutes |

### Feature Breakdown

**Feature:** User can reset their password by requesting an email and verifying a link

**Steps:**
1. **UI - Reset Request Form** - User enters email
2. **Logic - Email Generation** - System generates reset link
3. **Logic - Email Delivery** - System sends reset email
4. **Data - Password Update** - User sets new password via link

### Example Steps & Increments (with Dependencies)

**Step 1: Reset Request Form**

| # | Increment | Requires | Provides | Compatible With |
|---|-----------|----------|----------|-----------------|
| 1.1 | ⭐ Simple form | None | Email input field | 2.1, 3.1 |
| 1.2 | Form with validation | Client-side logic | Validated email | 2.2 |
| 1.3 | Form with rate limiting | Backend check | Rate limit tokens | 2.3 |

**Step 2: Email Generation & Delivery**

| # | Increment | Requires | Provides | Compatible With |
|---|-----------|----------|----------|-----------------|
| 2.1 | ⭐ Console logging | None | Log output | 1.1, 4.1 |
| 2.2 | Hardcoded email body | Email service | SMTP ready | 1.2, 3.2, 4.2 |
| 2.3 | Dynamic templates | Email service | Template system | 1.3, 3.3, 4.3 |

**Step 3: Password Validation & Update**

| # | Increment | Requires | Provides | Compatible With |
|---|-----------|----------|----------|-----------------|
| 3.1 | ⭐ Simple update | None | Password changed | 1.1, 2.1 |
| 3.2 | Hash + validate | Crypto lib | Secure hash | 1.2, 2.2 |
| 3.3 | Full security suite | Crypto + policy | Full compliance | 1.3, 2.3 |

### Walking Skeleton

```
**Selected Increments (all client-side/mock):**
├── Step 1: 1.1 - Simple form (REQUIRES: None)
├── Step 2: 2.1 - Console logging (REQUIRES: None)
└── Step 3: 3.1 - Simple update (REQUIRES: None)

✅ All REQUIRES satisfied
✅ All increments compatible
✅ Fully deployable
✅ Timeline: ~4-5 hours
```

### Dependency Analysis

**Valid Implementation Paths:**

```
Path A (Client-side, 5 hours):
1.1 + 2.1 + 3.1
- Purely for demo/learning
- No external dependencies
- Fully client-side

Path B (With Email Service, 8 hours):
1.2 + 2.2 + 3.2
- Real email sending
- Hashed passwords
- Production-ready foundation

Path C (Full Security, 12 hours):
1.3 + 2.3 + 3.3
- Advanced templates
- Rate limiting
- Full policy enforcement
```

### Selection Matrix (excerpt)

| ID | Increment | Requires | Effort | Value | Risk |
|----|-----------|----------|--------|-------|------|
| 1.1 | Simple form | None | 1 | 2 | 1 |
| 1.2 | Form + validation | Logic | 2 | 3 | 1 |
| 2.1 | Console log | None | 1 | 1 | 0 |
| 2.2 | Email service | Service | 3 | 4 | 1 |
| 3.1 | Simple update | None | 1 | 2 | 2 |
| 3.2 | Hash + validate | Crypto | 2 | 4 | 1 |

---

## Key Insights

✅ **Zero-dependency path available** - Can prototype in minutes with Path A
✅ **Clear upgrade path** - Path A → B → C with compatible increments
✅ **Security vs Speed tradeoff** - Choose based on priorities
✅ **Well-defined dependencies** - Each increment clearly states external needs

## Typical Usage

1. **Day 1:** Ship Path A for UX validation
2. **Day 2-3:** Integrate email service (Path B)
3. **Day 4+:** Add security features (Path C)

---

This simple feature demonstrates how even straightforward flows benefit from explicit dependency tracking, enabling teams to deploy early and iterate confidently.
