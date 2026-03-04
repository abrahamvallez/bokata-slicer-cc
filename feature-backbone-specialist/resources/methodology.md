# User Story Mapping: Methodology & Principles

## The "Mile Wide, Inch Deep" Philosophy
- **Features (The Backbone):** High-level goals representing the broad scope of the project.
- **User Tasks:** Concrete, independent actions under each feature that deliver observable value.

## Feature & User Task Requirements

## Feature Naming: [Actor] [Verb] [Object]
- **Format:** MUST follow **[Actor] [Verb] [Object]**.
- **Actors:** Concrete roles (User, Coach, Admin).
- **Verbs:** Specific action verbs (Records, Searches, Pays, Manages).
- **Examples:** "Player Manages Competitive Profile", "Coach Creates Audio Content"

## User Task Naming: [Verb] [Object]
- **Format:** MUST follow **[Verb] [Object]**.
- **NO ACTOR:** The actor is inherited from the Feature.
- **Examples:**
    - ✅ *Records Audio*, *Search Products*, *Complete Onboarding Flow*
    - ❌ *Coach Records Audio* (Redundant actor), *Audio Recording* (No verb)

## Feature Identification Guidelines:

1. **Start with user goals, not features**
   - Instead of thinking "what features do we need?"
   - Think "what are users trying to accomplish?"

2. **Look for natural groupings**
   - Capabilities that work together toward a common goal
   - Sequential phases of user journey
   - Distinct domains of functionality

3. **Feature naming must include Actor+Verb**
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

---

## System Tasks

When you identify that the system performs its own work, apply this test:

**What triggers this system task?**

- **A workflow transition** (a system state changes without the user directly triggering it)
  → Standalone System Task within the feature where that transition occurs
  → If it groups several System Tasks alongside a User Task that initiates them, it may be its own Feature
  → Examples: session expires and system closes data; payment confirmed and system generates invoice;
    new user registered and system sends welcome email; document published and system notifies subscribers

- **A direct user action** within an existing User Task
  → Embedded in that User Task (as a note or as part of its rules/Gherkin)
  → Do NOT create a separate System Task
  → Examples: user clicks "calculate price" and system returns the total;
    user uploads a file and system validates it; user searches and system filters results

**Signals that it is a workflow transition:**
- No existing User Task triggers it directly
- It occurs between features, between system steps, or between application states
- The system acts autonomously without waiting for immediate user input

**Signals that it is part of a User Task:**
- The user action and the system response form an indivisible unit
- The user expects the system response as part of completing their task
- A Gherkin scenario or rule already captures the system behavior

**Format:** `System Task X.X: [Action] [Object]`
**Include:** the trigger that fires it, what it calculates/executes, expected output
