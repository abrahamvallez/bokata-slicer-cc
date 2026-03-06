# Phase 1: Step Analysis

Decompose each User Task into technical, business, and logical steps using the Hamburger Method (UI → Logic → Data → Integration layers). Steps represent WHAT happens functionally, not HOW to implement it technically.

---

## DECOMPOSITION PRINCIPLES

- **Aim for 4+ steps** - 3 is acceptable if all relevant layers are covered and the task is genuinely simple. Don't force an artificial step — instead note why 3 is sufficient.
- **Functional, not technical** - Focus on WHAT happens, not implementation details.
- **Complete layers** - Cover UI → Logic → Data → Integration where applicable.
- **Quality over counts** - Better clear, meaningful steps than many vague ones.

---

## WORKFLOW

**Important:** Think step-by-step before decomposing User Tasks.

### Step 1: Identify User Tasks

Extract all User Tasks from the input:
1. Locate `## Features Backbone` section
2. Extract all User Tasks from `### Features Map` subsections
3. For each User Task, capture: name, description, and parent Feature context
4. Create a list of all User Tasks to process

---

### Step 2: For Each User Task - Decompose into Steps

#### 🧠 Think:
For the current User Task:
- What is the user trying to accomplish?
- Where does the user start? What input is needed? (UI layer likely)
- What processing/decisions happen? (Logic layer likely)
- What gets stored or retrieved? (Data layer likely)
- Are there external dependencies? (Integration layer likely)
- What is the first thing that must happen functionally?
- What comes next in the logical sequence?
- What are the distinct responsibilities? (one per step)
- Which technical layer does each step belong to?
- Are all steps functional (WHAT) not technical (HOW)?
- [Map out the natural flow and list potential steps]

#### ▶️ Execute:

**2.1: Understand User Task Definition**

Read from the provided input:
1. User Task name and description
2. Parent Feature context
3. Context analysis (domain, constraints)
4. User goals and business rules

**2.2: Identify Major Phases**

Map out the complete User Task execution flow by identifying:
1. **Phase 1:** User input phase (where users start, what input is needed)
2. **Phase 2:** Processing phase (what processing happens, what decisions are made)
3. **Phase 3:** Output phase (what is the output, what changes)
4. **Phase 4+:** Additional phases if needed

**Examples:**
```
"Coach Records Audio"
- Capture audio input (UI layer)
- Process/compress audio (Logic layer)
- Store audio file (Data layer)
- Sync with system (Integration)

"User Searches Products"
- Receive search input (UI)
- Execute search query (Logic)
- Rank/filter results (Logic)
- Display results (UI)
```

**2.3: Define Steps and Assign Layers**

For each phase, create a step by:
1. Defining one clear purpose per step
2. Assigning a functional layer: UI | Logic | Data | Integration
3. Ensuring coverage of relevant technical layers
4. Avoiding implementation details (no "create class", "write method")
5. For each step, look for a key technical decision in the research context (existing services, constraints, patterns) and add it as **Technical Note**. If no research context is available, omit the field.

#### Layer Assignment Guide:
- **UI:** User-facing interactions (forms, buttons, displays, inputs, feedback)
- **Logic:** Processing, calculations, decisions, transformations, validation
- **Data:** Persistence, retrieval, storage operations, queries
- **Integration:** External systems, APIs, synchronization, webhooks

#### Good Steps ✅
```
"Capture User Input" - Layer: UI - Functional goal
"Validate Email Format" - Layer: Logic - Functional goal
"Persist User Data" - Layer: Data - Functional goal
"Sync with Server" - Layer: Integration - Functional goal
"Calculate Order Total" - Layer: Logic - Functional goal
"Display Results" - Layer: UI - Functional goal
```

#### Bad Steps ❌
```
"Create EmailValidator class" - Implementation detail, not functional
"Write async function" - Implementation detail
"Implement caching" - Implementation detail
"Set up database connection" - Setup/infrastructure, not feature step
"Add error handling" - Cross-cutting concern, not a step
```

---

### Step 3: Generate Output

#### 🧠 Think:
- Do I have minimum 3 steps for this User Task? (WARNING if exactly 3)
- Do steps cover the complete task flow?
- Are all relevant layers represented? (UI → Logic → Data if applicable)
- Is each step distinct and clear?
- Does each step have ONE clear purpose?
- Are steps named functionally (Verb + Object)?
- Are there NO implementation details?
- Is the layer assignment correct for each step?
- [Verify completeness and self-check against quality criteria]

#### ▶️ Execute:
Generate markdown output via [Output Template](output-template-steps.md).

---

---

## EXAMPLES

### Example 1: "Records Audio Input" (User Task)

```markdown
## User Task: Records Audio Input

### Steps

#### Step 1: Capture Audio Signal
**Layer:** UI
**Description:** Coach presses record button and audio begins streaming from microphone to application.

#### Step 2: Process Audio Stream
**Layer:** Logic
**Description:** Audio signal is cleaned, normalized, and optionally compressed for quality and storage efficiency.

#### Step 3: Store Audio Locally
**Layer:** Data
**Description:** Processed audio file is saved to device storage for immediate playback and offline access.

#### Step 4: Sync with Backend
**Layer:** Integration
**Description:** Audio file is uploaded to server when network connection is available for backup and sharing.
```

### Example 2: "Searches for Products" (User Task)

```markdown
## User Task: Searches for Products

### Steps

#### Step 1: Capture Search Query
**Layer:** UI
**Description:** User enters search keywords in search bar and submits query.

#### Step 2: Execute Search Query
**Layer:** Logic
**Description:** Search algorithm processes query against product database using relevance scoring.

#### Step 3: Retrieve Matching Products
**Layer:** Data
**Description:** Database returns products matching search criteria with metadata (price, rating, availability).

#### Step 4: Rank and Filter Results
**Layer:** Logic
**Description:** Results are sorted by relevance, filtered by availability, and limited to top N matches.

#### Step 5: Display Search Results
**Layer:** UI
**Description:** Formatted product cards are displayed in grid layout with images, prices, and ratings.
```

---

## COMMON ISSUES

**Issue: "Only identified 2 steps"**
→ Solution: User Task might be simpler than expected, or needs further decomposition. Ask: What technical layers are involved? (UI → Logic → Data). Example:
- ❌ "Displays Profile" = 2 steps (Retrieve + Display)
  WHY: Too simple
  ✅ BETTER: "Retrieve user data" (Data), "Format profile view" (Logic), "Render profile page" (UI) = 3 steps

**Issue: "Steps sound like code (Create class, Write method)"**
→ Solution: Reframe as functional goals.
- ❌ "Create EmailValidator class"
  WHY: Implementation detail
  ✅ INSTEAD: "Validate Email Format" (functional goal)

- ❌ "Write async function for API call"
  WHY: Technical implementation
  ✅ INSTEAD: "Fetch Data from API" (functional goal)

**Issue: "Can't decide which layer a step belongs to"**
→ Solution: Ask "Who/what is primarily responsible?"
- User sees/interacts? → UI
- Calculating/deciding? → Logic
- Storing/retrieving? → Data
- External system call? → Integration

**Issue: "Steps seem too granular"**
→ Solution: Combine related micro-steps into one functional step.
- ❌ "Open form", "Enter data", "Click submit" (3 separate)
  WHY: Too granular
  ✅ INSTEAD: "Submit User Input" (1 step, UI layer)

---

## BEFORE SUBMITTING — verify your output for ALL User Tasks:

- [ ] ALL User Tasks from Features map have a Steps section (no gaps)
- [ ] Each step follows `[Action] [Object]` format — verb-focused (Capture, Validate, Store, Sync, Display...)
- [ ] Each step has `**Layer:**` (UI/Logic/Data/Integration) and `**Description:**` (1-2 sentences, functional)
- [ ] Each step has `**Technical Note:**` if research context was available (omit otherwise)
- [ ] Aim for 4+ steps per User Task — if staying at 3, note why it's sufficient
- [ ] Steps flow logically (1 → 2 → 3...), no redundant or overlapping steps
- [ ] All steps describe WHAT, not HOW — no code constructs (class, method, function, async, component...)
