# Fact-CV MVP - Complete Project Analysis
**Date:** 2025-10-27
**Project:** CV Creation with AI Assistance (MVP)
**Stack:** Next.js 14+, React 19, TypeScript, TailwindCSS, Supabase, OpenAI API
**Priority:** Quick time to market

---

## Executive Summary

### Project Overview
- **Features Analyzed:** 4
- **Total Steps:** 16
- **Total Increments:** 72
- **Walking Skeleton:** 4 increments (1 per feature)
- **Estimated Timeline:** 2-3 days for Walking Skeleton

### Walking Skeleton Composition
The recommended Walking Skeleton uses the simplest increment from each feature to create an end-to-end prototype:
- **LinkedIn Authentication:** Client-side mock (no backend)
- **Experience Creation:** In-memory form (no AI, no save)
- **Experience Listing:** Hardcoded data display
- **Experience Detail View:** Static detail page

**Total Effort:** ~16-20 hours
**Value:** Validates UI/UX flow, enables early user feedback, proves architecture

### Key Metrics
- **Average Increments per Step:** 4.5
- **Dependency Chains:** 3 major paths identified (Prototype, Basic Backend, Production)
- **Critical Path:** Authentication → Experience Creation → Listing → Detail View
- **Risk Areas:** OpenAI integration, Supabase Auth setup

---

## Feature Breakdown

### Feature 1: LinkedIn Authentication

**User Story:** As a user, I need to authenticate with LinkedIn to access the CV builder.

#### Step 1.1: Authentication UI Component
**Purpose:** Display login interface
**Quality Attributes:** Simple, accessible, responsive

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 1.1.1 | Mock LinkedIn Button | Static button with LinkedIn branding, no functionality | None | Button UI component | 1.2.1, 1.3.1, 1.4.1 (all mock/client flows) |
| 1.1.2 | LinkedIn Button with Loading | Button with loading state and disabled state | None | Interactive button UI | 1.2.2, 1.2.3, 1.3.2, 1.3.3, 1.4.2, 1.4.3 |
| 1.1.3 | Full Auth UI | Button + error messages + redirect feedback | None | Complete auth UI | 1.2.3, 1.3.3, 1.4.3 |
| 1.1.4 | Auth UI with Branding | Custom styled auth page with app branding | None | Branded auth experience | 1.2.3, 1.3.3, 1.4.3 |

#### Step 1.2: OAuth Flow Orchestration
**Purpose:** Handle LinkedIn OAuth flow
**Quality Attributes:** Secure, reliable, proper error handling

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 1.2.1 | Client-side Mock | localStorage flag, no real OAuth | None | Mock user session (localStorage) | 1.1.1, 1.3.1, 1.4.1 |
| 1.2.2 | NextAuth Basic | NextAuth.js with LinkedIn provider, env config | Environment variables (LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET) | OAuth callback endpoint, session cookie | 1.1.2, 1.3.2, 1.4.2 |
| 1.2.3 | Supabase Auth | Supabase Auth with LinkedIn provider | Supabase configured, provider credentials | Supabase session token, user metadata | 1.1.2, 1.1.3, 1.3.3, 1.4.3 |
| 1.2.4 | OAuth with Retry | Supabase Auth + automatic retry on failure | Supabase configured | Resilient auth flow | 1.1.3, 1.3.3, 1.4.3 |

#### Step 1.3: Session Management
**Purpose:** Maintain user session state
**Quality Attributes:** Persistent, secure, accessible across app

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 1.3.1 | localStorage Session | Simple flag in localStorage | localStorage available | Boolean auth state | 1.1.1, 1.2.1, 1.4.1 |
| 1.3.2 | Cookie Session | HTTP-only cookie with basic user data | NextAuth session cookie | User ID, email via useSession() | 1.1.2, 1.2.2, 1.4.2 |
| 1.3.3 | Supabase Session | Supabase session with auto-refresh | Supabase session token | Full user object, auto-refresh | 1.1.2, 1.1.3, 1.2.3, 1.2.4, 1.4.3 |
| 1.3.4 | Optimized Session | Supabase session + client-side caching | Supabase session token | Cached user data, reduced DB calls | 1.1.3, 1.2.3, 1.2.4, 1.4.3 |

#### Step 1.4: Error Handling
**Purpose:** Handle authentication errors gracefully
**Quality Attributes:** User-friendly messages, recovery options

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 1.4.1 | Console Logging | Log errors to browser console | None | Basic error visibility | 1.1.1, 1.2.1, 1.3.1 |
| 1.4.2 | Toast Notifications | Display error messages using toast library | Toast library (react-hot-toast) | User-visible error messages | 1.1.2, 1.2.2, 1.2.3, 1.3.2, 1.3.3 |
| 1.4.3 | Comprehensive Error UI | Detailed error messages + retry button + support link | Toast library | Full error handling UX | 1.1.3, 1.1.4, 1.2.3, 1.2.4, 1.3.3, 1.3.4 |
| 1.4.4 | Error Analytics | Track errors to analytics service | Analytics service (Vercel Analytics) | Error monitoring | 1.1.3, 1.1.4, 1.2.3, 1.2.4, 1.3.3, 1.3.4 |

---

### Feature 2: Experience Creation with AI

**User Story:** As a user, I need to create professional experience entries with AI-powered STAR formatting assistance.

#### Step 2.1: Form UI
**Purpose:** Capture experience input
**Quality Attributes:** Intuitive, responsive, accessible

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 2.1.1 | Basic Textarea | Single textarea for free-form text input | None | Text input field | 2.2.1, 2.3.1, 2.4.1, 2.5.1 |
| 2.1.2 | Structured Form | Separate fields (company, role, dates, description) | None | Structured data capture | 2.2.1, 2.2.2, 2.3.1, 2.3.2, 2.4.1, 2.4.2, 2.5.2, 2.5.3 |
| 2.1.3 | Rich Form with Validation | Structured form + real-time validation | None | Validated input data | 2.2.2, 2.3.2, 2.4.2, 2.4.3, 2.5.3 |
| 2.1.4 | Form with Auto-save | Rich form + auto-save draft to localStorage | localStorage available | Draft persistence | 2.2.2, 2.3.2, 2.4.3, 2.5.3 |
| 2.1.5 | Multi-step Form | Wizard-style form (company info → role → achievements) | None | Progressive data capture | 2.2.2, 2.3.2, 2.4.3, 2.5.3 |

#### Step 2.2: Input Validation
**Purpose:** Ensure data quality before processing
**Quality Attributes:** Clear feedback, helpful error messages

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 2.2.1 | No Validation | Accept any input | None | Raw input data | 2.1.1, 2.1.2, 2.3.1, 2.4.1, 2.5.1, 2.5.2 |
| 2.2.2 | Client-side Validation | Zod schema validation on submit | Zod library | Validated data object | 2.1.2, 2.1.3, 2.1.4, 2.1.5, 2.3.2, 2.4.2, 2.4.3, 2.5.3 |
| 2.2.3 | Real-time Validation | Validation on blur/change events | Zod library | Immediate feedback | 2.1.3, 2.1.4, 2.1.5, 2.3.2, 2.4.3, 2.5.3 |
| 2.2.4 | Server-side Validation | Validation in API route + client | Zod library, API route | Double validation security | 2.1.3, 2.1.4, 2.1.5, 2.3.2, 2.4.3, 2.5.3, 2.5.4 |

#### Step 2.3: OpenAI Integration
**Purpose:** Generate STAR-formatted achievements
**Quality Attributes:** Fast response, high-quality output, cost-effective

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 2.3.1 | No AI (Manual) | User writes STAR format manually | None | Manual STAR content | 2.1.1, 2.1.2, 2.2.1, 2.4.1, 2.5.1, 2.5.2 |
| 2.3.2 | OpenAI Basic | Simple OpenAI API call, basic prompt | OpenAI API key, POST /api/ai/format endpoint | AI-generated STAR text | 2.1.2, 2.1.3, 2.2.2, 2.2.3, 2.4.2, 2.4.3, 2.5.3 |
| 2.3.3 | OpenAI with Streaming | Stream response for better UX | OpenAI API key, streaming endpoint | Real-time AI generation | 2.1.3, 2.1.4, 2.2.2, 2.2.3, 2.4.3, 2.5.3 |
| 2.3.4 | OpenAI Optimized | Advanced prompt engineering + caching | OpenAI API key, optimized endpoint | High-quality STAR, reduced cost | 2.1.3, 2.1.4, 2.1.5, 2.2.2, 2.2.3, 2.2.4, 2.4.3, 2.5.3, 2.5.4 |

#### Step 2.4: Review/Edit Experience
**Purpose:** Allow user to modify AI output
**Quality Attributes:** Easy editing, clear preview

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 2.4.1 | No Review | Direct submit without editing | None | Immediate submission | 2.1.1, 2.2.1, 2.3.1, 2.5.1 |
| 2.4.2 | Basic Editor | Plain textarea for editing | None | Editable text content | 2.1.2, 2.1.3, 2.2.2, 2.3.2, 2.5.2, 2.5.3 |
| 2.4.3 | Rich Text Editor | Markdown or rich text editing | Rich text library (react-markdown or similar) | Formatted content editing | 2.1.3, 2.1.4, 2.1.5, 2.2.2, 2.2.3, 2.3.2, 2.3.3, 2.3.4, 2.5.3, 2.5.4 |
| 2.4.4 | Editor with Preview | Split view: edit + live preview | Rich text library | Side-by-side editing | 2.1.3, 2.1.4, 2.1.5, 2.2.2, 2.2.3, 2.3.2, 2.3.3, 2.3.4, 2.5.3, 2.5.4 |

#### Step 2.5: Database Save
**Purpose:** Persist experience data
**Quality Attributes:** Reliable, fast, secure

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 2.5.1 | In-memory Only | Store in component state, lost on refresh | None | Temporary data storage | 2.1.1, 2.2.1, 2.3.1, 2.4.1 |
| 2.5.2 | localStorage Save | Persist to browser localStorage | localStorage available | Client-side persistence | 2.1.2, 2.2.1, 2.2.2, 2.3.1, 2.3.2, 2.4.1, 2.4.2 |
| 2.5.3 | Supabase Insert | Save to Supabase database | Supabase configured, user session, POST /api/experiences endpoint | Server-side persistence | 2.1.2, 2.1.3, 2.1.4, 2.1.5, 2.2.2, 2.2.3, 2.3.2, 2.3.3, 2.3.4, 2.4.2, 2.4.3, 2.4.4 |
| 2.5.4 | Supabase with Validation | Server-side validation + save | Supabase configured, user session, validated endpoint | Secure persistence | 2.1.3, 2.1.4, 2.1.5, 2.2.3, 2.2.4, 2.3.3, 2.3.4, 2.4.3, 2.4.4 |

---

### Feature 3: Experience Listing

**User Story:** As a user, I need to view all my saved experiences in a dashboard.

#### Step 3.1: Dashboard Layout
**Purpose:** Display container for experiences
**Quality Attributes:** Clean, organized, responsive

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 3.1.1 | Simple List Layout | Basic vertical list container | None | Layout structure | 3.2.1, 3.3.1, 3.4.1, 3.5.1 |
| 3.1.2 | Grid Layout | Responsive grid (1-2-3 columns) | None | Grid layout structure | 3.2.1, 3.2.2, 3.3.2, 3.3.3, 3.4.1, 3.4.2, 3.5.1, 3.5.2 |
| 3.1.3 | Layout with Header | Grid + page header with title and action buttons | None | Complete page structure | 3.2.2, 3.3.2, 3.3.3, 3.4.2, 3.4.3, 3.5.2, 3.5.3 |
| 3.1.4 | Layout with Sidebar | Grid + sidebar for filters/sorting | None | Advanced layout with filtering area | 3.2.2, 3.3.3, 3.4.3, 3.5.3 |

#### Step 3.2: Data Fetching
**Purpose:** Retrieve experiences from storage
**Quality Attributes:** Fast, reliable, handles errors

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 3.2.1 | Hardcoded Data | Static array of mock experiences | None | Mock experience data | 3.1.1, 3.1.2, 3.3.1, 3.3.2, 3.4.1, 3.5.1 |
| 3.2.2 | localStorage Fetch | Read from localStorage | localStorage with saved data | Client-side data | 3.1.2, 3.1.3, 3.3.2, 3.3.3, 3.4.1, 3.4.2, 3.5.1, 3.5.2 |
| 3.2.3 | Supabase Query | Fetch from Supabase database | Supabase configured, user session, GET /api/experiences endpoint | Server-side data | 3.1.2, 3.1.3, 3.1.4, 3.3.2, 3.3.3, 3.3.4, 3.4.2, 3.4.3, 3.5.2, 3.5.3 |
| 3.2.4 | Optimized Query | Supabase query with pagination + sorting | Supabase configured, user session, optimized endpoint | Efficient data loading | 3.1.3, 3.1.4, 3.3.3, 3.3.4, 3.4.3, 3.5.3 |

#### Step 3.3: Experience Card Component
**Purpose:** Display individual experience summary
**Quality Attributes:** Scannable, consistent, clickable

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 3.3.1 | Plain Text Card | Simple div with company name and role | None | Basic card display | 3.1.1, 3.2.1, 3.4.1, 3.5.1 |
| 3.3.2 | Styled Card | Card with proper styling, spacing, borders | TailwindCSS | Professional card UI | 3.1.2, 3.1.3, 3.2.1, 3.2.2, 3.2.3, 3.4.1, 3.4.2, 3.5.1, 3.5.2 |
| 3.3.3 | Interactive Card | Styled card + hover effects + click handler | TailwindCSS | Clickable card component | 3.1.2, 3.1.3, 3.1.4, 3.2.2, 3.2.3, 3.2.4, 3.4.2, 3.4.3, 3.5.2, 3.5.3 |
| 3.3.4 | Card with Actions | Interactive card + edit/delete buttons | TailwindCSS, icon library | Full card functionality | 3.1.3, 3.1.4, 3.2.3, 3.2.4, 3.4.3, 3.5.3 |

#### Step 3.4: Pagination
**Purpose:** Handle large lists of experiences
**Quality Attributes:** Fast loading, intuitive navigation

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 3.4.1 | No Pagination | Show all items at once | None | Simple list display | 3.1.1, 3.2.1, 3.3.1, 3.5.1 |
| 3.4.2 | Client Pagination | Paginate in-memory data | None | Client-side pagination | 3.1.2, 3.1.3, 3.2.2, 3.2.3, 3.3.2, 3.3.3, 3.5.2 |
| 3.4.3 | Server Pagination | Query with LIMIT/OFFSET | Supabase configured, paginated endpoint | Efficient server pagination | 3.1.3, 3.1.4, 3.2.3, 3.2.4, 3.3.3, 3.3.4, 3.5.3 |
| 3.4.4 | Infinite Scroll | Load more on scroll | Supabase configured, paginated endpoint | Modern UX pagination | 3.1.3, 3.1.4, 3.2.3, 3.2.4, 3.3.3, 3.3.4, 3.5.3 |

#### Step 3.5: Navigation to Detail
**Purpose:** Navigate from list to detail view
**Quality Attributes:** Fast, predictable, preserves state

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 3.5.1 | No Navigation | Static list only | None | List display only | 3.1.1, 3.2.1, 3.3.1, 3.4.1 |
| 3.5.2 | Client Routing | Next.js Link to detail page | Next.js router | Navigation capability | 3.1.2, 3.1.3, 3.2.2, 3.2.3, 3.3.2, 3.3.3, 3.4.2 |
| 3.5.3 | Optimized Routing | Prefetched routes + loading states | Next.js router | Fast navigation | 3.1.3, 3.1.4, 3.2.3, 3.2.4, 3.3.3, 3.3.4, 3.4.3, 3.4.4 |
| 3.5.4 | Modal View | Open detail in modal instead of navigation | Modal library | Alternative navigation pattern | 3.1.3, 3.1.4, 3.2.3, 3.2.4, 3.3.3, 3.3.4, 3.4.3, 3.4.4 |

---

### Feature 4: Experience Detail View

**User Story:** As a user, I need to view the complete details of a specific experience including STAR-formatted achievements.

#### Step 4.1: Detail Page Layout
**Purpose:** Display experience in full detail
**Quality Attributes:** Readable, well-structured, professional

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 4.1.1 | Plain HTML | Simple divs with text content | None | Basic detail display | 4.2.1, 4.3.1, 4.4.1 |
| 4.1.2 | Styled Layout | Professional layout with sections | TailwindCSS | Styled detail page | 4.2.1, 4.2.2, 4.3.1, 4.3.2, 4.4.1, 4.4.2 |
| 4.1.3 | Rich Layout | Styled layout + typography + spacing | TailwindCSS | Premium detail page | 4.2.2, 4.2.3, 4.3.2, 4.3.3, 4.4.2, 4.4.3 |
| 4.1.4 | Layout with Actions | Rich layout + action buttons (edit, delete, export) | TailwindCSS | Complete detail page | 4.2.3, 4.2.4, 4.3.3, 4.3.4, 4.4.3, 4.4.4 |

#### Step 4.2: Fetch Experience by ID
**Purpose:** Retrieve specific experience data
**Quality Attributes:** Fast, handles not found, secure

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 4.2.1 | Mock Single Object | Hardcoded experience object | None | Static experience data | 4.1.1, 4.1.2, 4.3.1, 4.4.1 |
| 4.2.2 | localStorage Lookup | Find by ID in localStorage | localStorage with saved data | Client-side data retrieval | 4.1.2, 4.1.3, 4.3.1, 4.3.2, 4.4.1, 4.4.2 |
| 4.2.3 | Supabase Query by ID | Fetch from database by ID | Supabase configured, user session, GET /api/experiences/[id] endpoint | Server-side data retrieval | 4.1.2, 4.1.3, 4.1.4, 4.3.2, 4.3.3, 4.4.2, 4.4.3 |
| 4.2.4 | Optimized Query | Query with RLS + caching | Supabase configured with RLS, user session | Secure, fast retrieval | 4.1.3, 4.1.4, 4.3.3, 4.3.4, 4.4.3, 4.4.4 |

#### Step 4.3: STAR Display
**Purpose:** Show STAR-formatted achievements clearly
**Quality Attributes:** Easy to read, well-formatted, scannable

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 4.3.1 | Plain Text | Simple paragraph with STAR content | None | Basic text display | 4.1.1, 4.1.2, 4.2.1, 4.2.2, 4.4.1 |
| 4.3.2 | Formatted Sections | Separate sections for S, T, A, R | None | Structured display | 4.1.2, 4.1.3, 4.2.2, 4.2.3, 4.4.1, 4.4.2 |
| 4.3.3 | Rich Formatting | Markdown rendering or rich text | Markdown library (react-markdown) | Professional formatting | 4.1.3, 4.1.4, 4.2.3, 4.2.4, 4.4.2, 4.4.3 |
| 4.3.4 | Interactive STAR | Rich formatting + collapsible sections | Markdown library | Enhanced UX | 4.1.4, 4.2.3, 4.2.4, 4.4.3, 4.4.4 |

#### Step 4.4: Actions (Edit/Delete/Export)
**Purpose:** Allow user to manage experience
**Quality Attributes:** Clear, safe (confirmations), accessible

| # | Name | Description | Requires | Provides | Compatible With |
|---|------|-------------|----------|----------|-----------------|
| ⭐ 4.4.1 | No Actions | View-only page | None | Read-only display | 4.1.1, 4.2.1, 4.3.1 |
| 4.4.2 | Back Button Only | Simple navigation back to list | Next.js router | Basic navigation | 4.1.2, 4.1.3, 4.2.2, 4.2.3, 4.3.1, 4.3.2, 4.3.3 |
| 4.4.3 | Edit/Delete Actions | Buttons with navigation to edit + delete with confirm | Next.js router, DELETE /api/experiences/[id] endpoint | Full CRUD actions | 4.1.3, 4.1.4, 4.2.3, 4.2.4, 4.3.2, 4.3.3 |
| 4.4.4 | Complete Actions | Edit/Delete + Export to PDF/Word | Next.js router, DELETE endpoint, export library | Full action suite | 4.1.4, 4.2.4, 4.3.3, 4.3.4 |

---

## Walking Skeleton

### Recommended Minimum Path (Path A: Client-Side Prototype)

The Walking Skeleton combines the simplest increment from each feature to create a complete end-to-end flow without any backend dependencies.

#### Selected Increments

1. **1.2.1 - Client-side Mock Authentication**
   - **Requires:** None
   - **Provides:** Mock user session (localStorage)
   - **Effort:** 1 hour
   - **Why:** No backend setup, enables instant testing of auth flow

2. **2.5.1 - In-memory Experience Storage**
   - **Requires:** None
   - **Provides:** Temporary data storage
   - **Effort:** 2 hours
   - **Why:** No database, allows testing complete form flow

3. **3.2.1 - Hardcoded Experience List**
   - **Requires:** None
   - **Provides:** Mock experience data
   - **Effort:** 1 hour
   - **Why:** No data fetching, validates listing UI

4. **4.2.1 - Mock Detail View**
   - **Requires:** None
   - **Provides:** Static experience data
   - **Effort:** 1 hour
   - **Why:** No database query, validates detail page UI

#### Complete Flow

**User Journey:**
1. User clicks "Login with LinkedIn" → localStorage flag set → redirected to dashboard
2. User creates experience via form → data stored in component state → shown in list (simulated)
3. User views dashboard → sees hardcoded experiences
4. User clicks experience → sees static detail view

#### Timeline and Effort

- **Total Effort:** ~5 hours
- **Timeline:** 1 day
- **Team Size:** 1 developer
- **Value Delivered:**
  - Validates complete UI/UX flow
  - Enables early design feedback
  - Proves Next.js routing works
  - Zero backend dependencies
  - Can demo to stakeholders immediately

#### Compatibility Matrix

All increments are compatible because they share:
- **No external dependencies** (no API, no database, no OAuth)
- **Client-side only** (localStorage, component state)
- **Mock data patterns** (hardcoded values, static content)

---

## Alternative Paths

### Path B: Basic Backend (Production-Ready Foundation)

For teams ready to implement backend infrastructure:

| Feature | Increment | Requires | Effort |
|---------|-----------|----------|--------|
| Authentication | 1.2.2 - NextAuth Basic | LinkedIn OAuth credentials | 4h |
| Experience Creation | 2.5.3 - Supabase Insert | Supabase setup, user session | 6h |
| Experience Listing | 3.2.3 - Supabase Query | Supabase setup, user session | 3h |
| Detail View | 4.2.3 - Supabase Query by ID | Supabase setup, user session | 2h |

**Total:** ~15 hours (2 days)
**Value:** Real authentication, persistent storage, production-ready architecture

### Path C: Full Production (AI + Optimizations)

For the complete MVP with all features:

| Feature | Increment | Requires | Effort |
|---------|-----------|----------|--------|
| Authentication | 1.2.3 - Supabase Auth + 1.3.3 - Session + 1.4.3 - Error UI | Supabase, credentials | 8h |
| Experience Creation | 2.1.3 - Rich Form + 2.3.2 - OpenAI + 2.4.3 - Rich Editor + 2.5.3 - Supabase | OpenAI API, Supabase | 16h |
| Experience Listing | 3.1.3 - Layout + Header + 3.2.3 - Supabase + 3.3.3 - Interactive Cards | Supabase | 8h |
| Detail View | 4.1.3 - Rich Layout + 4.2.3 - Query + 4.3.3 - Rich Formatting | Supabase, Markdown lib | 6h |

**Total:** ~38 hours (5 days)
**Value:** Complete MVP with AI assistance, professional UI, production-ready

---

## Dependency Analysis

### Critical Dependencies

#### External Services
1. **Supabase** - Required for: 1.2.3, 1.3.3, 2.5.3, 2.5.4, 3.2.3, 3.2.4, 4.2.3, 4.2.4
2. **OpenAI API** - Required for: 2.3.2, 2.3.3, 2.3.4
3. **LinkedIn OAuth** - Required for: 1.2.2, 1.2.3

#### Technical Libraries
1. **TailwindCSS** - Used in most styled increments (already in stack)
2. **Zod** - Validation (2.2.2, 2.2.3, 2.2.4)
3. **React-Markdown** - Rich text display (4.3.3, 4.3.4)
4. **Next.js** - Routing, API routes (already in stack)

### Dependency Chains

**Chain 1: Mock/Prototype Flow**
```
1.2.1 (localStorage auth) → 2.5.1 (in-memory) → 3.2.1 (hardcoded) → 4.2.1 (mock detail)
No external dependencies, ~5 hours total
```

**Chain 2: Basic Backend Flow**
```
1.2.2 (NextAuth) → 2.5.3 (Supabase) → 3.2.3 (Supabase query) → 4.2.3 (query by ID)
Requires: LinkedIn OAuth, Supabase
Time: ~15 hours
```

**Chain 3: Full Production Flow**
```
1.2.3 + 1.3.3 + 1.4.3 → 2.1.3 + 2.3.2 + 2.4.3 + 2.5.3 → 3.1.3 + 3.2.3 + 3.3.3 → 4.1.3 + 4.2.3 + 4.3.3
Requires: LinkedIn OAuth, Supabase, OpenAI API, multiple libraries
Time: ~38 hours
```

### Risk Mitigation

**High Risk Areas:**
1. **OpenAI Integration (2.3.x)** - API costs, rate limits, quality
   - **Mitigation:** Start with 2.3.1 (manual), add AI later

2. **Supabase Auth (1.2.3)** - Complex setup, RLS policies
   - **Mitigation:** Start with 1.2.1 (mock) or 1.2.2 (NextAuth)

3. **LinkedIn OAuth** - Credential approval, redirect URIs
   - **Mitigation:** Use 1.2.1 (mock) for initial development

---

## Implementation Recommendations

### For Quick Time to Market (Priority: Speed)

**Week 1: Path A (Prototype)**
- Days 1-2: Build Walking Skeleton (increments 1.2.1, 2.5.1, 3.2.1, 4.2.1)
- Day 3: Add basic styling (1.1.2, 3.1.2, 3.3.2, 4.1.2)
- Days 4-5: User testing and feedback

**Week 2: Upgrade to Path B (Backend)**
- Days 1-2: Setup Supabase + migrate to 2.5.3, 3.2.3, 4.2.3
- Days 3-4: Implement NextAuth (1.2.2, 1.3.2)
- Day 5: Testing and bug fixes

**Week 3: Add AI (Path C Features)**
- Days 1-3: Implement OpenAI integration (2.3.2)
- Days 4-5: Polish and optimize

### For Quality First (Priority: Polish)

**Week 1-2: Path B + Styling**
- Setup all backend infrastructure first
- Implement rich UI components
- Focus on error handling

**Week 3-4: Path C + Optimizations**
- Add AI features
- Implement advanced features
- Performance optimization

### For Learning/Exploration

**Iterative Approach:**
1. Start with 1.2.1 → understand auth flow
2. Try 1.2.2 → learn NextAuth
3. Try 1.2.3 → learn Supabase Auth
4. Choose best approach for your needs

Apply same pattern to each feature.

---

## Key Insights

### Strengths of This Analysis

1. **Clear Compatibility Paths:** Three distinct paths (A, B, C) with compatible increments
2. **Flexibility:** Can start simple and upgrade incrementally
3. **Risk Management:** Can defer complex integrations (OpenAI, OAuth)
4. **Fast Validation:** Walking Skeleton delivers in 1 day
5. **User Control:** Multiple implementation options at each step

### Architectural Decisions

1. **Authentication:** Supabase Auth recommended for production (1.2.3)
   - Integrates with database
   - Built-in RLS support
   - Handles refresh tokens

2. **Data Storage:** Supabase preferred over custom API
   - Built-in RLS security
   - Real-time capabilities (future)
   - Admin dashboard

3. **AI Integration:** Optional increment approach
   - Can launch without AI (manual STAR)
   - Add AI when ready
   - Reduces initial complexity

### Success Metrics

**Walking Skeleton Success:**
- ✅ Complete user flow works
- ✅ UI/UX validated
- ✅ Architecture proven
- ✅ Stakeholder demo ready

**MVP Success:**
- ✅ Real authentication
- ✅ Data persistence
- ✅ AI assistance working
- ✅ Professional UI
- ✅ Production-ready

---

## Next Steps

### Immediate Actions

1. **Choose Your Path:**
   - Path A if: Need quick prototype, no backend ready
   - Path B if: Backend ready, skip AI initially
   - Path C if: All services ready, want full MVP

2. **Setup Environment:**
   - Create Next.js project
   - Setup TailwindCSS (already in stack)
   - Install dependencies based on chosen path

3. **Start with Walking Skeleton:**
   - Implement 4 increments from Path A
   - Get feedback on UI/UX
   - Validate user journey

### Week 1 Checklist

- [ ] Choose implementation path
- [ ] Setup development environment
- [ ] Implement Walking Skeleton (5 hours)
- [ ] Test complete user flow
- [ ] Gather feedback
- [ ] Plan Week 2 based on results

### Long-term Roadmap

**Phase 1 (Weeks 1-2):** Path A → Path B
- Prototype → Production backend

**Phase 2 (Week 3):** Add AI
- Implement OpenAI integration
- Test STAR generation quality

**Phase 3 (Week 4+):** Polish
- Advanced features (pagination, export, etc.)
- Performance optimization
- User feedback incorporation

---

## Summary

This analysis provides a **flexible, risk-managed approach** to building the Fact-CV MVP. The key strength is the **compatibility system** - you can start with the Walking Skeleton (Path A) and incrementally upgrade to full production (Path C) without throwing away work.

**Key Takeaways:**
- 72 increments across 4 features provide extensive implementation options
- Walking Skeleton delivers value in 1 day with zero backend dependencies
- Clear upgrade paths from prototype → basic backend → full production
- OpenAI and OAuth can be deferred to reduce initial complexity
- All increments specify dependencies and compatibility, enabling informed decisions

**Recommended Approach for Quick Time to Market:**
1. Start with Walking Skeleton (Path A) - 1 day
2. Upgrade to Supabase backend (Path B) - 2 days
3. Add OpenAI when ready (Path C features) - 2-3 days
4. Polish and optimize - ongoing

Total time to full MVP: **1-2 weeks** with clear milestones and validation points throughout.

---

*Generated by Increments Slicer - Intelligent Vertical Slicing for Claude Code*