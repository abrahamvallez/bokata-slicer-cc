# Phase 2: Incremental Option Generation

Apply breakdown strategies to create multiple implementation options for each step. Each option represents a specific, independently deployable implementation variant. This enables you to choose the simplest path first and progressively enhance.

---

## INCREMENTAL OPTION PRINCIPLES

### Option Characteristics
- **Self-Contained:** Each option can be implemented and deployed independently.
- **Specific:** Describes EXACTLY what is being done (e.g., "Manual CSV Export" vs "Implement export").
- **Strategy-Driven:** Each step must declare which breakdown strategies were applied.
- **Naming Format:** `[Action] [Object]` (e.g., "Export to CSV", "Cache with Redis")

---

## BREAKDOWN STRATEGIES

Refer to [Strategies Toolkit](breakdown-strategies.md) for detailed descriptions and examples.

---

## WORKFLOW

**Important:** Think step-by-step before generating incremental options.

### Step 1: Identify All Steps

#### 🧠 Think:
- What User Tasks and Steps are in the provided input?
- What is the domain and technical context?
- What constraints or patterns are established?
- [List all steps that need options generated]

#### ▶️ Execute:
1. Locate `## Features Backbone` section in the provided input
2. For each User Task, find all `### Steps` sections
3. Extract for each step:
   - Step name and description
   - Layer assignment (UI/Logic/Data/Integration)
   - Technical context from descriptions
4. Create a complete list of all steps requiring incremental options

---

### Step 2: For Each Step - Analyze & Generate Options

#### 🧠 Think:
For each step:
- What makes this step "good"? (speed, accuracy, simplicity, security, reliability)
- What are the key tradeoffs? (complexity vs. power, speed vs. accuracy)
- What variations could exist? (formats, interfaces, data types, rules)
- Which breakdown strategies apply to this step?
- Can I use Zero/One/Many? (build for no items → one item → many items)
- Can I simplify workflows? (remove optional steps, reduce validations)
- Can I narrow data types? (single format → multiple formats)
- Can I start with dummy data? (hard-coded → API-driven)
- Can I split by capacity? (10 items → 1000 items → unlimited)
- What linguistic patterns indicate breakdown opportunities?
  - "and/or" → Zero-One-Many split
  - "manage" → CRUD separation
  - "before/after" → Workflow phases
- What's the SIMPLEST possible implementation?
- What's the next level up in complexity/capability?
- What's the most advanced/complete version?
- [List applicable strategies and potential options]

#### ▶️ Execute:

**2.1: Define Quality Attributes**

For each step, document quality factors:
1. Speed (fast execution)
2. Accuracy (correct results)
3. Simplicity (easy to implement)
4. Security (safe operations)
5. Reliability (consistent behavior)

**2.2: Determine Applicable Strategies**

1. Review the [breakdown strategies toolkit](breakdown-strategies.md)
2. Select 2-3 strategies that apply to this step
3. Consider strategy combinations (e.g., Zero/One/Many + Workflow Simplification)

Example: "Capture Search Input" step
- Zero/One/Many: No search → single query → multiple filters
- Workflow Simplification: Basic search → with advanced filters
- UI Fidelity: Input field → with suggestions → autocomplete
- Data Variation: Text → Text+voice → Natural language

**2.3: Generate Incremental Options**

For each step, create 3+ incremental options by:
1. Applying 2-3 different breakdown strategies
2. Creating incremental options for each strategy progressively
3. Combining options from different strategies where applicable
4. Ordering from simplest to most complex
5. Naming each option using `[Action] [Object]` format

Validate each step's options:
- Minimum 3 options per step (WARNING if exactly 3)
- All options specific (not generic)
- Dependencies explicit
- Progression clear (simple → advanced)
- Naming and formatting consistent

**Example: "Store Audio" step**
```
1.1: Save to Browser LocalStorage
  - Simplest, no backend needed
  - Applied Strategy: Dummy to Dynamic (local storage is simplest)

1.2: Save to Device FileSystem
  - More storage space available
  - Applied Strategy: Split by Capacity (more storage)

1.3: Upload to Cloud Storage
  - Requires backend/API
  - Applied Strategy: Dummy to Dynamic (dynamic cloud storage)

1.4: Multi-format Support
  - WAV, MP3, OGG options
  - Applied Strategy: Data Variation (multiple formats)

1.5: Compression Pipeline
  - Reduces file size
  - Applied Strategy: Extract Basic Utility (enhance with compression)
```

---

### Step 3: Generate Output

#### 🧠 Think:
- Do I have minimum 3 options per step? (WARNING if exactly 3)
- Are all options specific (not generic)?
- Are dependencies explicit?
- Is progression clear (simple → advanced)?
- Are naming and formatting consistent?
- [Self-check against quality criteria]

#### ▶️ Execute:
Generate markdown output via [Output Template](output-template-increments.md).

Formatting requirements:
1. Checkbox format: `[ ] **N.M: Name** - Description`
2. Applied Strategies section (2-3 strategies listed)
3. Rationale section (1-2 sentences explaining option set)
4. Options progress from simple → complex

---

## QUALITY CRITERIA

For completed Incremental Options sections:

✅ **Coverage - ALL User Tasks and Steps**
- [ ] ALL User Tasks from Features Backbone are processed
- [ ] EACH step in EACH User Task has Incremental Options
- [ ] NO steps left unprocessed

✅ **Incremental Option Definition - For Each Step**
- [ ] Minimum 3 incremental options per step (WARNING if exactly 3)
- [ ] Each has specific [Action] [Object] name
- [ ] Each is deployable independently
- [ ] Options are specific, not generic

✅ **Strategies - Diverse and Documented**
- [ ] Multiple strategies applied across options (not all same approach)
- [ ] Strategies reflect step quality attributes
- [ ] Progression from simple to complex (strategy diversity)
- [ ] Rationale explains overall approach

✅ **Implementation Tracking**
- [ ] Progress counter: `(0/N incremental options completed)`
- [ ] Checkbox format enables easy tracking: `[ ] **N.1: Name**`
- [ ] Users can check boxes as they implement

✅ **Documentation - Quality and Completeness**
- [ ] Descriptions are specific and clear
- [ ] No ambiguity in implementation
- [ ] Applied strategies documented
- [ ] Rationale provided for option set

---

## EXAMPLES

### Example 1: "Capture Audio Input" Step

```markdown
### Incremental Options (0/5)

[ ] **1.1: Browser Microphone (Web Audio API)** - Capture using browser's built-in Web Audio API with basic permissions prompt

[ ] **1.2: Native Mobile Audio** - Use platform-specific microphone APIs (AVFoundation for iOS, MediaRecorder for Android)

[ ] **1.3: Audio Processing Pipeline** - Add noise reduction and level monitoring with real-time visual feedback

[ ] **1.4: Multi-device Support** - Allow selection from multiple input devices (built-in mic, USB mic, Bluetooth headset)

[ ] **1.5: Background Recording** - Enable recording to continue when app is backgrounded or screen is off

**Applied Strategies:** Dummy to Dynamic (Web API → Native), Data Variation (single device → multiple devices), Extract Basic Utility (basic capture → enhanced with processing)
**Rationale:** Start with simplest browser API, progressively add native capabilities, device options, and background support for power users.
```

### Example 2: "Execute Search Query" Step

```markdown
### Incremental Options (0/6)

[ ] **2.1: Exact Text Match** - Search product names for exact substring match (case-insensitive)

[ ] **2.2: Fuzzy Text Search** - Add fuzzy matching to handle typos and similar words (Levenshtein distance)

[ ] **2.3: Filter by Single Attribute** - Allow filtering by one attribute (e.g., category OR price range)

[ ] **2.4: Multi-attribute Filters** - Support combining multiple filters with AND logic (category AND price range AND rating)

[ ] **2.5: Full-text Search with Ranking** - Implement full-text search with relevance scoring (tf-idf or similar)

[ ] **2.6: Natural Language Query** - Parse natural language queries ("cheap laptops under $500") into structured filters

**Applied Strategies:** Zero/One/Many (no filters → one filter → many filters), Business Rule Progression (exact → fuzzy → ranked), Data Variation (text only → attributes → natural language)
**Rationale:** Build from simplest exact match toward sophisticated natural language understanding, allowing progressive enhancement of search quality.
```

### Example 3: "Persist User Data" Step

```markdown
### Incremental Options (0/4)

[ ] **3.1: LocalStorage (Client-side)** - Store user data in browser localStorage (5MB limit, no backend required)

[ ] **3.2: SQLite (Local Database)** - Use SQLite for local structured storage with query capability

[ ] **3.3: REST API (Cloud Sync)** - Sync data to cloud via REST API (requires authentication)

[ ] **3.4: Real-time Database (Firebase/Supabase)** - Real-time bi-directional sync across devices

**Applied Strategies:** Dummy to Dynamic (local → cloud), Split by Capacity (5MB → unlimited), Walking Skeleton on Crutches (client-only → full cloud)
**Rationale:** Start with zero backend complexity (localStorage), progressively add server sync, then real-time capabilities as needed.
```

---

## COMMON ISSUES

**Issue: "Only came up with 2 options"**
→ Solution: Apply more strategies. Try:
- ❌ "Store data" with 2 options: "Database" and "File"
  WHY: Too high-level
  ✅ INSTEAD: Apply "Dummy to Dynamic" + "Split by Capacity"
    - "LocalStorage (5MB)" → "SQLite (unlimited local)" → "Cloud DB (unlimited + sync)" → "Real-time DB (sync + live)"

**Issue: "Options aren't really independent"**
→ Solution: Each option should be fully deployable on its own
- ❌ "Setup database" → "Add tables" → "Add queries"
  WHY: These depend on each other
  ✅ INSTEAD: "In-memory storage" → "SQLite storage" → "PostgreSQL with migrations"

**Issue: "Options sound too similar"**
→ Solution: Apply different strategies, not just technical variations
- ❌ "Save as WAV" → "Save as MP3" → "Save as OGG"
  WHY: Just format variations
  ✅ BETTER: Include workflow variations
    - "Save locally (no cloud)" → "Save + manual upload" → "Save with auto-sync" → "Save multi-format (WAV/MP3/OGG)"

**Issue: "Can't think of strategies that apply"**
→ Solution: Look for linguistic indicators in step description
- Words like "and", "or", "manage" → split actions
- Mentions of "validation", "confirmation" → workflow simplification
- Data types mentioned → data variation
- User types mentioned → user segment narrowing
- When in doubt, start with Zero/One/Many + Dummy to Dynamic

**Interactive Use:**
If you're stuck, ask me to list strategies for a specific step, and I'll suggest applications.

---

## OUTPUT CHECKLIST

Before finishing Phase 2, verify:

**Coverage:**
- [ ] ALL User Tasks from Features Backbone are processed
- [ ] ALL Steps have Incremental Options sections
- [ ] NO steps left unprocessed

**Options Quality:**
- [ ] Minimum 3 options per Step (WARNING if exactly 3)
- [ ] Checkbox format: `[ ] **N.M: Name** - Description`
- [ ] Applied Strategies section (2-3 strategies)
- [ ] Rationale section (1-2 sentences)
- [ ] Options progress from simple → complex
- [ ] All options specific and independently deployable
