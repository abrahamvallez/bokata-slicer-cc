# Fact-CV MVP - Vertical Slicing Analysis

**Project:** Professional Experience Documentation Platform
**Analysis Date:** October 26, 2025
**Analyzed By:** Increments Slicer

---

## Executive Summary

### Project Overview

**What:** An MVP application that allows users to document professional experiences in STAR format (Situation, Task, Action, Result) with AI assistance.

**Core Value Proposition:** Transform free-text experience descriptions into structured STAR-formatted narratives using AI, making CV/resume preparation faster and more effective.

**Tech Stack:**
- Frontend: Next.js 14+ (App Router), React 19, TypeScript, TailwindCSS, shadcn/ui
- Backend: Next.js API Routes, Supabase (PostgreSQL + Auth), OpenAI API (GPT-4o-mini)

### Analysis Metrics

| Metric | Value |
|--------|-------|
| **Features Identified** | 4 |
| **Total Steps** | 14 |
| **Total Increments** | 62 |
| **Walking Skeleton Size** | 15 increments (~13 hours / ~2 days) |
| **Minimum Viable Product** | 24 increments (~36 hours / ~5 days) |
| **Implementation Paths** | 5 options (3 weeks to 7 weeks) |

### Key Insights

1. **Walking Skeleton is achievable in 2 days** - Core UI flow can be demonstrated without real auth or AI
2. **AI integration is the highest risk** - OpenAI API call (inc 2.2.2) has effort:2, risk:3 rating
3. **Most increments are quick wins** - 54/62 increments are effort level 1 (< 1 hour)
4. **Recommended path: Speed to Market** - Given explicit priority on fast MVP delivery
5. **Critical dependencies:** LinkedIn OAuth (1.2.3) and OpenAI integration (2.2.2) are blockers

---

## Feature Breakdown

### Feature 1: LinkedIn Authentication

**User Capability:** Users can authenticate via LinkedIn OAuth to access the application

**Why It Matters:** Establishes trust (professional network), reduces signup friction, provides user profile data automatically

#### Steps & Increments

**Step 1.1: OAuth UI Integration** (5 increments)
Quality Attributes: Simple, trustworthy, fast redirect

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 1.1.1 | Hardcoded "Sign in with LinkedIn" button | 1h | Low | Low | ⭐⚡ |
| 1.1.2 | Button with mock redirect (2s delay) | 2h | Low | Low | ⚡ |
| 1.1.3 | Real LinkedIn OAuth URL redirect | 4h | Critical | Medium | 🔥🔧 |
| 1.1.4 | OAuth error handling (auth errors, states) | 3h | High | Low | 🔥 |
| 1.1.5 | "Remember me" session persistence | 2h | Medium | Low | 💎 |

**Walking Skeleton Uses:** 1.1.1 (Static button)

---

**Step 1.2: Supabase Auth Backend** (5 increments)
Quality Attributes: Secure, reliable, fast token exchange

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 1.2.1 | Manual user creation in Supabase dashboard | 30min | Low | Low | ⭐⚡ |
| 1.2.2 | OAuth callback handler (hardcoded success) | 2h | Low | Low | 🔧 |
| 1.2.3 | Real LinkedIn token exchange | 6h | Critical | High | 🔥⚠️🔧 |
| 1.2.4 | User profile sync (fetch LinkedIn data) | 4h | Medium | Low | 💎 |
| 1.2.5 | Token refresh logic | 3h | High | Medium | 🔥⚠️ |

**Walking Skeleton Uses:** 1.2.1 (Manual test user)

**Critical Blocker:** 1.2.3 is required for real authentication to work

---

**Step 1.3: Session Management** (5 increments)
Quality Attributes: Persistent, secure, transparent

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 1.3.1 | In-memory session (dev only, lost on refresh) | 1h | Low | Low | ⭐⚡ |
| 1.3.2 | localStorage session (persists on refresh) | 2h | High | Low | 🔥⚡ |
| 1.3.3 | Secure HTTP-only cookies | 4h | Critical | Low | 🔥🔒 |
| 1.3.4 | Auto-login on return (check session on load) | 2h | Critical | Low | 🔥⚡ |
| 1.3.5 | Logout functionality | 1h | High | Low | 🔥⚡ |

**Walking Skeleton Uses:** 1.3.1 (In-memory)

**Recommended for MVP:** 1.3.2, 1.3.4 (localStorage + auto-login)

---

### Feature 2: AI-Assisted Experience Creation

**User Capability:** Users can create STAR-formatted experiences with OpenAI assistance

**Why It Matters:** This is the core differentiator - transforms unstructured text into professional STAR format, saving users hours of work

#### Steps & Increments

**Step 2.1: Free-Text Input UI** (5 increments)
Quality Attributes: Simple, intuitive, with clear guidance

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 2.1.1 | Simple textarea with submit button | 1h | High | Low | ⭐🔥⚡ |
| 2.1.2 | Character counter (min 50 chars) | 1h | Medium | Low | 💎⚡ |
| 2.1.3 | Placeholder with example input | 30min | Medium | Low | 💎⚡ |
| 2.1.4 | Auto-save draft to localStorage | 2h | Medium | Low | 💎⚡ |
| 2.1.5 | Textarea with formatting hints | 2h | Low | Low | 💎 |

**Walking Skeleton Uses:** 2.1.1 (Basic textarea)

**Recommended for MVP:** 2.1.2, 2.1.3 (guide users to good input)

---

**Step 2.2: OpenAI STAR Generation** (6 increments)
Quality Attributes: Accurate, fast (<5s), structured output

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 2.2.1 | Hardcoded STAR response (predefined JSON) | 30min | Low | Low | ⭐⚡ |
| 2.2.2 | OpenAI API call with basic prompt | 3h | Critical | Medium | 🔥⚠️🔧 |
| 2.2.3 | Optimized STAR prompt (examples, structure) | 2h | Critical | Low | 🔥💎 |
| 2.2.4 | Streaming response (perceived speed) | 4h | High | Medium | 💎🚀⚠️ |
| 2.2.5 | Retry logic with fallback | 3h | High | Low | 🔥 |
| 2.2.6 | Token optimization (reduce cost) | 2h | Medium | Low | 🚀 |

**Walking Skeleton Uses:** 2.2.1 (Hardcoded response)

**Critical Blocker:** 2.2.2 is required for AI functionality

**Quality Enhancer:** 2.2.3 dramatically improves AI output quality

---

**Step 2.3: STAR Review & Edit Form** (6 increments)
Quality Attributes: Editable, clear structure, visual feedback

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 2.3.1 | Pre-filled read-only STAR display | 1h | Low | Low | ⭐⚡ |
| 2.3.2 | Editable text fields (title, S, T, A, R) | 2h | Critical | Low | 🔥⚡ |
| 2.3.3 | Field validation (require title, STAR fields) | 2h | High | Low | 🔥⚡ |
| 2.3.4 | Character limits per field | 1h | Medium | Low | 💎⚡ |
| 2.3.5 | Rich text editing (bold, italic, bullets) | 4h | Medium | Low | 💎 |
| 2.3.6 | Preview mode toggle | 2h | Medium | Low | 💎⚡ |

**Walking Skeleton Uses:** 2.3.1 (Read-only)

**Required for MVP:** 2.3.2, 2.3.3 (users must edit AI output)

---

**Step 2.4: Save to Supabase** (6 increments)
Quality Attributes: Reliable, fast, with feedback

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 2.4.1 | Save to localStorage only | 1h | Low | Low | ⭐⚡ |
| 2.4.2 | POST to API route (console log) | 1h | Low | Low | ⚡🔧 |
| 2.4.3 | Insert to Supabase experiences table | 3h | Critical | Low | 🔥🔧 |
| 2.4.4 | Associate with user ID | 1h | Critical | Low | 🔥⚡ |
| 2.4.5 | Optimistic UI update | 3h | High | Low | 💎🚀 |
| 2.4.6 | Duplicate detection | 3h | Medium | Low | 💎 |

**Walking Skeleton Uses:** 2.4.1 (localStorage)

**Required for MVP:** 2.4.3, 2.4.4 (real database persistence)

---

### Feature 3: Experience Listing

**User Capability:** Users can view their personal experiences in a dashboard

**Why It Matters:** Provides overview of documented experiences, enables navigation to detail view

#### Steps & Increments

**Step 3.1: Dashboard UI Layout** (5 increments)
Quality Attributes: Clean, scannable, responsive

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 3.1.1 | Static dashboard with "+ New" button | 1h | Medium | Low | ⭐🔥⚡ |
| 3.1.2 | Empty state component | 1h | High | Low | 🔥⚡ |
| 3.1.3 | Grid layout (1-3 columns responsive) | 2h | High | Low | 🔥⚡ |
| 3.1.4 | Header with user info (name/avatar) | 2h | Medium | Low | 💎⚡ |
| 3.1.5 | Search/filter bar (UI only) | 1h | Low | Low | 💎⚡ |

**Walking Skeleton Uses:** 3.1.1 (Static layout)

**Recommended for MVP:** 3.1.2 (guide first-time users)

---

**Step 3.2: Fetch Experiences from Supabase** (6 increments)
Quality Attributes: Fast, user-specific, error-handled

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 3.2.1 | Hardcoded array of 2 experiences | 30min | Low | Low | ⭐⚡ |
| 3.2.2 | Fetch from Supabase (all experiences) | 2h | High | Low | 🔥⚡🔧 |
| 3.2.3 | Filter by user ID | 1h | Critical | Low | 🔥⚡ |
| 3.2.4 | Sort by created date (newest first) | 30min | High | Low | 🔥⚡ |
| 3.2.5 | Pagination (20 per page, load more) | 3h | Medium | Low | 💎🚀 |
| 3.2.6 | Loading skeleton | 2h | High | Low | 💎🚀⚡ |

**Walking Skeleton Uses:** 3.2.1 (Hardcoded data)

**Required for MVP:** 3.2.2, 3.2.3 (user-specific data)

---

**Step 3.3: Experience Card Component** (6 increments)
Quality Attributes: Informative, clickable, scannable

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 3.3.1 | Card with title only | 1h | Medium | Low | ⭐🔥⚡ |
| 3.3.2 | Add company name and date | 1h | High | Low | 🔥⚡ |
| 3.3.3 | Result preview (first 100 chars) | 1h | High | Low | 🔥⚡ |
| 3.3.4 | Card hover effect | 30min | Medium | Low | 💎⚡ |
| 3.3.5 | Emoji/icon per experience | 2h | Medium | Low | 💎⚡ |
| 3.3.6 | Card actions menu (edit/delete) | 2h | Low | Low | 💎⚡ |

**Walking Skeleton Uses:** 3.3.1 (Title only)

**Recommended for MVP:** 3.3.2, 3.3.3 (contextual info)

---

**Step 3.4: Navigation to Detail** (4 increments)
Quality Attributes: Fast, clear, with back navigation

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 3.4.1 | Click card → console log ID | 30min | Low | Low | ⭐⚡ |
| 3.4.2 | Navigate to /experience/[id] | 1h | Critical | Low | 🔥⚡ |
| 3.4.3 | Pass experience data via URL state | 2h | High | Low | 💎🚀⚡ |
| 3.4.4 | Loading state during navigation | 1h | Medium | Low | 💎⚡ |

**Walking Skeleton Uses:** 3.4.1 (Console log)

**Required for MVP:** 3.4.2 (navigation)

---

### Feature 4: Experience Detail View

**User Capability:** Users can view full STAR format for any experience

**Why It Matters:** Provides complete view of documented experience, enables copy/paste to resume, supports editing/management

#### Steps & Increments

**Step 4.1: Detail Page Layout** (5 increments)
Quality Attributes: Clear structure, readable, print-friendly

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 4.1.1 | Static page with hardcoded STAR | 1h | Low | Low | ⭐⚡ |
| 4.1.2 | Back button to dashboard | 30min | Critical | Low | 🔥⚡ |
| 4.1.3 | Responsive layout (mobile-friendly) | 2h | High | Low | 🔥⚡ |
| 4.1.4 | Print-optimized styles | 2h | High | Low | 💎⚡ |
| 4.1.5 | Shareable URL (direct link support) | 1h | Medium | Low | 💎⚡ |

**Walking Skeleton Uses:** 4.1.1 (Static page)

**Required for MVP:** 4.1.2 (essential navigation)

---

**Step 4.2: Fetch Experience Data** (5 increments)
Quality Attributes: Fast, reliable, error-handled

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 4.2.1 | Use data from navigation state | 1h | Medium | Low | ⭐🚀⚡ |
| 4.2.2 | Fetch by ID from Supabase | 2h | Critical | Low | 🔥⚡ |
| 4.2.3 | Handle not found (404 page) | 1h | High | Low | 🔥⚡ |
| 4.2.4 | Verify user ownership (privacy) | 2h | Critical | Low | 🔥🔒⚡ |
| 4.2.5 | Loading skeleton | 1h | Medium | Low | 💎🚀⚡ |

**Walking Skeleton Uses:** 4.2.1 (Navigation state)

**Required for MVP:** 4.2.2, 4.2.4 (security)

---

**Step 4.3: STAR Display** (5 increments)
Quality Attributes: Structured, visual, scannable

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 4.3.1 | Plain text STAR sections (S, T, A, R labels) | 1h | High | Low | ⭐🔥⚡ |
| 4.3.2 | Section icons (📍🎯⚡🏆 emoji) | 30min | Medium | Low | 💎⚡ |
| 4.3.3 | Formatted text (preserve line breaks, bullets) | 1h | High | Low | 🔥⚡ |
| 4.3.4 | Metadata section (company, date, edited) | 1h | Medium | Low | 💎⚡ |
| 4.3.5 | Copy to clipboard button | 2h | High | Low | 💎⚡ |

**Walking Skeleton Uses:** 4.3.1 (Plain text)

**Recommended for MVP:** 4.3.3 (readability)

---

**Step 4.4: Optional Actions** (5 increments)
Quality Attributes: Convenient, non-intrusive

| # | Increment | Effort | Value | Risk | Indicators |
|---|-----------|--------|-------|------|------------|
| 4.4.1 | No actions (read-only view) | 0h | Low | Low | ⭐⚡ |
| 4.4.2 | Edit button (navigate to /edit/[id]) | 1h | High | Low | 🔥⚡ |
| 4.4.3 | Delete button with confirmation | 2h | High | Low | 🔥⚡ |
| 4.4.4 | Export as PDF | 4h | Medium | Medium | 💎⚠️ |
| 4.4.5 | Share via public link | 6h | Medium | Medium | 💎⚠️ |

**Walking Skeleton Uses:** 4.4.1 (Read-only)

**Defer for MVP:** Edit/Delete can wait for post-launch

---

## Walking Skeleton

### What is a Walking Skeleton?

The **absolute minimum** combination of increments that:
- Delivers end-to-end functionality
- Uses the simplest increment from each step
- Can be deployed and demonstrated
- Proves the architecture works
- Enables immediate validation

### Selected Increments (15 total, ~13 hours / ~2 days)

| Feature | Step | Increment | Time |
|---------|------|-----------|------|
| Auth | 1.1 | 1.1.1 - Hardcoded "Sign in" button | 1h |
| Auth | 1.2 | 1.2.1 - Manual user creation in Supabase | 30min |
| Auth | 1.3 | 1.3.1 - In-memory session (dev only) | 1h |
| Creation | 2.1 | 2.1.1 - Simple textarea with submit | 1h |
| Creation | 2.2 | 2.2.1 - Hardcoded STAR response | 30min |
| Creation | 2.3 | 2.3.1 - Pre-filled read-only STAR | 1h |
| Creation | 2.4 | 2.4.1 - Save to localStorage only | 1h |
| Listing | 3.1 | 3.1.1 - Static dashboard + button | 1h |
| Listing | 3.2 | 3.2.1 - Hardcoded array of experiences | 30min |
| Listing | 3.3 | 3.3.1 - Card with title only | 1h |
| Listing | 3.4 | 3.4.1 - Click card → console log | 30min |
| Detail | 4.1 | 4.1.1 - Static hardcoded STAR page | 1h |
| Detail | 4.2 | 4.2.1 - Use navigation state data | 1h |
| Detail | 4.3 | 4.3.1 - Plain text STAR sections | 1h |
| Detail | 4.4 | 4.4.1 - No actions (read-only) | 0h |

**Total:** 13 hours (~2 work days)

### What It Demonstrates

**User Flow:**
1. See landing page with "Sign in" button (static, no auth)
2. Click button → navigate to dashboard
3. Click "+ New Experience" → open creation form
4. Type free-text in textarea
5. Click "Generate STAR" → see hardcoded STAR response
6. Click "Save" → save to localStorage (not database)
7. Redirect to dashboard → see hardcoded list of experiences
8. Click experience card → navigate to detail page
9. See full STAR format displayed

**What It Proves:**
- ✅ UI component structure is sound
- ✅ Navigation flow works end-to-end
- ✅ Data flow is clear (even if mocked)
- ✅ React state management works
- ✅ Routing patterns work
- ✅ Visual design can be evaluated

**What It Doesn't Include:**
- ❌ Real LinkedIn authentication
- ❌ Real OpenAI API calls
- ❌ Real database persistence
- ❌ User-specific data
- ❌ Error handling
- ❌ Loading states
- ❌ Form validation

**Why Start Here:**
- Get UI/UX feedback before investing in backend
- Validate user flow before API integrations
- Test design before committing to complex features
- Deploy to staging in 2 days for stakeholder review

---

## Implementation Paths

### Path 1: Speed to Market ⚡ (~3 weeks)

**Focus:** Get to deployable MVP as fast as possible with real functionality

**Timeline:** 3 weeks (15 work days)

**Iteration 1 (Week 1): Core AI Flow**
- Deploy Walking Skeleton first (2 days)
- 2.2.2 - OpenAI API call with basic prompt (3h)
- 2.2.3 - Optimized STAR prompt (2h)
- 2.3.2 - Editable text fields (2h)
- 2.3.3 - Field validation (2h)
- 2.4.3 - Insert to Supabase (3h)
- 2.4.4 - Associate with user ID (1h)
- **Result:** Users can create AI-generated experiences and save to DB

**Iteration 2 (Week 2): Real Authentication + Listing**
- 1.1.3 - Real LinkedIn OAuth URL (4h)
- 1.2.3 - Real LinkedIn token exchange (6h)
- 1.3.2 - localStorage session (2h)
- 1.3.4 - Auto-login on return (2h)
- 3.2.2 - Fetch from Supabase (2h)
- 3.2.3 - Filter by user ID (1h)
- 3.2.4 - Sort by date (30min)
- **Result:** Real auth, user-specific experience listing

**Iteration 3 (Week 3): Polish & Launch Prep**
- 3.1.2 - Empty state component (1h)
- 3.3.2 - Add company name and date to cards (1h)
- 3.3.3 - Result preview in cards (1h)
- 4.1.2 - Back button on detail page (30min)
- 4.2.2 - Fetch experience by ID (2h)
- 4.2.4 - Verify user ownership (2h)
- 4.3.3 - Formatted text display (1h)
- 1.1.4 - OAuth error handling (3h)
- 2.2.5 - Retry logic for AI (3h)
- **Result:** Production-ready MVP with error handling

**Total Time:** ~47 hours (3 weeks with 1 developer)

**What You Can Demo:**
- Real LinkedIn authentication
- AI-powered STAR generation
- Database persistence
- User-specific experience listing
- Detail view with navigation
- Basic error handling

**Trade-offs:**
- No rich text editing
- No loading skeletons
- No pagination
- No edit/delete actions
- Basic UX polish only

**Best For:**
- Extreme time pressure
- Market validation
- Investor demos
- Solo developer

---

### Path 2: Balanced Approach ⚖️ (~5 weeks)

**Focus:** Balance speed with quality and user experience

**Timeline:** 5 weeks (25 work days)

**Iteration 1 (Week 1): Walking Skeleton**
- Deploy all 15 Walking Skeleton increments (13h)
- Get early UI/UX feedback from stakeholders
- **Result:** Complete UI flow, no backend

**Iteration 2 (Week 2): Real Backend Integration**
- 1.2.3 - Real LinkedIn token exchange (6h)
- 1.1.3 - Real LinkedIn OAuth URL (4h)
- 2.2.2 - OpenAI API call (3h)
- 2.2.3 - Optimized STAR prompt (2h)
- 2.4.3 - Insert to Supabase (3h)
- 2.4.4 - Associate with user ID (1h)
- 3.2.2 - Fetch from Supabase (2h)
- 3.2.3 - Filter by user ID (1h)
- **Result:** All features have real backend integration

**Iteration 3 (Week 3): Editing & Session Management**
- 2.3.2 - Editable text fields (2h)
- 2.3.3 - Field validation (2h)
- 2.3.4 - Character limits (1h)
- 1.3.3 - Secure HTTP-only cookies (4h)
- 1.3.4 - Auto-login on return (2h)
- 1.3.5 - Logout functionality (1h)
- 3.2.4 - Sort by date (30min)
- 4.2.2 - Fetch by ID (2h)
- 4.2.4 - Verify ownership (2h)
- **Result:** Secure sessions, complete editing flow

**Iteration 4 (Week 4): UX Polish**
- 3.2.6 - Loading skeleton for listing (2h)
- 4.2.5 - Loading skeleton for detail (1h)
- 2.1.2 - Character counter (1h)
- 2.1.3 - Placeholder with example (30min)
- 3.1.2 - Empty state component (1h)
- 3.3.2 - Company name and date on cards (1h)
- 3.3.3 - Result preview on cards (1h)
- 3.3.4 - Card hover effect (30min)
- 4.1.2 - Back button (30min)
- 4.3.2 - Section icons (30min)
- 4.3.3 - Formatted text (1h)
- **Result:** Polished user experience

**Iteration 5 (Week 5): Reliability & Error Handling**
- 2.2.5 - Retry logic with fallback (3h)
- 1.1.4 - OAuth error handling (3h)
- 4.2.3 - Handle not found (1h)
- 3.1.3 - Grid layout (2h)
- 4.1.3 - Responsive layout (2h)
- 2.1.4 - Auto-save draft (2h)
- 3.4.2 - Navigate to detail (1h)
- **Result:** Production-ready with error handling

**Total Time:** ~65 hours (5 weeks with 1 developer)

**What You Can Demo:**
- Everything from Speed path +
- Loading states
- Secure session management
- Better error handling
- Polished UX with empty states
- Auto-save drafts
- Responsive design

**Trade-offs:**
- No pagination
- No rich text editing
- No edit/delete actions
- No advanced features (PDF export, sharing)

**Best For:**
- Standard startup timeline
- Small teams (2-4 developers)
- Balance of quality and speed

---

### Path 3: Quality First 💎 (~7 weeks)

**Focus:** Premium user experience and production-grade quality

**Timeline:** 7 weeks (35 work days)

**Iteration 1 (Weeks 1-2): Solid Foundation**
- Walking Skeleton (13h)
- Complete Feature 1 (all auth increments):
  - 1.1.3, 1.1.4 - Real OAuth + errors (7h)
  - 1.2.3, 1.2.4 - Token exchange + profile sync (10h)
  - 1.3.3, 1.3.4, 1.3.5 - Secure cookies, auto-login, logout (7h)
- **Result:** Production-grade authentication

**Iteration 2 (Weeks 2-3): AI Excellence**
- 2.2.2 - OpenAI API call (3h)
- 2.2.3 - Optimized STAR prompt (2h)
- 2.2.4 - Streaming response (4h)
- 2.2.5 - Retry logic + fallback (3h)
- 2.2.6 - Token optimization (2h)
- **Result:** Premium AI experience, fast and reliable

**Iteration 3 (Week 4): Editing Experience**
- 2.3.2 - Editable fields (2h)
- 2.3.3 - Field validation (2h)
- 2.3.4 - Character limits (1h)
- 2.3.5 - Rich text editing (4h)
- 2.3.6 - Preview mode toggle (2h)
- 2.1.2 - Character counter (1h)
- 2.1.3 - Placeholder example (30min)
- 2.1.4 - Auto-save draft (2h)
- 2.1.5 - Formatting hints (2h)
- **Result:** Professional editing experience

**Iteration 4 (Week 5): Dashboard Excellence**
- 3.1.2 - Empty state (1h)
- 3.1.3 - Grid layout (2h)
- 3.1.4 - User info header (2h)
- 3.2.2, 3.2.3, 3.2.4 - Fetch, filter, sort (3.5h)
- 3.2.5 - Pagination (3h)
- 3.2.6 - Loading skeleton (2h)
- 3.3.2, 3.3.3, 3.3.4, 3.3.5 - Premium cards (3.5h)
- 3.4.2, 3.4.3 - Navigation with state passing (3h)
- **Result:** Beautiful, fast dashboard

**Iteration 5 (Week 6): Detail & Actions**
- 4.1.2, 4.1.3, 4.1.4 - Back, responsive, print styles (4.5h)
- 4.2.2, 4.2.3, 4.2.4 - Fetch, 404, ownership (5h)
- 4.3.2, 4.3.3, 4.3.4, 4.3.5 - Icons, formatting, metadata, copy (4.5h)
- 4.4.2, 4.4.3 - Edit and delete buttons (3h)
- **Result:** Complete detail view with actions

**Iteration 6 (Week 7): Production Polish**
- 2.4.3, 2.4.4, 2.4.5, 2.4.6 - Full save logic (10h)
- 1.2.5 - Token refresh (3h)
- 4.1.5 - Shareable URLs (1h)
- 3.3.6 - Card actions menu (2h)
- End-to-end testing
- Performance optimization
- **Result:** Production-ready app

**Total Time:** ~120 hours (7 weeks with 1-2 developers)

**What You Can Demo:**
- Everything fully polished
- Rich text editing
- Streaming AI responses
- Token refresh
- Edit/Delete experiences
- Print optimization
- Pagination
- Complete error handling
- Premium UX throughout

**Trade-offs:**
- Longer time to market
- Higher upfront cost
- More features to maintain

**Best For:**
- Brand-critical applications
- Enterprise/professional tools
- Competitive markets
- Teams with capacity

---

### Path 4: Feature-by-Feature 🎯 (~6 weeks)

**Focus:** Complete one feature fully before moving to next

**Timeline:** 6 weeks (30 work days)

**Iteration 1 (Week 1): Authentication COMPLETE**
- All 15 increments from Feature 1
- Include: OAuth, sessions, errors, logout, profile sync, token refresh
- **Result:** Perfect auth experience, fully tested

**Iteration 2 (Weeks 2-3): Experience Creation COMPLETE**
- All 23 increments from Feature 2
- Include: Input UI, AI with streaming, editing with rich text, save with optimistic UI
- **Result:** Perfect creation experience, fully tested

**Iteration 3 (Week 4): Listing COMPLETE**
- All 19 increments from Feature 3
- Include: Dashboard, fetching with pagination, premium cards, navigation
- **Result:** Perfect browsing experience, fully tested

**Iteration 4 (Week 5): Detail View COMPLETE**
- All 20 increments from Feature 4
- Include: Layout, fetching, display, actions (edit/delete)
- **Result:** Perfect detail experience, fully tested

**Iteration 5 (Week 6): Integration & Testing**
- End-to-end testing
- Cross-feature polish
- Performance optimization
- Bug fixes
- Documentation
- **Result:** Complete, polished application

**Total Time:** ~110 hours (6 weeks with 1 developer)

**What You Can Demo:**
- Week 1: Perfect authentication
- Week 3: Perfect creation flow
- Week 4: Perfect listing
- Week 5: Perfect detail view
- Week 6: Complete app

**Trade-offs:**
- No end-to-end demo until week 3
- Features built in isolation
- May discover integration issues late

**Best For:**
- Learning mode (new tech stack)
- Solo developers
- Stakeholder demos of individual features
- Deep focus preference

---

### Path 5: Cross-Feature Enhancement 🚀 (~5 weeks)

**Focus:** Improve one aspect across all features simultaneously

**Timeline:** 5 weeks (25 work days)

**Iteration 1 (Week 1): Core Functionality**
- Walking Skeleton (13h)
- 1.2.3 - Real LinkedIn token exchange (6h)
- 2.2.2 - Real OpenAI API call (3h)
- 2.4.3, 2.4.4 - Real Supabase saves (4h)
- **Result:** End-to-end working (mocked UI, real backend)

**Iteration 2 (Week 2): Data Layer Excellence**
- 1.3.3 - Secure cookies (4h)
- 3.2.2, 3.2.3 - Fetch + filter experiences (3h)
- 4.2.2, 4.2.4 - Fetch by ID + ownership (4h)
- 2.4.6 - Duplicate detection (3h)
- 3.2.4 - Sort by date (30min)
- **Result:** All features have solid, secure data layer

**Iteration 3 (Week 3): UI/UX Layer Excellence**
- 2.1.2, 2.1.3 - Input improvements (1.5h)
- 2.3.2, 2.3.3 - Editing + validation (4h)
- 3.1.2, 3.1.3 - Empty state + grid (3h)
- 3.3.2, 3.3.3, 3.3.4 - Enhanced cards (2.5h)
- 4.1.2, 4.1.3 - Back button + responsive (2.5h)
- 4.3.2, 4.3.3 - Icons + formatting (1.5h)
- **Result:** All features look polished

**Iteration 4 (Week 4): Performance & Loading States**
- 2.2.4 - Streaming AI response (4h)
- 3.2.6 - Loading skeleton for list (2h)
- 4.2.5 - Loading skeleton for detail (1h)
- 2.4.5 - Optimistic UI updates (3h)
- 3.4.3 - Pass data via state (2h)
- 2.2.6 - Token optimization (2h)
- **Result:** All features feel fast and responsive

**Iteration 5 (Week 5): Error Handling & Edge Cases**
- 1.1.4 - OAuth error handling (3h)
- 2.2.5 - AI retry logic (3h)
- 4.2.3 - Not found handling (1h)
- 3.2.5 - Pagination (3h)
- 2.1.4 - Auto-save draft (2h)
- 1.3.4, 1.3.5 - Auto-login + logout (3h)
- **Result:** All features handle errors gracefully

**Total Time:** ~70 hours (5 weeks with 2-4 developers in parallel)

**What You Can Demo:**
- Week 1: End-to-end flow with real backend
- Week 2: Secure data layer
- Week 3: Polished UI
- Week 4: Fast performance
- Week 5: Robust error handling

**Trade-offs:**
- Requires team coordination
- No single "complete" feature until end
- Context switching between features

**Best For:**
- Larger teams (4+ developers)
- Parallel work streams
- Systematic quality improvements
- Teams that can specialize (UI dev, backend dev, etc.)

---

## Decision Guide

### How to Choose Your Implementation Path

#### Choose **Speed to Market** ⚡ if:
- ✅ You need to validate the idea ASAP (< 1 month)
- ✅ You're testing market fit with early adopters
- ✅ Time pressure is extreme (investor demo, competition deadline)
- ✅ You can iterate based on user feedback
- ✅ Team is small (1-2 developers)
- ✅ **Your priority:** Get users ASAP, refine later

**Trade-offs:** Some rough edges, basic error handling, minimal polish

---

#### Choose **Balanced Approach** ⚖️ if:
- ✅ You want reasonable quality without excessive time
- ✅ Standard startup timeline (2-3 months to MVP)
- ✅ You care about first impressions but not perfection
- ✅ You have some time for polish but not unlimited
- ✅ Team is small to medium (2-4 developers)
- ✅ **Your priority:** Good balance of speed and quality

**Trade-offs:** Some advanced features deferred, good enough for launch

---

#### Choose **Quality First** 💎 if:
- ✅ Brand reputation is critical (enterprise, professional tools)
- ✅ Users expect premium experience (paid product from day 1)
- ✅ Competition is fierce, UX is differentiator
- ✅ You can afford 2-3 months development
- ✅ Team has capacity for thorough work (3-5 developers)
- ✅ **Your priority:** Make a strong impression, reduce churn

**Trade-offs:** Longer time to market, higher upfront investment

---

#### Choose **Feature-by-Feature** 🎯 if:
- ✅ You're learning the tech stack (first Next.js/Supabase/OpenAI project)
- ✅ You want to showcase incremental progress to stakeholders
- ✅ Team is solo or very small (1-2 developers)
- ✅ You prefer deep focus over context switching
- ✅ Each feature can be demoed independently
- ✅ **Your priority:** Learn thoroughly, minimize risk per feature

**Trade-offs:** No end-to-end demo until late, features built in isolation

---

#### Choose **Cross-Feature Enhancement** 🚀 if:
- ✅ You have a larger team (4+ developers) that can parallelize
- ✅ You want systematic quality improvements across all features
- ✅ Team members can own different layers (UI, data, performance, errors)
- ✅ You prefer horizontal improvements over vertical completion
- ✅ You want early end-to-end demo (Walking Skeleton) then enhance
- ✅ **Your priority:** Efficient team parallelization, systematic quality

**Trade-offs:** Requires coordination, no single "complete" feature until late

---

### Quick Decision Matrix

| Your Priority | Recommended Path |
|---------------|------------------|
| **Time pressure** | Speed to Market ⚡ |
| **Learning mode** | Feature-by-Feature 🎯 |
| **Brand critical** | Quality First 💎 |
| **Large team** | Cross-Feature Enhancement 🚀 |
| **Standard startup** | Balanced Approach ⚖️ |
| **Solo developer** | Feature-by-Feature 🎯 or Speed ⚡ |
| **Investor demo soon** | Speed to Market ⚡ |
| **First real users in 6+ weeks** | Balanced ⚖️ or Quality 💎 |

---

### Recommendation for This Project

**Given Context:**
- MVP for market validation (stated in requirements)
- Focus: "Speed to market, early user feedback" (explicit priority)
- Tech: Next.js + Supabase + OpenAI (mature, well-documented stack)
- User need: Document experiences for CV/resume preparation
- AI assistance is core differentiator

**Recommended Path:** **Speed to Market** ⚡ (3 weeks)

**Why:**
1. Project explicitly prioritizes "speed to market"
2. MVP goal is validation, not perfection
3. Tech stack is mature - low learning curve
4. Core value is AI assistance - can refine prompt iteratively
5. Early user feedback will guide feature priorities
6. Solo or small team implied

**Alternative Path:** If brand quality matters (targeting professionals who expect premium tools), consider **Balanced Approach** ⚖️ (5 weeks)

---

## Selection Matrix

### Complete Increment Catalog

Below is the complete matrix of all 62 increments with effort, value, and risk scoring.

**Legend:**
- **Effort:** 1 (< 1h) to 5 (> 8h)
- **Value:** 1 (nice-to-have) to 5 (critical)
- **Risk:** 1 (low risk) to 5 (high complexity)
- **Indicators:** ⭐ Walking Skeleton | ⚡ Quick Win | 🔥 High Value | ⚠️ High Risk | 💎 Quality | 🔧 Infrastructure | 🚀 Performance | 🔒 Security

### FEATURE 1: LinkedIn Authentication

#### Step 1.1: OAuth UI Integration

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 1.1.1 | Hardcoded "Sign in" button | 1 | 2 | 1 | ⭐⚡ | None |
| 1.1.2 | Button with mock redirect | 1 | 2 | 1 | ⚡ | 1.1.1 |
| 1.1.3 | Real LinkedIn OAuth URL | 2 | 5 | 3 | 🔥🔧 | 1.1.1 |
| 1.1.4 | OAuth error handling | 2 | 4 | 2 | 🔥 | 1.1.3 |
| 1.1.5 | "Remember me" persistence | 1 | 3 | 1 | 💎 | 1.1.3 |

#### Step 1.2: Supabase Auth Backend

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 1.2.1 | Manual user creation | 1 | 1 | 1 | ⭐⚡ | None |
| 1.2.2 | OAuth callback (hardcoded) | 2 | 2 | 1 | 🔧 | 1.2.1 |
| 1.2.3 | Real LinkedIn token exchange | 3 | 5 | 4 | 🔥⚠️🔧 | 1.2.2, 1.1.3 |
| 1.2.4 | User profile sync | 2 | 3 | 2 | 💎 | 1.2.3 |
| 1.2.5 | Token refresh logic | 2 | 4 | 3 | 🔥⚠️ | 1.2.3 |

#### Step 1.3: Session Management

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 1.3.1 | In-memory session (dev) | 1 | 2 | 1 | ⭐⚡ | None |
| 1.3.2 | localStorage session | 1 | 4 | 1 | 🔥⚡ | 1.3.1 |
| 1.3.3 | Secure HTTP-only cookies | 2 | 5 | 2 | 🔥🔒 | 1.3.2 |
| 1.3.4 | Auto-login on return | 1 | 5 | 1 | 🔥⚡ | 1.3.2 |
| 1.3.5 | Logout functionality | 1 | 4 | 1 | 🔥⚡ | 1.3.2 |

---

### FEATURE 2: AI-Assisted Experience Creation

#### Step 2.1: Free-Text Input UI

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 2.1.1 | Simple textarea + button | 1 | 4 | 1 | ⭐🔥⚡ | None |
| 2.1.2 | Character counter | 1 | 3 | 1 | 💎⚡ | 2.1.1 |
| 2.1.3 | Placeholder with example | 1 | 3 | 1 | 💎⚡ | 2.1.1 |
| 2.1.4 | Auto-save draft | 1 | 3 | 1 | 💎⚡ | 2.1.1 |
| 2.1.5 | Formatting hints | 1 | 2 | 1 | 💎 | 2.1.1 |

#### Step 2.2: OpenAI STAR Generation

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 2.2.1 | Hardcoded STAR response | 1 | 1 | 1 | ⭐⚡ | None |
| 2.2.2 | OpenAI API call (basic) | 2 | 5 | 3 | 🔥⚠️🔧 | 2.2.1 |
| 2.2.3 | Optimized STAR prompt | 1 | 5 | 2 | 🔥💎 | 2.2.2 |
| 2.2.4 | Streaming response | 2 | 4 | 3 | 💎🚀⚠️ | 2.2.2 |
| 2.2.5 | Retry logic + fallback | 2 | 4 | 2 | 🔥 | 2.2.2 |
| 2.2.6 | Token optimization | 1 | 3 | 2 | 🚀 | 2.2.2 |

#### Step 2.3: STAR Review & Edit Form

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 2.3.1 | Read-only STAR display | 1 | 2 | 1 | ⭐⚡ | None |
| 2.3.2 | Editable text fields | 1 | 5 | 1 | 🔥⚡ | 2.3.1 |
| 2.3.3 | Field validation | 1 | 4 | 1 | 🔥⚡ | 2.3.2 |
| 2.3.4 | Character limits | 1 | 3 | 1 | 💎⚡ | 2.3.2 |
| 2.3.5 | Rich text editing | 2 | 3 | 2 | 💎 | 2.3.2 |
| 2.3.6 | Preview mode toggle | 1 | 3 | 1 | 💎⚡ | 2.3.2 |

#### Step 2.4: Save to Supabase

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 2.4.1 | Save to localStorage | 1 | 2 | 1 | ⭐⚡ | None |
| 2.4.2 | POST to API (console log) | 1 | 1 | 1 | ⚡🔧 | 2.4.1 |
| 2.4.3 | Insert to Supabase | 2 | 5 | 2 | 🔥🔧 | 2.4.2 |
| 2.4.4 | Associate with user ID | 1 | 5 | 1 | 🔥⚡ | 2.4.3 |
| 2.4.5 | Optimistic UI update | 2 | 4 | 2 | 💎🚀 | 2.4.3 |
| 2.4.6 | Duplicate detection | 2 | 3 | 2 | 💎 | 2.4.3 |

---

### FEATURE 3: Experience Listing

#### Step 3.1: Dashboard UI Layout

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 3.1.1 | Static dashboard + button | 1 | 3 | 1 | ⭐🔥⚡ | None |
| 3.1.2 | Empty state component | 1 | 4 | 1 | 🔥⚡ | 3.1.1 |
| 3.1.3 | Grid layout | 1 | 4 | 1 | 🔥⚡ | 3.1.1 |
| 3.1.4 | Header with user info | 1 | 3 | 1 | 💎⚡ | 3.1.1 |
| 3.1.5 | Search/filter bar (UI) | 1 | 2 | 1 | 💎⚡ | 3.1.1 |

#### Step 3.2: Fetch Experiences

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 3.2.1 | Hardcoded array | 1 | 1 | 1 | ⭐⚡ | None |
| 3.2.2 | Fetch from Supabase (all) | 1 | 4 | 1 | 🔥⚡🔧 | 3.2.1 |
| 3.2.3 | Filter by user ID | 1 | 5 | 1 | 🔥⚡ | 3.2.2 |
| 3.2.4 | Sort by date | 1 | 4 | 1 | 🔥⚡ | 3.2.2 |
| 3.2.5 | Pagination (20/page) | 2 | 3 | 2 | 💎🚀 | 3.2.2 |
| 3.2.6 | Loading skeleton | 1 | 4 | 1 | 💎🚀⚡ | 3.2.2 |

#### Step 3.3: Experience Card

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 3.3.1 | Card with title only | 1 | 3 | 1 | ⭐🔥⚡ | None |
| 3.3.2 | Add company + date | 1 | 4 | 1 | 🔥⚡ | 3.3.1 |
| 3.3.3 | Result preview | 1 | 4 | 1 | 🔥⚡ | 3.3.1 |
| 3.3.4 | Card hover effect | 1 | 3 | 1 | 💎⚡ | 3.3.1 |
| 3.3.5 | Emoji/icon per exp | 1 | 3 | 1 | 💎⚡ | 3.3.1 |
| 3.3.6 | Card actions menu | 1 | 2 | 1 | 💎⚡ | 3.3.1 |

#### Step 3.4: Navigation

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 3.4.1 | Click → console log | 1 | 1 | 1 | ⭐⚡ | None |
| 3.4.2 | Navigate to /exp/[id] | 1 | 5 | 1 | 🔥⚡ | 3.4.1 |
| 3.4.3 | Pass data via state | 1 | 4 | 1 | 💎🚀⚡ | 3.4.2 |
| 3.4.4 | Loading during nav | 1 | 3 | 1 | 💎⚡ | 3.4.2 |

---

### FEATURE 4: Experience Detail View

#### Step 4.1: Detail Page Layout

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 4.1.1 | Static hardcoded STAR | 1 | 2 | 1 | ⭐⚡ | None |
| 4.1.2 | Back button | 1 | 5 | 1 | 🔥⚡ | 4.1.1 |
| 4.1.3 | Responsive layout | 1 | 4 | 1 | 🔥⚡ | 4.1.1 |
| 4.1.4 | Print-optimized styles | 1 | 4 | 1 | 💎⚡ | 4.1.1 |
| 4.1.5 | Shareable URL | 1 | 3 | 1 | 💎⚡ | 4.1.1 |

#### Step 4.2: Fetch Experience Data

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 4.2.1 | Use navigation state | 1 | 3 | 1 | ⭐🚀⚡ | None |
| 4.2.2 | Fetch by ID | 1 | 5 | 1 | 🔥⚡ | 4.2.1 |
| 4.2.3 | Handle not found | 1 | 4 | 1 | 🔥⚡ | 4.2.2 |
| 4.2.4 | Verify ownership | 1 | 5 | 1 | 🔥🔒⚡ | 4.2.2 |
| 4.2.5 | Loading skeleton | 1 | 3 | 1 | 💎🚀⚡ | 4.2.2 |

#### Step 4.3: STAR Display

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 4.3.1 | Plain text sections | 1 | 4 | 1 | ⭐🔥⚡ | None |
| 4.3.2 | Section icons | 1 | 3 | 1 | 💎⚡ | 4.3.1 |
| 4.3.3 | Formatted text | 1 | 4 | 1 | 🔥⚡ | 4.3.1 |
| 4.3.4 | Metadata section | 1 | 3 | 1 | 💎⚡ | 4.3.1 |
| 4.3.5 | Copy to clipboard | 1 | 4 | 1 | 💎⚡ | 4.3.1 |

#### Step 4.4: Actions

| ID | Increment | Effort | Value | Risk | Indicators | Dependencies |
|----|-----------|--------|-------|------|------------|--------------|
| 4.4.1 | No actions (read-only) | 1 | 2 | 1 | ⭐⚡ | None |
| 4.4.2 | Edit button | 1 | 4 | 1 | 🔥⚡ | 4.4.1 |
| 4.4.3 | Delete with confirm | 1 | 4 | 1 | 🔥⚡ | 4.4.1 |
| 4.4.4 | Export as PDF | 2 | 3 | 3 | 💎⚠️ | 4.4.1 |
| 4.4.5 | Share via public link | 3 | 3 | 3 | 💎⚠️ | 4.4.1 |

---

### Summary Statistics

**Total Increments:** 62

**By Indicator:**
- ⭐ Walking Skeleton: 15 increments
- ⚡ Quick Wins (< 2h): 54 increments
- 🔥 High Value: 36 increments
- ⚠️ High Risk: 8 increments
- 💎 Quality Polish: 32 increments
- 🔧 Infrastructure: 7 increments
- 🚀 Performance: 9 increments
- 🔒 Security: 2 increments

**By Effort Level:**
- Effort 1 (< 1h): 46 increments
- Effort 2 (1-4h): 14 increments
- Effort 3 (4-8h): 2 increments

**Critical Path (Minimum Viable Product - 24 increments):**
1. Auth: 1.1.3, 1.2.3, 1.3.2, 1.3.4
2. Creation: 2.1.1, 2.2.2, 2.2.3, 2.3.2, 2.3.3, 2.4.3, 2.4.4
3. Listing: 3.1.1, 3.1.2, 3.2.2, 3.2.3, 3.3.1, 3.3.2, 3.4.2
4. Detail: 4.1.2, 4.2.2, 4.2.4, 4.3.1, 4.3.3

**Total MVP Effort:** ~36 hours (~5 work days)

---

## Next Steps

### Immediate Actions

**1. Choose Your Path** (Today)
- Review the 5 implementation paths
- Consider your priorities (speed, quality, learning, team size)
- Use the Decision Guide to select a path
- **Recommendation:** Start with Speed to Market ⚡ given explicit MVP goals

**2. Set Up Development Environment** (Day 1)
- Initialize Next.js 14 project with TypeScript
- Set up Supabase project (database + auth)
- Configure LinkedIn OAuth app
- Set up OpenAI API key
- Install shadcn/ui components

**3. Deploy Walking Skeleton** (Days 2-3)
- Implement all 15 Walking Skeleton increments
- Deploy to Vercel/staging
- Get early feedback on UI/UX
- Validate user flow makes sense

**4. Implement Core Backend** (Days 4-7)
- LinkedIn OAuth integration (inc 1.1.3, 1.2.3)
- OpenAI API integration (inc 2.2.2, 2.2.3)
- Supabase persistence (inc 2.4.3, 2.4.4, 3.2.2, 3.2.3)

**5. Polish & Launch** (Days 8-15)
- Follow your selected path's remaining iterations
- Add error handling
- Test end-to-end
- Deploy to production
- Get first users!

---

### Database Schema (Suggested)

**Users Table** (Handled by Supabase Auth)
```sql
-- Supabase creates this automatically via auth
users (
  id uuid primary key,
  email text,
  linkedin_profile jsonb,
  created_at timestamp
)
```

**Experiences Table**
```sql
create table experiences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,

  -- Core STAR content
  title text not null,
  company text,
  situation text not null,
  task text not null,
  action text not null,
  result text not null,

  -- Metadata
  original_input text, -- Original free-text input
  created_at timestamp default now(),
  updated_at timestamp default now(),

  -- Future: tags, categories, visibility
  constraint title_not_empty check (length(trim(title)) > 0)
);

-- Index for user queries
create index idx_experiences_user_id on experiences(user_id);
create index idx_experiences_created_at on experiences(created_at desc);

-- Row Level Security
alter table experiences enable row level security;

create policy "Users can view their own experiences"
  on experiences for select
  using (auth.uid() = user_id);

create policy "Users can insert their own experiences"
  on experiences for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own experiences"
  on experiences for update
  using (auth.uid() = user_id);

create policy "Users can delete their own experiences"
  on experiences for delete
  using (auth.uid() = user_id);
```

---

### API Endpoints (Suggested)

**POST /api/experiences/generate** - Generate STAR from free-text
```typescript
Request: { input: string }
Response: { title: string, situation: string, task: string, action: string, result: string }
```

**POST /api/experiences** - Save experience
```typescript
Request: { title, company?, situation, task, action, result, original_input }
Response: { id, ...experience }
```

**GET /api/experiences** - List user's experiences
```typescript
Query: { page?, limit? }
Response: { experiences: [...], total, page, limit }
```

**GET /api/experiences/:id** - Get single experience
```typescript
Response: { ...experience }
```

**PATCH /api/experiences/:id** - Update experience (future)
**DELETE /api/experiences/:id** - Delete experience (future)

---

### Key Technical Decisions

**1. OpenAI Prompt Strategy** (Critical for quality)
```typescript
const prompt = `You are a professional career coach. Convert the following experience description into a structured STAR format.

STAR Framework:
- Situation: Context and background (2-3 sentences)
- Task: Your responsibility or challenge (1-2 sentences)
- Action: Specific steps you took (3-5 bullet points or sentences)
- Result: Measurable outcomes and impact (2-3 sentences with metrics if possible)

Rules:
- Use first-person ("I")
- Be specific and quantifiable
- Focus on achievements
- Keep professional tone
- Suggest a compelling title (6-10 words)

Experience Description:
${userInput}

Return ONLY valid JSON with this structure:
{
  "title": "...",
  "situation": "...",
  "task": "...",
  "action": "...",
  "result": "..."
}`;
```

**2. Session Management** (Security)
- Use Supabase's built-in session management
- Store session in HTTP-only cookies (not localStorage for production)
- Refresh tokens automatically
- Validate user ownership on all API calls

**3. Error Handling** (User experience)
- OpenAI failures → Show error, allow retry, save draft
- Auth failures → Clear messaging, redirect to login
- Database errors → Log, show user-friendly message
- Validation errors → Inline field-level errors

---

### Performance Considerations

**1. OpenAI Response Time**
- Typical: 2-5 seconds for GPT-4o-mini
- Strategy: Show loading state, consider streaming (inc 2.2.4)
- Fallback: Retry with simpler prompt if timeout

**2. Database Queries**
- Index on user_id and created_at
- Pagination for large lists (default 20/page)
- Use select() to fetch only needed fields

**3. Client-Side Performance**
- Code-split routes (Next.js does this automatically)
- Lazy load shadcn/ui components
- Optimize images (LinkedIn profile pics)

---

### Testing Strategy

**Unit Tests:**
- OpenAI prompt formatting
- STAR validation logic
- API route handlers

**Integration Tests:**
- Auth flow (LinkedIn OAuth)
- Experience creation flow
- List/detail fetching

**E2E Tests (Recommended for MVP):**
- Sign in → Create experience → View list → View detail
- Error handling for API failures

**Manual Testing Checklist:**
- [ ] LinkedIn auth works
- [ ] AI generates valid STAR
- [ ] Editing STAR fields works
- [ ] Save to database works
- [ ] Listing shows user's experiences only
- [ ] Detail view shows correct data
- [ ] Mobile responsive
- [ ] Error states display correctly

---

### Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| OpenAI API costs exceed budget | High | Set usage limits, monitor costs, optimize tokens (inc 2.2.6) |
| LinkedIn OAuth setup complexity | Medium | Use Supabase LinkedIn provider, follow docs carefully |
| AI generates poor STAR quality | High | Invest in prompt engineering (inc 2.2.3), provide examples |
| Users don't understand STAR format | Medium | Add tooltips, examples, placeholder text (inc 2.1.3) |
| Slow AI response frustrates users | Medium | Show loading state, consider streaming (inc 2.2.4) |
| Data privacy concerns | High | Implement RLS in Supabase (inc 4.2.4), clear privacy policy |

---

## Appendix

### Glossary

**STAR Format:** Situation, Task, Action, Result - A structured method for documenting professional experiences

**Walking Skeleton:** The absolute minimum end-to-end implementation that delivers value

**Increment:** A single, deployable slice of functionality

**Vertical Slice:** A feature increment that cuts through all technical layers (UI → Logic → Data)

**MVP (Minimum Viable Product):** The smallest product that delivers value and enables learning

**Quick Win:** Low-effort, high-value increment (effort < 2h)

**Technical Debt:** Shortcuts taken for speed that may require refactoring later

---

### References

**Vertical Slicing:**
- Alistair Cockburn's "Walking Skeleton" concept
- Mike Cohn's "Vertical Slicing" for user stories

**STAR Method:**
- Common behavioral interview technique
- Widely used in resume writing and career coaching

**Tech Documentation:**
- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase Authentication](https://supabase.com/docs/guides/auth)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

### Assumptions & Constraints

**Assumptions:**
- Users have LinkedIn accounts (target professional audience)
- Users are familiar with STAR format or willing to learn
- OpenAI API costs are acceptable (~$0.01 per generation)
- Supabase free tier is sufficient for MVP
- English language only (internationalization deferred)

**Constraints:**
- OpenAI rate limits (check current tier)
- Supabase free tier: 500MB database, 2GB bandwidth
- LinkedIn OAuth requires approved app (review process)
- No offline support (requires internet for AI generation)

---

## Conclusion

This analysis provides a complete roadmap for building the Fact-CV MVP using vertical slicing methodology.

**Key Takeaways:**

1. **Walking Skeleton in 2 days** - Prove the concept before heavy backend investment
2. **MVP in 3-7 weeks** depending on path chosen
3. **62 increments** ranging from 30 minutes to 6 hours each
4. **Recommended: Speed to Market path** - Aligns with stated MVP goals
5. **All paths are viable** - Choose based on your priorities

**Remember:**
- All suggestions are recommendations, not requirements
- You control what to implement and when
- Start with Walking Skeleton to validate early
- Iterate based on user feedback
- Defer advanced features until post-MVP

**Success Metrics to Track:**
- Time to first experience creation
- AI generation quality (user satisfaction)
- Conversion rate (visitors → users → experiences created)
- User retention (return visits)
- Feature usage (which STAR sections get edited most)

Good luck building Fact-CV! 🚀

---

**Generated by:** [Increments Slicer](https://github.com/your-repo/increments-slicer)
**Analysis Date:** October 26, 2025
**Document Version:** 1.0
