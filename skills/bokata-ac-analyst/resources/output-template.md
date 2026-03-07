# Acceptance Criteria: {{ FEATURE_NAME }}
<!-- Feature ID: {PRJ}-FEAT-{hash} | Source: features.md -->

**Feature Purpose**: {{ FEATURE_PURPOSE }}

---

## Research Summary

**Preconditions:** [key preconditions that apply across tasks]
**Permission boundaries:** [who can / cannot interact with this feature]
**Key limits/formats:** [numeric bounds, format constraints]
**Side effects:** [notifications, events, state changes in other systems]

---

## User Task: {{ USER_TASK_NAME }}
<!-- Task ID: {PRJ}-TASK-{hash} | Source: features.md -->

### Rule: {{ RULE_SUMMARY }}
<!--
  Identify a specific constraint or business logic rule for this task.
  Example: "Registration requires a valid email format"
-->

```gherkin
Scenario: {{ SCENARIO_NAME }}
  Given {{ CONTEXT }}
  When {{ ACTION }}
  Then {{ EXPECTED_RESULT }}
```

### Rule: {{ RULE_SUMMARY_2 }}

```gherkin
Scenario: {{ SCENARIO_NAME_2 }}
  Given {{ CONTEXT }}
  When {{ ACTION }}
  Then {{ EXPECTED_RESULT }}
```

<!-- Negative permission scenario (from permission matrix research) -->
### Rule: {{ PERMISSION_RULE }}

```gherkin
Scenario: Unauthorized actor attempt
  Given [unauthorized actor in state X]
  When they attempt [action]
  Then the system denies the action
  And [appropriate error/feedback is shown]
```

---

## User Task: {{ USER_TASK_NAME_2 }}
<!-- Task ID: {PRJ}-TASK-{hash} | Source: features.md -->

### Rule: {{ RULE_SUMMARY }}

```gherkin
Scenario: {{ SCENARIO_NAME }}
  Given {{ CONTEXT }}
  When {{ ACTION }}
  Then {{ EXPECTED_RESULT }}
```
