# BREAKDOWN STRATEGIES TOOLKIT

## 1. Start with the Outputs
Instead of splitting work based on technical inputs or workflows, focus on **delivering specific outputs incrementally**. This makes it easier to create a sensible incremental plan and quickly deliver valuable data.
- Example: "Basic report" → "Interactive report" → "Dashboard with exports"

## 2. Workflow Simplification
- Remove optional steps
- Reduce validations
- Skip confirmations
- Example: "Direct purchase" → "Add to cart then purchase" → "Add to cart, review, then purchase with confirmation"

## 3. Zero/One/Many
- Build for zero → one → many cases
- Example: "No results handling" → "Single result display" → "Multiple results with pagination"

## 4. Business Rule Progression
- Implement simplest rule first
- Add constraints incrementally
- Example: "Fixed price" → "Tiered pricing" → "Dynamic pricing with rules engine"

## 5. Data Variation Reduction
- Start with one data type
- Single format first
- Example: "Text only" → "Text + Images" → "All media types (video, audio, documents)"

## 6. User Segment Narrowing
- Most specific user group first
- Example: "Beta users in London" → "All UK users" → "Global users with localization"

## 7. Use Case Isolation
- Most common scenario first
- Example: "Search by name" → "Search with filters" → "Advanced search with saved queries"

## 8. Walking Skeleton on Crutches
- Deliver minimal user-facing functionality, potentially using simpler back-end components or manual steps initially
- Build up full architecture iteratively
- Example: "Manual admin approval" → "Automated workflow with overrides" → "ML-powered auto-approval"

## 9. Narrow Customer Segment
- Deliver full functionality for smaller, specific group first
- Example: "Premium users only" → "All paid users" → "All users including free tier"

## 10. Split by Examples of Usefulness
- For large technical changes, list concrete examples of how change will be useful
- Identify examples that can be delivered with subset of full solution
- Example: "Export user list" → "Export with filters" → "Schedule exports" → "Real-time export streaming"

## 11. Split by Capacity
- Limit scope based on system capacity (file size, users, data volume)
- Deliver for lower capacity first
- Example: "10 items" → "1000 items" → "100,000 items" → "Unlimited with sharding"

## 12. Dummy to Dynamic
- For features requiring complex data integration, build interface with hard-coded dummy data first
- Follow up with dynamic data integration
- Example: "Fixed list" → "Editable list" → "API-driven list" → "Real-time synced list"

## 13. Simplify Outputs
- Reduce complexity of initial output formats
- Example: "Plain text" → "CSV" → "JSON API" → "PDF with charts" → "Interactive dashboard"

## 14. Split Learning from Earning
- Separate research/investigation (learning stories) from value delivery (earning stories)
- Example: "Research payment providers" (learning) → "Implement Stripe" (earning)

## 15. Extract Basic Utility
- Deliver bare minimum functionality for task completion
- Sacrifice usability initially, refine later
- Example: "Command line interface" → "Basic web form" → "Rich UI with validation"

## 16. SPIDR Pattern Analysis
- **Spikes**: Separate technical exploration
- **Paths**: Different user paths through story
- **Interfaces**: Different UI approaches
- **Data**: Different data types/sources
- **Rules**: Different business rules

## Linguistic Pattern Detection

### Coordinating Conjunctions (and, or, but, yet, nor...)
- If story says "X and Y," split into separate options
- Example: "Upload and download files" → "Upload files" + "Download files"

### Action-Related Connectors (manage, handle, support, process, maintain...)
- These hide multiple actions under generic verb
- Example: "Manage users" → "Create users" + "Edit users" + "Delete users"

### Sequence Connectors (before, after, then, while, during, when...)
- Indicates process with multiple phases
- Example: "Save before submit" → "Save work" + "Submit work"

### Scope Indicators (including, as-well-as, along with, also, additionally...)
- Introduce extra requirements that can be separated
- Example: "Notifications via email and SMS" → "Email notifications" + "SMS notifications"

### Option Indicators (either/or, whether, alternatively, optionally...)
- Multiple paths or features
- Example: "Login with password or Google" → "Password login" + "Google OAuth login"

### Exception Indicators (except, unless, however, although, despite...)
- Point to edge cases or special rules
- Example: "Delete account unless admin" → "User account deletion" + "Admin restrictions"
