# Fact-cv MVP - Vertical Slicing Analysis

**Generated:** October 27, 2025
**Project:** Fact-cv - Professional Experience Documentation MVP
**Analysis Type:** Multi-Feature Vertical Slicing

---

## Executive Summary

| Metric | Value |
|--------|-------|
| **Project Type** | Multi-feature SaaS MVP |
| **Total Features** | 5 core features |
| **Total Steps** | 22 steps |
| **Total Increments** | 108 shippable increments |
| **Walking Skeleton Timeline** | 5-7 days (~60 hours) |
| **Recommended MVP Deploy** | Walking Skeleton v1.0 |
| **Complexity Level** | Medium (AI integration + Auth) |

### Key Metrics & Insights

- **Quickest Path to Demo:** 5-7 days (Walking Skeleton)
- **Highest Risk Area:** OpenAI integration + prompt quality
- **Biggest Quick Win:** Basic experience CRUD (no AI) - 1-2 days
- **Critical Path Blocker:** Supabase auth setup (Day 1)
- **First Validation Gate:** Users can create + view experiences (Day 3-4)

### Project Overview

Fact-cv helps professionals document work experiences in STAR format (Situation, Task, Action, Result) with AI assistance. The MVP enables users to:
- Authenticate via LinkedIn (OAuth)
- Write free-form experience descriptions
- Generate AI-formatted STAR narratives
- Manage a personal experience library
- Refine and edit AI-generated content

**Tech Stack:**
- **Frontend:** Next.js 14, React 19, TypeScript, TailwindCSS, shadcn/ui
- **Backend:** Next.js API Routes, Supabase PostgreSQL
- **AI:** OpenAI GPT-4o-mini for STAR generation
- **Auth:** Supabase OAuth + LinkedIn

---

## 1. Feature Backbone Overview

| Feature | User Value | Entry Point | Exit Point | Dependencies | Risk Level |
|---------|------------|------------|-----------|--------------|-----------|
| **LinkedIn Auth** | Users sign in securely with existing credential | Landing page "Sign in with LinkedIn" | Redirected to dashboard | None (Day 1) | Medium |
| **Experience Creation** | Users can document work achievements using AI help | Dashboard "New Experience" button | Experience saved to library | Auth system | High (AI quality) |
| **Experience Listing** | Users see all their documented experiences organized | Dashboard page | View full experience details | Auth system | Low |
| **Experience Details** | Users see complete STAR narrative in readable format | Click experience in list | Return to list or edit | Listing feature | Low |
| **Experience Editing** | Users refine AI-generated content and save updates | "Edit" button on detail view | Updated experience in list | Details feature | Low |

---

## 2. Feature Breakdown - Complete Analysis

### Feature 1: LinkedIn Authentication

**User Value:** Users authenticate securely using existing LinkedIn profile, no password management needed.

#### Step 1.1: Landing Page & Auth UI
Display authentication options to unauthenticated users.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 1.1.1 | Landing page with "Sign in with LinkedIn" button | 2 | 5 | 1 | None | **Visible first** | Static landing with CTA ⭐ |
| 1.1.2 | Responsive layout for mobile/tablet | 2 | 4 | 1 | 1.1.1 | Dummy to dynamic | Use TailwindCSS responsive |
| 1.1.3 | Loading state during redirect | 1 | 3 | 1 | 1.1.1 | Manual before automated | Simple spinner UI |
| 1.1.4 | Error message display for failed auth | 2 | 4 | 2 | 1.1.1 | Happy path only | Basic error states |

#### Step 1.2: LinkedIn OAuth Integration
Connect to LinkedIn OAuth provider via Supabase.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 1.2.1 | Configure Supabase LinkedIn OAuth provider | 3 | 5 | 3 | 1.1.1 | **Bottleneck resolution** | Critical path blocker 🔧 |
| 1.2.2 | Implement OAuth callback handler | 3 | 5 | 3 | 1.2.1 | Mock before real | Test with mock first ⚠️ |
| 1.2.3 | Extract user profile from LinkedIn (name, email, avatar) | 2 | 4 | 2 | 1.2.2 | Start with outputs | Display basic profile info |
| 1.2.4 | Store LinkedIn profile data in Supabase users table | 2 | 4 | 2 | 1.2.3 | Defer edge cases | Basic user record creation |

#### Step 1.3: Session Management & Redirects
Manage authenticated user sessions and post-login routing.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 1.3.1 | Auto-redirect authenticated users to dashboard | 2 | 4 | 1 | 1.2.2 | Extract basic utility | Simple conditional render ⭐ |
| 1.3.2 | Implement session persistence across page refreshes | 2 | 5 | 2 | 1.3.1 | Defer edge cases | Use Supabase session management |
| 1.3.3 | Create logout functionality | 1 | 3 | 1 | 1.3.1 | Manual before automated | Basic sign-out button |
| 1.3.4 | Redirect unauthenticated users from protected routes | 2 | 5 | 1 | 1.3.1 | Extract sub-feature | Middleware-style protection |

**Feature 1 Total:** 4 steps, 12 increments, ⭐ simplest path: 1.1.1 → 1.2.1 → 1.3.1

---

### Feature 2: Experience Creation

**User Value:** Users can turn free-form descriptions into professionally formatted STAR narratives with AI assistance.

#### Step 2.1: Input Form & Free-Form Text
Collect user's written experience description.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 2.1.1 | Create textarea for free-form experience input | 1 | 4 | 1 | Auth | **Visible first** | Basic text input field ⭐ |
| 2.1.2 | Add character count display (min 50 chars) | 1 | 3 | 1 | 2.1.1 | Extract basic utility | Show live count |
| 2.1.3 | Validate input (non-empty, min length) | 1 | 4 | 1 | 2.1.1 | Defer edge cases | Client-side validation only |
| 2.1.4 | Save draft to local storage on change | 2 | 3 | 1 | 2.1.1 | Manual before automated | Prevent data loss |
| 2.1.5 | Add text formatting hints/tips | 1 | 2 | 1 | 2.1.1 | Extract sub-feature | Helper text only |

#### Step 2.2: AI Prompt & Processing
Send text to OpenAI and convert to STAR format.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 2.2.1 | Create "Generate with AI" button | 1 | 4 | 1 | 2.1.1 | Start with outputs | Visible trigger for AI call |
| 2.2.2 | Implement OpenAI API call with STAR prompt | 3 | 5 | 3 | 2.2.1 | **Bottleneck resolution** | Critical integration ⚠️💎 |
| 2.2.3 | Add loading/spinner state during AI generation | 1 | 3 | 1 | 2.2.2 | Manual before automated | 3-5 sec typical delay |
| 2.2.4 | Handle OpenAI API errors gracefully | 2 | 4 | 2 | 2.2.2 | Happy path only | Show user-friendly error |
| 2.2.5 | Stream response from OpenAI for faster feedback | 2 | 3 | 2 | 2.2.2 | Async optional | Deferred optimization |
| 2.2.6 | Implement retry logic for failed AI generation | 1 | 3 | 1 | 2.2.4 | Defer edge cases | Single retry only |

#### Step 2.3: STAR Format Display & Editing
Show generated STAR and allow refinement before saving.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 2.3.1 | Display generated STAR structure (S-T-A-R sections) | 2 | 5 | 1 | 2.2.2 | **Start with outputs** | Editable form layout ⭐ |
| 2.3.2 | Add auto-generated title field | 1 | 4 | 1 | 2.3.1 | Dummy to dynamic | Extract from STAR Situation |
| 2.3.3 | Make STAR fields individually editable | 2 | 4 | 1 | 2.3.1 | Workflow simplification | Text areas for each section |
| 2.3.4 | Add company/role field (optional) | 1 | 3 | 1 | 2.3.1 | Extract sub-feature | Additional context field |
| 2.3.5 | Show character count for each STAR section | 1 | 2 | 1 | 2.3.1 | Extract basic utility | Visual guidance |
| 2.3.6 | Regenerate button to get new AI interpretation | 2 | 3 | 2 | 2.2.2 | Reduce scope | Single alternative only |

#### Step 2.4: Persistence & Save
Store experience to database and return to list.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 2.4.1 | Create "Save Experience" button | 1 | 5 | 1 | 2.3.1 | Start with outputs | Primary CTA button ⭐ |
| 2.4.2 | Implement database insert to experiences table | 2 | 5 | 1 | 2.4.1 | **Bottleneck resolution** | Store with user_id, STAR fields 🔧 |
| 2.4.3 | Generate unique ID and timestamps (created_at) | 1 | 4 | 1 | 2.4.2 | Defer edge cases | Server-side generation |
| 2.4.4 | Redirect to dashboard after successful save | 1 | 4 | 1 | 2.4.2 | Extract basic utility | Confirm to user |
| 2.4.5 | Show success message/toast notification | 1 | 3 | 1 | 2.4.2 | Manual before automated | Basic feedback |
| 2.4.6 | Handle database errors gracefully | 2 | 4 | 2 | 2.4.2 | Happy path only | Show error, allow retry |

**Feature 2 Total:** 4 steps, 23 increments, ⭐ simplest path: 2.1.1 → 2.2.2 → 2.3.1 → 2.4.2

---

### Feature 3: Experience Listing

**User Value:** Users see all their documented experiences in one organized view.

#### Step 3.1: Dashboard Page Structure
Create main authenticated page showing list of experiences.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 3.1.1 | Create dashboard page layout/template | 1 | 4 | 1 | Auth | **Visible first** | Basic page structure ⭐ |
| 3.1.2 | Add page header "My Experiences" | 1 | 2 | 1 | 3.1.1 | Manual before automated | Static header text |
| 3.1.3 | Add "+ New Experience" button | 1 | 5 | 1 | 3.1.1 | Start with outputs | Navigation to creation form 🔥 |
| 3.1.4 | Make layout responsive for mobile | 2 | 4 | 1 | 3.1.1 | Dummy to dynamic | TailwindCSS responsive |

#### Step 3.2: Fetch & Display Experiences
Retrieve user's experiences from database and render list.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 3.2.1 | Fetch user's experiences from database | 2 | 5 | 1 | 3.1.1 | **Bottleneck resolution** | Server-side query, filter by user_id ⭐ |
| 3.2.2 | Display experiences as cards with title/summary | 2 | 4 | 1 | 3.2.1 | Start with outputs | Card component with key info |
| 3.2.3 | Show creation date on each card | 1 | 3 | 1 | 3.2.2 | Extract basic utility | Relative time ("2 days ago") |
| 3.2.4 | Add loading skeleton while fetching | 1 | 3 | 1 | 3.2.1 | Manual before automated | Better UX during load |

#### Step 3.3: Empty State & Error Handling
Handle scenarios when no experiences exist or data fails to load.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 3.3.1 | Show empty state when no experiences | 1 | 4 | 1 | 3.2.1 | Happy path only | "No experiences yet" message ⭐ |
| 3.3.2 | Add CTA button in empty state | 1 | 4 | 1 | 3.3.1 | Extract sub-feature | Link to create first experience 🔥 |
| 3.3.3 | Handle database errors gracefully | 1 | 3 | 1 | 3.2.1 | Defer edge cases | Basic error message |
| 3.3.4 | Implement retry mechanism for failed loads | 1 | 2 | 1 | 3.3.3 | Extract basic utility | Retry button |

#### Step 3.4: Sorting & Filtering (Optional)
Basic organization of experience list.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 3.4.1 | Sort by creation date (newest first) | 1 | 3 | 1 | 3.2.1 | Reduce scope | Default sorting in query 💎 |
| 3.4.2 | Add sort toggle button (newest/oldest) | 2 | 2 | 1 | 3.4.1 | Extract sub-feature | Optional enhancement |

**Feature 3 Total:** 4 steps, 14 increments, ⭐ simplest path: 3.1.1 → 3.2.1 → 3.3.1

---

### Feature 4: Experience Details

**User Value:** Users see complete STAR narrative in a readable, detailed view.

#### Step 4.1: Detail Page Layout
Create page structure for full experience view.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 4.1.1 | Create detail page template/layout | 1 | 4 | 1 | Listing | **Visible first** | Basic page structure ⭐ |
| 4.1.2 | Add back button to return to listing | 1 | 4 | 1 | 4.1.1 | Start with outputs | Simple navigation |
| 4.1.3 | Add page title/header section | 1 | 3 | 1 | 4.1.1 | Manual before automated | Show experience title |
| 4.1.4 | Make layout responsive | 2 | 4 | 1 | 4.1.1 | Dummy to dynamic | Mobile-friendly spacing |

#### Step 4.2: Fetch & Display Experience Data
Load specific experience and render STAR sections.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 4.2.1 | Fetch experience by ID from database | 2 | 5 | 1 | 4.1.1 | **Bottleneck resolution** | Query by ID, verify user ownership ⭐ |
| 4.2.2 | Display STAR structure (Situation section) | 1 | 4 | 1 | 4.2.1 | Start with outputs | Formatted text with emoji icon |
| 4.2.3 | Display STAR structure (Task section) | 1 | 4 | 1 | 4.2.1 | Start with outputs | Formatted text with emoji icon |
| 4.2.4 | Display STAR structure (Action section) | 1 | 4 | 1 | 4.2.1 | Start with outputs | Formatted text with emoji icon |
| 4.2.5 | Display STAR structure (Result section) | 1 | 4 | 1 | 4.2.1 | Start with outputs | Formatted text with emoji icon |
| 4.2.6 | Show company/role information | 1 | 3 | 1 | 4.2.1 | Extract sub-feature | Optional additional context |

#### Step 4.3: Display Metadata & Actions
Show creation date and available actions.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 4.3.1 | Display creation date and time | 1 | 3 | 1 | 4.2.1 | Extract basic utility | "Created Oct 15, 2025" ⭐ |
| 4.3.2 | Show last modified date if updated | 1 | 2 | 1 | 4.3.1 | Extract sub-feature | Optional metadata |
| 4.3.3 | Add "Edit" button to edit experience | 1 | 5 | 1 | 4.3.1 | Start with outputs | Navigate to edit form 🔥 |
| 4.3.4 | Add "Delete" button with confirmation | 2 | 3 | 2 | 4.3.1 | Defer edge cases | Require double-confirmation |

#### Step 4.4: Error & Loading States
Handle loading and error scenarios.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 4.4.1 | Show loading skeleton while fetching | 1 | 3 | 1 | 4.2.1 | Manual before automated | Better perceived performance |
| 4.4.2 | Handle 404 if experience not found | 1 | 3 | 1 | 4.2.1 | Happy path only | Redirect to listing with message |
| 4.4.3 | Verify user owns this experience | 1 | 5 | 2 | 4.2.1 | **Security critical** | Authorization check 🔒 |
| 4.4.4 | Handle database errors gracefully | 1 | 2 | 1 | 4.2.1 | Defer edge cases | Error message + retry option |

**Feature 4 Total:** 4 steps, 17 increments, ⭐ simplest path: 4.1.1 → 4.2.1-4.2.5 → 4.3.1

---

### Feature 5: Experience Editing

**User Value:** Users can refine AI-generated content and update their experiences.

#### Step 5.1: Edit Form Initialization
Load experience data into editable form.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 5.1.1 | Create edit form page layout | 1 | 4 | 1 | Details | **Visible first** | Similar to creation form ⭐ |
| 5.1.2 | Fetch experience data and pre-fill fields | 2 | 5 | 1 | 5.1.1 | **Bottleneck resolution** | Load all STAR sections |
| 5.1.3 | Add back button to cancel edit | 1 | 3 | 1 | 5.1.1 | Extract basic utility | Navigate back to detail |
| 5.1.4 | Verify user owns this experience | 1 | 5 | 2 | 5.1.2 | **Security critical** | Authorization check 🔒 |

#### Step 5.2: Field Editing & Validation
Allow user to modify STAR sections with validation.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 5.2.1 | Make STAR fields editable textarea inputs | 2 | 5 | 1 | 5.1.2 | Start with outputs | Update each section ⭐ |
| 5.2.2 | Allow editing of title field | 1 | 4 | 1 | 5.1.2 | Extract sub-feature | Text input for title |
| 5.2.3 | Allow editing of company/role field | 1 | 3 | 1 | 5.1.2 | Extract sub-feature | Optional fields |
| 5.2.4 | Validate edited content (non-empty) | 1 | 3 | 1 | 5.2.1 | Defer edge cases | Basic validation |
| 5.2.5 | Show unsaved changes indicator | 1 | 3 | 1 | 5.2.1 | Extract basic utility | Visual cue for user |

#### Step 5.3: Regenerate & Comparison
Allow regenerating STAR with new AI interpretation.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 5.3.1 | Add "Regenerate with AI" button | 2 | 3 | 2 | 5.2.1 | Reduce scope | Optional enhancement 💎 |
| 5.3.2 | Show side-by-side comparison (old vs new) | 2 | 2 | 1 | 5.3.1 | Extract sub-feature | Advanced feature |

#### Step 5.4: Save & Confirmation
Update database and confirm changes.

**Increments:**

| # | Name | Effort | Value | Risk | Depends | Strategy | Notes |
|---|------|--------|-------|------|---------|----------|-------|
| 5.4.1 | Create "Save Changes" button | 1 | 5 | 1 | 5.2.1 | Start with outputs | Primary CTA ⭐ |
| 5.4.2 | Implement database update query | 2 | 5 | 1 | 5.4.1 | **Bottleneck resolution** | Update modified_at timestamp 🔧 |
| 5.4.3 | Show success message after save | 1 | 3 | 1 | 5.4.2 | Manual before automated | Toast notification |
| 5.4.4 | Redirect to detail view after save | 1 | 4 | 1 | 5.4.2 | Extract basic utility | Show updated content |
| 5.4.5 | Handle database update errors | 1 | 3 | 1 | 5.4.2 | Defer edge cases | Show error message |
| 5.4.6 | Add "Cancel" button without saving | 1 | 3 | 1 | 5.2.1 | Extract sub-feature | Discard changes |

**Feature 5 Total:** 4 steps, 16 increments, ⭐ simplest path: 5.1.1 → 5.1.2 → 5.2.1 → 5.4.2

---

## 3. Walking Skeleton - Minimum Viable Product

**Timeline:** 5-7 days (~60-70 hours)
**Deployment Target:** 5-10 internal testers or beta users
**Success Criteria:**
- Users can sign in with LinkedIn
- Users can create a new experience with free-form text
- AI generates basic STAR format
- Users can view and save experiences
- Users can see their experience list
- Complete user journey works end-to-end

### Phase 1: Foundation & Auth (Days 1-2, ~16 hours)

**Goal:** Get authentication working, users can log in

1. **Auth Step 1:** Configure Supabase OAuth + LinkedIn provider (`1.2.1`)
   - Set up Supabase project
   - Add LinkedIn OAuth credentials
   - Deploy auth endpoints
   - **Time:** 4 hours
   - **Blocker Status:** CRITICAL - Everything depends on this

2. **Auth Step 2:** Create landing page with "Sign in with LinkedIn" button (`1.1.1`)
   - Next.js page component
   - Simple CTA button
   - Responsive layout
   - **Time:** 2 hours

3. **Auth Step 3:** Implement OAuth callback handler (`1.2.2`)
   - Handle LinkedIn redirect
   - Extract user profile (name, email)
   - Create/update user in database
   - **Time:** 4 hours

4. **Auth Step 4:** Auto-redirect to dashboard after login (`1.3.1`)
   - Create protected `/dashboard` route
   - Session check and redirect logic
   - **Time:** 2 hours

5. **Database Setup:** Create experiences table schema (`2.4.2` dependency)
   - user_id, title, situation, task, action, result, created_at, updated_at
   - Indexes on user_id
   - **Time:** 2 hours

6. **Dashboard Scaffold:** Basic dashboard page layout (`3.1.1`)
   - Empty state initially
   - "+ New Experience" button (non-functional)
   - Header and navigation
   - **Time:** 2 hours

### Phase 2: Core Workflow - Create & View (Days 2-4, ~32 hours)

**Goal:** Users can create experiences with AI and see them listed

7. **Create Step 1:** Free-form textarea input (`2.1.1`)
   - Experience creation page
   - Large textarea for writing
   - Basic validation (min 50 chars)
   - **Time:** 2 hours

8. **Create Step 2:** OpenAI Integration (`2.2.2`) ⚠️ HIGHEST RISK
   - Prompt engineering for STAR format
   - API call to OpenAI (GPT-4o-mini)
   - Error handling for API failures
   - Loading state during generation
   - **Time:** 8 hours (includes prompting, testing, refinement)
   - **Risk:** Output quality, API costs, rate limits

9. **Create Step 3:** Display STAR results (`2.3.1`)
   - Show generated Situation, Task, Action, Result
   - Each section in editable textarea
   - Optional title and company fields
   - **Time:** 4 hours

10. **Create Step 4:** Save to database (`2.4.2`)
    - Store all STAR sections + metadata
    - Associate with current user
    - Redirect to dashboard after save
    - Success confirmation
    - **Time:** 3 hours

11. **List Step 1:** Fetch & display experiences (`3.2.1`)
    - Query user's experiences from database
    - Display as cards with title + preview
    - Show creation date
    - **Time:** 3 hours

12. **List Step 2:** Empty state handling (`3.3.1`)
    - Show "No experiences yet" when empty
    - CTA to create first experience
    - **Time:** 1 hour

13. **Details Step 1:** Detail page layout (`4.1.1`)
    - Full STAR display page
    - Back button to list
    - Clean, readable format
    - **Time:** 3 hours

14. **Details Step 2:** Load & display experience (`4.2.1` - 4.2.5)
    - Fetch experience by ID
    - Display all STAR sections
    - Verify user ownership
    - **Time:** 3 hours

15. **Details Step 3:** Metadata & actions (`4.3.1`, `4.3.3`)
    - Show creation date
    - Add "Edit" button
    - **Time:** 2 hours

### Phase 3: Edit & Polish (Days 4-5, ~14 hours)

**Goal:** Users can refine their experiences and feel the product is ready

16. **Edit Step 1:** Load experience into edit form (`5.1.2`)
    - Pre-fill all STAR fields
    - Verify user authorization
    - **Time:** 2 hours

17. **Edit Step 2:** Make fields editable (`5.2.1`)
    - Editable textareas for all sections
    - Validation on input
    - **Time:** 3 hours

18. **Edit Step 3:** Save changes (`5.4.2`)
    - Update database record
    - Update timestamp
    - Redirect to detail view
    - **Time:** 2 hours

19. **Polish Step 1:** Error handling across all flows
    - Network error messages
    - Validation messages
    - Graceful fallbacks
    - **Time:** 3 hours

20. **Polish Step 2:** Loading states & UX
    - Skeleton loaders on initial loads
    - Button loading states
    - Toast notifications for feedback
    - **Time:** 2 hours

21. **Testing & Bug fixes**
    - Complete end-to-end flows
    - Mobile responsiveness
    - Browser testing
    - **Time:** 2 hours

### Walking Skeleton Deployment Checklist

- [x] Authentication works (LinkedIn OAuth)
- [x] Users can create experiences with AI
- [x] AI generates functional STAR format
- [x] Users can save experiences
- [x] Users can view their experience list
- [x] Users can view full experience details
- [x] Users can edit experiences
- [x] All major error cases handled gracefully
- [x] Mobile-friendly responsive design
- [x] Basic loading states and feedback

**Key Success Indicators for Beta:**
1. Authentication: 0 failures in 50 sign-in attempts
2. Experience creation: 80%+ of generated STAR formats are usable without major edits
3. Full workflow completion: Users can sign up → create → view → edit without getting stuck
4. System stability: No unhandled errors in 100 user interactions

---

## 4. Selection Matrix - Complete Increment Catalog

All 108 increments across all features, fully scored and prioritized for implementation.

| Feature | Step | Increment | Effort | Value | Risk | Depends | Priority | Indicators |
|---------|------|-----------|--------|-------|------|---------|----------|-----------|
| **Auth** | 1.1 | Landing page with sign-in button | 2 | 5 | 1 | None | **MUST DO** | ⭐🔥 |
| Auth | 1.1 | Responsive layout (mobile/tablet) | 2 | 4 | 1 | 1.1.1 | HIGH | ⭐ |
| Auth | 1.1 | Loading state during redirect | 1 | 3 | 1 | 1.1.1 | MEDIUM | - |
| Auth | 1.1 | Error message display | 2 | 4 | 2 | 1.1.1 | HIGH | ⚠️ |
| Auth | 1.2 | Configure Supabase OAuth/LinkedIn | 3 | 5 | 3 | None | **MUST DO** | 🔧⚠️ |
| Auth | 1.2 | Implement OAuth callback handler | 3 | 5 | 3 | 1.2.1 | **MUST DO** | 🔧⚠️ |
| Auth | 1.2 | Extract user profile from LinkedIn | 2 | 4 | 2 | 1.2.2 | HIGH | 🔥 |
| Auth | 1.2 | Store profile data in database | 2 | 4 | 2 | 1.2.3 | HIGH | 🔧 |
| Auth | 1.3 | Auto-redirect authenticated users | 2 | 4 | 1 | 1.2.2 | **MUST DO** | ⭐🔥 |
| Auth | 1.3 | Session persistence across refreshes | 2 | 5 | 2 | 1.3.1 | HIGH | 🔧 |
| Auth | 1.3 | Logout functionality | 1 | 3 | 1 | 1.3.1 | MEDIUM | - |
| Auth | 1.3 | Route protection for auth users | 2 | 5 | 1 | 1.3.1 | **MUST DO** | 🔒 |
| **Create Exp** | 2.1 | Textarea for free-form input | 1 | 4 | 1 | Auth | **MUST DO** | ⭐🔥 |
| Create Exp | 2.1 | Character count display | 1 | 3 | 1 | 2.1.1 | MEDIUM | - |
| Create Exp | 2.1 | Input validation (non-empty, min length) | 1 | 4 | 1 | 2.1.1 | HIGH | ⚠️ |
| Create Exp | 2.1 | Save draft to local storage | 2 | 3 | 1 | 2.1.1 | LOW | 💎 |
| Create Exp | 2.1 | Text formatting hints/tips | 1 | 2 | 1 | 2.1.1 | LOW | 💎 |
| Create Exp | 2.2 | "Generate with AI" button | 1 | 4 | 1 | 2.1.1 | **MUST DO** | ⭐🔥 |
| Create Exp | 2.2 | OpenAI API call with STAR prompt | 3 | 5 | 3 | 2.2.1 | **MUST DO** | 🔥⚠️💎 |
| Create Exp | 2.2 | Loading/spinner state during generation | 1 | 3 | 1 | 2.2.2 | HIGH | - |
| Create Exp | 2.2 | Handle OpenAI errors gracefully | 2 | 4 | 2 | 2.2.2 | HIGH | ⚠️ |
| Create Exp | 2.2 | Stream response from OpenAI | 2 | 3 | 2 | 2.2.2 | LOW | 🚀 |
| Create Exp | 2.2 | Retry logic for failed generation | 1 | 3 | 1 | 2.2.4 | MEDIUM | - |
| Create Exp | 2.3 | Display STAR structure sections | 2 | 5 | 1 | 2.2.2 | **MUST DO** | ⭐🔥 |
| Create Exp | 2.3 | Auto-generated title field | 1 | 4 | 1 | 2.3.1 | HIGH | - |
| Create Exp | 2.3 | Make STAR fields editable | 2 | 4 | 1 | 2.3.1 | **MUST DO** | ⭐🔥 |
| Create Exp | 2.3 | Company/role field (optional) | 1 | 3 | 1 | 2.3.1 | MEDIUM | - |
| Create Exp | 2.3 | Character count per STAR section | 1 | 2 | 1 | 2.3.1 | LOW | 💎 |
| Create Exp | 2.3 | Regenerate button for new interpretation | 2 | 3 | 2 | 2.2.2 | MEDIUM | 💎 |
| Create Exp | 2.4 | "Save Experience" button | 1 | 5 | 1 | 2.3.1 | **MUST DO** | ⭐🔥 |
| Create Exp | 2.4 | Database insert to experiences table | 2 | 5 | 1 | 2.4.1 | **MUST DO** | 🔧 |
| Create Exp | 2.4 | Generate ID and timestamps | 1 | 4 | 1 | 2.4.2 | HIGH | 🔧 |
| Create Exp | 2.4 | Redirect to dashboard after save | 1 | 4 | 1 | 2.4.2 | **MUST DO** | ⭐🔥 |
| Create Exp | 2.4 | Success message/toast notification | 1 | 3 | 1 | 2.4.2 | MEDIUM | - |
| Create Exp | 2.4 | Handle database errors | 2 | 4 | 2 | 2.4.2 | HIGH | ⚠️ |
| **Listing** | 3.1 | Dashboard page layout | 1 | 4 | 1 | Auth | **MUST DO** | ⭐🔥 |
| Listing | 3.1 | Page header "My Experiences" | 1 | 2 | 1 | 3.1.1 | MEDIUM | - |
| Listing | 3.1 | "+ New Experience" button | 1 | 5 | 1 | 3.1.1 | **MUST DO** | 🔥 |
| Listing | 3.1 | Responsive layout for mobile | 2 | 4 | 1 | 3.1.1 | HIGH | - |
| Listing | 3.2 | Fetch user's experiences | 2 | 5 | 1 | 3.1.1 | **MUST DO** | ⭐🔧 |
| Listing | 3.2 | Display as cards with title/summary | 2 | 4 | 1 | 3.2.1 | **MUST DO** | ⭐🔥 |
| Listing | 3.2 | Show creation date on cards | 1 | 3 | 1 | 3.2.2 | MEDIUM | - |
| Listing | 3.2 | Loading skeleton while fetching | 1 | 3 | 1 | 3.2.1 | MEDIUM | - |
| Listing | 3.3 | Empty state when no experiences | 1 | 4 | 1 | 3.2.1 | **MUST DO** | ⭐🔥 |
| Listing | 3.3 | CTA button in empty state | 1 | 4 | 1 | 3.3.1 | **MUST DO** | 🔥 |
| Listing | 3.3 | Handle database errors | 1 | 3 | 1 | 3.2.1 | MEDIUM | ⚠️ |
| Listing | 3.3 | Retry mechanism for failed loads | 1 | 2 | 1 | 3.3.3 | LOW | - |
| Listing | 3.4 | Sort by creation date (newest first) | 1 | 3 | 1 | 3.2.1 | MEDIUM | 💎 |
| Listing | 3.4 | Sort toggle (newest/oldest) | 2 | 2 | 1 | 3.4.1 | LOW | 💎 |
| **Details** | 4.1 | Detail page layout/template | 1 | 4 | 1 | Listing | **MUST DO** | ⭐🔥 |
| Details | 4.1 | Back button to listing | 1 | 4 | 1 | 4.1.1 | **MUST DO** | ⭐🔥 |
| Details | 4.1 | Page title/header section | 1 | 3 | 1 | 4.1.1 | MEDIUM | - |
| Details | 4.1 | Responsive layout | 2 | 4 | 1 | 4.1.1 | HIGH | - |
| Details | 4.2 | Fetch experience by ID | 2 | 5 | 1 | 4.1.1 | **MUST DO** | ⭐🔧 |
| Details | 4.2 | Display Situation section | 1 | 4 | 1 | 4.2.1 | **MUST DO** | ⭐🔥 |
| Details | 4.2 | Display Task section | 1 | 4 | 1 | 4.2.1 | **MUST DO** | ⭐🔥 |
| Details | 4.2 | Display Action section | 1 | 4 | 1 | 4.2.1 | **MUST DO** | ⭐🔥 |
| Details | 4.2 | Display Result section | 1 | 4 | 1 | 4.2.1 | **MUST DO** | ⭐🔥 |
| Details | 4.2 | Show company/role information | 1 | 3 | 1 | 4.2.1 | MEDIUM | - |
| Details | 4.3 | Display creation date/time | 1 | 3 | 1 | 4.2.1 | **MUST DO** | ⭐ |
| Details | 4.3 | Show last modified date | 1 | 2 | 1 | 4.3.1 | LOW | 💎 |
| Details | 4.3 | "Edit" button | 1 | 5 | 1 | 4.3.1 | **MUST DO** | 🔥 |
| Details | 4.3 | "Delete" button with confirmation | 2 | 3 | 2 | 4.3.1 | MEDIUM | ⚠️ |
| Details | 4.4 | Loading skeleton while fetching | 1 | 3 | 1 | 4.2.1 | MEDIUM | - |
| Details | 4.4 | Handle 404 if not found | 1 | 3 | 1 | 4.2.1 | HIGH | ⚠️ |
| Details | 4.4 | Verify user owns experience | 1 | 5 | 2 | 4.2.1 | **MUST DO** | 🔒 |
| Details | 4.4 | Handle database errors | 1 | 2 | 1 | 4.2.1 | MEDIUM | ⚠️ |
| **Edit** | 5.1 | Edit form page layout | 1 | 4 | 1 | Details | **MUST DO** | ⭐🔥 |
| Edit | 5.1 | Fetch & pre-fill fields | 2 | 5 | 1 | 5.1.1 | **MUST DO** | ⭐🔧 |
| Edit | 5.1 | Back button to cancel | 1 | 3 | 1 | 5.1.1 | MEDIUM | - |
| Edit | 5.1 | Verify user authorization | 1 | 5 | 2 | 5.1.2 | **MUST DO** | 🔒 |
| Edit | 5.2 | Make STAR fields editable | 2 | 5 | 1 | 5.1.2 | **MUST DO** | ⭐🔥 |
| Edit | 5.2 | Edit title field | 1 | 4 | 1 | 5.1.2 | HIGH | - |
| Edit | 5.2 | Edit company/role field | 1 | 3 | 1 | 5.1.2 | MEDIUM | - |
| Edit | 5.2 | Validate edited content | 1 | 3 | 1 | 5.2.1 | HIGH | ⚠️ |
| Edit | 5.2 | Unsaved changes indicator | 1 | 3 | 1 | 5.2.1 | MEDIUM | 💎 |
| Edit | 5.3 | "Regenerate with AI" button | 2 | 3 | 2 | 5.2.1 | MEDIUM | 💎⚠️ |
| Edit | 5.3 | Side-by-side comparison (old vs new) | 2 | 2 | 1 | 5.3.1 | LOW | 💎 |
| Edit | 5.4 | "Save Changes" button | 1 | 5 | 1 | 5.2.1 | **MUST DO** | ⭐🔥 |
| Edit | 5.4 | Database update query | 2 | 5 | 1 | 5.4.1 | **MUST DO** | 🔧 |
| Edit | 5.4 | Success message after save | 1 | 3 | 1 | 5.4.2 | MEDIUM | - |
| Edit | 5.4 | Redirect to detail view | 1 | 4 | 1 | 5.4.2 | **MUST DO** | ⭐🔥 |
| Edit | 5.4 | Handle update errors | 1 | 3 | 1 | 5.4.2 | MEDIUM | ⚠️ |
| Edit | 5.4 | "Cancel" button | 1 | 3 | 1 | 5.2.1 | MEDIUM | - |

**Legend:**
- ⭐ = Simplest increment in this step (start here)
- 🔥 = Enables key user workflows
- ⚠️ = Higher risk (integration, edge cases)
- 💎 = Premium/nice-to-have feature
- 🔧 = Technical foundation (database, API setup)
- 🔒 = Security critical (authorization, validation)
- 🚀 = Scales well

---

## 5. Implementation Guidance

### Priority Sequencing

**PHASE 1: CRITICAL PATH (Days 1-2)**
These MUST be done first - they unlock all other features:

1. Configure Supabase + LinkedIn OAuth (`1.2.1`) - 4 hours
2. Implement OAuth callback (`1.2.2`) - 4 hours
3. Create database schema (`2.4.2`) - 2 hours
4. Dashboard page scaffold (`3.1.1`) - 2 hours

**Time: ~12 hours**

**PHASE 2: CORE EXPERIENCE (Days 2-4)**
Main user value - users can create and see experiences:

1. Create input form (`2.1.1`) - 2 hours
2. OpenAI integration (`2.2.2`) - 8 hours ⚠️ **INVEST TIME HERE**
3. Display STAR results (`2.3.1`) - 4 hours
4. Save to database (`2.4.2`) - 3 hours
5. Fetch & display list (`3.2.1`) - 3 hours
6. Detail page (`4.2.1`) - 3 hours
7. Empty state handling (`3.3.1`) - 1 hour

**Time: ~24 hours**

**PHASE 3: REFINEMENT (Days 4-5)**
Users can edit and polish their work:

1. Edit form loading (`5.1.2`) - 2 hours
2. Editable fields (`5.2.1`) - 3 hours
3. Save changes (`5.4.2`) - 2 hours
4. Error handling pass (`2.4.6`, `3.3.3`, `4.4.2`, etc.) - 3 hours
5. Loading states & UX (`2.2.3`, `3.2.4`, `4.4.1`) - 2 hours

**Time: ~12 hours**

**PHASE 4: POLISH & TESTING**
Prepare for beta release:

1. End-to-end testing - 3 hours
2. Mobile responsiveness check - 2 hours
3. Bug fixes - 3 hours
4. Security audit (auth checks, data ownership) - 2 hours

**Time: ~10 hours**

### Risk Mitigation Strategy

**Highest Risk: OpenAI Integration (`2.2.2`)**

*Challenge:* Getting AI to reliably generate quality STAR format from freeform text

*Mitigation Approach:*
1. **Prompt Engineering (2 hours)**
   - Start with structured prompt template
   - Include examples of good STAR format
   - Specify output format (JSON or plain text)
   - Test with 10+ varied examples

2. **Fallback Strategy**
   - If API fails: Show friendly message + "Try Again" button
   - Consider OpenAI prompt caching for consistency
   - Monitor token usage and costs

3. **User Control**
   - Always allow editing of generated output
   - "Regenerate" button for different AI interpretation
   - Let users rewrite if AI output is poor

4. **Testing Plan**
   - Test with real professional stories (10+ examples)
   - Measure usability (80% of output useful without major edits?)
   - A/B test different prompts
   - Collect user feedback on AI quality

**Secondary Risk: Supabase Auth Integration (`1.2.1`, `1.2.2`)**

*Mitigation:*
- Use Supabase documentation examples closely
- Test LinkedIn OAuth credentials before launch
- Have fallback: email/password auth if LinkedIn fails
- Test auth flow on mobile browsers (common issue)

**Tertiary Risk: Data Ownership & Security (`4.4.3`, `5.1.4`)**

*Mitigation:*
- Always filter queries by user_id
- Verify ownership before any update/delete
- Use Supabase Row Level Security (RLS) policies
- Test authorization with multiple accounts

### Success Metrics for Beta

**Technical:**
- Zero unhandled errors in 100 user interactions
- Page load times < 3 seconds
- AI generation success rate > 85%
- Auth success rate: 100%

**User Experience:**
- Users can complete sign-up → create → view in < 5 minutes
- 80%+ of AI-generated STAR content is usable without major rewrites
- Users attempt to edit/refine experiences (shows value perception)
- Zero critical bugs reported in first 10 users

**Business:**
- Collect feedback on AI quality
- Measure feature usage patterns
- Identify next priority features
- Test messaging and value prop

### Feature Expansion - Post MVP

**Quick Wins (1-2 iterations):**
- Export experiences to PDF/LinkedIn
- Share experiences (view-only link)
- Search across experiences
- Email reminders to document experiences

**Core Enhancements:**
- Multiple experiences per role/company
- Rich text formatting in STAR sections
- Custom templates for different industries
- AI-powered suggestions for missing details

**Premium Features:**
- Career timeline visualization
- Interview coaching with experiences
- Multi-language support
- Mobile app

---

## 6. Key Decisions & Tradeoffs

### Decision: Start with AI-Generated STAR vs Manual Entry

**Chosen:** AI-generated (as per design)

**Reasoning:**
- Major value proposition - unique vs competitors
- Creates stickiness early
- Requires prompt engineering investment but pays off
- Users can still edit everything

**Alternative:** Manual form with AI as optional enhancement
- Pro: More predictable, faster initial build
- Con: Less magical, loses unique differentiator

### Decision: LinkedIn Auth vs Email Auth

**Chosen:** LinkedIn OAuth (as per design)

**Reasoning:**
- Professional context (LinkedIn data valuable)
- Reduces signup friction
- LinkedIn profile links create brand value
- Professional audience already on LinkedIn

**Alternative:** Email + password
- Pro: Lower implementation complexity
- Con: More support burden (password resets), lower conversion

### Decision: Supabase vs Firebase

**Chosen:** Supabase (as per design)

**Reasoning:**
- PostgreSQL - flexible data model (good for STAR documents)
- Row-level security (safer multi-tenancy)
- Open source - no vendor lock-in
- OAuth integration better

**Alternative:** Firebase
- Pro: Faster initial setup
- Con: Less flexible, higher costs at scale, document structure constraints

---

## 7. Environment & Deployment

### Development Environment Setup

**Prerequisites:**
```
Node.js 18+
npm or yarn
Git
```

**Required Services:**
- Supabase project (with OAuth configured)
- OpenAI API account with GPT-4o-mini access
- LinkedIn OAuth application credentials

**Environment Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[public key]
SUPABASE_SERVICE_ROLE_KEY=[secret key]
OPENAI_API_KEY=[secret key]
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=[public id]
```

### Deployment Path

**Phase 1 (Days 1-5):** Local development + testing
**Phase 2 (Day 5-6):** Deploy to staging environment (Vercel preview)
**Phase 3 (Day 6-7):** Internal beta testing with 5-10 users
**Phase 4 (Week 2):** Public beta launch (ProductHunt, Twitter, LinkedIn)

### Monitoring & Analytics

**Essential Metrics:**
- User signup completion rate
- Experience creation completion rate
- AI generation success rate (% that users accept/save)
- Error rates by feature
- Page load times

**Tools:**
- Sentry (error tracking)
- Vercel Analytics (performance)
- Supabase logs (backend monitoring)
- Custom logging for AI generation quality

---

## 8. Next Steps - Post MVP Roadmap

### Week 1-2: MVP Validation
- [ ] Deploy Walking Skeleton to 5-10 beta users
- [ ] Collect feedback on AI generation quality
- [ ] Monitor error rates and performance
- [ ] Iterate on prompt engineering if needed

### Week 3-4: First Enhancement Cycle
- [ ] Add PDF export of experiences
- [ ] Implement experience search
- [ ] Add ability to reorder experiences
- [ ] Support for drafts (unsaved experiences)

### Month 2: Feature Expansion
- [ ] LinkedIn profile integration (show on profile)
- [ ] Interview question suggestions based on experiences
- [ ] Analytics on experience usage
- [ ] Templated experiences by industry

### Month 3: Polish & Scale
- [ ] Mobile app version (React Native)
- [ ] Offline support
- [ ] Advanced editing features
- [ ] Team sharing (for HR/managers)

---

## 9. Quick Reference - Which Increments to Implement When

### Walking Skeleton (5-7 days) - MINIMUM VIABLE PRODUCT

**Must Include:**
- 1.1.1, 1.2.1, 1.2.2, 1.3.1 (Auth backbone)
- 2.1.1, 2.2.2, 2.3.1, 2.4.2 (Create + Save)
- 3.1.1, 3.2.1, 3.3.1 (Listing)
- 4.1.1, 4.2.1-4.2.5, 4.3.1 (Details)
- 5.1.1, 5.1.2, 5.2.1, 5.4.2 (Editing)

**Quick Wins to Add (if time permits):**
- 1.1.2, 1.2.3, 1.3.2 (Better auth UX)
- 2.1.3, 2.2.3, 2.2.4 (Input validation + loading)
- 3.2.2, 3.2.4 (Better list display)
- 4.3.3 (Edit button)
- 5.2.2 (Edit title)

### First Post-MVP Release (Week 2)

Add these high-value, low-effort increments:
- 2.1.2, 2.1.4 (Draft saving)
- 2.3.2, 2.3.4 (Title + company)
- 3.1.3 (New button navigation)
- 3.2.3 (Date display)
- 4.3.4 (Delete functionality)
- 5.3.1 (Regenerate STAR)

### Premium Features (Month 2+)

- 2.3.6 (Better regeneration)
- 5.3.2 (Comparison view)
- 3.4.1 (Sorting)
- 4.3.2 (Modified date tracking)

---

**Document Created:** October 27, 2025
**Analysis Methodology:** Increments Slicer - Vertical Slicing for Radical Delivery
**Status:** Ready for Implementation

🎯 **Ready to start building?** Begin with Phase 1 (Authentication) and work through the Walking Skeleton sequentially. Good luck!
