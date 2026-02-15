# User Story Mapping: Methodology & Principles

## The "Mile Wide, Inch Deep" Philosophy
- **Features (The Backbone):** High-level goals representing the broad scope of the project.
- **User Tasks:** Concrete, independent actions under each feature that deliver observable value.

## Feature & User Task Requirements
## Feature Naming: [Actor] [Action] [Result] [Object]
- **Format:** MUST follow **[Actor] [Action] [Result] [Object]**.
- **Actors:** Concrete roles (User, Coach, Admin).
- **Actions:** Specific verbs (Records, Searches, Pays).

## User Task Naming: [Action] [Result] [Object]
- **Format:** MUST follow **[Action] [Result] [Object]**.
- **NO ACTOR:** The actor is inherited from the Feature.
- **Examples:**
    - ✅ *Records Audio*, *Searches Products*
    - ❌ *Coach Records Audio* (Redundant actor), *Audio Recording* (No verb)

## Feature Identification Guidelines:

1. **Start with user goals, not features**
   - Instead of thinking "what features do we need?"
   - Think "what are users trying to accomplish?"

2. **Look for natural groupings**
   - Capabilities that work together toward a common goal
   - Sequential phases of user journey
   - Distinct domains of functionality

3. **Feature naming must include Actor+Action**
   - Ensure every feature name specifies who is doing what.

## Feature Identification Examples (Internal)

**E-commerce Platform:**
- Feature 1: "User Shops for Products Online"
- Feature 2: "User Manages Shopping Cart Items"
- Feature 3: "User Completes Purchase Order"
- Feature 4: "User Tracks Order Status"

**Task Management App:**
- Feature 1: "User Sets Up Project" (create project, configure settings)
- Feature 2: "User Manages Tasks" (add, assign, update, complete tasks)
- Feature 3: "Team Collaborates on Work" (comments, mentions, sharing)
- Feature 4: "User Tracks Progress" (dashboards, reports, filters)

**Audio Recording App:**
- Feature 1: "Coach Creates Audio Content"
- Feature 2: "Coach Organizes Library Content"
- Feature 3: "User Plays Audio Content"

**NOT Features (too narrow, these are User Tasks):**
- "User Creates Account" → This is a User Task under "User Manages Account"
- "User Browses Products" → This is a User Task under "User Shops Online"
- "System Validates Data" → This is a Step, not even a User Task
