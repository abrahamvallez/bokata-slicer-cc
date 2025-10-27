# fact-cv MVP - Vertical Slicing Analysis

**Generated:** 2025-10-27
**Project:** CV Creation with AI Assistance
**Analysis Type:** Multi-Feature Project

---

## Executive Summary

### Project Overview
**fact-cv** is an AI-powered CV creation tool that helps users build professional resumes by transforming their work experiences into well-structured STAR format (Situation, Task, Action, Result) using AI assistance. The MVP focuses on four core features that enable a complete user workflow from authentication to AI-enhanced experience management.

### Key Metrics

| Metric | Value |
|--------|-------|
| **Total Features** | 4 |
| **Total Steps** | 19 |
| **Total Increments** | 102 |
| **Walking Skeleton** | 5 increments |

### Timeline Estimates

- **Walking Skeleton:** 3-4 days
- **Basic MVP:** 2-3 weeks
- **Full Feature Set:** 4-6 weeks

### Feature Summary

1. **LinkedIn Authentication** - 4 steps, 24 increments
2. **Experience Creation** - 5 steps, 28 increments
3. **Experience Management** - 5 steps, 26 increments
4. **AI-Powered STAR Formatting** - 5 steps, 24 increments

---

## Feature 1: LinkedIn Authentication

### Overview
Enable users to authenticate using LinkedIn OAuth through Supabase Auth, establishing secure user sessions for the application.

### Steps Breakdown

#### Step 1.1: OAuth Initiation UI
**Purpose:** Provide user interface to start LinkedIn authentication
**Quality Attributes:** Simplicity, clarity, accessibility

**Increments:**

1. ⭐ **Hardcoded "Sign in with LinkedIn" button** - Static button that navigates to hardcoded URL
   - **Strategy:** Start with outputs
   - **Effort:** 1 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Proves UI can trigger authentication flow
   - **Time:** 30 minutes

2. **Button with environment-based URL** - Button reads OAuth URL from environment variable
   - **Strategy:** Dummy to dynamic
   - **Effort:** 1 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Makes configuration flexible
   - **Time:** 45 minutes

3. **Button with loading state** - Add spinner during redirect
   - **Strategy:** Extract basic utility
   - **Effort:** 2 | **Value:** 2 | **Risk:** 1
   - **Rationale:** Improves UX with feedback
   - **Time:** 1 hour

4. **Button with error handling UI** - Display error messages if OAuth fails to initiate
   - **Strategy:** Defer edge cases
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Handles failure gracefully
   - **Time:** 1.5 hours

5. **Styled authentication page** - Professional design with branding
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 2 | **Risk:** 1
   - **Rationale:** Better first impression
   - **Time:** 2 hours

6. **Multi-provider auth UI** - Support LinkedIn + email/password options
   - **Strategy:** Expand capability
   - **Effort:** 3 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Provides alternatives
   - **Time:** 3 hours

#### Step 1.2: Supabase OAuth Configuration
**Purpose:** Configure Supabase to handle LinkedIn OAuth flow
**Quality Attributes:** Security, reliability, maintainability

**Increments:**

1. ⭐ **Manual Supabase project setup** - Manually create project and enable LinkedIn provider
   - **Strategy:** Manual before automated
   - **Effort:** 1 | **Value:** 5 | **Risk:** 1
   - **Rationale:** Quick setup, proves integration works
   - **Time:** 1 hour

2. **Environment variable configuration** - Store credentials in .env file
   - **Strategy:** Configuration management
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Secure credential handling
   - **Time:** 30 minutes

3. **Multiple environment configs** - Separate dev/staging/prod configurations
   - **Strategy:** Zero/One/Many
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Supports deployment pipeline
   - **Time:** 1 hour

4. **Automated setup script** - Script to configure Supabase via CLI
   - **Strategy:** Manual before automated
   - **Effort:** 3 | **Value:** 2 | **Risk:** 2
   - **Rationale:** Repeatable setup process
   - **Time:** 2 hours

5. **OAuth scope configuration** - Fine-tune LinkedIn permissions requested
   - **Strategy:** Capacity-based splitting
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Request only necessary data
   - **Time:** 1 hour

#### Step 1.3: OAuth Callback Handling
**Purpose:** Process LinkedIn's OAuth callback and establish user session
**Quality Attributes:** Security, error handling, performance

**Increments:**

1. ⭐ **Basic callback route** - API route that receives OAuth code and logs it
   - **Strategy:** Start with outputs
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Proves callback flow works
   - **Time:** 1 hour

2. **Token exchange with Supabase** - Exchange code for session token
   - **Strategy:** Incremental API integration
   - **Effort:** 2 | **Value:** 5 | **Risk:** 2
   - **Rationale:** Establishes authenticated session
   - **Time:** 2 hours

3. **Session persistence** - Store session in cookies/localStorage
   - **Strategy:** Extract basic utility
   - **Effort:** 2 | **Value:** 5 | **Risk:** 1
   - **Rationale:** Maintains user login across pages
   - **Time:** 1.5 hours

4. **Error handling for failed OAuth** - Detect and handle OAuth failures
   - **Strategy:** Defer edge cases
   - **Effort:** 2 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Graceful failure recovery
   - **Time:** 2 hours

5. **Redirect to intended destination** - Remember and redirect to pre-auth URL
   - **Strategy:** Workflow enhancement
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Better UX flow
   - **Time:** 1.5 hours

6. **Profile data extraction** - Pull LinkedIn profile data during callback
   - **Strategy:** Expand capability
   - **Effort:** 3 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Pre-populate user profile
   - **Time:** 2 hours

#### Step 1.4: Session Management
**Purpose:** Maintain and validate user authentication state
**Quality Attributes:** Security, reliability, performance

**Increments:**

1. ⭐ **Basic session check** - Verify user is logged in on protected routes
   - **Strategy:** Extract basic utility
   - **Effort:** 1 | **Value:** 5 | **Risk:** 1
   - **Rationale:** Basic security for protected pages
   - **Time:** 1 hour

2. **Session refresh logic** - Auto-refresh expired tokens
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 4 | **Risk:** 2
   - **Rationale:** Seamless long sessions
   - **Time:** 2 hours

3. **Logout functionality** - Clear session and redirect to login
   - **Strategy:** Workflow completion
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Allows secure sign-out
   - **Time:** 1 hour

4. **Session timeout handling** - Auto-logout after inactivity
   - **Strategy:** Security enhancement
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Improves security
   - **Time:** 1.5 hours

5. **Multi-device session management** - Track sessions across devices
   - **Strategy:** Expand capability
   - **Effort:** 3 | **Value:** 2 | **Risk:** 2
   - **Rationale:** Enterprise feature
   - **Time:** 3 hours

6. **Remember me functionality** - Extended session duration option
   - **Strategy:** User segment narrowing
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Convenience for trusted devices
   - **Time:** 1.5 hours

---

## Feature 2: Experience Creation

### Overview
Allow users to input work experience details through freeform text, which can later be enhanced with AI formatting.

### Steps Breakdown

#### Step 2.1: Experience Input Form UI
**Purpose:** Provide interface for users to enter experience details
**Quality Attributes:** Usability, simplicity, validation

**Increments:**

1. ⭐ **Single textarea form** - One big text area for experience description
   - **Strategy:** Start with outputs
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Simplest input mechanism
   - **Time:** 1 hour

2. **Basic structured form** - Separate fields: Company, Role, Description
   - **Strategy:** Workflow simplification
   - **Effort:** 2 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Organizes data logically
   - **Time:** 2 hours

3. **Form with date pickers** - Add start/end date fields
   - **Strategy:** Extract basic utility
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Captures timeline data
   - **Time:** 1.5 hours

4. **Form validation** - Client-side validation for required fields
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Prevents invalid submissions
   - **Time:** 1.5 hours

5. **Character counter** - Show remaining characters for description
   - **Strategy:** User guidance
   - **Effort:** 1 | **Value:** 2 | **Risk:** 1
   - **Rationale:** Helps users gauge length
   - **Time:** 45 minutes

6. **Rich text editor** - Allow basic formatting (bold, lists, etc.)
   - **Strategy:** Quality enhancement
   - **Effort:** 3 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Better formatting control
   - **Time:** 3 hours

7. **Auto-save draft** - Save progress automatically
   - **Strategy:** Defer edge cases
   - **Effort:** 3 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Prevents data loss
   - **Time:** 2.5 hours

#### Step 2.2: Data Validation and Sanitization
**Purpose:** Ensure submitted experience data is valid and safe
**Quality Attributes:** Security, data integrity, reliability

**Increments:**

1. ⭐ **Basic required field validation** - Check company and role are present
   - **Strategy:** Extract basic utility
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Prevents empty records
   - **Time:** 30 minutes

2. **Length validation** - Enforce min/max character limits
   - **Strategy:** Capacity-based splitting
   - **Effort:** 1 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Prevents abuse
   - **Time:** 45 minutes

3. **XSS sanitization** - Strip malicious HTML/scripts
   - **Strategy:** Security enhancement
   - **Effort:** 2 | **Value:** 4 | **Risk:** 2
   - **Rationale:** Protects against attacks
   - **Time:** 1.5 hours

4. **Date validation** - Ensure dates are logical (start < end)
   - **Strategy:** Defer edge cases
   - **Effort:** 1 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Data consistency
   - **Time:** 1 hour

5. **Format validation** - Check text follows expected patterns
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 2 | **Risk:** 1
   - **Rationale:** Better data quality
   - **Time:** 1.5 hours

6. **Duplicate detection** - Warn if similar experience exists
   - **Strategy:** Defer edge cases
   - **Effort:** 3 | **Value:** 2 | **Risk:** 2
   - **Rationale:** Prevents accidental duplicates
   - **Time:** 2 hours

#### Step 2.3: API Endpoint for Creation
**Purpose:** Handle HTTP request to create experience record
**Quality Attributes:** Performance, error handling, security

**Increments:**

1. ⭐ **Basic POST endpoint** - Accept JSON payload, log it, return 200
   - **Strategy:** Start with outputs
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Proves API connectivity
   - **Time:** 45 minutes

2. **Authentication check** - Verify user is logged in
   - **Strategy:** Security enhancement
   - **Effort:** 1 | **Value:** 5 | **Risk:** 1
   - **Rationale:** Secures endpoint
   - **Time:** 1 hour

3. **Request validation** - Validate payload structure
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Prevents bad data
   - **Time:** 1 hour

4. **Error response handling** - Return proper error codes/messages
   - **Strategy:** Defer edge cases
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Better debugging
   - **Time:** 1.5 hours

5. **Rate limiting** - Limit requests per user/IP
   - **Strategy:** Security enhancement
   - **Effort:** 2 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Prevents abuse
   - **Time:** 2 hours

6. **Request logging** - Log all creation attempts
   - **Strategy:** Operational enhancement
   - **Effort:** 1 | **Value:** 2 | **Risk:** 1
   - **Rationale:** Audit trail
   - **Time:** 1 hour

#### Step 2.4: Database Persistence
**Purpose:** Store experience data in Supabase PostgreSQL
**Quality Attributes:** Data integrity, performance, scalability

**Increments:**

1. ⭐ **Single-user table with basic fields** - Create experiences table: id, user_id, description
   - **Strategy:** Zero/One/Many
   - **Effort:** 1 | **Value:** 5 | **Risk:** 1
   - **Rationale:** Minimal schema that works
   - **Time:** 1 hour

2. **Complete schema** - Add company, role, dates, created_at, updated_at
   - **Strategy:** Incremental expansion
   - **Effort:** 2 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Full data model
   - **Time:** 1.5 hours

3. **Row-level security** - Enable RLS, users see only their data
   - **Strategy:** Security enhancement
   - **Effort:** 2 | **Value:** 5 | **Risk:** 2
   - **Rationale:** Multi-user data isolation
   - **Time:** 1.5 hours

4. **Indexes for performance** - Add indexes on user_id, created_at
   - **Strategy:** Performance optimization
   - **Effort:** 1 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Faster queries
   - **Time:** 45 minutes

5. **Database constraints** - Add NOT NULL, foreign keys, check constraints
   - **Strategy:** Data integrity
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Enforces data rules
   - **Time:** 1 hour

6. **Soft deletes** - Add deleted_at column instead of hard deletes
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 2 | **Risk:** 1
   - **Rationale:** Enables recovery
   - **Time:** 1.5 hours

#### Step 2.5: Success Feedback
**Purpose:** Confirm successful experience creation to user
**Quality Attributes:** Clarity, timeliness, usability

**Increments:**

1. ⭐ **Simple success message** - Show "Experience created!" text
   - **Strategy:** Start with outputs
   - **Effort:** 1 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Basic feedback
   - **Time:** 15 minutes

2. **Toast notification** - Dismissible notification with animation
   - **Strategy:** Quality enhancement
   - **Effort:** 1 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Better UX pattern
   - **Time:** 1 hour

3. **Redirect to experience list** - Auto-navigate after creation
   - **Strategy:** Workflow completion
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Natural next step
   - **Time:** 30 minutes

4. **Show created experience** - Display the new experience immediately
   - **Strategy:** Immediate feedback
   - **Effort:** 2 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Confirms what was saved
   - **Time:** 1 hour

5. **Action buttons** - "Create another" or "View experience" options
   - **Strategy:** Workflow enhancement
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Streamlines workflow
   - **Time:** 1 hour

6. **Undo functionality** - Allow immediate deletion if mistake
   - **Strategy:** Defer edge cases
   - **Effort:** 3 | **Value:** 2 | **Risk:** 2
   - **Rationale:** Safety net
   - **Time:** 2 hours

---

## Feature 3: Experience Management

### Overview
Enable users to view, browse, and manage their collection of work experiences.

### Steps Breakdown

#### Step 3.1: Experience List UI
**Purpose:** Display all user experiences in browsable format
**Quality Attributes:** Performance, usability, clarity

**Increments:**

1. ⭐ **Simple list of titles** - Show company + role in basic list
   - **Strategy:** Start with outputs
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Simplest browsable view
   - **Time:** 1 hour

2. **Card-based layout** - Display each experience as card with key details
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Better visual hierarchy
   - **Time:** 2 hours

3. **Pagination** - Show 10 items per page with navigation
   - **Strategy:** Capacity-based splitting
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Handles large lists
   - **Time:** 2 hours

4. **Sorting options** - Sort by date, company, role
   - **Strategy:** User control enhancement
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Helps find experiences
   - **Time:** 1.5 hours

5. **Search/filter** - Search by keywords
   - **Strategy:** Quality enhancement
   - **Effort:** 3 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Quick access to specific items
   - **Time:** 2.5 hours

6. **Infinite scroll** - Load more as user scrolls
   - **Strategy:** UX enhancement
   - **Effort:** 3 | **Value:** 2 | **Risk:** 2
   - **Rationale:** Modern browsing pattern
   - **Time:** 2 hours

#### Step 3.2: Experience Detail View
**Purpose:** Display complete information for a single experience
**Quality Attributes:** Clarity, completeness, navigation

**Increments:**

1. ⭐ **Basic detail page** - Show all fields in simple layout
   - **Strategy:** Start with outputs
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Complete information display
   - **Time:** 1 hour

2. **Formatted display** - Professional layout with sections
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Better readability
   - **Time:** 2 hours

3. **STAR structure display** - If formatted, show S/T/A/R sections
   - **Strategy:** Feature-specific view
   - **Effort:** 2 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Highlights AI formatting
   - **Time:** 1.5 hours

4. **Action buttons** - Edit, Delete, Format with AI
   - **Strategy:** Workflow integration
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Quick actions
   - **Time:** 1 hour

5. **Print/export view** - Styled for PDF export
   - **Strategy:** Output enhancement
   - **Effort:** 3 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Resume generation
   - **Time:** 2.5 hours

6. **Version history** - Show previous versions if edited
   - **Strategy:** Quality enhancement
   - **Effort:** 4 | **Value:** 2 | **Risk:** 3
   - **Rationale:** Audit trail
   - **Time:** 4 hours

#### Step 3.3: Experience Editing
**Purpose:** Allow users to modify existing experiences
**Quality Attributes:** Data preservation, usability, validation

**Increments:**

1. ⭐ **Edit form pre-populated** - Reuse creation form with existing data
   - **Strategy:** Reuse components
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Consistent UX
   - **Time:** 1 hour

2. **Save changes functionality** - PUT endpoint to update record
   - **Strategy:** CRUD completion
   - **Effort:** 2 | **Value:** 5 | **Risk:** 1
   - **Rationale:** Core editing capability
   - **Time:** 1.5 hours

3. **Cancel/discard changes** - Revert without saving
   - **Strategy:** User control
   - **Effort:** 1 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Prevents accidental changes
   - **Time:** 30 minutes

4. **Optimistic updates** - UI updates before server confirms
   - **Strategy:** Performance enhancement
   - **Effort:** 2 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Feels faster
   - **Time:** 2 hours

5. **Conflict detection** - Warn if data changed elsewhere
   - **Strategy:** Defer edge cases
   - **Effort:** 3 | **Value:** 2 | **Risk:** 2
   - **Rationale:** Multi-device safety
   - **Time:** 2.5 hours

6. **Draft mode** - Save without publishing
   - **Strategy:** Workflow enhancement
   - **Effort:** 3 | **Value:** 2 | **Risk:** 2
   - **Rationale:** Work-in-progress support
   - **Time:** 2 hours

#### Step 3.4: Experience Deletion
**Purpose:** Allow users to remove unwanted experiences
**Quality Attributes:** Safety, reversibility, clarity

**Increments:**

1. ⭐ **Delete button with confirmation** - Simple confirm dialog before delete
   - **Strategy:** Workflow simplification
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Basic safety mechanism
   - **Time:** 1 hour

2. **Soft delete with undo** - Mark deleted, show undo option
   - **Strategy:** Reversibility
   - **Effort:** 2 | **Value:** 4 | **Risk:** 2
   - **Rationale:** Recoverable mistakes
   - **Time:** 2 hours

3. **Bulk delete** - Select and delete multiple items
   - **Strategy:** Zero/One/Many
   - **Effort:** 3 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Efficient cleanup
   - **Time:** 2.5 hours

4. **Archive instead of delete** - Move to archived state
   - **Strategy:** Alternative workflow
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Non-destructive removal
   - **Time:** 1.5 hours

5. **Permanent delete option** - Actually remove from database
   - **Strategy:** Complete workflow
   - **Effort:** 2 | **Value:** 2 | **Risk:** 2
   - **Rationale:** Data cleanup
   - **Time:** 1 hour

6. **Recycle bin** - View and restore deleted items
   - **Strategy:** Quality enhancement
   - **Effort:** 3 | **Value:** 2 | **Risk:** 2
   - **Rationale:** Extended recovery window
   - **Time:** 3 hours

#### Step 3.5: Data Fetching and State
**Purpose:** Load and manage experience data in frontend
**Quality Attributes:** Performance, reliability, caching

**Increments:**

1. ⭐ **Basic fetch on page load** - GET request to load all experiences
   - **Strategy:** Start with outputs
   - **Effort:** 1 | **Value:** 5 | **Risk:** 1
   - **Rationale:** Core data loading
   - **Time:** 1 hour

2. **Loading states** - Show spinner while fetching
   - **Strategy:** UX enhancement
   - **Effort:** 1 | **Value:** 3 | **Risk:** 1
   - **Rationale:** User feedback
   - **Time:** 45 minutes

3. **Error handling** - Display error message if fetch fails
   - **Strategy:** Defer edge cases
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Graceful failure
   - **Time:** 1 hour

4. **Client-side caching** - Cache fetched data, refresh on stale
   - **Strategy:** Performance optimization
   - **Effort:** 2 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Faster subsequent loads
   - **Time:** 2 hours

5. **Real-time updates** - WebSocket or polling for live data
   - **Strategy:** Quality enhancement
   - **Effort:** 4 | **Value:** 2 | **Risk:** 3
   - **Rationale:** Multi-device sync
   - **Time:** 4 hours

6. **Offline support** - Show cached data when offline
   - **Strategy:** Reliability enhancement
   - **Effort:** 3 | **Value:** 2 | **Risk:** 3
   - **Rationale:** Works without connection
   - **Time:** 3 hours

---

## Feature 4: AI-Powered STAR Formatting

### Overview
Transform freeform experience descriptions into structured STAR format (Situation, Task, Action, Result) using OpenAI API.

### Steps Breakdown

#### Step 4.1: AI Format Trigger
**Purpose:** Provide UI to initiate AI formatting
**Quality Attributes:** Clarity, accessibility, discoverability

**Increments:**

1. ⭐ **"Format with AI" button** - Simple button on experience detail page
   - **Strategy:** Start with outputs
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Clear action trigger
   - **Time:** 30 minutes

2. **Button with loading state** - Show processing indicator
   - **Strategy:** UX enhancement
   - **Effort:** 1 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Feedback during API call
   - **Time:** 45 minutes

3. **Bulk format option** - Format multiple experiences at once
   - **Strategy:** Zero/One/Many
   - **Effort:** 2 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Batch processing
   - **Time:** 2 hours

4. **Auto-format on creation** - Optionally format during creation
   - **Strategy:** Workflow integration
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Immediate enhancement
   - **Time:** 1.5 hours

5. **Preview before applying** - Show formatted version for review
   - **Strategy:** User control
   - **Effort:** 2 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Quality control
   - **Time:** 2 hours

6. **Re-format option** - Try different AI outputs
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Iterative improvement
   - **Time:** 1.5 hours

#### Step 4.2: OpenAI API Integration
**Purpose:** Connect to OpenAI API and send formatting requests
**Quality Attributes:** Reliability, security, cost efficiency

**Increments:**

1. ⭐ **Basic API call with hardcoded prompt** - Send text, get formatted response
   - **Strategy:** Start with outputs
   - **Effort:** 2 | **Value:** 5 | **Risk:** 2
   - **Rationale:** Proves API integration works
   - **Time:** 1.5 hours

2. **Environment-based API key** - Load key from environment
   - **Strategy:** Security enhancement
   - **Effort:** 1 | **Value:** 5 | **Risk:** 1
   - **Rationale:** Secure credential handling
   - **Time:** 30 minutes

3. **Prompt template system** - Configurable prompt with variables
   - **Strategy:** Dummy to dynamic
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Flexible prompt engineering
   - **Time:** 1.5 hours

4. **Error handling and retries** - Retry on failure, handle rate limits
   - **Strategy:** Reliability enhancement
   - **Effort:** 2 | **Value:** 4 | **Risk:** 2
   - **Rationale:** Robust API calls
   - **Time:** 2 hours

5. **Token usage tracking** - Monitor API costs
   - **Strategy:** Operational enhancement
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Cost management
   - **Time:** 1.5 hours

6. **Response caching** - Cache results for identical inputs
   - **Strategy:** Cost optimization
   - **Effort:** 3 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Reduces API costs
   - **Time:** 2 hours

#### Step 4.3: STAR Format Parsing
**Purpose:** Extract and structure STAR components from AI response
**Quality Attributes:** Accuracy, error handling, flexibility

**Increments:**

1. ⭐ **Basic text splitting** - Split response by S/T/A/R headers
   - **Strategy:** Start with outputs
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Simple parsing that works
   - **Time:** 1 hour

2. **Regex-based parsing** - More robust pattern matching
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 4 | **Risk:** 2
   - **Rationale:** Handles variations
   - **Time:** 2 hours

3. **JSON response format** - Request structured JSON from API
   - **Strategy:** Dummy to dynamic
   - **Effort:** 2 | **Value:** 5 | **Risk:** 2
   - **Rationale:** Reliable parsing
   - **Time:** 1.5 hours

4. **Fallback parsing** - Try multiple parsing strategies
   - **Strategy:** Reliability enhancement
   - **Effort:** 3 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Handles edge cases
   - **Time:** 2.5 hours

5. **Validation of STAR components** - Ensure all sections present
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Data completeness
   - **Time:** 1.5 hours

6. **Manual correction interface** - Let users fix parsing errors
   - **Strategy:** User control
   - **Effort:** 3 | **Value:** 3 | **Risk:** 2
   - **Rationale:** Quality assurance
   - **Time:** 2.5 hours

#### Step 4.4: Formatted Data Storage
**Purpose:** Save STAR-formatted data to database
**Quality Attributes:** Data integrity, versioning, flexibility

**Increments:**

1. ⭐ **Store in single JSON field** - Add formatted_content JSONB column
   - **Strategy:** Zero/One/Many
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Quick schema addition
   - **Time:** 1 hour

2. **Separate columns for S/T/A/R** - Normalized schema
   - **Strategy:** Data modeling
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Better querying
   - **Time:** 1.5 hours

3. **Version tracking** - Keep original + formatted versions
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 4 | **Risk:** 2
   - **Rationale:** Allows comparison/rollback
   - **Time:** 2 hours

4. **Formatting metadata** - Store AI model, timestamp, token count
   - **Strategy:** Operational enhancement
   - **Effort:** 2 | **Value:** 2 | **Risk:** 1
   - **Rationale:** Audit trail
   - **Time:** 1 hour

5. **Multiple format versions** - Store multiple AI attempts
   - **Strategy:** Quality enhancement
   - **Effort:** 3 | **Value:** 2 | **Risk:** 2
   - **Rationale:** Choose best version
   - **Time:** 2.5 hours

6. **Format approval status** - Track user acceptance
   - **Strategy:** Workflow enhancement
   - **Effort:** 2 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Quality control
   - **Time:** 1.5 hours

#### Step 4.5: Formatted Output Display
**Purpose:** Show STAR-formatted experience to user
**Quality Attributes:** Clarity, professionalism, usability

**Increments:**

1. ⭐ **Simple section display** - Show S/T/A/R as labeled sections
   - **Strategy:** Start with outputs
   - **Effort:** 1 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Clear structured output
   - **Time:** 1 hour

2. **Styled formatting** - Professional typography and layout
   - **Strategy:** Quality enhancement
   - **Effort:** 2 | **Value:** 4 | **Risk:** 1
   - **Rationale:** Resume-ready appearance
   - **Time:** 2 hours

3. **Side-by-side comparison** - Show original vs formatted
   - **Strategy:** User feedback
   - **Effort:** 2 | **Value:** 4 | **Risk:** 1
   - **Rationale:** See transformation
   - **Time:** 1.5 hours

4. **Copy to clipboard** - Easy copying of formatted text
   - **Strategy:** Workflow enhancement
   - **Effort:** 1 | **Value:** 3 | **Risk:** 1
   - **Rationale:** Use in other tools
   - **Time:** 45 minutes

5. **Export options** - Download as PDF, DOCX, TXT
   - **Strategy:** Output enhancement
   - **Effort:** 3 | **Value:** 4 | **Risk:** 2
   - **Rationale:** Resume building
   - **Time:** 3 hours

6. **Editable formatted view** - Edit STAR sections inline
   - **Strategy:** User control
   - **Effort:** 3 | **Value:** 4 | **Risk:** 2
   - **Rationale:** Fine-tune AI output
   - **Time:** 2.5 hours

---

## Walking Skeleton

The **Walking Skeleton** represents the absolute minimum implementation that delivers end-to-end value: a user can sign in, create an experience, view it, and get AI formatting.

### Composition

The Walking Skeleton uses the simplest increment from each critical step:

| Step | Increment | Time | Dependencies |
|------|-----------|------|--------------|
| **1. OAuth Setup** | Manual Supabase project setup | 1h | None |
| **2. Authentication UI** | Basic "Sign in with LinkedIn" button + callback handling | 2h | Step 1 |
| **3. Session Management** | Basic session check on protected routes | 1h | Step 2 |
| **4. Experience Creation** | Single textarea + basic POST endpoint + simple table | 3h | Step 3 |
| **5. Experience List** | Simple list of company + role | 1h | Step 4 |
| **6. Experience Detail** | Basic detail page with all fields | 1h | Step 4 |
| **7. AI Formatting** | "Format with AI" button + basic API call + JSON storage + simple display | 4.5h | Step 4 |

### Total Estimate: ~13.5 hours (2 days)

### What This Delivers

**User Flow:**
1. User clicks "Sign in with LinkedIn"
2. Authenticates via OAuth
3. Lands on experience list (empty initially)
4. Clicks "Create Experience"
5. Enters text in textarea
6. Submits → saves to database
7. Redirected to list showing new experience
8. Clicks experience → sees detail page
9. Clicks "Format with AI" → AI transforms text to STAR
10. Sees formatted output with S/T/A/R sections

**Technical Proof:**
- OAuth integration works
- Database stores user data with isolation
- Frontend ↔ Backend ↔ Database flow complete
- OpenAI API integration functional
- All 4 features connected end-to-end

**Business Value:**
- Demonstrates core MVP concept
- Can be shown to users for feedback
- Deployable to production
- Validates technical architecture
- Proves AI formatting value proposition

### What's NOT Included

- Styled UI (basic HTML only)
- Form validation beyond required fields
- Error handling beyond basics
- Loading states
- Edit/delete functionality
- Pagination
- Export features
- Advanced AI prompt engineering
- Caching or optimization

These can be added incrementally based on user feedback.

---

## Selection Matrix

Complete catalog of all 102 increments across 4 features, scored and categorized.

### Legend

**Effort:** 1 (< 1h) | 2 (1-2h) | 3 (2-4h) | 4 (4-8h) | 5 (> 8h)
**Value:** 1 (Nice) | 2 (Useful) | 3 (Important) | 4 (Critical) | 5 (Essential)
**Risk:** 1 (Low) | 2 (Medium) | 3 (High)

**Type Indicators:**
- ⭐ **Walking Skeleton** - Simplest increment in step
- ⚡ **Quick Win** - High value, low effort (V≥4, E≤2)
- 🔥 **Critical Path** - Essential for MVP (V=5)
- ⚠️ **High Risk** - Requires careful implementation (R≥3)
- 💎 **Polish** - Quality enhancement (V≤2)
- 🔧 **Technical Debt** - Quick but needs improvement later
- 🚀 **Advanced** - Future enhancement (E≥4)
- 🔒 **Security** - Security-focused increment

### Feature 1: LinkedIn Authentication (24 increments)

| # | Step | Increment | E | V | R | Type | Dependencies |
|---|------|-----------|---|---|---|------|--------------|
| 1.1.1 | OAuth Initiation UI | Hardcoded sign-in button | 1 | 3 | 1 | ⭐ | None |
| 1.1.2 | OAuth Initiation UI | Environment-based URL | 1 | 3 | 1 | 🔧 | 1.1.1 |
| 1.1.3 | OAuth Initiation UI | Loading state | 2 | 2 | 1 | 💎 | 1.1.1 |
| 1.1.4 | OAuth Initiation UI | Error handling UI | 2 | 3 | 1 | - | 1.1.1 |
| 1.1.5 | OAuth Initiation UI | Styled auth page | 2 | 2 | 1 | 💎 | 1.1.1 |
| 1.1.6 | OAuth Initiation UI | Multi-provider auth | 3 | 3 | 2 | 🚀 | 1.1.1 |
| 1.2.1 | OAuth Config | Manual Supabase setup | 1 | 5 | 1 | ⭐🔥 | None |
| 1.2.2 | OAuth Config | Environment variables | 1 | 4 | 1 | ⚡🔒 | 1.2.1 |
| 1.2.3 | OAuth Config | Multi-environment configs | 2 | 3 | 1 | - | 1.2.2 |
| 1.2.4 | OAuth Config | Automated setup script | 3 | 2 | 2 | 💎 | 1.2.1 |
| 1.2.5 | OAuth Config | OAuth scope config | 2 | 3 | 1 | 🔒 | 1.2.1 |
| 1.3.1 | Callback Handling | Basic callback route | 1 | 4 | 1 | ⭐⚡ | 1.2.1 |
| 1.3.2 | Callback Handling | Token exchange | 2 | 5 | 2 | 🔥 | 1.3.1 |
| 1.3.3 | Callback Handling | Session persistence | 2 | 5 | 1 | 🔥⚡ | 1.3.2 |
| 1.3.4 | Callback Handling | Error handling | 2 | 4 | 1 | ⚡ | 1.3.2 |
| 1.3.5 | Callback Handling | Redirect to intended URL | 2 | 3 | 1 | 💎 | 1.3.3 |
| 1.3.6 | Callback Handling | Profile data extraction | 3 | 3 | 2 | - | 1.3.2 |
| 1.4.1 | Session Management | Basic session check | 1 | 5 | 1 | ⭐🔥⚡ | 1.3.3 |
| 1.4.2 | Session Management | Session refresh | 2 | 4 | 2 | ⚡ | 1.4.1 |
| 1.4.3 | Session Management | Logout functionality | 1 | 4 | 1 | ⚡ | 1.4.1 |
| 1.4.4 | Session Management | Session timeout | 2 | 3 | 1 | 🔒 | 1.4.1 |
| 1.4.5 | Session Management | Multi-device sessions | 3 | 2 | 2 | 🚀 | 1.4.1 |
| 1.4.6 | Session Management | Remember me | 2 | 3 | 1 | - | 1.4.1 |

### Feature 2: Experience Creation (28 increments)

| # | Step | Increment | E | V | R | Type | Dependencies |
|---|------|-----------|---|---|---|------|--------------|
| 2.1.1 | Input Form UI | Single textarea | 1 | 4 | 1 | ⭐⚡ | 1.4.1 |
| 2.1.2 | Input Form UI | Structured form | 2 | 4 | 1 | ⚡ | 2.1.1 |
| 2.1.3 | Input Form UI | Date pickers | 2 | 3 | 1 | - | 2.1.2 |
| 2.1.4 | Input Form UI | Form validation | 2 | 3 | 1 | - | 2.1.1 |
| 2.1.5 | Input Form UI | Character counter | 1 | 2 | 1 | 💎 | 2.1.1 |
| 2.1.6 | Input Form UI | Rich text editor | 3 | 3 | 2 | - | 2.1.1 |
| 2.1.7 | Input Form UI | Auto-save draft | 3 | 3 | 2 | - | 2.3.2 |
| 2.2.1 | Validation | Required fields | 1 | 4 | 1 | ⭐⚡ | None |
| 2.2.2 | Validation | Length validation | 1 | 3 | 1 | - | 2.2.1 |
| 2.2.3 | Validation | XSS sanitization | 2 | 4 | 2 | ⚡🔒 | None |
| 2.2.4 | Validation | Date validation | 1 | 3 | 1 | - | 2.1.3 |
| 2.2.5 | Validation | Format validation | 2 | 2 | 1 | 💎 | 2.2.1 |
| 2.2.6 | Validation | Duplicate detection | 3 | 2 | 2 | 💎 | 2.4.1 |
| 2.3.1 | API Endpoint | Basic POST endpoint | 1 | 4 | 1 | ⭐⚡ | None |
| 2.3.2 | API Endpoint | Authentication check | 1 | 5 | 1 | 🔥⚡🔒 | 1.4.1 |
| 2.3.3 | API Endpoint | Request validation | 2 | 4 | 1 | ⚡ | 2.3.1 |
| 2.3.4 | API Endpoint | Error responses | 2 | 3 | 1 | - | 2.3.1 |
| 2.3.5 | API Endpoint | Rate limiting | 2 | 3 | 2 | 🔒 | 2.3.2 |
| 2.3.6 | API Endpoint | Request logging | 1 | 2 | 1 | 💎 | 2.3.1 |
| 2.4.1 | Database | Basic table | 1 | 5 | 1 | ⭐🔥⚡ | 1.2.1 |
| 2.4.2 | Database | Complete schema | 2 | 4 | 1 | ⚡ | 2.4.1 |
| 2.4.3 | Database | Row-level security | 2 | 5 | 2 | 🔥🔒 | 2.4.1 |
| 2.4.4 | Database | Performance indexes | 1 | 3 | 1 | - | 2.4.1 |
| 2.4.5 | Database | Database constraints | 2 | 3 | 1 | - | 2.4.2 |
| 2.4.6 | Database | Soft deletes | 2 | 2 | 1 | 💎 | 2.4.2 |
| 2.5.1 | Success Feedback | Simple message | 1 | 3 | 1 | ⭐ | 2.3.1 |
| 2.5.2 | Success Feedback | Toast notification | 1 | 3 | 1 | 💎 | 2.5.1 |
| 2.5.3 | Success Feedback | Redirect to list | 1 | 4 | 1 | ⚡ | 3.1.1 |
| 2.5.4 | Success Feedback | Show created experience | 2 | 4 | 1 | ⚡ | 3.2.1 |
| 2.5.5 | Success Feedback | Action buttons | 2 | 3 | 1 | - | 2.5.3 |
| 2.5.6 | Success Feedback | Undo functionality | 3 | 2 | 2 | 💎 | 3.4.1 |

### Feature 3: Experience Management (26 increments)

| # | Step | Increment | E | V | R | Type | Dependencies |
|---|------|-----------|---|---|---|------|--------------|
| 3.1.1 | List UI | Simple list | 1 | 4 | 1 | ⭐⚡ | 2.4.1 |
| 3.1.2 | List UI | Card layout | 2 | 4 | 1 | ⚡ | 3.1.1 |
| 3.1.3 | List UI | Pagination | 2 | 3 | 1 | - | 3.1.1 |
| 3.1.4 | List UI | Sorting | 2 | 3 | 1 | - | 3.1.1 |
| 3.1.5 | List UI | Search/filter | 3 | 3 | 2 | - | 3.1.1 |
| 3.1.6 | List UI | Infinite scroll | 3 | 2 | 2 | 💎 | 3.1.1 |
| 3.2.1 | Detail View | Basic detail page | 1 | 4 | 1 | ⭐⚡ | 3.1.1 |
| 3.2.2 | Detail View | Formatted display | 2 | 3 | 1 | 💎 | 3.2.1 |
| 3.2.3 | Detail View | STAR structure display | 2 | 4 | 1 | ⚡ | 4.4.1 |
| 3.2.4 | Detail View | Action buttons | 1 | 4 | 1 | ⚡ | 3.2.1 |
| 3.2.5 | Detail View | Print/export view | 3 | 3 | 2 | - | 3.2.2 |
| 3.2.6 | Detail View | Version history | 4 | 2 | 3 | 🚀⚠️ | 3.3.2 |
| 3.3.1 | Editing | Edit form | 1 | 4 | 1 | ⭐⚡ | 2.1.1 |
| 3.3.2 | Editing | Save changes | 2 | 5 | 1 | 🔥⚡ | 3.3.1 |
| 3.3.3 | Editing | Cancel changes | 1 | 3 | 1 | - | 3.3.1 |
| 3.3.4 | Editing | Optimistic updates | 2 | 3 | 2 | - | 3.3.2 |
| 3.3.5 | Editing | Conflict detection | 3 | 2 | 2 | 💎 | 3.3.2 |
| 3.3.6 | Editing | Draft mode | 3 | 2 | 2 | 💎 | 3.3.2 |
| 3.4.1 | Deletion | Delete with confirm | 1 | 4 | 1 | ⭐⚡ | 3.2.1 |
| 3.4.2 | Deletion | Soft delete + undo | 2 | 4 | 2 | ⚡ | 3.4.1 |
| 3.4.3 | Deletion | Bulk delete | 3 | 3 | 2 | - | 3.4.1 |
| 3.4.4 | Deletion | Archive option | 2 | 3 | 1 | - | 3.4.1 |
| 3.4.5 | Deletion | Permanent delete | 2 | 2 | 2 | 💎 | 3.4.2 |
| 3.4.6 | Deletion | Recycle bin | 3 | 2 | 2 | 💎 | 3.4.2 |
| 3.5.1 | Data Fetching | Basic fetch | 1 | 5 | 1 | ⭐🔥⚡ | 2.4.1 |
| 3.5.2 | Data Fetching | Loading states | 1 | 3 | 1 | 💎 | 3.5.1 |
| 3.5.3 | Data Fetching | Error handling | 1 | 4 | 1 | ⚡ | 3.5.1 |
| 3.5.4 | Data Fetching | Client caching | 2 | 3 | 2 | - | 3.5.1 |
| 3.5.5 | Data Fetching | Real-time updates | 4 | 2 | 3 | 🚀⚠️ | 3.5.1 |
| 3.5.6 | Data Fetching | Offline support | 3 | 2 | 3 | 🚀⚠️ | 3.5.4 |

### Feature 4: AI-Powered STAR Formatting (24 increments)

| # | Step | Increment | E | V | R | Type | Dependencies |
|---|------|-----------|---|---|---|------|--------------|
| 4.1.1 | AI Trigger | Format button | 1 | 4 | 1 | ⭐⚡ | 3.2.1 |
| 4.1.2 | AI Trigger | Loading state | 1 | 3 | 1 | 💎 | 4.1.1 |
| 4.1.3 | AI Trigger | Bulk format | 2 | 3 | 2 | - | 4.1.1 |
| 4.1.4 | AI Trigger | Auto-format | 2 | 3 | 1 | - | 2.3.1 |
| 4.1.5 | AI Trigger | Preview before apply | 2 | 4 | 1 | ⚡ | 4.1.1 |
| 4.1.6 | AI Trigger | Re-format option | 2 | 3 | 2 | - | 4.1.1 |
| 4.2.1 | OpenAI API | Basic API call | 2 | 5 | 2 | ⭐🔥 | None |
| 4.2.2 | OpenAI API | Environment API key | 1 | 5 | 1 | 🔥⚡🔒 | 4.2.1 |
| 4.2.3 | OpenAI API | Prompt templates | 2 | 3 | 1 | - | 4.2.1 |
| 4.2.4 | OpenAI API | Error handling + retries | 2 | 4 | 2 | ⚡ | 4.2.1 |
| 4.2.5 | OpenAI API | Token tracking | 2 | 3 | 1 | - | 4.2.1 |
| 4.2.6 | OpenAI API | Response caching | 3 | 3 | 2 | - | 4.2.1 |
| 4.3.1 | STAR Parsing | Basic text splitting | 1 | 4 | 1 | ⭐⚡ | 4.2.1 |
| 4.3.2 | STAR Parsing | Regex parsing | 2 | 4 | 2 | ⚡ | 4.3.1 |
| 4.3.3 | STAR Parsing | JSON response | 2 | 5 | 2 | 🔥 | 4.2.3 |
| 4.3.4 | STAR Parsing | Fallback parsing | 3 | 3 | 2 | - | 4.3.2 |
| 4.3.5 | STAR Parsing | Component validation | 2 | 3 | 1 | - | 4.3.1 |
| 4.3.6 | STAR Parsing | Manual correction UI | 3 | 3 | 2 | - | 4.3.1 |
| 4.4.1 | Data Storage | JSON field storage | 1 | 4 | 1 | ⭐⚡ | 2.4.1 |
| 4.4.2 | Data Storage | Separate columns | 2 | 3 | 1 | - | 4.4.1 |
| 4.4.3 | Data Storage | Version tracking | 2 | 4 | 2 | ⚡ | 4.4.1 |
| 4.4.4 | Data Storage | Formatting metadata | 2 | 2 | 1 | 💎 | 4.4.1 |
| 4.4.5 | Data Storage | Multiple versions | 3 | 2 | 2 | 💎 | 4.4.3 |
| 4.4.6 | Data Storage | Approval status | 2 | 3 | 1 | - | 4.4.1 |
| 4.5.1 | Output Display | Section display | 1 | 4 | 1 | ⭐⚡ | 4.4.1 |
| 4.5.2 | Output Display | Styled formatting | 2 | 4 | 1 | ⚡ | 4.5.1 |
| 4.5.3 | Output Display | Side-by-side compare | 2 | 4 | 1 | ⚡ | 4.5.1 |
| 4.5.4 | Output Display | Copy to clipboard | 1 | 3 | 1 | - | 4.5.1 |
| 4.5.5 | Output Display | Export options | 3 | 4 | 2 | ⚡ | 4.5.2 |
| 4.5.6 | Output Display | Editable view | 3 | 4 | 2 | ⚡ | 4.5.1 |

---

## Summary & Recommendations

### Key Insights

1. **MVP is achievable quickly** - The Walking Skeleton can be built in 2 days (~13.5 hours), proving all core concepts work together.

2. **Feature interdependencies are clear** - Authentication must come first, then creation, then management, then AI features build on top.

3. **AI integration is the differentiator** - While auth and CRUD are table stakes, the AI-powered STAR formatting is what makes this product unique.

4. **Security is paramount** - With OAuth, user data, and API keys involved, security increments (RLS, authentication checks, XSS sanitization) are non-negotiable.

5. **UI polish can wait** - The Walking Skeleton uses basic HTML/forms. Visual design can be iterated based on user feedback.

### Recommended Starting Point

**Phase 1: Walking Skeleton (2 days)**
Build the 7 core increments to prove the concept end-to-end. This validates:
- LinkedIn OAuth works
- Database stores experiences with user isolation
- AI formatting delivers value
- Architecture is sound

**Phase 2: Essential Refinements (3-4 days)**
Add critical increments that make it production-ready:
- Row-level security (2.4.3)
- Environment-based API keys (1.2.2, 4.2.2)
- XSS sanitization (2.2.3)
- Session refresh (1.4.2)
- Error handling (1.3.4, 3.5.3, 4.2.4)
- Edit functionality (3.3.1, 3.3.2)
- JSON response format for AI (4.3.3)

**Phase 3: MVP Enhancement (1-2 weeks)**
Based on user feedback, add:
- Styled UI (card layout, formatted displays)
- Loading states and better UX
- Delete with undo
- Side-by-side comparison for AI output
- Export capabilities
- Form validation

### Integration Points to Watch

1. **OAuth → Database**: Ensure user_id from Supabase auth correctly links to experiences table
2. **Frontend → API → AI**: Handle long AI processing times (15-30 seconds)
3. **Formatted vs Raw**: Design schema to store both original and formatted versions
4. **Multi-step workflows**: Guide users through create → view → format → edit flow

### Success Metrics

After Walking Skeleton:
- Can sign in with LinkedIn? ✅
- Can create and save experience? ✅
- Can view saved experiences? ✅
- Can format with AI and see STAR output? ✅

After MVP:
- Average time from sign-up to first formatted experience? (Target: < 5 minutes)
- User satisfaction with AI formatting? (Target: > 80% accept without edits)
- Technical debt manageable? (All Quick Wins and Critical Path items complete)

### Next Steps

1. **Immediate**: Build Walking Skeleton (increments marked ⭐)
2. **Deploy early**: Get it in front of 5-10 beta users ASAP
3. **Gather feedback**: Which features matter most? What's confusing?
4. **Iterate**: Use Selection Matrix to prioritize next increments based on real usage data
5. **Scale gradually**: Add polish, performance, and advanced features only when needed

---

**Document End**

*Generated by Increments Slicer - Vertical Slicing Analysis Tool*
*Methodology: Hamburger Method + Radical Vertical Slicing*
*Total Analysis Time: ~45 minutes*