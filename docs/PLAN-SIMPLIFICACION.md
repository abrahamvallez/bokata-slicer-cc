# Plan de Simplificación: Bokata Commands & Agents

**Fecha:** 2025-12-14
**Objetivo:** Simplificar arquitectura reduciendo redundancia y mejorando coordinación mediante markdown compartido

---

## 📋 Resumen Ejecutivo

### Cambios Principales

1. **Comandos Unificados:** `/bokata` y `/bokata:feature` (subcomando)
2. **Markdown Dual:** `.working.md` (coordinación) + `.md` (output final)
3. **Nuevos Agentes:**
   - `orchestrator.md` - Coordinador universal
   - `project-explorer.md` - Investiga código y requisitos
4. **Especialistas Core:** Modificados para usar .working.md
5. **Reducción:** >60% redundancia (~800 líneas duplicadas eliminadas)

### Decisiones Clave

✅ Mantener `/bokata-iterations-paths` y `/bokata-matrix` sin cambios
✅ Mantener `path-composer-specialist` para Walking Skeleton
✅ Eliminar `project-analyzer`, `feature-analyzer`, `doc-generator` (reemplazados)
✅ Crear `CORE_PRINCIPLES.md` para centralizar documentación

---

## 🏗️ Arquitectura Propuesta

### Estructura de Comandos

```
commands/
├── bokata.md           # Comando principal (proyectos multi-feature)
└── bokata:feature.md   # Subcomando (feature única)
```

**Sintaxis:**
```bash
/bokata [descripción o archivo]         # Análisis de proyecto
/bokata:feature [descripción o archivo] # Análisis de feature única
```

### Estructura de Agentes

```
agents/bokata-slicer/
├── CORE_PRINCIPLES.md                 # NEW: Principios centralizados
├── orchestrator.md                    # NEW: Coordinador universal
├── project-explorer.md            # NEW: Investiga código y requisitos
├── feature-backbone-specialist.md     # MODIFICAR: I/O con .working.md
├── step-analyzer-specialist.md        # MODIFICAR: I/O con .working.md
├── increment-generator-specialist.md  # MODIFICAR: I/O con .working.md
├── path-composer-specialist.md        # MODIFICAR: I/O con .working.md
└── [ELIMINAR: project-analyzer.md, feature-analyzer.md, doc-generator.md]
```

### Sistema de Markdown Dual

**Durante análisis:**
```
docs/slicing-analysis/.working/{name}-{date}.working.md
```
- Archivo temporal de coordinación
- Agentes leen y escriben secciones
- Contiene contexto compartido
- Se elimina al terminar

**Output final:**
```
docs/slicing-analysis/{name}-{date}.md
```
- Documento final limpio
- Generado por orchestrator
- Formateado y listo para usar

---

## 🔄 Flujos de Trabajo

### Flujo 1: Análisis de Proyecto (`/bokata`)

```
/bokata [descripción]
    ↓
1. Comando crea:
   docs/slicing-analysis/.working/{project}-{date}.working.md

2. Orchestrator coordina:

   Phase 0: feature-backbone-specialist.md
      ├─ Lee: ## Context Analysis
      ├─ Identifica features (Actor+Action)
      └─ Escribe: ## Features Backbone

   Phase 1: project-explorer.md
   ├─ Lee código del proyecto (si existe)
   ├─ Analiza requisitos funcionales y técnicos
   └─ Escribe: ## Context Analysis

   Phase 2: FOR EACH feature
   │
   ├─ step-analyzer-specialist.md
   │  ├─ Lee: ## Features Backbone
   │  ├─ Descompone en steps
   │  └─ Escribe: ## Feature N: Steps
   │
   └─ increment-generator-specialist.md
      ├─ Lee: ## Feature N: Steps
      ├─ Genera increments con estrategias
      └─ Escribe: ## Feature N: Increments

   Phase 3: path-composer-specialist.md
   ├─ Lee: TODO de .working.md
   ├─ Selecciona Walking Skeleton
   └─ Escribe: ## Walking Skeleton

   Phase 4: Orchestrator genera output
   ├─ Lee: .working.md completo
   ├─ Formatea y limpia
   ├─ Escribe: {project}-{date}.md
   └─ Elimina: .working.md

Output: ./docs/slicing-analysis/{project}-{date}.md
```

### Flujo 2: Análisis de Feature (`/bokata:feature`)

```
/bokata:feature [descripción]
    ↓
1. Comando crea:
   docs/slicing-analysis/.working/{feature}-{date}.working.md

2. Orchestrator coordina:

   Phase 0: project-explorer.md
   └─ Escribe: ## Context Analysis

   Phase 1: step-analyzer-specialist.md (sin feature-backbone)
   └─ Escribe: ## Steps Analysis

   Phase 2: increment-generator-specialist.md
   └─ Escribe: ## Increments Analysis

   Phase 3: path-composer-specialist.md
   └─ Escribe: ## Walking Skeleton

   Phase 4: Orchestrator genera output
   └─ {feature}-{date}.md

Output: ./docs/slicing-analysis/{feature}-{date}.md
```

---

## 📝 Template del .working.md

```markdown
# Working Analysis: {name}
Date: {date}
Scope: {project|feature}

---

## Context Analysis
[Escrito por: project-explorer]

### Project Context
- Domain:
- Purpose:
- Target Users:

### Technical Analysis
- Existing Stack:
- Architecture Pattern:
- Dependencies:
- Constraints:

### Functional Requirements
- Core Capabilities:
- User Goals:
- Business Rules:

### Recommendations
- Suggested Approaches:
- Risk Areas:
- Quick Wins:

---

## Features Backbone
[Escrito por: feature-backbone-specialist]
[Solo si scope=project]

### Features List
1. **[Actor] [Action]** - description
2. **[Actor] [Action]** - description
...

### Feature Flow
[Narrative]

### Dependencies
[Relationships]

---

## Feature 1: [Name]

### Steps
[Escrito por: step-analyzer-specialist]

#### Step 1: [Name]
- Description:
- Quality Attributes:
  - Quality factors:
  - Tradeoffs:
  - Options:

### Increments
[Escrito por: increment-generator-specialist]

#### Step 1: [Name]

**Increment 1.1: [Name]** ⭐
- Description:
- REQUIRES:
- PROVIDES:
- COMPATIBLE WITH:

---

## Walking Skeleton
[Escrito por: path-composer-specialist]

### Selected Increments
- Feature 1, Step 1: Inc 1.1 - [Name]
- Feature 1, Step 2: Inc 2.1 - [Name]
...

### Rationale
[Why these increments]

### Dependencies Analysis
[Verification]

### Deployment Order
1. [First]
2. [Second]
...

---

## Metadata
- Created: {timestamp}
- Scope: {project|feature}
- Features Count: {N}
- Total Steps: {X}
- Total Increments: {Y}
- Walking Skeleton: {Z} increments
```

---

## 🆕 Nuevos Componentes

### 1. orchestrator.md

**Responsabilidades:**
- Detectar scope (proyecto vs feature)
- Coordinar secuencia de especialistas
- Gestionar .working.md (crear, leer, escribir)
- Generar documento final limpio
- Manejo de errores

**NO hace:**
- Análisis técnico → project-explorer
- Identificación de features → feature-backbone
- Decomposición → specialists
- Selección skeleton → path-composer

**Estructura:**
```markdown
---
name: orchestrator
description: Coordinates analysis workflow using shared markdown
model: sonnet
---

# YOUR ROLE
Universal coordinator for Bokata workflows.

# WORKFLOW

Phase 0: Setup
- Create .working/{name}-{date}.working.md
- Write initial structure

Phase 1: Investigation
- Invoke project-explorer
- Wait for ## Context Analysis

Phase 2: Feature Identification
- IF project → invoke feature-backbone-specialist
- IF feature → skip to step analysis

Phase 3: Decomposition
- FOR EACH feature:
  - Invoke step-analyzer-specialist
  - Invoke increment-generator-specialist

Phase 4: Walking Skeleton
- Invoke path-composer-specialist

Phase 5: Output Generation
- Read .working.md
- Format and clean
- Write final .md
- Delete .working.md

[Detalles completos...]
```

### 2. project-explorer.md

**Responsabilidades:**
- Leer código del proyecto (si existe)
- Identificar patrones arquitecturales
- Analizar stack técnico
- Extraer requisitos funcionales
- Identificar constraints
- Escribir contexto en .working.md

**Input:**
- Descripción del usuario
- Código del proyecto (opcional, vía Read/Grep/Glob)

**Output:**
```markdown
## Context Analysis

### Project Context
- Domain:
- Purpose:
- Target Users:

### Technical Analysis
- Existing Stack:
- Architecture Pattern:
- Dependencies:
- Constraints:

### Functional Requirements
- Core Capabilities:
- User Goals:
- Business Rules:

### Recommendations
- Suggested Approaches:
- Risk Areas:
- Quick Wins:
```

**Herramientas:**
- Read: Leer archivos
- Grep: Buscar patrones
- Glob: Encontrar archivos
- Bash: Ejecutar comandos (si necesario)

### 3. CORE_PRINCIPLES.md

Centraliza todos los principios compartidos:

```markdown
# Core Principles - Bokata Slicer

## The Fundamental Question
Every increment: "What would we ship if deadline was tomorrow?"

## Slice Requirements
- ✅ Cut through all layers (UI → Logic → Data)
- ✅ Deliver observable value
- ✅ Deployable independently
- ✅ Enable early feedback
- ✅ Start smallest that works
- ✅ Explicit dependencies

## Feature Naming: [Actor] [Action]
- ✅ "Coach Records Audio"
- ❌ "Audio Recording"

## Quality Criteria
[Consolidated criteria]

## Dependency System
- REQUIRES: What increment needs
- PROVIDES: What it offers
- COMPATIBLE WITH: What works together

[Detalles...]
```

**Referenciado por:** Todos los agentes en vez de repetir.

---

## 🔧 Modificaciones a Componentes Existentes

### Comandos

#### bokata.md
```markdown
---
description: Project analysis with vertical slicing
---

# BOKATA - Project Vertical Slicer

For MULTIPLE FEATURES.
For SINGLE FEATURE: /bokata:feature

# INPUT FORMATS
1. Text inline: /bokata [descripción]
2. File: /bokata ./docs/prd.md

# EXECUTION
1. Validate: multiple features
2. Create: .working/{name}.working.md
3. Load: orchestrator.md
4. Pass: input, scope="project"
5. Output: {name}-{date}.md

[Reducir redundancia, delegar a orchestrator]
```

#### bokata:feature.md (renombrar de bokata-feature.md)
```markdown
---
description: Single feature analysis
---

# BOKATA:FEATURE - Single Feature Slicer

For SINGLE FEATURE only.
For MULTIPLE FEATURES: /bokata

# INPUT FORMATS
1. Text inline
2. File

# EXECUTION
1. Validate: single feature
2. Create: .working/{name}.working.md
3. Load: orchestrator.md
4. Pass: input, scope="feature"
5. Output: {name}-{date}.md

[Reducir redundancia]
```

### Especialistas

Todos siguen mismo patrón:

```markdown
---
name: [specialist-name]
description: [brief]
model: sonnet
---

# YOUR ROLE
[Specific role]

# YOUR TASK
[Specific task]

# CORE PRINCIPLES
See: ${CLAUDE_PLUGIN_ROOT}/agents/bokata-slicer/CORE_PRINCIPLES.md

Additional for [name]:
- [Specific principle]

# INPUT
Read from .working.md:
- ## [Section Name]
- Extract: [what to extract]

# OUTPUT
Write to .working.md:
- ## [Section Name]
- Format: [template]

# WORKFLOW
[Specific steps]
```

**Cambios específicos:**

1. **feature-backbone-specialist.md**
   - Lee: `## Context Analysis`
   - Escribe: `## Features Backbone`

2. **step-analyzer-specialist.md**
   - Lee: `## Context Analysis`, `## Features Backbone`
   - Escribe: `## Feature N: Steps`

3. **increment-generator-specialist.md**
   - Lee: `## Feature N: Steps`
   - Escribe: `## Feature N: Increments`

4. **path-composer-specialist.md**
   - Lee: Todas las secciones de increments
   - Escribe: `## Walking Skeleton`

---

## 📊 Reducción de Redundancia

### Antes
- Principios repetidos en 8 archivos
- ~800 líneas duplicadas
- 2 coordinadores con 80% overlap
- Variables en memoria poco trazables

### Después
- CORE_PRINCIPLES.md centralizado
- ~150 líneas de principios (1 vez)
- 1 orchestrator universal
- .working.md transparente y auditable

**Ahorro estimado:** >60% redundancia

---

## 📁 Archivos a Modificar

### ✨ Crear (3 archivos)
1. ✅ `agents/bokata-slicer/CORE_PRINCIPLES.md` (~150 líneas)
2. ✅ `agents/bokata-slicer/orchestrator.md` (~300 líneas)
3. ✅ `agents/bokata-slicer/project-explorer.md` (~200 líneas)

### ✏️ Modificar (6 archivos)
1. ✏️ `commands/bokata.md` - Simplificar
2. ✏️ `commands/bokata-feature.md` → `commands/bokata:feature.md` - Renombrar + simplificar
3. ✏️ `agents/bokata-slicer/feature-backbone-specialist.md` - I/O con .working.md
4. ✏️ `agents/bokata-slicer/step-analyzer-specialist.md` - I/O con .working.md
5. ✏️ `agents/bokata-slicer/increment-generator-specialist.md` - I/O con .working.md
6. ✏️ `agents/bokata-slicer/path-composer-specialist.md` - I/O con .working.md

### ❌ Eliminar (3 archivos)
1. ❌ `agents/bokata-slicer/project-analyzer.md`
2. ❌ `agents/bokata-slicer/feature-analyzer.md`
3. ❌ `agents/bokata-slicer/doc-generator.md`

### ✋ No Tocar
- ✋ `commands/bokata-iterations-paths.md`
- ✋ `commands/bokata-matrix.md`
- ✋ `agents/bokata-slicer/iteration-planner.md`
- ✋ `agents/bokata-slicer/selection-matrix-specialist.md`

---

## 🎯 Orden de Implementación

### Fase 1: Setup Base (~3-4h)
1. Crear `CORE_PRINCIPLES.md`
2. Crear `orchestrator.md` (estructura básica)
3. Crear `project-explorer.md`
4. Definir template .working.md

### Fase 2: Modificar Comandos (~2h)
1. Simplificar `bokata.md`
2. Renombrar y simplificar `bokata:feature.md`
3. Actualizar referencias

### Fase 3: Modificar Especialistas (~4h)
1. `feature-backbone-specialist.md` → .working.md I/O
2. `step-analyzer-specialist.md` → .working.md I/O
3. `increment-generator-specialist.md` → .working.md I/O
4. `path-composer-specialist.md` → .working.md I/O

### Fase 4: Testing (~3-4h)
1. Test `/bokata` con proyecto ejemplo
2. Test `/bokata:feature` con feature ejemplo
3. Verificar .working.md
4. Verificar outputs finales
5. Ajustar formato

### Fase 5: Cleanup (~1h)
1. Eliminar archivos obsoletos
2. Actualizar `README.md`
3. Actualizar `CLAUDE.md`
4. Commit y documentar

**Total:** 13-15 horas

---

## ⚠️ Riesgos y Mitigaciones

### Riesgo 1: Complejidad orchestrator
**Mitigación:** Empezar simple, iterar. Primera versión solo coordina.

### Riesgo 2: Formato .working.md inconsistente
**Mitigación:** Template estricto, validación al inicio de cada fase.

### Riesgo 3: Debugging difícil
**Mitigación:** .working.md hace debug MÁS fácil (todo visible).

### Riesgo 4: Cambio grande, posible ruptura
**Mitigación:** Tests con ejemplos existentes. Branch separado.

### Riesgo 5: Usuarios confundidos
**Mitigación:** Docs claras, retrocompatibilidad temporal, mensajes de ayuda.

---

## ✅ Criterios de Éxito

### Funcionalidad
- ✅ `/bokata` genera mismo output
- ✅ `/bokata:feature` genera mismo output
- ✅ `.working.md` se crea/elimina correctamente
- ✅ `project-explorer` añade valor

### Calidad de Código
- ✅ Redundancia reducida >60%
- ✅ Principios centralizados
- ✅ Agentes más concisos (-40% líneas promedio)
- ✅ Coordinación clara

### Mantenibilidad
- ✅ Cambio en principio = 1 archivo
- ✅ Tests pasan
- ✅ Docs actualizadas
- ✅ Fácil agregar especialistas

### UX
- ✅ Comandos claros
- ✅ Outputs iguales o mejores
- ✅ Mejor contexto
- ✅ Errores claros

---

## 💡 Ventajas del Nuevo Diseño

### 1. Reducción de Redundancia
- **Antes:** 800 líneas duplicadas
- **Después:** CORE_PRINCIPLES.md centralizado
- **Ahorro:** >60%

### 2. Comunicación Simplificada
- **Antes:** Variables `{{features_backbone}}`
- **Después:** Markdown `.working.md`
- **Beneficio:** Transparente, debuggeable

### 3. Coordinación Centralizada
- **Antes:** 2 coordinadores (80% overlap)
- **Después:** 1 orchestrator
- **Ahorro:** ~300 líneas

### 4. Investigación de Código
- **Antes:** No existe
- **Después:** project-explorer
- **Beneficio:** Análisis contextualizado

### 5. Trazabilidad
- **Antes:** Resultados no visibles
- **Después:** .working.md auditable
- **Beneficio:** Debug fácil

### 6. Mantenibilidad
- **Antes:** Cambio → 8 archivos
- **Después:** Cambio → 1 archivo (CORE_PRINCIPLES)
- **Beneficio:** Single source of truth

---

## 📚 Notas Adicionales

### Compatibilidad
- `/bokata-iterations-paths` y `/bokata-matrix` leen `.md` final
- No necesitan cambios
- Formato de output compatible

### Estructura .working.md vs Final
- `.working.md`: Completo, con metadata
- `.md` final: Limpio, formateado
- Orchestrator transforma

### Extensibilidad Futura
- Agregar especialistas fácilmente
- Nuevos comandos reusan orchestrator
- Diferentes formatos output (JSON, YAML)
- Plugins e integraciones

### Strategy Testing
- Test unitario (agente aislado)
- Test integración (orchestrator + agente)
- Test end-to-end (comando completo)
- Test con ejemplos README

---

## 🚀 Siguientes Pasos

1. **Revisar este plan** - Validar enfoque y decisiones
2. **Aprobar cambios** - Confirmar scope y prioridades
3. **Implementar Fase 1** - Setup base (CORE_PRINCIPLES, orchestrator, investigator)
4. **Testing incremental** - Validar cada fase
5. **Deploy gradual** - Branch → Test → Merge

---

**Documento creado:** 2025-12-14
**Ubicación:** `/Users/abrahamvallez/Dev/claude-code-prompts/docs/PLAN-SIMPLIFICACION.md`
