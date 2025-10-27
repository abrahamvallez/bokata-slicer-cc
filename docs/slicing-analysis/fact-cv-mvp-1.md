# Vertical Slicing Analysis: fact-cv MVP

## Executive Summary

**Project:** fact-cv MVP - AI-Assisted STAR Experience Documentation
**Domain:** HR/Career Tech - Professional experience documentation
**Tech Stack:** Next.js 14, React 19, TypeScript, Supabase, OpenAI GPT-4o-mini, TailwindCSS, shadcn/ui
**Total Features:** 5
**Total Steps:** 16
**Total Increments Generated:** 107
**Walking Skeleton:** 16 increments (~18 hours)
**Analysis Date:** October 27, 2025

### Key Metrics

- **Minimum Viable Implementation (Walking Skeleton):** 2.5 days
- **Functional MVP (Walking Skeleton + P1 Critical):** 6 days
- **Polished MVP (Walking Skeleton + P1 + P2):** 8.5 days
- **Feature-Complete Product (All increments):** 20-25 days

### Critical Path

```
Walking Skeleton (2.5d) → Real Auth + AI (3d) → User Testing (1w) → Iterate (1-2w)
```

**Recommended Timeline:** Deploy Walking Skeleton in Week 1, gather feedback in Week 2, iterate based on learnings in Week 3-4.

---

## Features Backbone

### User Journey Overview

Users authenticate via LinkedIn OAuth, then document professional experiences by writing in free-form text. The AI (OpenAI GPT-4o-mini) transforms their input into structured STAR format (Situation, Task, Action, Result). Users can view their collection of formatted experiences, see full details of each, and edit them as needed.

### Features Identified

1. **Authenticate with LinkedIn** - Users sign in via LinkedIn OAuth (Supabase Auth) to establish identity and access their experiences
2. **Create Experience with AI** - Users write free-form text, AI formats it into STAR structure, and they can edit before saving
3. **View Experiences List** - Users see all their documented experiences in a dashboard with cards showing previews
4. **View Experience Detail** - Users can view the complete STAR breakdown of a specific experience
5. **Edit Experience Fields** - Users can modify STAR sections, title, company, and other fields after creation

### Feature Flow Narrative

The journey begins with **Authenticate with LinkedIn** to establish user identity securely. Once authenticated, users can **Create Experience with AI** by writing freely about their professional accomplishments, which the AI structures into STAR format. After creating experiences, **View Experiences List** displays all saved items in an organized dashboard. Users drill down via **View Experience Detail** to see complete STAR breakdowns with full text. Throughout, **Edit Experience Fields** enables refinement and updates to any experience.

### Feature Dependencies

- **Critical:** "Authenticate with LinkedIn" must exist before any experience operations (CRUD requires user context)
- **Recommended:** "Create Experience with AI" before "View Experiences List" (need content to display)
- **Independent:** "View Experience Detail" and "Edit Experience Fields" can be implemented in any order after core create/list functionality
- **Security Note:** User filtering (3.1.3) is mandatory before production deployment

---

## Detailed Breakdown

### Feature 1: Authenticate with LinkedIn

**User Story:** As a professional user, I need to sign in with my LinkedIn account so that my experiences are securely stored and associated with my identity.

**Core Value:** Establishes user identity, enables data ownership, leverages existing LinkedIn profile for trust and convenience.

---

#### Step 1.1: Display Authentication UI

**Purpose:** Show landing page with clear call-to-action for LinkedIn sign-in
**Tech Layers:** UI (landing page, button) | Logic (redirect handling) | Data (N/A for display)

**Increments Available:**

- **1.1.1 Hardcoded Auth Button** - Static HTML page with "Sign in with LinkedIn" button, no OAuth yet | Strategy: Start with Outputs ⭐ *Simplest*
- **1.1.2 Minimal Landing Page** - Basic Next.js page with Supabase Auth LinkedIn button (real OAuth trigger) | Strategy: Dummy to Dynamic
- **1.1.3 Landing with Branding** - Add logo, tagline, value proposition above auth button | Strategy: Zero/One/Many
- **1.1.4 Landing with Features List** - Add 3 bullet points explaining app benefits | Strategy: Zero/One/Many
- **1.1.5 Landing with Social Proof** - Add testimonials or usage stats (dummy data initially) | Strategy: Start with Dummy
- **1.1.6 Landing with Hero Image** - Full marketing landing page with imagery and multi-section CTA | Strategy: Simplify Outputs

**Strategy Rationale:** Start with pure presentation (hardcoded button) to prove UI flow, then add real OAuth integration, then progressively enhance with marketing content. For MVP validation, the simplest button proves the concept fastest.

---

#### Step 1.2: Initiate OAuth Flow

**Purpose:** Handle LinkedIn OAuth redirect, authorization request, and callback
**Tech Layers:** UI (redirect feedback) | Logic (OAuth handshake, Supabase integration) | Data (session token)

**Increments Available:**

- **1.2.1 Fake Auth (Hardcoded User)** - Button sets hardcoded user session (bypasses OAuth entirely) | Strategy: Dummy to Dynamic ⭐ *Simplest*
- **1.2.2 Supabase LinkedIn Provider** - Real LinkedIn OAuth via Supabase Auth (standard configuration) | Strategy: Extract Basic Utility
- **1.2.3 OAuth with Error Handling** - Add user-facing error messages for auth failures (invalid state, canceled) | Strategy: Business Rule Progression
- **1.2.4 OAuth with Retry Logic** - Automatically retry failed auth attempts up to 3 times | Strategy: Business Rule Progression
- **1.2.5 OAuth with State Validation** - Add CSRF protection and state parameter verification | Strategy: Security Enhancement
- **1.2.6 OAuth with Scope Selection** - Request minimal LinkedIn scopes (email, basic profile only) | Strategy: Data Variation Reduction

**Strategy Rationale:** Fake auth proves the entire post-login flow without external OAuth complexity. This enables rapid iteration on dashboard and creation flows. Real OAuth (1.2.2) is P1 priority for production but not needed for Walking Skeleton validation.

---

#### Step 1.3: Store User Session

**Purpose:** Create user record in database and establish authenticated session state
**Tech Layers:** UI (logged-in state indicator) | Logic (session management) | Data (user table, session storage)

**Increments Available:**

- **1.3.1 In-Memory Session (No Persistence)** - Store session boolean in memory (refresh loses auth state) | Strategy: Extract Basic Utility ⭐ *Simplest*
- **1.3.2 Supabase Session Cookie** - Use Supabase's built-in session management with HTTP-only cookies | Strategy: Zero/One/Many
- **1.3.3 Session with LinkedIn Profile Sync** - Store LinkedIn email and name in users table | Strategy: Data Variation Reduction
- **1.3.4 Session with Extended Profile** - Sync LinkedIn headline, photo URL, company info | Strategy: Data Variation Reduction
- **1.3.5 Session with Remember Me** - Add persistent session option with 30-day expiry | Strategy: Workflow Simplification
- **1.3.6 Session with Activity Tracking** - Track last_login_at and login_count fields | Strategy: Data Enrichment

**Strategy Rationale:** In-memory session is sufficient for Walking Skeleton (proves session-gated access). Real persistence (1.3.2) required for P1 production deployment. Profile syncing (1.3.3+) enhances UX but deferred until core flows validated.

**Dependencies:** 1.3.2+ require 1.2.2 (real OAuth) to have LinkedIn profile data available.

---

### Feature 2: Create Experience with AI

**User Story:** As a user, I need to describe my professional experience in my own words and have AI format it into STAR structure, so I can quickly document my accomplishments without worrying about structure.

**Core Value:** Removes friction of structured documentation, leverages AI to transform free-form stories into interview-ready STAR format, enables rapid experience capture.

---

#### Step 2.1: Capture Free-Form Input

**Purpose:** Display textarea where user writes experience in natural language (minimum 50 characters)
**Tech Layers:** UI (form with textarea) | Logic (validation) | Data (temporary input state)

**Increments Available:**

- **2.1.1 Simple Textarea (No Validation)** - Basic HTML textarea with submit button, accepts any length | Strategy: Extract Basic Utility ⭐ *Simplest*
- **2.1.2 Textarea with Character Counter** - Add visual counter showing characters typed, require minimum 50 chars | Strategy: Zero/One/Many
- **2.1.3 Textarea with Placeholder Guidance** - Add example text: "Describe what you did, how, and the result..." | Strategy: Workflow Simplification
- **2.1.4 Textarea with Auto-Save Draft** - Save input to localStorage every 5 seconds | Strategy: Workflow Simplification
- **2.1.5 Textarea with Writing Tips** - Add expandable help section with STAR format examples | Strategy: Split Learning
- **2.1.6 Textarea with Voice Input** - Add speech-to-text button for mobile dictation | Strategy: Use Case Expansion
- **2.1.7 Guided Prompt Template** - Progressive disclosure: separate questions for S/T/A/R instead of free-form | Strategy: Interfaces (SPIDR)

**Strategy Rationale:** Bare textarea (2.1.1) proves input capture instantly. Character counter (2.1.2) is lightweight quality improvement. Placeholder guidance (2.1.3) critical for reducing user confusion - high-value P1 increment. Advanced features like voice input deferred to P3 based on user feedback.

---

#### Step 2.2: Process with OpenAI

**Purpose:** Send user text to OpenAI GPT-4o-mini API to generate STAR-formatted structure
**Tech Layers:** UI (loading state) | Logic (API call, prompt engineering, response parsing) | Data (API response storage)

**Increments Available:**

- **2.2.1 Hardcoded STAR Response (No API)** - Return pre-written STAR structure, bypass OpenAI entirely | Strategy: Dummy to Dynamic ⭐ *Simplest*
- **2.2.2 Simple OpenAI API Call** - Direct GPT-4o-mini call with basic prompt: "Format this as STAR..." | Strategy: Extract Basic Utility
- **2.2.3 API with Loading State** - Add spinner and "Analyzing your experience..." message (3-5s typical) | Strategy: Zero/One/Many
- **2.2.4 API with Error Handling** - Catch API errors (timeout, rate limit, invalid response), show retry option | Strategy: Business Rule Progression
- **2.2.5 API with Retry Logic** - Automatic retry on failure, max 3 attempts with exponential backoff | Strategy: Workflow Simplification
- **2.2.6 API with Prompt Optimization** - Enhanced prompt for better STAR quality: include examples, constraints | Strategy: Business Rule Progression
- **2.2.7 API with Streaming Response** - Stream OpenAI response token-by-token for perceived speed | Strategy: Performance Optimization
- **2.2.8 API with Fallback Strategies** - If OpenAI fails, offer manual STAR template as backup | Strategy: Workflow Simplification

**Strategy Rationale:** Hardcoded response (2.2.1) validates entire UI/UX flow without API dependency or cost. Critical for Walking Skeleton. Real API (2.2.2) is P1 - proves core value proposition. Loading state (2.2.3) and error handling (2.2.4) essential for production (P1). Prompt optimization (2.2.6) deferred to P2 after seeing real user input quality.

**Dependencies:** 2.2.2+ require OpenAI API key and organization setup.

---

#### Step 2.3: Display STAR Preview

**Purpose:** Show AI-generated STAR structure in editable format with sections for Situation, Task, Action, Result
**Tech Layers:** UI (form fields, layout) | Logic (field editing) | Data (STAR sections state)

**Increments Available:**

- **2.3.1 Plain Text STAR Display** - Show 4 text blocks with section labels (S/T/A/R), read-only | Strategy: Simplify Outputs ⭐ *Simplest*
- **2.3.2 STAR with Visual Icons** - Add 📍🎯⚡🏆 emojis before each section header | Strategy: Zero/One/Many
- **2.3.3 STAR with Editable Fields** - Convert to editable textareas, allow editing before save | Strategy: Extract Basic Utility
- **2.3.4 STAR with Title Field** - Add title input at top (AI generates suggested title) | Strategy: Data Variation Reduction
- **2.3.5 STAR with Company Field** - Add company/organization input field | Strategy: Data Variation Reduction
- **2.3.6 STAR with Date Range** - Add start_date and end_date pickers | Strategy: Data Variation Reduction
- **2.3.7 STAR with Regenerate Option** - Add "Try Again" button to re-run AI on same input | Strategy: Workflow Simplification
- **2.3.8 STAR with Field-Level Edit** - Click section to edit inline (vs full-form editing) | Strategy: Interfaces (SPIDR)

**Strategy Rationale:** Read-only display (2.3.1) proves AI output rendering. Editable fields (2.3.3) CRITICAL for P1 - users must trust/refine AI output. Title field (2.3.4) high value for list view. Company and dates (2.3.5, 2.3.6) enhance searchability but deferred to P2.

---

#### Step 2.4: Save to Database

**Purpose:** Persist the STAR-formatted experience to Supabase experiences table with user association
**Tech Layers:** UI (save button, success feedback) | Logic (validation, save operation) | Data (Supabase insert)

**Increments Available:**

- **2.4.1 Direct Supabase Insert (No Validation)** - INSERT into experiences table, no field checks | Strategy: Extract Basic Utility ⭐ *Simplest*
- **2.4.2 Insert with Required Fields Validation** - Check title and all STAR sections are non-empty | Strategy: Business Rule Progression
- **2.4.3 Insert with User Association** - Add user_id foreign key constraint, link to authenticated user | Strategy: Security (mandatory)
- **2.4.4 Insert with Timestamps** - Auto-populate created_at and updated_at columns | Strategy: Data Enrichment
- **2.4.5 Insert with Success Feedback** - Show toast notification: "Experience saved!" | Strategy: Zero/One/Many
- **2.4.6 Insert with Optimistic UI** - Update list immediately, rollback on error | Strategy: Performance Optimization
- **2.4.7 Insert with Original Text Storage** - Save user's original free-form input alongside STAR | Strategy: Data Variation Reduction

**Strategy Rationale:** Direct insert (2.4.1) proves database persistence. User association (2.4.3) MANDATORY for P1 - security critical. Validation (2.4.2) and feedback (2.4.5) enhance UX in P2. Original text storage (2.4.7) enables future "regenerate" features.

**Dependencies:** 2.4.3 requires authentication (Feature 1 complete).

---

### Feature 3: View Experiences List

**User Story:** As a user, I need to see all my documented experiences in one place so I can review them, choose which to expand, and track my documentation progress.

**Core Value:** Central dashboard for all experiences, enables navigation to details, provides overview of documented career accomplishments.

---

#### Step 3.1: Fetch User Experiences

**Purpose:** Query Supabase for all experiences belonging to authenticated user, sorted by date
**Tech Layers:** UI (loading indicator) | Logic (query construction, filtering) | Data (Supabase SELECT)

**Increments Available:**

- **3.1.1 Hardcoded Array (No Database)** - Return 2-3 fake experiences from memory | Strategy: Dummy to Dynamic ⭐ *Simplest*
- **3.1.2 Simple Supabase Query** - SELECT * FROM experiences (no filtering - shows ALL users' data) | Strategy: Extract Basic Utility
- **3.1.3 Query with User Filtering** - Add WHERE user_id = current_user.id (SECURITY CRITICAL) | Strategy: Security (mandatory)
- **3.1.4 Query with Sorting** - ORDER BY created_at DESC (newest first) | Strategy: Business Rule Progression
- **3.1.5 Query with Pagination** - LIMIT 10, add "Load More" button | Strategy: Split by Capacity
- **3.1.6 Query with Search** - Add text search across title, situation, action, result | Strategy: Use Case Isolation
- **3.1.7 Query with Real-Time Subscription** - Supabase real-time: auto-update when new experience added | Strategy: Performance Optimization

**Strategy Rationale:** Hardcoded data (3.1.1) validates list UI rendering. Real query (3.1.2) proves database integration. **User filtering (3.1.3) is P1 mandatory** - without it, users see each other's experiences (security hole). Sorting (3.1.4) improves UX in P2. Search/pagination deferred to P3 based on dataset size.

**Dependencies:** 3.1.2+ require Feature 2 (experiences exist in database). 3.1.3 requires Feature 1 (authentication for user_id).

---

#### Step 3.2: Render Experience Cards

**Purpose:** Display each experience as a card with title, preview text, metadata, and click affordance
**Tech Layers:** UI (cards, grid layout) | Logic (mapping data to components) | Data (N/A for rendering)

**Increments Available:**

- **3.2.1 Unstyled List Items** - Simple `<ul>` with `<li>` title text only | Strategy: Simplify Outputs ⭐ *Simplest*
- **3.2.2 Basic Card Layout** - Add card container with padding, border, hover state | Strategy: Zero/One/Many
- **3.2.3 Card with Preview Text** - Show first 100 chars of Result section as preview | Strategy: Start with Outputs
- **3.2.4 Card with Company** - Display company name below title | Strategy: Data Variation Reduction
- **3.2.5 Card with Icons** - Add 🎯 emoji before title | Strategy: Zero/One/Many
- **3.2.6 Card with Click to View** - Make entire card clickable, navigate to detail page | Strategy: Workflow Simplification
- **3.2.7 Card with Quick Actions** - Add edit/delete buttons on hover | Strategy: Use Case Expansion
- **3.2.8 Card with Responsive Grid** - 1 col mobile, 2 cols tablet, 3 cols desktop | Strategy: Use Case Narrowing (mobile first)

**Strategy Rationale:** Unstyled list (3.2.1) proves data rendering. Basic cards (3.2.2) and clickability (3.2.6) are P1 - makes list usable. Preview text (3.2.3) and company (3.2.4) improve scannability in P2. Responsive grid (3.2.8) deferred to P3 unless mobile users dominate testing.

---

#### Step 3.3: Handle Empty State

**Purpose:** Show meaningful message when user has zero experiences, guide them to create first one
**Tech Layers:** UI (empty state component) | Logic (conditional rendering) | Data (N/A)

**Increments Available:**

- **3.3.1 Plain Text Message** - "No experiences yet." text only | Strategy: Extract Basic Utility ⭐ *Simplest*
- **3.3.2 Message with CTA Button** - Add "Create Your First Experience" button | Strategy: Zero/One/Many
- **3.3.3 Illustrated Empty State** - Add simple icon or illustration | Strategy: Simplify Outputs
- **3.3.4 Empty State with Example** - Show preview of what a card looks like | Strategy: Split Learning
- **3.3.5 Empty State with Benefits** - Explain value: "Document your career wins to ace interviews" | Strategy: Split Learning
- **3.3.6 Empty State with Video Tutorial** - Embed 30-second demo video | Strategy: Use Case Isolation

**Strategy Rationale:** Plain text (3.3.1) handles the state. CTA button (3.3.2) improves onboarding in P2. Illustration/benefits enhance first impression but deferred to P3 based on activation metrics.

---

### Feature 4: View Experience Detail

**User Story:** As a user, I need to see the complete STAR breakdown of a specific experience so I can review all details, copy it for interviews, or prepare for editing.

**Core Value:** Full-text display of experience, enables detailed review, supports copy-paste to resumes/interview prep, provides context for edit operations.

---

#### Step 4.1: Fetch Single Experience

**Purpose:** Query specific experience by ID from URL parameter, validate user ownership
**Tech Layers:** UI (loading state, 404 page) | Logic (ID parsing, ownership check) | Data (Supabase SELECT by ID)

**Increments Available:**

- **4.1.1 Hardcoded Single Record** - Return fake experience object, ignore URL parameter | Strategy: Dummy to Dynamic ⭐ *Simplest*
- **4.1.2 Supabase Query by ID** - SELECT * FROM experiences WHERE id = :id | Strategy: Extract Basic Utility
- **4.1.3 Query with User Ownership Check** - Add AND user_id = current_user.id (SECURITY) | Strategy: Security (mandatory)
- **4.1.4 Query with 404 Handling** - Show "Experience not found" if ID invalid or deleted | Strategy: Business Rule Progression
- **4.1.5 Query with Loading State** - Show skeleton loader while fetching | Strategy: Zero/One/Many
- **4.1.6 Query with Error Boundary** - Graceful error handling with retry option | Strategy: Workflow Simplification

**Strategy Rationale:** Hardcoded record (4.1.1) proves detail page layout. Real query (4.1.2) + ownership check (4.1.3) are P1 mandatory. Loading state (4.1.5) improves perceived performance in P2.

**Dependencies:** 4.1.2+ require experiences in database (Feature 2). 4.1.3 requires auth (Feature 1).

---

#### Step 4.2: Render STAR Format Display

**Purpose:** Show complete STAR breakdown with clear visual separation of sections
**Tech Layers:** UI (section layout, typography) | Logic (rendering) | Data (N/A)

**Increments Available:**

- **4.2.1 Plain Text Sections** - Display S/T/A/R as simple text blocks with bold labels | Strategy: Simplify Outputs ⭐ *Simplest*
- **4.2.2 Sections with Visual Icons** - Add 📍🎯⚡🏆 emojis to section headers | Strategy: Zero/One/Many
- **4.2.3 Sections with Dividers** - Add horizontal rules or spacing between sections | Strategy: Zero/One/Many
- **4.2.4 Display with Typography** - Larger headings, better line spacing, max-width for readability | Strategy: Simplify Outputs
- **4.2.5 Display with Metadata** - Show company, dates, created_at timestamp | Strategy: Data Variation Reduction
- **4.2.6 Display with Copy Button** - Click to copy entire STAR text to clipboard | Strategy: Use Case Isolation
- **4.2.7 Display with Print Stylesheet** - CSS for clean printing/PDF generation | Strategy: Use Case Isolation
- **4.2.8 Display with Share Options** - Export as Markdown, PDF, or shareable link | Strategy: Use Case Expansion

**Strategy Rationale:** Plain text (4.2.1) readable baseline. Icons (4.2.2) and typography (4.2.4) are P2 polish. Copy button (4.2.6) high user value but deferred to P2/P3 based on user requests. Export features (4.2.8) nice-to-have for P3+.

---

#### Step 4.3: Provide Navigation Back

**Purpose:** Enable user to return to experiences list without browser back button
**Tech Layers:** UI (back link/button) | Logic (navigation) | Data (N/A)

**Increments Available:**

- **4.3.1 Text Link "Back"** - Simple `<Link href="/dashboard">Back</Link>` | Strategy: Extract Basic Utility ⭐ *Simplest*
- **4.3.2 Link with Arrow Icon** - "← Back to Dashboard" with visual indicator | Strategy: Zero/One/Many
- **4.3.3 Browser Back Button Support** - Ensure proper history state, allow browser back | Strategy: Workflow Simplification
- **4.3.4 Breadcrumb Navigation** - "Dashboard > Experience Title" breadcrumb trail | Strategy: Zero/One/Many
- **4.3.5 Floating Back Button** - Sticky back button that follows scroll | Strategy: Use Case Isolation
- **4.3.6 Keyboard Shortcut** - ESC key returns to list | Strategy: Use Case Expansion

**Strategy Rationale:** Text link (4.3.1) functional baseline. Arrow icon (4.3.2) improves discoverability in P2. Advanced navigation (breadcrumbs, keyboard) deferred to P3.

---

### Feature 5: Edit Experience Fields

**User Story:** As a user, I need to modify my experience details so I can refine AI-generated content, fix errors, or update information as my career progresses.

**Core Value:** Enables refinement of AI output, supports iterative improvement, allows updates as career details change.

---

#### Step 5.1: Enable Edit Mode

**Purpose:** Convert display fields to editable inputs (inline or dedicated page)
**Tech Layers:** UI (form inputs) | Logic (edit state management) | Data (N/A for mode toggle)

**Increments Available:**

- **5.1.1 Dedicated Edit Page** - Separate `/experience/:id/edit` route with full form | Strategy: Interfaces (SPIDR) ⭐ *Simplest*
- **5.1.2 Edit Button on Detail Page** - Add "Edit" button that navigates to dedicated page | Strategy: Workflow Simplification
- **5.1.3 Inline Edit Toggle** - Convert detail view to editable fields in place | Strategy: Interfaces (SPIDR)
- **5.1.4 Click-to-Edit Fields** - Click individual section to edit that field only | Strategy: Interfaces (SPIDR)
- **5.1.5 Edit with Cancel Confirmation** - Prompt "Discard changes?" before losing edits | Strategy: Workflow Simplification
- **5.1.6 Edit with Autosave** - Save changes every 5 seconds automatically | Strategy: Workflow Simplification

**Strategy Rationale:** Dedicated page (5.1.1) simplest - separate route, full form. Edit button (5.1.2) makes discoverability clear. Inline editing (5.1.3) better UX but more complex state management - defer to P2/P3.

---

#### Step 5.2: Update Database

**Purpose:** Persist edited fields to Supabase with validation
**Tech Layers:** UI (save feedback) | Logic (UPDATE query, validation) | Data (Supabase UPDATE)

**Increments Available:**

- **5.2.1 Full Record Update (No Validation)** - UPDATE experiences SET ... WHERE id = :id | Strategy: Extract Basic Utility ⭐ *Simplest*
- **5.2.2 Update with Field Validation** - Check required fields aren't empty | Strategy: Business Rule Progression
- **5.2.3 Partial Field Update (PATCH)** - Only update changed fields, not entire record | Strategy: Data Variation Reduction
- **5.2.4 Update with Conflict Detection** - Check updated_at timestamp for concurrent edits | Strategy: Business Rule Progression
- **5.2.5 Update with Version History** - Store previous version before updating | Strategy: Data Enrichment
- **5.2.6 Update with Updated_At Timestamp** - Auto-update updated_at column | Strategy: Data Enrichment

**Strategy Rationale:** Full update (5.2.1) proves persistence. Validation (5.2.2) improves data quality in P2. PATCH optimization (5.2.3) and version history (5.2.5) advanced features for P3+.

**Dependencies:** All increments require auth (Feature 1) and ownership validation.

---

#### Step 5.3: Refresh Display

**Purpose:** Update UI to reflect saved changes and exit edit mode
**Tech Layers:** UI (display update) | Logic (state refresh) | Data (refetch or optimistic update)

**Increments Available:**

- **5.3.1 Redirect to Detail Page** - Navigate to `/experience/:id` after save | Strategy: Extract Basic Utility ⭐ *Simplest*
- **5.3.2 Optimistic UI Update** - Update display immediately, show error if save fails | Strategy: Performance Optimization
- **5.3.3 Success Toast Notification** - Show "Changes saved!" toast message | Strategy: Zero/One/Many
- **5.3.4 Inline Display Refresh** - Stay in edit mode, show updated values | Strategy: Workflow Simplification
- **5.3.5 Background Save with Indicator** - Saving icon animates during async save | Strategy: Zero/One/Many
- **5.3.6 Refetch from Database** - Pull fresh data after save to ensure consistency | Strategy: Data Validation

**Strategy Rationale:** Redirect (5.3.1) clear, simple confirmation of save. Toast (5.3.3) improves UX feedback in P2. Optimistic updates (5.3.2) advanced performance feature for P3.

---

## Walking Skeleton

### Purpose

The **Walking Skeleton** is your "ship tomorrow" version - the absolute minimum implementation that delivers end-to-end functionality across all 5 features. It answers: "What would we build if we had only 24 hours?"

### Composition

**Estimated Total Effort:** 18 hours (~2.5 days for solo developer)

#### Feature 1: Authenticate with LinkedIn
- **Step 1.1 - Display Auth UI:** ✓ 1.1.1 Hardcoded Auth Button (~1 hour)
- **Step 1.2 - Initiate OAuth:** ✓ 1.2.1 Fake Auth (Hardcoded User) (~1 hour)
- **Step 1.3 - Store Session:** ✓ 1.3.1 In-Memory Session (~1 hour)

**Feature 1 Total:** 3 hours

#### Feature 2: Create Experience with AI
- **Step 2.1 - Capture Input:** ✓ 2.1.1 Simple Textarea (No Validation) (~1 hour)
- **Step 2.2 - Process OpenAI:** ✓ 2.2.1 Hardcoded STAR Response (~1 hour)
- **Step 2.3 - Display STAR:** ✓ 2.3.1 Plain Text STAR Display (~1 hour)
- **Step 2.4 - Save to DB:** ✓ 2.4.1 Direct Supabase Insert (~1 hour)

**Feature 2 Total:** 4 hours

#### Feature 3: View Experiences List
- **Step 3.1 - Fetch Experiences:** ✓ 3.1.1 Hardcoded Array (~1 hour)
- **Step 3.2 - Render Cards:** ✓ 3.2.1 Unstyled List Items (~1 hour)
- **Step 3.3 - Empty State:** ✓ 3.3.1 Plain Text Message (~1 hour)

**Feature 3 Total:** 3 hours

#### Feature 4: View Experience Detail
- **Step 4.1 - Fetch Single:** ✓ 4.1.1 Hardcoded Single Record (~1 hour)
- **Step 4.2 - Render STAR:** ✓ 4.2.1 Plain Text Sections (~1 hour)
- **Step 4.3 - Navigation Back:** ✓ 4.3.1 Text Link "Back" (~1 hour)

**Feature 4 Total:** 3 hours

#### Feature 5: Edit Experience Fields
- **Step 5.1 - Enable Edit:** ✓ 5.1.1 Dedicated Edit Page (~2 hours)
- **Step 5.2 - Update DB:** ✓ 5.2.1 Full Record Update (~1 hour)
- **Step 5.3 - Refresh Display:** ✓ 5.3.1 Redirect to Detail (~1 hour)

**Feature 5 Total:** 4 hours

---

### Validation Criteria

You'll know the Walking Skeleton works when:

- [ ] User can click "Sign in" (fake) and reach dashboard
- [ ] User can type free text in textarea
- [ ] System shows hardcoded STAR structure
- [ ] User can save experience to Supabase (verified in DB)
- [ ] User sees saved experience in list (mixed with hardcoded items)
- [ ] User can click experience and view full STAR detail
- [ ] User can edit experience and changes persist to database
- [ ] Can demonstrate complete CRUD flow without errors
- [ ] All 5 features touch UI → Logic → Data layers

### Why This Combination

**Strategic Rationale:**

1. **Fake auth + fake AI removes external dependencies** - No LinkedIn OAuth setup, no OpenAI API key needed. Focus on proving Next.js + Supabase + React architecture works.

2. **Mix of hardcoded and real data validates hybrid approach** - List shows hardcoded experiences + real DB records, proving data rendering is agnostic to source.

3. **Complete CRUD proves database schema** - Create, Read (list + detail), Update, (Delete deferred but schema proven) demonstrates experiences table design works.

4. **End-to-end flow validates routing** - Landing → Dashboard → Create → List → Detail → Edit → Detail demonstrates all navigation works.

5. **Fastest path to stakeholder demo** - Can show working product in 2.5 days without external API dependencies. Perfect for pitch meetings or internal validation.

6. **Minimal technical risk** - All components use proven patterns (Next.js pages, Supabase queries, React forms). No experimental tech.

### What You Can Learn

After deploying Walking Skeleton:

- **Architecture validation:** Does Next.js 14 + Supabase + shadcn/ui fit the use case?
- **User flow clarity:** Is the create → list → detail → edit flow intuitive?
- **Performance baseline:** How fast are Supabase queries? Is the app responsive?
- **STAR format appeal:** Do stakeholders/testers respond positively to STAR structure?
- **Deployment viability:** Does Vercel + Supabase infrastructure work reliably?

### Next Steps After Walking Skeleton

**Critical:** Do NOT add more features yet. Deploy and validate first.

1. **Deploy to Vercel** (30 minutes) - Push to GitHub, connect Vercel, configure Supabase env vars
2. **Test with 3-5 people** (1-2 days) - Friends, colleagues, potential users
3. **Gather specific feedback:**
   - Did you understand how to create an experience?
   - Was the hardcoded STAR output helpful or confusing?
   - Would you use this with real AI?
   - What's most confusing or frustrating?
4. **Then choose next iteration based on feedback** (see Implementation Paths below)

---

## Implementation Paths

After deploying the Walking Skeleton, choose one of these 5 strategic paths based on your priorities. All paths build on the Walking Skeleton foundation.

---

### Path 1: Speed to Market (3-4 days)

**Strategic Focus:** Get to functional MVP as fast as possible with real auth and real AI.

**What to Add Next:**

1. **1.2.2 Supabase LinkedIn Provider** (2 hours) - Replace fake auth with real OAuth
2. **2.2.2 Simple OpenAI API Call** (2 hours) - Replace hardcoded STAR with real AI
3. **2.2.3 API with Loading State** (1 hour) - Show "Analyzing..." spinner during API call
4. **3.1.3 Query with User Filtering** (1 hour) - **CRITICAL SECURITY:** Show only user's own experiences
5. **2.3.3 STAR with Editable Fields** (2 hours) - Allow editing AI output before save
6. **3.2.2 Basic Card Layout** (2 hours) - Add minimal styling to experience cards

**Total Effort:** 10 hours (~1.5 days)
**Timeline:** Walking Skeleton (2.5d) + Path 1 (1.5d) = **4 days to functional MVP**

**What Users Will Notice:**

- Can sign in with real LinkedIn account
- AI actually formats their experience text (not fake)
- Can edit AI suggestions before saving
- List looks presentable with basic cards
- Security: only see their own experiences

**Best For:**

- Need to validate AI-STAR concept quickly (biggest unknown)
- MVP timeline is tight (< 2 weeks to launch)
- Solo developer wanting quick wins
- First time using Supabase + OpenAI (prove the stack works)
- Want early user feedback to guide next iteration

**Risks:**

- No error handling beyond basics (API failures will confuse users)
- UX remains minimal (no input guidance, plain forms)
- OpenAI costs not optimized (simple prompt may use more tokens)
- No validation on inputs

**What's Still Deferred:**

- Input guidance (placeholder text, examples)
- Prompt optimization for AI quality
- Visual polish (icons, branding, typography)
- Metadata fields (company, dates)
- Advanced error handling and retry logic

---

### Path 2: Balanced Approach (6-8 days)

**Strategic Focus:** Balance speed with quality and usability for sustainable MVP.

**What to Add Next:**

**Phase 1: Core Functionality (4 days)**
1. 1.2.2 Supabase LinkedIn Provider (2h)
2. 2.2.2 Simple OpenAI API Call (2h)
3. 2.2.3 API with Loading State (1h)
4. 2.2.4 API with Error Handling (2h)
5. 3.1.3 Query with User Filtering (1h) - Security
6. 2.3.3 STAR with Editable Fields (2h)
7. 3.2.2 Basic Card Layout (2h)

**Phase 2: Quality Enhancements (2-3 days)**
8. 2.1.2 Textarea with Character Counter (1h)
9. 2.1.3 Textarea with Placeholder Guidance (2h)
10. 2.3.4 STAR with Title Field (1h)
11. 3.2.6 Card with Click to View (1h)
12. 2.4.5 Insert with Success Feedback (1h)
13. 4.1.2 Supabase Query by ID (1h)
14. 4.1.3 User Ownership Check (1h)

**Total Effort:** 20 hours (~2.5 days)
**Timeline:** Walking Skeleton (2.5d) + Balanced (2.5d) = **5 days to polished MVP**

**What Users Will Notice:**

- Smooth sign-in experience
- Real AI with clear loading states
- Helpful error messages if API fails
- Character counter guides input length
- Can edit AI output and add title
- Nice card layout that's clickable
- Toast notifications on save
- Security: proper data isolation

**Best For:**

- 3-month MVP timeline (not rushed, not leisurely)
- Want sustainable development pace
- Targeting professionals (they expect polish)
- Planning beta test with 50-100 users
- Quality matters but not mission-critical

**Risks:**

- Takes longer than Speed path (~5 days vs 4 days)
- Still lacks advanced features (search, export, rich metadata)
- Edit functionality remains basic

**What's Still Deferred:**

- Visual branding and marketing landing page
- Prompt optimization for AI quality
- Visual icons and rich typography
- Company and date fields
- Advanced validation
- Search and filtering

---

### Path 3: Quality First (12-15 days)

**Strategic Focus:** Create polished, professional experience before launch.

**What to Add:** 25+ increments covering:

**Core + Security (5 days)**
- All Path 2 Phase 1 increments
- 1.2.3 OAuth with Error Handling
- 1.3.3 Session with LinkedIn Profile Sync
- 2.4.2 Insert with Required Fields Validation
- 2.4.3 Insert with User Association
- 3.1.4 Query with Sorting

**Visual Polish (4 days)**
- 1.1.3 Landing with Branding
- 2.3.2 STAR with Visual Icons
- 3.2.3 Card with Preview Text
- 3.2.4 Card with Company
- 3.2.5 Card with Icons
- 3.3.2 Empty State with CTA
- 4.2.2 Sections with Visual Icons
- 4.2.4 Display with Typography
- 4.3.2 Link with Arrow Icon

**Quality Enhancements (3-4 days)**
- 2.2.6 API with Prompt Optimization
- 2.3.5 STAR with Company Field
- 3.1.2 Simple Supabase Query (replace hardcoded)
- 4.2.5 Display with Metadata
- 5.2.2 Update with Field Validation
- 5.3.3 Success Toast Notification

**Total Effort:** 40 hours (~5-6 days development)
**Timeline:** Walking Skeleton (2.5d) + Quality (5-6d) = **7.5-8.5 days to premium MVP**

**What Users Will Notice:**

- Professional landing page with branding
- Seamless LinkedIn OAuth experience
- Clear input guidance and examples
- High-quality AI-generated STAR format
- Beautiful, icon-rich UI throughout
- Smooth error handling and feedback
- Polished card layout with previews
- Professional detail view with typography
- Complete metadata (company, dates)

**Best For:**

- Targeting HR professionals and recruiters (high expectations)
- Premium positioning ($10-20/month pricing)
- Competing with Notion, LinkedIn (high quality bar)
- Have designer support or strong UI skills
- 3-month timeline with buffer
- Brand/reputation is critical for B2B sales

**Risks:**

- Longest time to market (8+ days before first users)
- Risk of premature optimization (what if users don't like STAR format?)
- Higher development cost
- Longer feedback loop

**What's Still Deferred:**

- Advanced features (search, tags, export, PDF)
- Optimization (caching, real-time subscriptions)
- Collaboration features
- Mobile app

---

### Path 4: Feature-by-Feature (15-20 days)

**Strategic Focus:** Complete features one at a time for clear milestones.

**Sequence:**

**Phase 1: Complete Authentication (3-4 days)**
- All 1.1.x, 1.2.x, 1.3.x increments (except #6 variants)
- Result: Fully functional, polished auth flow with real LinkedIn OAuth

**Phase 2: Complete Create Experience (5-6 days)**
- All 2.1.x, 2.2.x, 2.3.x, 2.4.x increments (core + quality)
- Result: Complete, polished creation flow with real AI

**Phase 3: Complete List View (2-3 days)**
- All 3.1.x, 3.2.x, 3.3.x increments
- Result: Professional list/dashboard

**Phase 4: Complete Detail View (2-3 days)**
- All 4.1.x, 4.2.x, 4.3.x increments
- Result: Beautiful detail page

**Phase 5: Complete Edit (2-3 days)**
- All 5.1.x, 5.2.x, 5.3.x increments
- Result: Full CRUD capability

**Total Timeline:** Walking Skeleton (2.5d) + 15-20d = **17.5-22.5 days to feature-complete**

**What Users Will Notice:**

- Features become fully functional one by one
- Each deployment makes one area polished
- Progressive capability expansion
- Clear "complete" feeling per feature

**Best For:**

- Learning Supabase + OpenAI + Next.js 14 (deep focus helps)
- Solo developer wanting clear milestones
- Can release incrementally (e.g., launch with auth + create + list only)
- Stakeholders want to see "complete" features
- Features are independent

**Risks:**

- Longest total timeline (3+ weeks)
- Other features remain basic while perfecting one
- Integration issues discovered late
- Users might want "good enough" across all features vs perfect in one

---

### Path 5: Cross-Feature Enhancement (14-16 days)

**Strategic Focus:** Improve one aspect systematically across all features.

**Iteration Themes:**

**Iteration 1: Core Functionality (Real Auth + Real AI) - 3 days**
- 1.2.2 Supabase LinkedIn Provider
- 2.2.2 Simple OpenAI API Call
- 2.2.3 API with Loading State
- 3.1.2 Simple Supabase Query
- 3.1.3 Query with User Filtering
- 4.1.2 Supabase Query by ID
**Result:** All features use real data/services

**Iteration 2: UX Enhancement (Validation + Feedback) - 4 days**
- 1.2.3 OAuth Error Handling
- 2.1.2 Character Counter
- 2.2.4 API Error Handling
- 2.4.2 Insert Validation
- 2.4.5 Success Feedback
- 3.1.4 Query Sorting
- 4.1.3 User Ownership Check
- 5.2.2 Update Validation
- 5.3.3 Success Toast
**Result:** Consistent validation and feedback everywhere

**Iteration 3: Visual Polish (UI/Icons/Layout) - 4 days**
- 1.1.3 Landing Branding
- 2.3.2 STAR Icons
- 2.3.3 Editable Fields
- 3.2.2 Card Layout
- 3.2.5 Card Icons
- 3.3.2 Empty CTA
- 4.2.2 STAR Icons
- 4.2.4 Typography
- 4.3.2 Arrow Link
**Result:** Professional, cohesive visual design

**Iteration 4: Data Enrichment (Metadata) - 3 days**
- 1.3.3 LinkedIn Profile Sync
- 2.3.4 Title Field
- 2.3.5 Company Field
- 3.2.3 Preview Text
- 3.2.4 Company Display
- 4.2.5 Metadata Display
**Result:** Rich data throughout

**Total Timeline:** Walking Skeleton (2.5d) + 14d iterations = **16.5 days to enhanced product**

**What Users Will Notice:**

- All features improve together
- Consistent experience across entire app
- Each iteration makes everything better in one dimension
- Systematic, professional improvements

**Best For:**

- Have 2+ developers (can parallelize by theme)
- Want consistency across all features
- Have specialists (UX designer, backend dev)
- Specific priority ("all features need validation")

**Risks:**

- No single feature feels "complete" until end
- Context switching between features
- Coordination overhead if team

---

## Decision Guide

### Quick Decision Table

| Your Priority | Recommended Path | Timeline | Rationale |
|---------------|------------------|----------|-----------|
| Validate AI-STAR concept | Path 1: Speed | 4 days | Test core hypothesis fastest |
| 3-month MVP timeline | Path 1 or 2 | 4-5 days | Leaves buffer for iteration |
| Balanced pace | Path 2: Balanced | 5 days | Best compromise |
| Professional HR audience | Path 3: Quality | 8 days | Career pros expect polish |
| Learning stack deeply | Path 4: Feature-by-Feature | 17-22 days | Deep focus per feature |
| Solo developer | Path 1, 2, or 4 | Varies | Avoid context switching |
| 2+ developers | Path 5: Cross-Feature | 16 days | Enables parallel work |
| Need demo for investors | Path 1 + UI polish | 5-6 days | Functional + presentable |

### Recommended Strategy for fact-cv MVP

**Start with Path 1: Speed to Market** (4 days total)

**Why:**
- Biggest unknown: Will users adopt AI-assisted STAR format?
- Can't validate until real users try real AI
- Walking Skeleton (2.5d) + Path 1 (1.5d) = testable MVP in 4 days
- 3-month timeline provides buffer for iteration

**Then:**
- Test with 10-20 users (1 week)
- Gather feedback on AI quality, UX clarity, value proposition
- Based on learnings:
  - If AI quality issues → Add 2.2.6 (Prompt Optimization)
  - If UX confusing → Add Path 2 guidance increments
  - If appearance matters → Add Path 3 visual polish
  - If users love it → Deploy and market aggressively

**This approach:**
- Validates concept quickly
- Proves tech stack works
- Enables informed quality improvements
- Reduces risk of building wrong thing
- Fits 3-month timeline comfortably

### Still Unsure?

**Default 3-week strategy:**

1. **Days 1-2:** Deploy Walking Skeleton
2. **Days 3-5:** Add Path 1 (Speed) increments
3. **Days 6-7:** Test with 5-10 users
4. **Days 8-14:** Iterate based on feedback using Selection Matrix below
5. **Days 15-21:** Polish and prepare for wider launch

---

## Custom Selection Matrix

For complete control, use this matrix to build your own path by selecting specific increments based on effort, value, and risk scores.

### How to Use

1. Review all increments in the Detailed Breakdown section above
2. Filter by priority: ⭐ (Walking Skeleton), 🔥 (High Value), ⚡ (Quick Win)
3. Select increments that fit your constraints (time, team, priorities)
4. Verify dependencies before implementing
5. Build your sprint plan

### Priority Legend

- **⭐** = Walking Skeleton (already included in baseline)
- **🔥** = High business value (score 4-5)
- **⚡** = Quick win (effort 1-2, value 3+)
- **💎** = Quality/polish increment
- **🔒** = Security-critical
- **⚠️** = Technical risk or external dependency

### High-Priority Increments (P1)

**MANDATORY for Production:**
- 1.2.2: Supabase LinkedIn Provider (2h) 🔥⚠️ - Real OAuth
- 3.1.3: Query with User Filtering (1h) 🔥🔒⚡ - SECURITY CRITICAL
- 2.4.3: Insert with User Association (1h) 🔥🔒⚡ - Links experience to owner

**High-Value Quick Wins:**
- 2.2.2: Simple OpenAI API Call (2h) 🔥⚠️ - Core value prop
- 2.2.3: API with Loading State (1h) 🔥💎⚡ - UX feedback
- 2.3.3: STAR with Editable Fields (2h) 🔥⚡ - User trust
- 2.3.4: STAR with Title Field (1h) 🔥⚡ - Improves list view
- 3.2.2: Basic Card Layout (2h) 🔥💎⚡ - Makes list usable
- 3.2.6: Card with Click to View (1h) 🔥⚡ - Navigation

**Total P1:** 14 hours (~2 days) to add after Walking Skeleton

### Medium-Priority Increments (P2)

**Quality Enhancements:**
- 2.1.2: Character Counter (1h) 💎⚡
- 2.1.3: Placeholder Guidance (2h) 🔥💎⚡
- 2.2.4: API Error Handling (2h) 🔥💎⚡
- 1.2.3: OAuth Error Handling (2h) 🔥💎⚡
- 2.4.2: Insert Validation (2h) 🔥💎⚡
- 2.4.5: Success Feedback (1h) 💎⚡

**Visual Polish:**
- 2.3.2: STAR Visual Icons (1h) 💎⚡
- 3.2.3: Card Preview Text (1h) 💎⚡
- 3.2.4: Card with Company (1h) 💎⚡
- 1.1.3: Landing Branding (2h) 💎⚡

**Total P2:** 15 hours (~2 days) for quality/polish

### Sprint Planning Template

**Sprint 0: Walking Skeleton (2.5 days)**
- Goal: End-to-end functionality deployed
- Increments: All ⭐ marked (16 total)
- Success: Can demo complete CRUD flow

**Sprint 1: Functional MVP (1.5-2 days)**
- Goal: Real auth + real AI + security
- Increments: 1.2.2, 2.2.2, 2.2.3, 3.1.3, 2.3.3, 3.2.2, 2.4.3
- Success: Can onboard real users securely

**Sprint 2: Quality & UX (2 days)**
- Goal: Polished, user-friendly experience
- Increments: 2.1.2, 2.1.3, 2.2.4, 1.2.3, 2.4.5, 2.3.2, 3.2.3
- Success: Users complete flows without confusion

**Sprint 3+: Iterate Based on Feedback**
- Goal: Address user-reported issues/requests
- Increments: Selected from P2/P3 based on data
- Success: User satisfaction and retention metrics improve

### Dependencies to Watch

**Critical Path:**
```
1.2.1 (Fake Auth) → 1.2.2 (Real OAuth) → 1.3.2 (Session Cookie)
                                           ↓
2.4.3 (User Association) → 3.1.3 (User Filtering) 🔒 SECURITY CRITICAL
```

**Before deploying with real users:**
- [ ] 1.2.2: Real LinkedIn OAuth (not fake)
- [ ] 3.1.3: User filtering (prevents data leakage)
- [ ] 2.4.3: User association (ownership tracking)

**External Setup Required:**
- LinkedIn Developers Portal: Create OAuth app (~45 min including approval wait)
- Supabase: Configure LinkedIn provider (~15 min)
- OpenAI: Create account, generate API key (~15 min)

---

## Next Steps

### Immediate Actions

1. **Review this analysis** - Understand features, increments, and options
2. **Choose your path** - Use Decision Guide to select Speed, Balanced, Quality, Feature-by-Feature, or Cross-Feature
3. **Set up infrastructure:**
   - Initialize Next.js 14 project
   - Configure Supabase (database, auth)
   - Set up shadcn/ui components
   - Configure OpenAI account (if not using Walking Skeleton hardcoded approach)
4. **Implement Walking Skeleton** - Start with 16 ⭐ increments (2.5 days)
5. **Deploy to Vercel** - Get it running in production ASAP

### After Walking Skeleton Deployment

1. **Validate architecture** - Does the stack work as expected?
2. **Test locally with friends** - Get initial feedback on flow
3. **Add Path 1 increments** - Real auth + real AI (1.5 days)
4. **Test with 10-20 users** - Real validation begins
5. **Measure key metrics:**
   - Sign-up completion rate
   - Experience creation completion rate
   - AI output acceptance rate (do they edit heavily?)
   - Time to create first experience
   - Would you pay for this? (yes/no/maybe)

### Iteration Strategy

**Week 1:** Walking Skeleton + Path 1 deployed
**Week 2:** User testing and feedback gathering
**Week 3-4:** Iterate based on learnings:
- If users confused → Add guidance/polish (Path 2/3 increments)
- If AI quality issues → Focus on 2.2.6 (prompt optimization)
- If users love it → Add more features (Path 4/5 increments)

**Weeks 5-12:** Continue iterating, add advanced features, prepare for launch

### Questions for Stakeholders

Before starting implementation, confirm:

1. **Is LinkedIn OAuth acceptable?** (vs email/password)
2. **What's the budget for OpenAI API?** (estimate $0.01-0.05 per experience created)
3. **Who are the first 20 test users?** (need real users for validation)
4. **What's the definition of MVP success?** (N users? X% completion rate?)
5. **Is there a hard deadline?** (affects path selection)

### Resources Needed

**Development:**
- Next.js 14 + React 19 experience
- Supabase experience (or willingness to learn)
- OpenAI API experience (or docs available)
- TailwindCSS + shadcn/ui familiarity

**Infrastructure:**
- Vercel account (free tier sufficient for MVP)
- Supabase account (free tier: 50k rows, 500 MB storage)
- OpenAI account (pay-as-you-go, estimate $20-50 for testing)
- LinkedIn Developer Portal access

**Time:**
- 2.5 days: Walking Skeleton
- 1.5-8 days: Additional iterations (depending on path)
- 1 week: User testing and feedback
- 1-2 weeks: Iteration based on feedback

**Total: 2-4 weeks to validated MVP**

---

## Appendix: Complete Increment Catalog

### Feature 1: Authenticate with LinkedIn

**Step 1.1: Display Authentication UI (6 increments)**
1. 1.1.1 Hardcoded Auth Button ⭐
2. 1.1.2 Minimal Landing Page
3. 1.1.3 Landing with Branding
4. 1.1.4 Landing with Features List
5. 1.1.5 Landing with Social Proof
6. 1.1.6 Landing with Hero Image

**Step 1.2: Initiate OAuth Flow (6 increments)**
1. 1.2.1 Fake Auth (Hardcoded User) ⭐
2. 1.2.2 Supabase LinkedIn Provider
3. 1.2.3 OAuth with Error Handling
4. 1.2.4 OAuth with Retry Logic
5. 1.2.5 OAuth with State Validation
6. 1.2.6 OAuth with Scope Selection

**Step 1.3: Store User Session (6 increments)**
1. 1.3.1 In-Memory Session ⭐
2. 1.3.2 Supabase Session Cookie
3. 1.3.3 Session with LinkedIn Profile Sync
4. 1.3.4 Session with Extended Profile
5. 1.3.5 Session with Remember Me
6. 1.3.6 Session with Activity Tracking

**Feature 1 Total: 18 increments**

---

### Feature 2: Create Experience with AI

**Step 2.1: Capture Free-Form Input (7 increments)**
1. 2.1.1 Simple Textarea ⭐
2. 2.1.2 Textarea with Character Counter
3. 2.1.3 Textarea with Placeholder Guidance
4. 2.1.4 Textarea with Auto-Save Draft
5. 2.1.5 Textarea with Writing Tips
6. 2.1.6 Textarea with Voice Input
7. 2.1.7 Guided Prompt Template

**Step 2.2: Process with OpenAI (8 increments)**
1. 2.2.1 Hardcoded STAR Response ⭐
2. 2.2.2 Simple OpenAI API Call
3. 2.2.3 API with Loading State
4. 2.2.4 API with Error Handling
5. 2.2.5 API with Retry Logic
6. 2.2.6 API with Prompt Optimization
7. 2.2.7 API with Streaming Response
8. 2.2.8 API with Fallback Strategies

**Step 2.3: Display STAR Preview (8 increments)**
1. 2.3.1 Plain Text STAR Display ⭐
2. 2.3.2 STAR with Visual Icons
3. 2.3.3 STAR with Editable Fields
4. 2.3.4 STAR with Title Field
5. 2.3.5 STAR with Company Field
6. 2.3.6 STAR with Date Range
7. 2.3.7 STAR with Regenerate Option
8. 2.3.8 STAR with Field-Level Edit

**Step 2.4: Save to Database (7 increments)**
1. 2.4.1 Direct Supabase Insert ⭐
2. 2.4.2 Insert with Required Fields Validation
3. 2.4.3 Insert with User Association
4. 2.4.4 Insert with Timestamps
5. 2.4.5 Insert with Success Feedback
6. 2.4.6 Insert with Optimistic UI
7. 2.4.7 Insert with Original Text Storage

**Feature 2 Total: 30 increments**

---

### Feature 3: View Experiences List

**Step 3.1: Fetch User Experiences (7 increments)**
1. 3.1.1 Hardcoded Array ⭐
2. 3.1.2 Simple Supabase Query
3. 3.1.3 Query with User Filtering
4. 3.1.4 Query with Sorting
5. 3.1.5 Query with Pagination
6. 3.1.6 Query with Search
7. 3.1.7 Query with Real-Time Subscription

**Step 3.2: Render Experience Cards (8 increments)**
1. 3.2.1 Unstyled List Items ⭐
2. 3.2.2 Basic Card Layout
3. 3.2.3 Card with Preview Text
4. 3.2.4 Card with Company
5. 3.2.5 Card with Icons
6. 3.2.6 Card with Click to View
7. 3.2.7 Card with Quick Actions
8. 3.2.8 Card with Responsive Grid

**Step 3.3: Handle Empty State (6 increments)**
1. 3.3.1 Plain Text Message ⭐
2. 3.3.2 Message with CTA Button
3. 3.3.3 Illustrated Empty State
4. 3.3.4 Empty State with Example
5. 3.3.5 Empty State with Benefits
6. 3.3.6 Empty State with Video Tutorial

**Feature 3 Total: 21 increments**

---

### Feature 4: View Experience Detail

**Step 4.1: Fetch Single Experience (6 increments)**
1. 4.1.1 Hardcoded Single Record ⭐
2. 4.1.2 Supabase Query by ID
3. 4.1.3 Query with User Ownership Check
4. 4.1.4 Query with 404 Handling
5. 4.1.5 Query with Loading State
6. 4.1.6 Query with Error Boundary

**Step 4.2: Render STAR Format Display (8 increments)**
1. 4.2.1 Plain Text Sections ⭐
2. 4.2.2 Sections with Visual Icons
3. 4.2.3 Sections with Dividers
4. 4.2.4 Display with Typography
5. 4.2.5 Display with Metadata
6. 4.2.6 Display with Copy Button
7. 4.2.7 Display with Print Stylesheet
8. 4.2.8 Display with Share Options

**Step 4.3: Provide Navigation Back (6 increments)**
1. 4.3.1 Text Link "Back" ⭐
2. 4.3.2 Link with Arrow Icon
3. 4.3.3 Browser Back Button Support
4. 4.3.4 Breadcrumb Navigation
5. 4.3.5 Floating Back Button
6. 4.3.6 Keyboard Shortcut

**Feature 4 Total: 20 increments**

---

### Feature 5: Edit Experience Fields

**Step 5.1: Enable Edit Mode (6 increments)**
1. 5.1.1 Dedicated Edit Page ⭐
2. 5.1.2 Edit Button on Detail Page
3. 5.1.3 Inline Edit Toggle
4. 5.1.4 Click-to-Edit Fields
5. 5.1.5 Edit with Cancel Confirmation
6. 5.1.6 Edit with Autosave

**Step 5.2: Update Database (6 increments)**
1. 5.2.1 Full Record Update ⭐
2. 5.2.2 Update with Field Validation
3. 5.2.3 Partial Field Update (PATCH)
4. 5.2.4 Update with Conflict Detection
5. 5.2.5 Update with Version History
6. 5.2.6 Update with Updated_At Timestamp

**Step 5.3: Refresh Display (6 increments)**
1. 5.3.1 Redirect to Detail Page ⭐
2. 5.3.2 Optimistic UI Update
3. 5.3.3 Success Toast Notification
4. 5.3.4 Inline Display Refresh
5. 5.3.5 Background Save with Indicator
6. 5.3.6 Refetch from Database

**Feature 5 Total: 18 increments**

---

**Grand Total: 107 increments across 5 features and 16 steps**

---

## Revision History

- **2025-10-27:** Initial vertical slicing analysis generated
- Space for future revisions as project evolves

---

**Generated by:** Increments Slicer - Vertical Slicing Analysis Tool
**Methodology:** Hamburger Method + Radical Vertical Slicing
**Framework:** Based on Alistair Cockburn's Walking Skeleton pattern

---

**Remember:** This analysis provides options, not mandates. You control what to implement and when. The Walking Skeleton is a suggestion, not a requirement. Use the Selection Matrix to build your own path that fits your unique constraints and priorities.

**Start small. Deploy early. Iterate based on feedback.**
