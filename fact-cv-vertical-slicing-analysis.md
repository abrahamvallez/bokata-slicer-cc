# Vertical Slicing Analysis: fact-cv MVP

## Executive Summary
**Project:** fact-cv - STAR Format Experience Documentation Tool
**Domain:** Professional Development / Career Management SaaS
**Total Features:** 7
**Total Steps:** 25 (across all features)
**Total Increments Generated:** 150+
**Analysis Date:** 2025-10-26

**Core Value Proposition:** Enable professionals to document career experiences in STAR format (Situation, Task, Action, Result) with AI assistance, transforming free-text descriptions into structured, interview-ready content.

**Tech Stack:**
- Frontend: Next.js 14+ (App Router), React 19, TypeScript, TailwindCSS, shadcn/ui
- Backend: Next.js API Routes, Supabase (PostgreSQL + Auth), OpenAI API (GPT-4o-mini)

---

## Features Backbone

### User Journey Overview
The journey begins with **Authenticate with LinkedIn** to establish identity via Supabase OAuth. Once authenticated, users land on a dashboard where they can **View Experiences List** showing all saved experiences. To add new content, they **Create Experience (Text Input)** by writing free-form text about a professional achievement. The system then **Generates STAR Format** using OpenAI to transform the text into structured Situation, Task, Action, and Result components. Users **Review and Edit STAR** to refine the AI-generated output, then **Save Experience** to persist it to Supabase. Users can return to **View Experiences List** anytime and click any experience to **View Experience Detail** with the full STAR breakdown.

### Features Identified
1. **Authenticate with LinkedIn** - Users can sign in using LinkedIn OAuth via Supabase
2. **Create Experience (Text Input)** - Users can write free-form text about a professional experience
3. **Generate STAR Format** - Users can convert free-form text into STAR structure using OpenAI
4. **Review and Edit STAR** - Users can review and modify AI-generated STAR components
5. **Save Experience** - Users can persist their experience to Supabase database
6. **View Experiences List** - Users can see all their saved experiences
7. **View Experience Detail** - Users can see the complete STAR breakdown of a single experience

### Feature Dependencies
- **Critical**: "Authenticate with LinkedIn" must exist before any other features (all features require authenticated user)
- **Recommended**: "Create Experience" → "Generate STAR Format" → "Review and Edit STAR" → "Save Experience" (sequential creation flow)
- **Independent**: "View Experiences List" and "View Experience Detail" can be built in any order after authentication and save functionality exists

---

## Detailed Breakdown

### Feature 1: Authenticate with LinkedIn
**User Story:** As a professional, I need to sign in with my LinkedIn account so that my experiences are securely stored and accessible only to me.
**Core Value:** Secure, frictionless authentication leveraging existing LinkedIn identity.

#### Step 1: Initiate OAuth Flow | Strategy: Dummy to Dynamic
**Purpose:** User clicks "Sign in with LinkedIn" and OAuth flow starts
**Tech Layers:** UI (button) → Logic (OAuth redirect)

**Increments Available:**
- **1.1 Hardcoded "dev user" auto-login (no OAuth)** - Bypass auth entirely, auto-authenticate as test user on page load ⭐ *Simplest*
- **1.2 LinkedIn OAuth with Supabase Auth (production-ready)** - Full OAuth flow using Supabase Auth providers
- **1.3 LinkedIn OAuth with remember me option** - OAuth with persistent session checkbox
- **1.4 LinkedIn OAuth with email fallback option** - OAuth with alternative email/password signin
- **1.5 Multi-provider OAuth (LinkedIn + Google + Email)** - Support multiple authentication providers

**Strategy Rationale:** "Dummy to Dynamic" allows starting with zero OAuth complexity. Hardcoded auth (1.1) eliminates OAuth setup, API keys, and redirect handling—letting you focus on core STAR functionality first. Perfect for initial development and testing.

**Filtered Out:**
- Social login without OAuth (security risk)
- Magic link authentication (out of MVP scope)

#### Step 2: Handle OAuth Callback | Strategy: Extract Basic Utility
**Purpose:** Process LinkedIn's OAuth response and create/retrieve user session
**Tech Layers:** Logic (callback processing) → Data (session creation)

**Increments Available:**
- **2.1 Basic callback handler (create session, redirect)** - Minimal callback: extract token, create session, redirect to dashboard ⭐ *Simplest*
- **2.2 Callback with error handling and user feedback** - Add try/catch with error messages for failed authentication
- **2.3 Callback with profile data sync from LinkedIn** - Fetch LinkedIn profile (name, photo) and store in Supabase
- **2.4 Callback with retry logic for failures** - Automatic retry on network failures (3 attempts)
- **2.5 Callback with analytics tracking** - Track successful/failed logins with analytics events

**Strategy Rationale:** "Extract Basic Utility" focuses on bare minimum: get user authenticated and into the app. Increment 2.1 does only what's required—no bells, no whistles. Add error handling (2.2) in next iteration when polish matters.

**Filtered Out:**
- Complex session validation (over-engineered for MVP)
- Multi-factor authentication (out of scope)

#### Step 3: Establish User Session | Strategy: Zero/One/Many
**Purpose:** Create authenticated session and redirect to dashboard
**Tech Layers:** Data (session storage) → UI (redirect)

**Increments Available:**
- **3.1 24-hour session (no remember me)** - Short-lived session expires in 24h, user must re-auth daily ⭐ *Simplest*
- **3.2 7-day persistent session with cookie** - Session persists for 7 days using secure HTTP-only cookie
- **3.3 30-day session with refresh token** - Long-lived session with automatic token refresh
- **3.4 Configurable session duration per user** - User chooses session length in settings
- **3.5 Session with activity-based extension** - Session extends automatically on user activity

**Strategy Rationale:** "Zero/One/Many" progression: start with single fixed duration (3.1), then add persistence (3.2), then flexibility (3.3-3.5). 24-hour session is simplest—no refresh logic, no complex cookie management.

---

### Feature 2: Create Experience (Text Input)
**User Story:** As a user, I need to describe my professional experience in free-form text so that the AI can help me format it into STAR structure.
**Core Value:** Lowest friction input—just write naturally about what you did.

#### Step 1: Display Input Form | Strategy: Simplify Outputs
**Purpose:** Show textarea for free-form experience description
**Tech Layers:** UI (form component)

**Increments Available:**
- **1.1 Single textarea, no styling** - Plain `<textarea>` with label, zero CSS enhancements ⭐ *Simplest*
- **1.2 Textarea with character counter** - Add live character count display
- **1.3 Textarea with helpful placeholder examples** - Add placeholder: "Example: Led migration of legacy system to cloud infrastructure..."
- **1.4 Textarea with formatting toolbar (bold, italic)** - Add basic rich text formatting buttons
- **1.5 Rich text editor with full formatting** - Full WYSIWYG editor (Tiptap, Slate)
- **1.6 Guided prompts (role, project, achievement fields)** - Separate fields for role, project, outcome to guide user

**Strategy Rationale:** "Simplify Outputs" means start with simplest UI that works. Plain textarea (1.1) requires zero external libraries, zero styling effort. Users can type, that's it. Add polish incrementally (1.2-1.3) after validating core flow works.

**Filtered Out:**
- Voice-to-text input (complex, requires speech API)
- LinkedIn experience import (API limitations, out of scope)

#### Step 2: Validate Input | Strategy: Business Rule Progression
**Purpose:** Ensure minimum text length (50 chars) before allowing AI generation
**Tech Layers:** Logic (validation)

**Increments Available:**
- **2.1 No validation (allow any text)** - Submit button always enabled, accept empty/short text ⭐ *Simplest*
- **2.2 Minimum 50 character requirement** - Disable submit until 50+ chars entered
- **2.3 Min 50 chars + max 5000 chars** - Enforce both minimum and maximum length
- **2.4 Length validation + profanity filter** - Add content filtering for inappropriate language
- **2.5 Smart validation with AI quality pre-check** - AI pre-validates if text contains enough detail for STAR extraction

**Strategy Rationale:** "Business Rule Progression" starts with zero rules (2.1)—let users submit anything. Add minimum validation (2.2) when you observe users submitting unusable input. Add ceiling (2.3) when you see API token costs spike.

**Filtered Out:**
- Real-time grammar checking (overkill for MVP)
- Duplicate experience detection (premature optimization)

#### Step 3: Submit for Processing | Strategy: Workflow Simplification
**Purpose:** Send text to AI generation endpoint
**Tech Layers:** UI (submit) → Logic (API call)

**Increments Available:**
- **3.1 Direct submit (no loading state)** - Click button, no UI feedback until response arrives ⭐ *Simplest*
- **3.2 Submit with loading spinner** - Show spinner while waiting for AI response
- **3.3 Submit with loading + progress messages** - Show messages: "Analyzing text...", "Generating STAR format..."
- **3.4 Submit with loading + estimated time** - Display "Usually takes 3-5 seconds"
- **3.5 Submit with optimistic UI (show result area immediately)** - Show STAR form skeleton immediately
- **3.6 Submit with retry on failure** - Automatic retry on timeout/error (3 attempts)

**Strategy Rationale:** "Workflow Simplification" removes optional steps. Direct submit (3.1) = zero loading state logic. Add spinner (3.2) next to prevent user confusion. Advanced UX (3.3-3.5) only after core works.

---

### Feature 3: Generate STAR Format
**User Story:** As a user, I need the AI to transform my free-form text into structured STAR format so that I have a professional, interview-ready description.
**Core Value:** The core AI-powered value proposition of the app.

#### Step 1: Call OpenAI API | Strategy: Dummy to Dynamic + Split by Capacity
**Purpose:** Send free-form text to GPT-4o-mini with STAR formatting prompt
**Tech Layers:** Logic (API integration) → Data (AI response)

**Increments Available:**
- **1.1 Fixed/mocked STAR response (no API call)** - Return hardcoded STAR example, skip OpenAI entirely ⭐ *Simplest*
- **1.2 Basic OpenAI call with simple prompt** - Real API call with basic prompt: "Format this as STAR"
- **1.3 OpenAI with structured prompt template** - Use detailed prompt with examples and instructions
- **1.4 OpenAI with JSON mode for reliable parsing** - Use `response_format: json_object` for structured output
- **1.5 OpenAI with retry logic (3 attempts)** - Auto-retry on API timeout/error
- **1.6 OpenAI with fallback to simpler model** - Try GPT-4o-mini, fallback to GPT-3.5-turbo on failure
- **1.7 OpenAI with streaming response (progressive reveal)** - Stream tokens as they generate (better UX)
- **1.8 OpenAI with rate limiting and queue** - Queue requests when hitting rate limits

**Strategy Rationale:** "Dummy to Dynamic" is PERFECT here. Mocked response (1.1) eliminates API costs, API keys, prompt engineering, error handling—everything. You can build and test the entire UI flow with zero OpenAI setup. Then swap to real API (1.3-1.4) when you're ready.

**Filtered Out:**
- Fine-tuned custom model (too expensive, unnecessary)
- Multiple AI providers (over-engineered)

#### Step 2: Parse AI Response | Strategy: Business Rule Progression
**Purpose:** Extract STAR components (Situation, Task, Action, Result) from AI output
**Tech Layers:** Logic (parsing) → Data (structured STAR object)

**Increments Available:**
- **2.1 Accept any text, split by line breaks** - Assume AI returns 4 lines, split by `\n` ⭐ *Simplest*
- **2.2 Parse JSON response into STAR fields** - Parse structured JSON: `{situation, task, action, result}`
- **2.3 Parse with fallback to text splitting** - Try JSON parsing, fallback to line breaks if invalid
- **2.4 Parse with validation (all fields present)** - Validate all 4 STAR fields exist and non-empty
- **2.5 Parse with smart field extraction (handle partial responses)** - Use regex/AI to extract fields even if format varies
- **2.6 Parse with confidence scoring per field** - Rate quality of each STAR component (high/medium/low)

**Strategy Rationale:** "Business Rule Progression" = start permissive (2.1), add strictness incrementally. Simple split (2.1) works with mocked data. Add JSON parsing (2.2) when using real API with JSON mode. Add fallbacks (2.3-2.5) when you observe failures in production.

**Filtered Out:**
- AI re-generation on parse failure (too complex for MVP)
- Multi-language support (out of scope)

#### Step 3: Generate Title Suggestion | Strategy: Start with Outputs
**Purpose:** Create suggested title from the experience content
**Tech Layers:** Logic (title generation) → UI (pre-filled title field)

**Increments Available:**
- **3.1 No title, user must enter manually** - Skip auto-title entirely, require manual title entry ⭐ *Simplest*
- **3.2 Extract first 5 words from Action as title** - Simple extraction: `action.split(' ').slice(0, 5).join(' ')`
- **3.3 Use separate AI call for title generation** - Second OpenAI call specifically for title
- **3.4 Generate title from same AI prompt (single call)** - Include title in original STAR generation prompt
- **3.5 Generate 3 title options for user to choose** - AI generates multiple titles, user picks favorite

**Strategy Rationale:** "Start with Outputs" focuses on what user sees. No auto-title (3.1) = zero work, user types their own. Simple extraction (3.2) next—no AI needed. Same-prompt generation (3.4) most efficient when using real API.

---

### Feature 4: Review and Edit STAR
**User Story:** As a user, I need to review and edit the AI-generated STAR content so that it accurately reflects my experience and uses my preferred wording.
**Core Value:** User control—AI suggests, user decides final content.

#### Step 1: Display Pre-filled Form | Strategy: Simplify Outputs
**Purpose:** Show editable fields with AI-generated STAR content
**Tech Layers:** UI (form with pre-filled values)

**Increments Available:**
- **1.1 Plain text display (no form, read-only)** - Show STAR text in `<p>` tags, no editing ⭐ *Simplest*
- **1.2 Editable text inputs (basic form)** - Standard `<input>` fields for title, `<textarea>` for STAR components
- **1.3 Textareas with labels and icons (📍🎯⚡🏆)** - Add visual hierarchy with emoji icons per STAR section
- **1.4 Rich text editing with formatting** - Allow bold, italic, bullets in STAR fields
- **1.5 Fields with character limits and guidance** - Show max length, provide writing tips per field

**Strategy Rationale:** "Simplify Outputs" = minimize UI complexity. Read-only display (1.1) requires zero form state management. Basic inputs (1.2) next—standard HTML, no libraries. Icons/polish (1.3) when UX matters.

**Filtered Out:**
- AI re-generation per field (complex interaction pattern)
- Version history / change tracking (overkill for MVP)

#### Step 2: Enable Editing | Strategy: Workflow Simplification
**Purpose:** Allow users to modify any STAR component or title
**Tech Layers:** UI (input handling) → Logic (state management)

**Increments Available:**
- **2.1 Edit fields, manual save (no validation)** - Type freely, click "Save" button, no autosave ⭐ *Simplest*
- **2.2 Edit with unsaved changes warning** - Warn before navigating away if changes not saved
- **2.3 Edit with auto-save draft (localStorage)** - Save to localStorage every 5 seconds
- **2.4 Edit with real-time character count** - Show live count: "245 / 500 characters"
- **2.5 Edit with AI re-generation option per field** - "Regenerate" button per STAR component
- **2.6 Edit with undo/redo history** - Ctrl+Z support, change history tracking

**Strategy Rationale:** "Workflow Simplification" removes fancy features. Manual save (2.1) = controlled state updates, simple logic. Auto-save (2.3) adds complexity (debouncing, localStorage API) but prevents data loss—add when users complain about losing work.

**Filtered Out:**
- Collaborative editing (not applicable to MVP)
- Markdown support (unnecessary for STAR format)

#### Step 3: Validate Edited Content | Strategy: Business Rule Progression
**Purpose:** Ensure all required fields are populated before save
**Tech Layers:** Logic (validation)

**Increments Available:**
- **3.1 No validation (allow empty fields)** - Save button always enabled, allow saving incomplete experiences ⭐ *Simplest*
- **3.2 Require title only** - Validate only title field has content
- **3.3 Require title + all 4 STAR fields** - Validate title and all STAR sections non-empty
- **3.4 Require title + fields + minimum length per field** - Each STAR field must be 20+ characters
- **3.5 Smart validation with helpful inline feedback** - Real-time validation with specific error messages

**Strategy Rationale:** "Business Rule Progression" starts with zero rules (3.1). Add minimal validation (3.2-3.3) when you need data quality. Strict validation (3.4-3.5) only if users create unusable experiences.

---

### Feature 5: Save Experience
**User Story:** As a user, I need to save my completed STAR experience so that I can access it later and use it for interviews/resumes.
**Core Value:** Persistence—your work is saved and retrievable.

#### Step 1: Prepare Data for Storage | Strategy: Extract Basic Utility
**Purpose:** Structure experience data for Supabase insertion
**Tech Layers:** Logic (data transformation)

**Increments Available:**
- **1.1 Send raw object (no transformation)** - Send form state directly to Supabase ⭐ *Simplest*
- **1.2 Transform to match exact schema** - Map form fields to database column names
- **1.3 Add timestamps (created_at, updated_at)** - Include server-side timestamps
- **1.4 Add metadata (user_id, version)** - Include user context and versioning
- **1.5 Sanitize and validate before send** - Strip HTML, trim whitespace, validate types

**Strategy Rationale:** "Extract Basic Utility" = do minimum to make save work. Raw object (1.1) assumes form state matches schema exactly (design schema to match form). Add transformation (1.2) when schema diverges. Timestamps (1.3) when you need to sort/filter by date.

**Filtered Out:**
- Client-side encryption (over-engineered)
- Compression before storage (premature optimization)

#### Step 2: Insert into Supabase | Strategy: Workflow Simplification
**Purpose:** Persist experience to PostgreSQL via Supabase client
**Tech Layers:** Data (database insert)

**Increments Available:**
- **2.1 Direct insert (no error handling)** - `supabase.from('experiences').insert(data)` with no try/catch ⭐ *Simplest*
- **2.2 Insert with basic error catch** - Wrap in try/catch, log errors to console
- **2.3 Insert with specific error messages** - Parse Supabase error codes, show user-friendly messages
- **2.4 Insert with RLS policies (user isolation)** - Enable Row Level Security to isolate user data
- **2.5 Insert with conflict handling (duplicate prevention)** - Handle unique constraint violations
- **2.6 Insert with transaction rollback** - Use database transactions for data integrity

**Strategy Rationale:** "Workflow Simplification" = remove safety nets initially. Direct insert (2.1) works in happy path. Error handling (2.2-2.3) when you need to debug failures. RLS (2.4) CRITICAL before production—but can skip for initial dev with single test user.

**Filtered Out:**
- Optimistic updates (adds complexity)
- Offline-first with sync (overkill for MVP)

#### Step 3: Confirm and Redirect | Strategy: Simplify Outputs
**Purpose:** Show success feedback and navigate to experiences list
**Tech Layers:** UI (feedback) → Logic (navigation)

**Increments Available:**
- **3.1 Silent save, immediate redirect** - Save completes, redirect to list, no confirmation ⭐ *Simplest*
- **3.2 Console log + redirect** - Log "Saved successfully" to console for debugging
- **3.3 Toast notification + redirect** - Show toast: "Experience saved!" for 2 seconds, then redirect
- **3.4 Success modal + delayed redirect** - Full-screen modal with success animation, auto-close in 3s
- **3.5 Success with preview + manual navigation** - Show saved experience preview, user clicks "View All"

**Strategy Rationale:** "Simplify Outputs" = minimize post-save ceremony. Silent redirect (3.1) = instant feedback (new page loads). Toast (3.3) adds user confidence without blocking. Modal (3.4) only if users complain about not noticing save.

---

### Feature 6: View Experiences List
**User Story:** As a user, I need to see all my saved experiences so that I can review them, choose which to use, and access them for editing.
**Core Value:** Overview of all your documented experiences—your STAR portfolio.

#### Step 1: Fetch User Experiences | Strategy: Split by Capacity + Zero/One/Many
**Purpose:** Query Supabase for all experiences belonging to current user
**Tech Layers:** Data (query) → Logic (processing)

**Increments Available:**
- **1.1 Fetch all (no limit, no pagination)** - `SELECT * FROM experiences WHERE user_id = $1` ⭐ *Simplest*
- **1.2 Fetch with limit 10, no pagination** - Add `LIMIT 10`, show only first 10 experiences
- **1.3 Fetch with limit 10 + "Load more" button** - Paginate with manual "Load More" click
- **1.4 Fetch with cursor-based pagination** - Efficient pagination using last record as cursor
- **1.5 Fetch with infinite scroll** - Auto-load more as user scrolls to bottom
- **1.6 Fetch with search/filter options** - Add search by title, filter by date/company
- **1.7 Fetch with caching and stale-while-revalidate** - Cache results, show stale data while refreshing

**Strategy Rationale:** "Split by Capacity" + "Zero/One/Many" = start with unlimited fetch (1.1). For MVP with single user having <10 experiences, pagination is overkill. Add limit (1.2) when you observe performance issues. Full pagination (1.3-1.5) when user has 100+ experiences.

**Filtered Out:**
- Advanced sorting (multiple criteria)
- Bulk operations (select, delete multiple)

#### Step 2: Render Experience Cards | Strategy: Start with Outputs + Simplify Outputs
**Purpose:** Display experiences as cards with title, company, preview
**Tech Layers:** UI (component rendering)

**Increments Available:**
- **2.1 Plain list (titles only)** - Simple `<ul>` with `<li>{experience.title}</li>` ⭐ *Simplest*
- **2.2 List with title + created date** - Add timestamp: "Created Oct 26, 2025"
- **2.3 Cards with title + company + date** - Card layout with 3 data points
- **2.4 Cards with title + company + preview (first 100 chars)** - Add preview of Situation or Action field
- **2.5 Cards with full metadata + icons** - Include all fields, use icons for visual hierarchy
- **2.6 Cards with hover effects and animations** - Subtle hover elevation, smooth transitions
- **2.7 Cards with inline actions (edit, delete)** - Quick action buttons on each card

**Strategy Rationale:** "Simplify Outputs" = minimal rendering. Plain list (2.1) = zero CSS, zero components. Basic cards (2.3) next—enough info to identify experiences. Preview text (2.4) helps users choose without clicking. Polish (2.6-2.7) when design matters.

**Filtered Out:**
- Drag-to-reorder (complex, low value)
- Grid vs list view toggle (unnecessary complexity)

#### Step 3: Handle Empty State | Strategy: Zero/One/Many
**Purpose:** Show helpful message when no experiences exist
**Tech Layers:** UI (conditional rendering)

**Increments Available:**
- **3.1 Show nothing (blank screen)** - Render empty `<div>`, no messaging ⭐ *Simplest*
- **3.2 Show text: "No experiences yet"** - Simple message for empty state
- **3.3 Show text + "Create your first experience" button** - Message with actionable CTA
- **3.4 Illustrated empty state with CTA** - Custom illustration/icon + encouraging message
- **3.5 Onboarding tour for first-time users** - Interactive walkthrough on first visit

**Strategy Rationale:** "Zero/One/Many" = handle zero case. Blank screen (3.1) acceptable for MVP (you're the only user, you know what's happening). Message (3.2) when showing to others. CTA button (3.3) when onboarding real users.

---

### Feature 7: View Experience Detail
**User Story:** As a user, I need to view the complete STAR breakdown of a single experience so that I can review it, copy it for use, and reference it during interviews.
**Core Value:** Full view of one experience—ready to copy and use.

#### Step 1: Fetch Single Experience | Strategy: Extract Basic Utility
**Purpose:** Query Supabase for specific experience by ID
**Tech Layers:** Data (query)

**Increments Available:**
- **1.1 Fetch by ID (no error handling)** - `SELECT * FROM experiences WHERE id = $1` ⭐ *Simplest*
- **1.2 Fetch with 404 handling (not found)** - Catch not found, show "Experience not found" message
- **1.3 Fetch with ownership validation (RLS)** - Verify current user owns this experience (prevent access to others')
- **1.4 Fetch with loading skeleton** - Show skeleton UI while loading
- **1.5 Fetch with optimistic cache** - Use cached data if available, refresh in background

**Strategy Rationale:** "Extract Basic Utility" = direct query (1.1). Add 404 handling (1.2) when you try invalid IDs. Ownership validation (1.3) CRITICAL for multi-user production (RLS handles this automatically if configured).

**Filtered Out:**
- Related experiences suggestions (feature creep)
- Share experience publicly (out of scope)

#### Step 2: Display Full STAR Breakdown | Strategy: Simplify Outputs
**Purpose:** Show complete experience with clear STAR section labels
**Tech Layers:** UI (formatted display)

**Increments Available:**
- **2.1 Plain text dump (all fields)** - Simple `<pre>{JSON.stringify(experience)}</pre>` ⭐ *Simplest*
- **2.2 Sections with labels (Situation, Task, Action, Result)** - Semantic HTML with headings
- **2.3 Styled sections with emojis (📍🎯⚡🏆)** - Add visual hierarchy with icons per section
- **2.4 Styled sections with separators and typography** - Professional design with spacing, font hierarchy
- **2.5 Sections with copy-to-clipboard buttons** - "Copy" button per STAR section or whole experience
- **2.6 Sections with export to PDF option** - Generate PDF for download

**Strategy Rationale:** "Simplify Outputs" = readable display. Text dump (2.1) technically works but ugly. Labeled sections (2.2) make it scannable. Emojis (2.3) add personality with zero CSS. Copy buttons (2.5) high value when users want to paste into resume/LinkedIn.

**Filtered Out:**
- Inline editing (use separate Edit feature later)
- AI-powered improvement suggestions (complex)

#### Step 3: Provide Navigation | Strategy: Workflow Simplification
**Purpose:** Enable return to list and future edit/delete actions
**Tech Layers:** UI (navigation links/buttons)

**Increments Available:**
- **3.1 No navigation (dead end page)** - No way back except browser back button ⭐ *Simplest*
- **3.2 "← Back to list" link only** - Single link to return to experiences list
- **3.3 Back link + breadcrumbs** - Show "Dashboard > Experiences > [Title]"
- **3.4 Back link + Edit button (future)** - Add "Edit" button for future edit feature
- **3.5 Full nav with Edit/Delete/Share actions** - Complete action menu

**Strategy Rationale:** "Workflow Simplification" = minimal nav. No nav (3.1) relies on browser back (acceptable for MVP with linear flow). Back link (3.2) is basic courtesy. Full nav (3.4-3.5) when you add edit/delete features.

---

## 🎯 Suggested Walking Skeleton

**Purpose:** Minimum viable implementation that demonstrates end-to-end functionality—from login to viewing saved experiences.
**Ship Tomorrow Answer:** If you had 24 hours to demo this to investors/users, what would you build?
**Estimated Effort:** 2-3 days for experienced Next.js developer

### Composition

#### Feature 1: Authenticate with LinkedIn
- **Step 1 - Initiate OAuth:** ✓ **1.1** - Hardcoded "dev user" auto-login (no OAuth)
- **Step 2 - Handle Callback:** ✓ **2.1** - Basic callback handler (create session, redirect)
- **Step 3 - Establish Session:** ✓ **3.1** - 24-hour session (no remember me)

#### Feature 2: Create Experience (Text Input)
- **Step 1 - Display Form:** ✓ **1.1** - Single textarea, no styling
- **Step 2 - Validate Input:** ✓ **2.1** - No validation (allow any text)
- **Step 3 - Submit:** ✓ **3.2** - Submit with loading spinner

#### Feature 3: Generate STAR Format
- **Step 1 - Call OpenAI:** ✓ **1.1** - Fixed/mocked STAR response (no API call)
- **Step 2 - Parse Response:** ✓ **2.1** - Accept any text, split by line breaks
- **Step 3 - Generate Title:** ✓ **3.2** - Extract first 5 words from Action as title

#### Feature 4: Review and Edit STAR
- **Step 1 - Display Form:** ✓ **1.2** - Editable text inputs (basic form)
- **Step 2 - Enable Editing:** ✓ **2.1** - Edit fields, manual save (no validation)
- **Step 3 - Validate:** ✓ **3.1** - No validation (allow empty fields)

#### Feature 5: Save Experience
- **Step 1 - Prepare Data:** ✓ **1.2** - Transform to match exact schema
- **Step 2 - Insert Supabase:** ✓ **2.2** - Insert with basic error catch
- **Step 3 - Confirm:** ✓ **3.3** - Toast notification + redirect

#### Feature 6: View Experiences List
- **Step 1 - Fetch Experiences:** ✓ **1.1** - Fetch all (no limit, no pagination)
- **Step 2 - Render Cards:** ✓ **2.3** - Cards with title + company + date
- **Step 3 - Empty State:** ✓ **3.3** - Show text + "Create your first experience" button

#### Feature 7: View Experience Detail
- **Step 1 - Fetch Single:** ✓ **1.2** - Fetch with 404 handling (not found)
- **Step 2 - Display STAR:** ✓ **2.3** - Styled sections with emojis (📍🎯⚡🏆)
- **Step 3 - Navigation:** ✓ **3.2** - "← Back to list" link only

### Validation Criteria
- [ ] User can "log in" (hardcoded auto-login for dev—skip OAuth complexity)
- [ ] User can enter free-form text about a professional experience
- [ ] System generates STAR format (mocked initially—no OpenAI API needed yet)
- [ ] User can see the generated STAR components in editable form
- [ ] User can edit any STAR field (Situation, Task, Action, Result, Title)
- [ ] User can save the experience to Supabase database
- [ ] User can see list of all their saved experiences (title, company, date visible)
- [ ] User can click an experience to view full STAR breakdown with emoji sections
- [ ] User can navigate back from detail to list using "← Back" link
- [ ] Toast notification appears on successful save

### Why This Combination?
This Walking Skeleton uses the **absolute simplest increments** that still cut through all layers (UI → Logic → Data).

**Strategic Shortcuts:**
- **Hardcoded auth (1.1):** Eliminates OAuth setup, LinkedIn App registration, callback URL configuration, API keys management. Just hard-code `user_id = 'dev-user'` and focus on STAR functionality.
- **Mocked AI response (3.1.1):** Eliminates OpenAI account setup, API key management, prompt engineering, token costs, rate limiting, error handling. Return a fixed STAR object and prove the UI/save/display flow works.
- **No validation (2.2.1, 4.3.1):** Skip all form validation logic. Let users submit anything, even empty fields. Validation can be layered in later.
- **Basic Supabase (5.2.2):** Just enough error handling to debug issues, no RLS policies yet (single dev user), no conflict handling.

**What This Proves:**
1. Complete user journey works end-to-end
2. Supabase schema is correct
3. Data flows properly: Input → Mock AI → Edit → Save → Retrieve → Display
4. UI components render correctly
5. Navigation flow makes sense

**What It Doesn't Include (And That's OK):**
- Real OAuth (add in Iteration 3)
- Real OpenAI integration (add in Iteration 2)
- Form validation (add in Iteration 5)
- Pagination (not needed for <10 experiences)
- Error handling polish (add in Iteration 5)
- UX polish (add in Iteration 4)

**Time Savings:**
By using mocked AI and hardcoded auth, you save 4-8 hours of integration work upfront. You can build this Walking Skeleton in **2-3 days** instead of 5-7 days, and you have something deployable that demonstrates the concept.

---

## 🚀 Suggested Iterations

### Iteration 2: Replace Mocked AI with Real OpenAI
**Purpose:** Add real AI-powered STAR formatting—the core value proposition
**Focus:** Make the AI magic actually work
**Estimated Effort:** 4-6 hours

**Increments to Replace/Add:**
- Feature 3, Step 1: Replace **1.1** (Mocked) → **1.3** (OpenAI with structured prompt template)
- Feature 3, Step 2: Replace **2.1** (Line breaks) → **2.2** (Parse JSON response into STAR fields)
- Feature 3, Step 3: Replace **3.2** (Extract words) → **3.4** (Generate title from same AI prompt)

**Implementation Notes:**
- Set up OpenAI API key in environment variables
- Create prompt template: "Transform the following experience into STAR format. Return JSON with fields: situation, task, action, result, title."
- Use `response_format: { type: "json_object" }` for reliable parsing
- Handle API timeout (set 30s timeout, show error if exceeded)

**Validation:**
- [ ] AI accurately transforms free text to STAR format (test with 5 different experience types)
- [ ] Response time < 10 seconds (GPT-4o-mini is fast)
- [ ] Error handling works when API fails (disconnect wifi, test error message)
- [ ] Generated title is relevant (not generic)

**Expected Learning:**
- Does the AI generate high-quality STAR output without fine-tuning?
- What prompt engineering is needed for consistency?
- How often do users need to edit AI output?
- Are response times acceptable?

**Rollback Plan:** If AI quality is poor, revert to mocked response and iterate on prompt separately.

---

### Iteration 3: Replace Dev Auth with Real LinkedIn OAuth
**Purpose:** Enable real user sign-ups and multi-user support
**Focus:** Production-ready authentication
**Estimated Effort:** 3-4 hours

**Increments to Replace:**
- Feature 1, Step 1: Replace **1.1** (Hardcoded) → **1.2** (LinkedIn OAuth with Supabase Auth)
- Feature 1, Step 3: Replace **3.1** (24-hour) → **3.2** (7-day persistent session with cookie)

**Implementation Notes:**
- Register LinkedIn OAuth App at [LinkedIn Developers](https://www.linkedin.com/developers/)
- Configure Supabase Auth provider with LinkedIn Client ID/Secret
- Set redirect URL: `https://[your-project].supabase.co/auth/v1/callback`
- Enable Row Level Security (RLS) on `experiences` table: `user_id = auth.uid()`
- Test with 2-3 real LinkedIn accounts

**Validation:**
- [ ] Users can sign in with LinkedIn (test happy path)
- [ ] OAuth redirect flow works smoothly (no errors, quick redirect)
- [ ] Session persists across browser closes (close tab, reopen, still logged in)
- [ ] User data is properly isolated via RLS (User A cannot see User B's experiences)
- [ ] Sign out works correctly (session cleared, redirects to login)

**Expected Learning:**
- Is LinkedIn OAuth flow smooth or confusing?
- Do users understand why LinkedIn login is required?
- Any friction points in the OAuth flow?

**Security Note:** This iteration adds RLS (2.4) automatically when configuring Supabase Auth properly. Ensure RLS policies are tested before allowing multiple users.

---

### Iteration 4: Improve UX Polish
**Purpose:** Enhance user experience quality and professional appearance
**Focus:** Make it feel polished and trustworthy
**Estimated Effort:** 4-6 hours

**Increments to Upgrade:**
- Feature 2, Step 1: Upgrade to **1.3** (Textarea with helpful placeholder examples)
- Feature 2, Step 2: Add **2.2** (Minimum 50 character requirement)
- Feature 2, Step 3: Upgrade to **3.3** (Submit with loading + progress messages)
- Feature 4, Step 1: Upgrade to **1.3** (Textareas with labels and icons 📍🎯⚡🏆)
- Feature 4, Step 2: Add **2.2** (Edit with unsaved changes warning)
- Feature 6, Step 2: Upgrade to **2.4** (Cards with title + company + preview text)

**Implementation Notes:**
- Add placeholder text: "Example: Led migration of our legacy monolithic application to a microservices architecture, reducing deployment time by 60% and improving system reliability..."
- Implement character counter with color coding (red < 50, green ≥ 50)
- Add loading messages: "Analyzing your experience..." → "Generating STAR format..." → "Almost done..."
- Add emoji icons to STAR sections (Situation 📍, Task 🎯, Action ⚡, Result 🏆)
- Implement `beforeunload` event listener to warn about unsaved changes
- Show first 100 characters of Situation field in card preview

**Validation:**
- [ ] Forms feel professional and guided (not intimidating)
- [ ] Users understand what to input (placeholder helps)
- [ ] Loading states reduce perceived wait time (messages are reassuring)
- [ ] STAR sections are visually distinct (emojis help)
- [ ] Unsaved changes warning prevents accidental data loss
- [ ] Experience list is scannable (preview helps users find experiences)

**Expected Learning:**
- Do placeholder examples actually help users write better content?
- Is 50 character minimum too strict/too loose?
- Do emoji icons improve or clutter the interface?

---

### Iteration 5: Add Validation and Error Handling
**Purpose:** Production robustness—handle edge cases gracefully
**Focus:** Prevent bad data and handle failures
**Estimated Effort:** 5-7 hours

**Increments to Add:**
- Feature 2, Step 2: Upgrade to **2.3** (Min 50 chars + max 5000 chars)
- Feature 2, Step 3: Add **3.6** (Submit with retry on failure)
- Feature 3, Step 1: Add **1.5** (OpenAI with retry logic - 3 attempts)
- Feature 3, Step 2: Add **2.3** (Parse with fallback to text splitting)
- Feature 4, Step 3: Add **3.3** (Require title + all 4 STAR fields)
- Feature 5, Step 2: Ensure **2.4** (Insert with RLS policies) is active

**Implementation Notes:**
- Add max length validation: 5000 chars (prevent token overflow)
- Implement retry logic: exponential backoff (1s, 2s, 4s delays)
- Add JSON parse try/catch with fallback to regex extraction
- Add form validation: "Title is required", "All STAR sections must be filled"
- Enable RLS policies (if not already done in Iteration 3)
- Add error toast notifications with actionable messages

**Validation:**
- [ ] Users can't save experiences with missing required fields (validation blocks save)
- [ ] Users can't submit extremely long text (5000 char limit enforced)
- [ ] System shows helpful error messages (not generic "Error occurred")
- [ ] API failures auto-retry (test by throttling network)
- [ ] Parse errors fallback gracefully (corrupt JSON still extracts fields)
- [ ] RLS prevents cross-user data access (User A cannot modify User B's data)

**Expected Learning:**
- How often do validation errors occur in real usage?
- Are retry mechanisms needed or is first-attempt success rate high?
- What error messages are most helpful to users?

---

### Iteration 6+: User-Driven Enhancements
**Purpose:** Add features based on real user feedback
**Focus:** Let usage data guide priorities

**Potential Future Iterations:**
- **Search & Filter:** Add 6.1.6 (search by title, filter by company/date)
- **Edit/Delete Experiences:** New feature for updating/removing saved experiences
- **Export Capabilities:** Add 7.2.5 (copy to clipboard) or 7.2.6 (export PDF)
- **Richer Input:** Upgrade to 2.1.6 (guided prompts with role, project, achievement fields)
- **AI Improvements:** Add 3.1.7 (streaming response) for better perceived performance
- **Session Extensions:** Upgrade to 1.3.3 (30-day session with refresh token)
- **Better Empty States:** Add 6.3.4 (illustrated empty state with onboarding)
- **Pagination:** Add 6.1.3 (load more button) when users have 20+ experiences

**How to Prioritize:**
1. Gather usage data (which features are used most?)
2. Collect user feedback (what do users request?)
3. Identify pain points (where do users struggle/abandon?)
4. Choose increments that address top 3 issues

---

## 📋 Implementation Options

**You have full control over what to implement. Here are your options:**

### Option 1: Follow Suggested Walking Skeleton (Recommended for MVP Speed)
✅ **Pros:** Fastest path to end-to-end validation (2-3 days)
✅ **Pros:** Enables immediate user feedback with functional prototype
✅ **Pros:** Eliminates complex integrations upfront (OAuth, OpenAI)
❓ **Consider:** Requires swapping mocked components later (but that's intentional)

**Implementation Path:**
1. Start with Walking Skeleton above (use mocked AI, hardcoded auth)
2. Deploy to Vercel/Netlify and validate core flow works
3. Add Iteration 2 increments (real OpenAI integration)
4. Test AI quality with real experiences
5. Add Iteration 3 increments (real LinkedIn OAuth)
6. Add Iteration 4 increments (UX polish)
7. Continue iterating based on feedback

**Best For:** Solo developers, tight deadlines, MVP launches, validating concept before heavy investment

---

### Option 2: Start with Real Integrations (Production-Quality from Day 1)
✅ **Pros:** No throwaway code, production-ready immediately
✅ **Pros:** Real AI from start = accurate testing of core value prop
⚠️ **Caution:** Slower to first deployment (5-7 days instead of 2-3)
⚠️ **Caution:** More complexity upfront = more debugging time

**Implementation Path:**
1. Set up LinkedIn OAuth first (Feature 1: use 1.2, 2.1, 3.2)
2. Integrate OpenAI API (Feature 3: use 1.3, 2.2, 3.4)
3. Build CRUD flow with basic validation (Features 2, 4, 5, 6, 7)
4. Add polish incrementally (Iteration 4 increments)
5. Add robust error handling (Iteration 5 increments)

**Best For:** Teams with dedicated QA, production launches requiring polish, when you have 1-2 weeks timeline

---

### Option 3: Hybrid Approach (Mocked AI, Real Auth)
✅ **Pros:** Real user isolation from day 1 (good for multi-tester environments)
✅ **Pros:** Delays expensive OpenAI integration until prompt is refined
⚠️ **Caution:** Auth setup still takes time (3-4 hours)

**Walking Skeleton Modifications:**
- Feature 1: Use **1.2** (LinkedIn OAuth) instead of 1.1 (hardcoded)
- Feature 1: Use **3.2** (7-day session) instead of 3.1
- Feature 3: Keep **1.1** (mocked AI) until Iteration 2
- Enable RLS from start (Feature 5: use **2.4**)

**Implementation Path:**
1. Set up LinkedIn OAuth + RLS (Day 1)
2. Build CRUD flow with mocked AI (Days 2-3)
3. Test with 2-3 real users
4. Add real OpenAI (Iteration 2)
5. Refine based on feedback

**Best For:** Small teams (2-5 people), when you want to test with multiple users immediately, when OpenAI prompt engineering needs iteration

---

### Option 4: Custom Walking Skeleton (Pick Your Own Increments)
✅ **Pros:** Tailored to your specific constraints and priorities
✅ **Pros:** Maximum flexibility
⚠️ **Caution:** Ensure you still cut through all layers (UI → Logic → Data)
⚠️ **Caution:** Validate it delivers real user value end-to-end

**How to Compose Your Own:**
1. For each step in the breakdown above, choose ONE increment
2. Write your choices in the Increment Selection Matrix (below)
3. Ensure combination answers: "What would we ship tomorrow?"
4. Validate it cuts through: UI layer ✓, Logic layer ✓, Data layer ✓
5. Confirm it's deployable and provides observable user value

**Guidelines:**
- Don't skip features entirely (all 7 features are needed for complete flow)
- You can skip steps if you have a good reason (e.g., skip title generation entirely)
- Choose simplest increments (⭐) for non-differentiating features
- Choose better increments for your core value prop (Feature 3 = AI generation)

---

### Option 5: Phased Rollout (Feature by Feature)
✅ **Pros:** Ultra-focused, minimize risk per deploy
✅ **Pros:** Easier to debug when changes are small
⚠️ **Caution:** May not provide complete user value until Phase 5-6
⚠️ **Caution:** Users can't test full flow until all phases deployed

**Phase Plan:**
- **Phase 1:** Feature 1 only (Authentication) - 1 day
- **Phase 2:** Add Features 2-3 (Input + AI generation) - 2 days
- **Phase 3:** Add Feature 4 (Edit STAR) - 1 day
- **Phase 4:** Add Feature 5 (Save to DB) - 1 day
- **Phase 5:** Add Features 6-7 (List + Detail views) - 1-2 days

**Best For:** Learning projects, when integrating into existing app (add features one at a time), high-risk production environments requiring careful rollout

---

## 🧭 Decision Guide: What Should I Build First?

### If Your Priority Is: **Speed to Market** ⚡
→ **Use Option 1:** Follow suggested Walking Skeleton exactly
→ **Why:** Mocked components eliminate integration delays
→ **Timeline:** 2-3 days to deployable MVP
→ **Accept:** Rough edges initially, swap mocked → real later
→ **Focus:** Prove the concept works end-to-end FAST

**Next Steps:**
1. Build Walking Skeleton (2-3 days)
2. Deploy and show to 3-5 potential users
3. Get feedback: "Would you use this?"
4. If yes → Add Iteration 2 (real AI)
5. If no → Learn why before investing more

---

### If Your Priority Is: **Quality/Polish** ✨
→ **Use Option 2:** Start with real integrations + Iteration 4 increments
→ **Why:** Professional feel from day 1 builds trust
→ **Timeline:** 5-7 days to polished MVP
→ **Accept:** Slower initial deployment
→ **Focus:** Make it feel production-ready immediately

**Suggested Increments:**
- Feature 2, Step 1: Use **1.3** (helpful placeholders)
- Feature 3, Step 1: Use **1.4** (OpenAI JSON mode)
- Feature 4, Step 1: Use **1.3** (emoji icons)
- Feature 6, Step 2: Use **2.4** (card previews)
- Feature 7, Step 2: Use **2.4** (styled sections)

---

### If Your Priority Is: **Risk Reduction** 🛡️
→ **Use Option 3 or 4:** Real auth + mocked AI initially
→ **Why:** Biggest unknowns = AI quality and multi-user data isolation
→ **Timeline:** 4-5 days to validated MVP
→ **Accept:** Extra auth setup time upfront
→ **Focus:** Validate riskiest assumptions first

**Risk Mitigation Strategy:**
1. **Risk:** AI generates poor quality STAR format
   - **Solution:** Use mocked AI (1.1), test UI flow thoroughly
   - **Validate:** Build perfect mock data, ensure UI handles it well
   - **Then:** Swap to real AI (1.3), iterate on prompt separately

2. **Risk:** User data leaks between accounts
   - **Solution:** Implement RLS (2.4) from day 1
   - **Validate:** Test with 2 different LinkedIn accounts
   - **Verify:** User A cannot see User B's data in any scenario

3. **Risk:** OpenAI costs too high
   - **Solution:** Start with mocked AI, track usage once real
   - **Monitor:** Add logging to count API calls per user
   - **Optimize:** Cache common transformations if needed

---

### If Your Priority Is: **Learning/Validation** 🎓
→ **Use Option 1:** Walking Skeleton → deploy → gather feedback
→ **Why:** Fastest path to real user feedback
→ **Timeline:** 2-3 days to user testing
→ **Accept:** Imperfect implementation
→ **Focus:** Learn what users actually need

**Learning Questions to Answer:**
- [ ] Do users understand how to use the tool without instructions?
- [ ] Is the AI-generated STAR format actually helpful? (test with mocked data first)
- [ ] Do users edit the AI output heavily or accept it mostly as-is?
- [ ] What fields do users struggle to fill in?
- [ ] Is the STAR format itself valuable, or do users want different format?
- [ ] Do users create multiple experiences or just one?

**Feedback Collection:**
1. Deploy Walking Skeleton
2. Share with 5-10 target users (professionals preparing for interviews)
3. Ask: "Document one of your experiences using this tool"
4. Observe: Where do they get stuck? What do they edit?
5. Interview: "Was the STAR format helpful?" "What's missing?"
6. Prioritize next iterations based on feedback

---

### If Your Priority Is: **Team Coordination** 👥
→ **Use Option 5:** Phased rollout with clear interfaces
→ **Why:** Parallel work on different features
→ **Timeline:** 1 week with 2-3 developers
→ **Accept:** Features deployed separately
→ **Focus:** Clear API contracts between features

**Team Split Example (3 developers):**

**Developer 1: Authentication & Infrastructure**
- Feature 1 (all steps)
- Set up Supabase project
- Configure RLS policies
- Create database schema

**Developer 2: AI Integration & Core Flow**
- Features 2-4 (Create → Generate → Edit)
- OpenAI integration
- STAR parsing logic
- Form state management

**Developer 3: Display & Persistence**
- Features 5-7 (Save → List → Detail)
- Supabase data operations
- UI components (cards, detail view)
- Navigation flow

**Integration Points:**
- **Contract 1:** Auth provides `user_id` to all features via context/hook
- **Contract 2:** AI integration returns `{situation, task, action, result, title}` object
- **Contract 3:** Save function accepts STAR object, returns `experience_id`

---

## 📊 Increment Selection Matrix

Use this worksheet to make decisions about which increments to implement. Mark your choices with ✓.

### Feature 1: Authenticate with LinkedIn

| Step | Simplest (⭐) | Balanced | Advanced | Your Choice |
|------|---------------|----------|----------|-------------|
| **1.1 Initiate OAuth** | 1.1 Hardcoded dev user | 1.2 LinkedIn OAuth | 1.5 Multi-provider | [ ] |
| **1.2 Handle Callback** | 2.1 Basic callback | 2.2 With error handling | 2.3 With profile sync | [ ] |
| **1.3 Establish Session** | 3.1 24-hour session | 3.2 7-day persistent | 3.3 30-day + refresh | [ ] |

### Feature 2: Create Experience (Text Input)

| Step | Simplest (⭐) | Balanced | Advanced | Your Choice |
|------|---------------|----------|----------|-------------|
| **2.1 Display Form** | 1.1 Plain textarea | 1.3 With placeholders | 1.6 Guided prompts | [ ] |
| **2.2 Validate Input** | 2.1 No validation | 2.2 Min 50 chars | 2.5 AI pre-check | [ ] |
| **2.3 Submit** | 3.1 Direct submit | 3.2 With spinner | 3.6 With retry | [ ] |

### Feature 3: Generate STAR Format

| Step | Simplest (⭐) | Balanced | Advanced | Your Choice |
|------|---------------|----------|----------|-------------|
| **3.1 Call OpenAI** | 1.1 Mocked response | 1.3 Structured prompt | 1.7 Streaming | [ ] |
| **3.2 Parse Response** | 2.1 Split by lines | 2.2 Parse JSON | 2.5 Smart extraction | [ ] |
| **3.3 Generate Title** | 3.1 No auto-title | 3.4 Same prompt | 3.5 Multiple options | [ ] |

### Feature 4: Review and Edit STAR

| Step | Simplest (⭐) | Balanced | Advanced | Your Choice |
|------|---------------|----------|----------|-------------|
| **4.1 Display Form** | 1.1 Read-only text | 1.2 Basic inputs | 1.3 With emoji icons | [ ] |
| **4.2 Enable Editing** | 2.1 Manual save | 2.3 Auto-save draft | 2.6 Undo/redo | [ ] |
| **4.3 Validate** | 3.1 No validation | 3.3 Require all fields | 3.5 Smart feedback | [ ] |

### Feature 5: Save Experience

| Step | Simplest (⭐) | Balanced | Advanced | Your Choice |
|------|---------------|----------|----------|-------------|
| **5.1 Prepare Data** | 1.1 Raw object | 1.2 Transform schema | 1.5 Sanitize | [ ] |
| **5.2 Insert Supabase** | 2.1 Direct insert | 2.2 With error catch | 2.4 With RLS | [ ] |
| **5.3 Confirm** | 3.1 Silent redirect | 3.3 Toast + redirect | 3.5 Preview + nav | [ ] |

### Feature 6: View Experiences List

| Step | Simplest (⭐) | Balanced | Advanced | Your Choice |
|------|---------------|----------|----------|-------------|
| **6.1 Fetch Data** | 1.1 Fetch all | 1.3 Load more button | 1.6 Search/filter | [ ] |
| **6.2 Render Cards** | 2.1 Plain list | 2.3 Title + company | 2.7 With actions | [ ] |
| **6.3 Empty State** | 3.1 Blank screen | 3.3 Text + CTA | 3.5 Onboarding tour | [ ] |

### Feature 7: View Experience Detail

| Step | Simplest (⭐) | Balanced | Advanced | Your Choice |
|------|---------------|----------|----------|-------------|
| **7.1 Fetch Single** | 1.1 By ID only | 1.2 With 404 | 1.5 Optimistic cache | [ ] |
| **7.2 Display STAR** | 2.1 Text dump | 2.3 Emoji sections | 2.5 Copy buttons | [ ] |
| **7.3 Navigation** | 3.1 No nav | 3.2 Back link | 3.5 Full actions | [ ] |

### Your Custom Walking Skeleton

After filling in "Your Choice" column above, validate your selection:

**Validation Checklist:**
- [ ] All 7 features have at least one increment selected per step (complete flow)
- [ ] Selection cuts through UI → Logic → Data layers
- [ ] Combination delivers observable user value (can demo to real user)
- [ ] Can be built in your available timeline (be honest about effort)
- [ ] Answers "What would we ship if deadline was tomorrow?"

**If unsure, default to suggested Walking Skeleton above (all ⭐ Simplest increments)**

---

## 🎓 Breakdown Strategies Applied

Summary of strategies used across all features in this analysis:

### **Dummy to Dynamic** (Most Used)
**Where applied:**
- Feature 1, Step 1: Hardcoded auth → Real OAuth
- Feature 3, Step 1: Mocked AI → Real OpenAI API
- Feature 3, Step 3: Extract words → AI-generated title

**Why effective:** Eliminates external dependencies and integration complexity upfront. Build and test the entire UI/UX flow with predictable, controlled data before introducing real API variability.

**Example:** Mocked STAR response (3.1.1) lets you build Features 4-7 completely without OpenAI account, API keys, prompt engineering, or rate limiting concerns.

---

### **Zero/One/Many**
**Where applied:**
- Feature 1, Step 3: Session duration progression (24h → 7d → 30d)
- Feature 6, Step 1: Fetch capacity (all → 10 → paginated)
- Feature 6, Step 3: Empty state handling

**Why effective:** Handles edge cases incrementally. Start with single happy-path case, add zero-case handling, then scale to many-case optimization.

**Example:** Fetch all experiences (6.1.1) works perfectly for MVP with <10 experiences. Add pagination (6.1.3) only when users create 50+ experiences.

---

### **Workflow Simplification**
**Where applied:**
- Feature 2, Step 3: Submit variations (direct → spinner → retry)
- Feature 4, Step 2: Save mechanisms (manual → autosave → undo)
- Feature 5, Step 3: Confirmation flow (silent → toast → modal)
- Feature 7, Step 3: Navigation options (none → back link → full menu)

**Why effective:** Removes optional steps and ceremony. Simplest workflow = fewest steps, fewest confirmations, fewest choices.

**Example:** Silent save + redirect (5.3.1) = zero post-save UI. User clicks Save, page changes—done. Add toast (5.3.3) when users complain about not knowing if save succeeded.

---

### **Business Rule Progression**
**Where applied:**
- Feature 2, Step 2: Validation rules (none → min → min+max → smart)
- Feature 3, Step 2: Parsing strictness (permissive → JSON → validated)
- Feature 4, Step 3: Edit validation (allow empty → require fields → enforce quality)

**Why effective:** Start with zero constraints, add rules only when needed. Each rule adds complexity—justify it with real user pain.

**Example:** No validation (2.2.1) lets you test flow immediately. Add 50-char minimum (2.2.2) only after observing users submit "test" and get useless AI output.

---

### **Extract Basic Utility**
**Where applied:**
- Feature 1, Step 2: Callback handling (basic → error handling → retries)
- Feature 5, Step 1: Data preparation (raw → transformed → sanitized)
- Feature 7, Step 1: Fetch logic (direct query → 404 handling → caching)

**Why effective:** Delivers bare minimum functionality first. Focus on happy path, add error handling and edge cases incrementally.

**Example:** Basic callback (1.2.1) just creates session and redirects—nothing else. Add error handling (1.2.2) when you encounter your first OAuth failure.

---

### **Simplify Outputs**
**Where applied:**
- Feature 2, Step 1: Form complexity (plain textarea → character count → rich editor)
- Feature 4, Step 1: Display quality (read-only → basic form → styled with icons)
- Feature 6, Step 2: Card richness (titles only → + date → + preview)
- Feature 7, Step 2: Detail display (text dump → labeled sections → styled)

**Why effective:** Minimal UI first, add visual hierarchy and polish incrementally. Users care about functionality > beauty initially.

**Example:** Plain list of titles (6.2.1) = 3 lines of code. Cards with previews (6.2.4) = 50+ lines. Start with 3, add 47 when design matters.

---

### **Start with Outputs**
**Where applied:**
- Feature 3, Step 3: Title generation (skip it → extract → generate)
- Feature 6, Step 2: List rendering (what user sees)

**Why effective:** Focus on user-facing deliverable first. If feature doesn't improve user-visible output, maybe you don't need it yet.

**Example:** No auto-title (3.3.1) = skip entire feature. Users type their own title. Only add auto-title (3.3.2+) if users complain or create bad titles.

---

### **Split by Capacity**
**Where applied:**
- Feature 3, Step 1: AI capabilities (mocked → basic → advanced)
- Feature 6, Step 1: Data volume (all → limited → paginated)

**Why effective:** Start with low capacity requirements, scale up as needed. Many apps never need high-capacity solutions.

**Example:** Fetch all experiences (6.1.1) has no pagination, no limit. For MVP with 1-10 users having 5-20 experiences each, this is totally fine. Add pagination only when you have users with 100+ experiences.

---

### Strategies NOT Used (And Why)

**User Segment Narrowing:**
- Not applicable—MVP already targets single narrow segment (professionals documenting experiences)
- Could use in future: "Beta users in tech industry" → "All industries"

**Split Learning from Earning:**
- Not needed—no major unknowns requiring time-boxed research
- All technologies (Next.js, Supabase, OpenAI) are well-documented

**SPIDR Pattern:**
- Implicitly used (different increments = different interfaces, data sources, rules)
- Not explicitly called out because other strategies cover it

**Coordinating Conjunctions:**
- Features already atomic (no "Manage Experiences" that hides CRUD)
- Applied during feature identification phase, not increment generation

---

## 📝 Next Steps

### Immediate Actions (Before Writing Code)

1. **Review the Suggested Walking Skeleton**
   - Read through the composition above
   - Understand why each increment was chosen
   - Decide: accept it or customize it?

2. **Choose Your Implementation Path**
   - See Decision Guide above
   - Match your priority (speed/quality/risk/learning) to recommended option
   - Write down your choice: "I'm using Option __"

3. **Fill in the Increment Selection Matrix**
   - If using suggested Walking Skeleton: mark all ⭐ Simplest increments
   - If customizing: mark your chosen increments per step
   - Validate: does this provide complete user value?

4. **Validate Your Selection**
   - Does it cut through UI → Logic → Data? ✓
   - Can you deploy it independently? ✓
   - Does it deliver observable value to users? ✓
   - Answers "ship tomorrow" test? ✓

5. **Set Up Your Development Environment**
   - Create Next.js 14 project: `npx create-next-app@latest fact-cv`
   - Initialize Supabase project: [supabase.com/dashboard](https://supabase.com/dashboard)
   - Set up environment variables (.env.local)
   - Install dependencies: shadcn/ui components

### During Implementation

#### Day 1: Authentication + Infrastructure
- [ ] Set up Supabase project and get credentials
- [ ] Create `experiences` table schema (see schema below)
- [ ] Implement chosen auth increments (hardcoded or OAuth)
- [ ] Test: Can you "log in" and get a user_id?

**Experiences Table Schema:**
```sql
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  company TEXT,
  situation TEXT NOT NULL,
  task TEXT NOT NULL,
  action TEXT NOT NULL,
  result TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (enable in Iteration 3 or Option 3)
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own experiences"
  ON experiences
  FOR ALL
  USING (auth.uid() = user_id);
```

#### Day 2: Core STAR Flow (Create → Generate → Edit)
- [ ] Build input form (Feature 2)
- [ ] Implement chosen AI increments (mocked or real)
- [ ] Build edit form (Feature 4)
- [ ] Test: Can you input text → see STAR output → edit it?

**If using mocked AI (recommended for Walking Skeleton):**
```typescript
// app/api/generate-star/route.ts
export async function POST(req: Request) {
  const { text } = await req.json();

  // Mocked response - replace with real OpenAI in Iteration 2
  return Response.json({
    situation: "Our legacy monolithic system was causing slow deployments and scaling issues.",
    task: "Migrate the architecture to microservices to improve deployment speed and system reliability.",
    action: "Led a team of 4 engineers to decompose the monolith, containerize services, and implement CI/CD.",
    result: "Reduced deployment time by 60% and improved system uptime to 99.9%.",
    title: "Led migration to microservices architecture"
  });
}
```

#### Day 3: Persistence + Display (Save → List → Detail)
- [ ] Implement save to Supabase (Feature 5)
- [ ] Build experiences list view (Feature 6)
- [ ] Build detail view (Feature 7)
- [ ] Test: Can you save → see in list → click to view detail?

### After First Deployment

1. **Deploy to Vercel/Netlify**
   - Connect GitHub repo
   - Add environment variables
   - Test production deployment

2. **Validate the Walking Skeleton**
   - Go through complete flow yourself
   - Document any bugs or friction points
   - Verify all validation criteria (see Walking Skeleton section)

3. **Gather User Feedback**
   - Share with 3-5 target users
   - Watch them use it (screen share or in person)
   - Ask: "What's confusing?" "What's missing?" "Would you use this?"

4. **Prioritize Next Iteration**
   - Based on feedback, choose Iteration 2, 3, 4, or 5
   - If users love it: add real AI (Iteration 2)
   - If users can't log in: add real OAuth (Iteration 3)
   - If users complain about polish: add UX (Iteration 4)
   - If errors are breaking the experience: add validation (Iteration 5)

5. **Iterate Based on Learning**
   - Review "Expected Learning" from each suggested iteration
   - Use Increment Selection Matrix to add specific increments
   - Deploy incrementally, validate after each change

### If You Get Stuck

**Problem: Not sure which increments to choose**
- **Solution:** Default to suggested Walking Skeleton (all ⭐ Simplest increments)
- **Rationale:** You can always upgrade later; shipping something > shipping nothing

**Problem: Walking Skeleton feels too basic/ugly**
- **Solution:** Remember it's meant to prove the flow works, not to be beautiful
- **Alternative:** Add 2-3 increments from Iteration 4 (UX polish) if aesthetics matter to you

**Problem: Mocked AI feels like fake work**
- **Solution:** It's not fake—it validates the UI, state management, data flow, and save logic
- **Reality:** 70% of your code has nothing to do with OpenAI. Build that 70% first.

**Problem: Want to add features not in this analysis**
- **Solution:** Go for it! This analysis is a guide, not a prison
- **Caution:** Ensure new features still deliver user value and cut through layers

### If You Need More Analysis

**Want different step breakdowns?**
- Use `/analyze-steps` slash command
- Provide features list, specify different technical concerns

**Want more increment options for specific steps?**
- Use `/generate-increments` slash command
- Provide specific steps, request more breakdown strategies

**Want different slice compositions?**
- Use `/compose-slices` slash command
- Provide increments, specify different business priorities

**Want to analyze a single feature deeply?**
- Use `/analyze-feature-deep` slash command
- Focus on one feature, get comprehensive breakdown

**Want quick options for a new feature?**
- Use `/quick-slice` slash command
- Get 3 implementation paths in ~10 minutes

---

## 🔄 Revision History

- **2025-10-26**: Initial analysis generated for fact-cv MVP
  - 7 features identified
  - 25 steps analyzed
  - 150+ increments generated
  - Walking Skeleton suggested (2-3 day implementation)
  - 5 iterations planned
  - 5 implementation options provided

---

## 📚 Appendix: Key Definitions

### STAR Format
**Situation:** The context or background of the experience
**Task:** Your responsibility or goal in that situation
**Action:** The specific steps you took to address the task
**Result:** The measurable outcome or impact of your actions

### Walking Skeleton
The first vertical slice that:
- Demonstrates end-to-end functionality
- Uses the simplest increments from each step
- Provides immediate validation of the concept
- Enables early user feedback
- Can be deployed independently

### Increment
A specific implementation of a step that:
- Is deployable (provides user-facing value)
- Cuts through technical layers (UI → Logic → Data)
- Answers "What would we ship if deadline was tomorrow?"
- Can be built and tested independently

### Vertical Slice
A combination of increments across multiple steps/features that:
- Delivers complete user value
- Works end-to-end (no stub dependencies)
- Can be deployed to production
- Enables learning and feedback

---

## 💬 Questions or Feedback?

**Need clarification on any increment?**
- Each increment has a description—refer to detailed breakdown sections above
- If still unclear, try building the simplest version first, iterate later

**Want to discuss tradeoffs?**
- Review "Quality Attributes" under each step
- Consider your priorities: speed/quality/risk/learning
- Use Decision Guide to match priorities to increment choices

**Found a better way to slice a feature?**
- Great! This analysis is a starting point, not gospel
- Document your approach and share learnings
- Update this document with "Revision History" entry

**Ready to start building?**
- Review "Next Steps" section above
- Choose your implementation option
- Fill in Increment Selection Matrix
- Start with Day 1 tasks
- Ship the Walking Skeleton in 2-3 days! 🚀

---

**Remember:** The goal is not to build everything perfectly, it's to build something valuable quickly, learn from real usage, and iterate based on feedback. Start with the Walking Skeleton, deploy it, and let users tell you what to build next.

**Now go build something! 🎯**
