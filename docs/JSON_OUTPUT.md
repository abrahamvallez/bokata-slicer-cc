# JSON Output System

## Overview

Bokata Slicer now supports **JSON as the primary output format**, enabling seamless integration with other tools, APIs, and automation workflows.

## Key Changes

### ✅ JSON by Default
- All analysis commands now output structured JSON by default
- Machine-readable format for programmatic consumption
- Follows strict JSON schemas for validation

### ✅ Markdown on Demand
- Use `--verbose` flag to also generate markdown documentation
- Markdown is generated from the JSON output
- Same detailed information in human-readable format

### ✅ Context Management
- JSON context flows between all agents
- Maintains state throughout the analysis pipeline
- Enables resumable and traceable workflows

## Output Formats

| Command | Default Output | With --verbose | With --markdown-only |
|---------|----------------|----------------|---------------------|
| `/bokata-feature` | JSON only | JSON + Markdown | Markdown only (legacy) |
| `/bokata` | JSON only | JSON + Markdown | Markdown only (legacy) |

## JSON Schema

All JSON outputs follow schemas defined in `/schemas/bokata-schemas.json`:

### Main Schema Types

1. **Feature** - Individual feature definition
2. **Step** - Step decomposition with quality attributes
3. **Increment** - Detailed increment specification
4. **WalkingSkeleton** - Minimum viable implementation path
5. **Context** - Workflow state management
6. **AnalysisOutput** - Complete analysis result

## File Locations

### JSON Output
```
./docs/slicing-analysis/{feature-name}-{date}.json
```

### Markdown Output (with --verbose)
```
./docs/slicing-analysis/{feature-name}-{date}.md
```

## Usage Examples

### Default: JSON Only

```bash
/bokata-feature "User authentication with email and password"
```

**Output:**
- `./docs/slicing-analysis/user-authentication-2025-11-16.json`

**View JSON:**
```bash
cat ./docs/slicing-analysis/user-authentication-2025-11-16.json | jq .
```

### With Markdown Documentation

```bash
/bokata-feature --verbose "User authentication with email and password"
```

**Output:**
- `./docs/slicing-analysis/user-authentication-2025-11-16.json`
- `./docs/slicing-analysis/user-authentication-2025-11-16.md`

### Legacy Mode: Markdown Only

```bash
/bokata-feature --markdown-only "User authentication with email and password"
```

**Output:**
- `./docs/slicing-analysis/user-authentication-2025-11-16.md`

## Working with JSON Output

### View Complete Analysis
```bash
cat analysis.json | jq .
```

### Extract Walking Skeleton
```bash
cat analysis.json | jq '.walkingSkeleton'
```

### List All Increments
```bash
cat analysis.json | jq '.increments'
```

### Get Specific Feature
```bash
cat analysis.json | jq '.features[] | select(.id == "F1")'
```

### Count Steps
```bash
cat analysis.json | jq '.steps | length'
```

### Get High-Value Features
```bash
cat analysis.json | jq '.features[] | select(.value == "High")'
```

### Export to CSV (increments)
```bash
cat analysis.json | jq -r '.increments[] | [.id, .name, .type, .estimatedEffort] | @csv'
```

## Integration Examples

### Python

```python
import json

# Load analysis
with open('./docs/slicing-analysis/user-auth-2025-11-16.json', 'r') as f:
    analysis = json.load(f)

# Access data
features = analysis['features']
increments = analysis['increments']
skeleton = analysis['walkingSkeleton']

# Use in your workflow
for increment in skeleton['selectedIncrements']:
    print(f"Implementing: {increment}")
```

### Node.js

```javascript
const fs = require('fs');

// Load analysis
const analysis = JSON.parse(
  fs.readFileSync('./docs/slicing-analysis/user-auth-2025-11-16.json', 'utf8')
);

// Access data
const { features, steps, increments, walkingSkeleton } = analysis;

// Generate custom report
console.log(`Total work: ${increments.length} increments`);
console.log(`MVP: ${walkingSkeleton.selectedIncrements.length} increments`);
```

### Bash/Shell

```bash
#!/bin/bash

# Read JSON
JSON_FILE="./docs/slicing-analysis/user-auth-2025-11-16.json"

# Extract skeleton increments
SKELETON=$(cat $JSON_FILE | jq -r '.walkingSkeleton.selectedIncrements[]')

# Create tasks
for INCREMENT_ID in $SKELETON; do
  echo "TODO: Implement $INCREMENT_ID"
done
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Run Bokata Analysis
  run: /bokata-feature "New feature"

- name: Extract Walking Skeleton
  id: skeleton
  run: |
    SKELETON=$(cat ./docs/slicing-analysis/*.json | jq -r '.walkingSkeleton.selectedIncrements | join(",")')
    echo "increments=$SKELETON" >> $GITHUB_OUTPUT

- name: Create Issues
  run: |
    for INCREMENT in $(echo ${{ steps.skeleton.outputs.increments }} | tr "," "\n"); do
      gh issue create --title "Implement $INCREMENT" --body "From Bokata analysis"
    done
```

## Schema Validation

Validate JSON output against schema:

```bash
# Using ajv-cli
npm install -g ajv-cli

ajv validate \
  -s ./schemas/bokata-schemas.json \
  -d ./docs/slicing-analysis/user-auth-2025-11-16.json \
  --spec=draft7
```

## JSON Structure Example

```json
{
  "version": "0.6.0",
  "projectName": "User Authentication",
  "timestamp": "2025-11-16T10:30:00Z",
  "summary": {
    "totalFeatures": 1,
    "totalSteps": 3,
    "totalIncrements": 18,
    "averageIncrementsPerStep": 6.0
  },
  "features": [
    {
      "id": "F1",
      "name": "User Authenticates",
      "description": "Users can log in with email and password",
      "value": "High",
      "complexity": "Medium",
      "dependencies": []
    }
  ],
  "steps": [
    {
      "id": "S1",
      "featureId": "F1",
      "name": "Capture Credentials",
      "description": "Collect email and password from user",
      "qualityAttributes": {
        "testability": "Unit tests for validation",
        "security": "Sanitize inputs, prevent injection",
        "performance": "< 100ms validation",
        "usability": "Clear error messages"
      },
      "incrementCount": 6
    }
  ],
  "increments": [
    {
      "id": "I1",
      "stepId": "S1",
      "featureId": "F1",
      "name": "Basic Login Form",
      "description": "Simple HTML form with email and password fields",
      "type": "Frontend",
      "changes": {
        "backend": [],
        "frontend": ["LoginForm.tsx", "LoginPage.tsx"],
        "database": [],
        "tests": ["LoginForm.test.tsx"]
      },
      "dependencies": {
        "requires": [],
        "provides": ["Login UI", "Form submission"],
        "compatibleWith": ["I7", "I13"]
      },
      "estimatedEffort": "2-3 hours"
    }
  ],
  "walkingSkeleton": {
    "name": "Basic Login Flow",
    "description": "Minimal email/password authentication",
    "selectedIncrements": ["I1", "I7", "I13"],
    "totalIncrements": 18,
    "coverage": {
      "features": ["F1"],
      "percentage": 16.7
    },
    "rationale": "Simplest path to working authentication",
    "estimatedDuration": "1 day"
  }
}
```

## Benefits of JSON Output

### For Developers
- ✅ Programmatic access to analysis data
- ✅ Easy integration with scripts and tools
- ✅ Version control friendly (diffable)
- ✅ Can be parsed and transformed

### For Teams
- ✅ Data-driven project management
- ✅ Automated task creation
- ✅ Progress tracking
- ✅ Custom reporting

### For Tools
- ✅ IDE integrations
- ✅ Project management tools (Jira, Linear, etc.)
- ✅ CI/CD pipelines
- ✅ Analytics and metrics

## Migrating from Markdown-Only

If you have existing workflows using markdown:

1. **Keep using markdown:** Add `--markdown-only` flag
2. **Transition period:** Use `--verbose` to get both formats
3. **Full migration:** Switch to JSON and build custom markdown generators if needed

## Context Management

The new context manager maintains state between agents:

```json
{
  "projectName": "User Auth",
  "timestamp": "2025-11-16T10:30:00Z",
  "phase": "complete",
  "data": {
    "projectDescription": "...",
    "domainContext": "...",
    "features": [...],
    "steps": [...],
    "increments": [...],
    "walkingSkeleton": {...}
  },
  "metadata": {
    "totalFeatures": 1,
    "totalSteps": 3,
    "totalIncrements": 18,
    "averageIncrementsPerStep": 6.0
  }
}
```

This enables:
- **Resumable workflows** - Pick up where you left off
- **Partial updates** - Regenerate only what changed
- **Traceability** - See how the analysis evolved
- **Validation** - Ensure data consistency

## Best Practices

### 1. Version Control
```bash
# Commit both formats for maximum flexibility
git add docs/slicing-analysis/*.json
git add docs/slicing-analysis/*.md
```

### 2. Automation
```bash
# Generate analysis in CI
/bokata-feature "$(cat feature-spec.md)"

# Use JSON in scripts
node scripts/create-tasks.js docs/slicing-analysis/*.json
```

### 3. Validation
```bash
# Always validate JSON after generation
jq . docs/slicing-analysis/*.json > /dev/null && echo "Valid JSON"
```

### 4. Documentation
```bash
# Generate markdown when sharing with team
/bokata-feature --verbose "Feature description"

# Share markdown, keep JSON for automation
```

## Future Enhancements

- JSON import for resumable analysis
- JSON diff for comparing analyses
- JSON merge for combining analyses
- GraphQL API for querying analysis data
- Web UI for visualizing JSON output

## Support

For questions or issues with JSON output:
- Check schema: `/schemas/bokata-schemas.json`
- Validate with `jq`: `cat file.json | jq .`
- Use `--verbose` for both formats during transition
- Report issues with examples of JSON output
