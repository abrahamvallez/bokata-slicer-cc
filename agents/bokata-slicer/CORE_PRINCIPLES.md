---
name: core-principles
description: Centralized principles and methodology for all Bokata agents
---

# Core Principles - Bokata Slicer

This document defines the core principles and methodology that apply to ALL agents, commands, and analysis in the Bokata system. Rather than repeating these principles in every agent file, all agents reference this single source of truth.

---

## The Fundamental Question

Every vertical slice must answer this question:

> **"What would we ship if the deadline was tomorrow?"**

### Terminology Clarification
- **Incremental Option**: A small, specific implementation unit within ONE step (one of several viable alternatives)
- **Vertical Slice**: A selection of incremental options (typically one per step) that forms a complete end-to-end feature
- **Walking Skeleton**: ONE specific vertical slice (the simplest one, using ⭐ incremental options)

The fundamental question applies to the **vertical slice** (the complete composition), not to individual incremental options. A vertical slice is what gets shipped.

### What This Ensures
- ✅ Vertical slices deliver real, observable user value
- ✅ Vertical slices are implementable quickly
- ✅ Vertical slices are independent and deployable
- ✅ Architecture is proven through deployment
- ✅ Feedback comes early, not late

---

## Slice Requirements

Every analyzed incremental option must satisfy these requirements:

### 1. Cut Through All Technical Layers
- ✅ UI/Presentation layer (what users see)
- ✅ Logic/Business layer (what happens)
- ✅ Data layer (what's stored/accessed)
- ✅ NOT: Just database schema, just UI mockups, just API specs

Each incremental option must be a thin, complete vertical slice touching all layers.

### 2. Deliver Observable Value to Users
- ✅ User can see/experience the result
- ✅ Feature has measurable impact
- ✅ NOT: Infrastructure only, setup only, preparation only

If users can't see or use it, it's not a complete incremental option.

### 3. Can Be Deployed Independently
- ✅ Feature works standalone
- ✅ Doesn't require other incremental options
- ✅ Previous incremental options are its "zero" state
- ✅ NOT: Depends on 5 other incremental options to work

Deployability proves architecture is sound.

### 4. Enable Early Feedback
- ✅ Users can test and respond
- ✅ Team can validate assumptions
- ✅ Risk is reduced early
- ✅ NOT: Locked up in waterfall phases

Early feedback beats late surprises.

### 5. Start With the Smallest That Works
- ✅ Absolute minimum to deliver value
- ✅ Simplest possible implementation
- ✅ Happy path first, edge cases later
- ✅ NOT: Full-featured from day one

"Good enough" beats "perfect never."

### 6. Explicit Dependencies
- ✅ Every incremental option declares what it REQUIRES
- ✅ Every incremental option declares what it PROVIDES
- ✅ Compatibility between incremental options is explicit
- ✅ NOT: Hidden dependencies, unclear constraints

Transparency prevents integration surprises.

---

## Feature Naming Convention

ALL features must follow the **Actor + Action** format. This convention is enforced across all analysis, ensuring consistency and clarity.

### Format
```
[Actor] [Action]
```

### Valid Actors
Concrete, specific actors only:
- **User** - Generic end user
- **Player** - Someone consuming/playing content
- **Coach** - Someone teaching/training
- **Admin** - Administrator managing system
- **System** - Automated processes
- **Customer** - Paying/purchasing user
- **Manager** - Team/project manager
- **Developer** - Developer user
- **Instructor** - Teacher/trainer
- **Analyst** - Data/business analyst

❌ NOT: "They", "stakeholders", "people", "someone", vague pronouns

### Action Verbs (Examples)
- Create, Read, Update, Delete (CRUD)
- Records, Plays, Watches, Listens
- Manages, Oversees, Tracks
- Uploads, Downloads, Exports, Imports
- Searches, Filters, Sorts
- Authenticates, Authorizes, Verifies
- Syncs, Integrates, Connects
- Sends, Receives, Notifies

### Examples: Good ✅
```
✅ Coach Records Audio
✅ User Searches Products
✅ System Syncs Audio-Video
✅ Admin Manages Users
✅ Player Plays Audio Files
✅ Customer Adds Items to Cart
✅ Instructor Creates Course
✅ System Processes Payment
```

### Examples: Bad ❌
```
❌ Audio Recording (missing actor)
❌ Product Search (missing actor, wrong format)
❌ User Management (too generic, not actor+action)
❌ Authentication System (too technical)
❌ Manage Everything (vague actor and action)
❌ Handle Cart Operations (vague, not actor+action)
```

### Why This Convention?
1. **Enforces user-centric thinking** - Every feature has a user/actor
2. **Immediate clarity** - Feature intent is obvious
3. **Prevents vagueness** - No hiding behind abstractions
4. **Consistent across analysis** - Every feature follows same pattern
5. **Enables better dependency tracking** - Clear who does what

---

## Step Decomposition Principles

When analyzing a feature, it's decomposed into **steps**. Steps represent the functional, business, or logical phases.

### Step Characteristics

#### 1. Distinct Responsibility
- Each step has ONE clear purpose
- Steps don't overlap in function
- Removing any step breaks the feature

#### 2. Clear Input and Output
- Step INPUT: What it needs to start
- Step OUTPUT: What it produces
- Sequence is obvious (Step 1 → Step 2 → Step 3)

#### 3. Layers and Phases (Functional, Not Technical)
- **UI layer:** What users see and interact with (functional perspective)
- **Logic layer:** What computations/decisions happen (functional perspective)
- **Data layer:** What's stored and accessed (functional perspective)
- **NOT:** Implementation details (classes, methods, databases, frameworks, code patterns)
- **Always:** Focus on the functional responsibility of each layer, never on technical implementation

#### 4. Quality Attributes
Each step must define its quality:
- **Quality factors:** What makes it "good"? (fast, accurate, simple, secure)
- **Tradeoffs:** Manual vs automated, speed vs accuracy, simple vs feature-rich
- **Implementation options:** Different technical approaches

#### 5. Supporting Incremental Implementation
Steps enable breaking down into 3-5 incremental options each.
NOT all-or-nothing phases.

### Example: "Coach Records Audio"

```
Step 1: Capture Audio Input
- What: Coach presses record, audio flows from microphone
- Quality: Real-time, low latency, clear audio
- Tradeoffs: Compressed vs uncompressed, local vs cloud
- Options: Browser API, native SDK, web streaming

Step 2: Store Audio
- What: Audio saved for later access
- Quality: Reliable, accessible, retrievable
- Tradeoffs: Local storage vs cloud, sync vs manual
- Options: File system, database, cloud storage, hybrid

Step 3: Synchronize with Video
- What: Audio syncs with corresponding video
- Quality: Precise timing, no drift, reliable
- Tradeoffs: Automatic vs manual sync, frame-accurate vs approximate
- Options: Embedded metadata, separate sync file, streaming protocol
```

NOT:
```
❌ Create AudioRecorder class
❌ Implement WebAudio API
❌ Write async/await for cloud upload
❌ Set up error handling
❌ Write tests
```

---

## Incremental Option Generation Principles

Incremental Options are specific implementations of a step, applying breakdown strategies.

### Incremental Option Characteristics

#### 1. Self-Contained Delivery
- Can be implemented in isolation
- Has complete value on its own
- Deployable independently
- Users can test immediately

#### 2. Specific Implementation
- NOT generic: "Implement audio recording"
- SPECIFIC: "Record audio using WebAudio API, save to localStorage"
- Names describe WHAT is being done
- Examples: "Manual CSV Export", "API-driven List", "Fixed Pricing Tier"

#### 3. Rationale and Strategy
- Every incremental option comes from a breakdown strategy
- Strategies include: Zero/One/Many, dummy-to-dynamic, capacity limits, workflow simplification, etc.
- Rationale explains WHY this incremental option exists

#### 4. Dependency Specification
Each incremental option explicitly states:

**REQUIRES** - What this incremental option depends on
```
REQUIRES: Backend endpoint POST /api/save
REQUIRES: User session authenticated
REQUIRES: Database table users exists
REQUIRES: None (if independent)
```

**PROVIDES** - What this incremental option offers to others
```
PROVIDES: Ability to save form data
PROVIDES: Persistent user state
PROVIDES: Notification when save completes
PROVIDES: Nothing (if no output)
```

**COMPATIBLE WITH** - Which other increments it works with
```
COMPATIBLE WITH: 2.1, 2.2 (from Step 2)
COMPATIBLE WITH: 3.1, 3.3 (from Step 3)
COMPATIBLE WITH: None (if incompatible with all others)
```

#### 5. Marked Simplicity
The simplest incremental option in each step is marked with ⭐:
```
⭐ Incremental Option 1.1: Manual CSV Export
  - REQUIRES: None
  - PROVIDES: CSV file download
  - COMPATIBLE WITH: All other storage options
```

Simplest ≠ Least useful. It means "most direct path to working functionality."

### Example Incremental Options for "Coach Records Audio" Step 1

**Applied Strategies:** Technology Options, Manual Before Automated, Workflow Simplification

```
Incremental Option 1.1: Browser Microphone Input ⭐
- Strategy: Technology Options (simplest, no external dependencies)
- Record using browser's Web Audio API
- Real-time playback preview
- REQUIRES: Browser with Microphone permission
- PROVIDES: Raw audio stream
- COMPATIBLE WITH: 2.1, 2.2

Incremental Option 1.2: Native Mobile Microphone
- Strategy: Technology Options (native SDK approach)
- Use native iOS/Android microphone
- Platform-specific optimization
- REQUIRES: Native app, platform SDKs
- PROVIDES: High-quality audio stream
- COMPATIBLE WITH: 2.3

Incremental Option 1.3: Audio Preprocessing
- Strategy: Workflow Simplification (enhanced quality)
- Apply noise reduction before recording
- Real-time filtering
- REQUIRES: Audio processing library
- PROVIDES: Cleaned audio stream
- COMPATIBLE WITH: 2.2, 2.3

Incremental Option 1.4: Volume Monitoring
- Strategy: Manual Before Automated (user feedback)
- Display real-time volume levels
- Peak detection, visual feedback
- REQUIRES: Web Audio API access
- PROVIDES: User feedback on recording levels
- COMPATIBLE WITH: All others
```

**Note:** This step demonstrates how 4 incremental options cover different technology choices (1.1, 1.2), quality enhancements (1.3), and user feedback (1.4)—all derived from specific breakdown strategies.

---

## Walking Skeleton Principles

Walking Skeleton = the minimum viable implementation of a feature/project.

### Characteristics

#### 1. Selects Simplest Incremental Options (⭐)
- One ⭐ incremental option from each step
- Creates complete, working feature
- Proves architecture end-to-end
- Minimum viable, not minimum feature

#### 2. Validates Compatibility
- All selected incremental options are compatible
- Dependencies are satisfied
- No missing prerequisites
- Deployment order is clear

#### 3. Demonstrates Full Stack
- Touches all layers: UI, Logic, Data
- Works end-to-end
- Real, observable value
- NOT: Just one layer working

#### 4. Enables Rapid Feedback
- Can be built in ~1-5 days for most features
- Users can test and respond
- Architecture is proven
- Risk is de-risked early

#### 5. Foundation for Growth
- Additional incremental options build on Walking Skeleton
- Quality improves iteratively
- Features expand systematically
- NOT: Requires complete rewrite

### Example: "Coach Records Audio" Walking Skeleton

```
Feature: Coach Records Audio

Selected Incremental Options:
1. Step 1 (Capture): Browser Microphone Input (1.1 ⭐)
   - Uses Web Audio API
   - Real-time capture

2. Step 2 (Store): localStorage (2.1 ⭐)
   - Simple, local storage
   - Works offline

3. Step 3 (Sync): Manual sync button (3.1 ⭐)
   - User clicks to sync
   - Simple, reliable

Walking Skeleton Delivery:
- Coach opens app, presses "Record"
- Audio captured via microphone
- Audio saved to browser storage
- Coach can play it back
- Coach clicks "Sync" when ready
- Audio stored to server

Time: 3-5 days
Risk: LOW (no external dependencies, offline-first)
```

---

## Quality Criteria

### For All Analysis

#### 1. Feature Level
- ✅ Features represent distinct user capabilities
- ✅ Not too broad (can be completed in reasonable time)
- ✅ Not too narrow (delivers real value)
- ✅ Expressed as Actor+Action format
- ✅ Clear user goal or business value

#### 2. Step Level
- ✅ 3-7 steps per feature (typical range)
- ✅ Covers all technical layers (UI → Logic → Data)
- ✅ Quality attributes clearly defined
- ✅ Steps are sequential and coherent
- ✅ Each step has clear input/output

#### 3. Incremental Option Level
- ✅ **Exactly 3-5 incremental options per step** (NOT more, NOT less)
  - 3-5 provides diversity without overwhelming complexity
  - Fewer than 3: Too abstract, doesn't show real alternatives
  - More than 5: Analysis paralysis, over-specification
- ✅ Each incremental option is deployable independently
- ✅ Simplest incremental option marked with ⭐
- ✅ **Each incremental option clearly states which breakdown strategy was applied**
- ✅ Dependencies explicitly stated (REQUIRES, PROVIDES, COMPATIBLE WITH)
- ✅ Clear rationale provided for each option
- ✅ NOT: Too large to build in one sprint

#### 4. Composition Level
- ✅ Walking Skeleton uses only ⭐ incremental options
- ✅ Delivers end-to-end functionality
- ✅ Can be deployed independently
- ✅ Multiple iteration options provided
- ✅ Compatibility validated

#### 5. Documentation Level
- ✅ Clear, specific language (no vagueness)
- ✅ Examples provided for complex concepts
- ✅ Dependencies transparent
- ✅ Rationale explained (not just "what" but "why")
- ✅ Actionable and implementable

---

## Common Anti-Patterns to Avoid

### 1. Implementation-Focused Thinking
```
❌ "Create UserService class"
❌ "Write authentication middleware"
❌ "Implement ORM queries"
✅ "Authenticate user credentials"
✅ "Persist user session"
✅ "Retrieve user from database"
```

### 2. Edge Cases First
```
❌ "Handle all possible file types"
❌ "Support every currency and tax rule"
❌ "Implement all error scenarios"
✅ "Handle happy path first"
✅ "Support USD only"
✅ "Log basic errors"
```

### 3. Vague Dependencies
```
❌ REQUIRES: "Backend ready"
❌ REQUIRES: "Database set up"
✅ REQUIRES: API endpoint POST /api/users
✅ REQUIRES: Database table 'users' with schema [fields]
```

### 4. Unclear Compatibility
```
❌ COMPATIBLE WITH: "Most other options"
❌ COMPATIBLE WITH: "TBD"
✅ COMPATIBLE WITH: 2.1, 2.2, 2.4 (NOT 2.3 because...)
```

### 5. Missing Deployment Proof
```
❌ Walking Skeleton with "infrastructure setup only"
❌ Walking Skeleton with "database schema only"
✅ Walking Skeleton users can actually use
✅ Walking Skeleton produces observable output
```

---

## Breakdown Strategies Reference

All incremental option generators apply strategies from this toolkit:

### Data Variation Strategies
- **Zero/One/Many** - Handle zero cases → one case → multiple cases
- **Start with Dummy** - Hardcoded data first, integrate dynamic later
- **Simplify Outputs** - Plain text → CSV → PDF → Dashboard
- **Narrow User Segment** - Specific group first → broader audience

### Process Strategies
- **Workflow Simplification** - Remove optional steps, skip confirmations
- **Manual Before Automated** - Manual process first → automate later
- **Extract Basic Utility** - Bare minimum functionality → add niceties
- **Split Learning from Earning** - Separate research tasks from delivery

### Business Rule Strategies
- **Business Rule Progression** - Simplest rule first → add constraints
- **Start with Outputs** - Deliver visible results first
- **Capacity-Based Splitting** - Limited capacity first → scale up

### Analysis Strategies
- **SPIDR Pattern** - Spikes, Paths, Interfaces, Data, Rules
- **Connectors** - Identify AND, OR, BEFORE, AFTER, etc. in requirements
- **Split by Examples** - Find smallest useful example of feature

---

## How to Reference These Principles

All agents should reference this document at the top of their role section:

```markdown
# CORE PRINCIPLES

See: `${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/CORE_PRINCIPLES.md`

This agent adheres to all core principles. Additional notes:
- [Any agent-specific additions or clarifications]
```

Then focus on agent-specific instructions, not repeating principles.

---

## Questions and Clarifications

If you encounter situations that aren't covered by these principles:
1. Ask what serves the user best
2. Default to: "What would we ship tomorrow?"
3. Choose simplest approach that delivers value
4. Document the decision and rationale

These principles evolve based on experience. When something doesn't work as intended, update the principles—don't work around them.

---

**Last Updated:** 2025-12-14
**Version:** 1.0
**Applies To:** All Bokata agents, commands, and analysis
