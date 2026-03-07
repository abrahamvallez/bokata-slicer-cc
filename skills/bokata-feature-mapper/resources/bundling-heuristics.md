# Linguistic Heuristics for Detecting Bundled User Tasks

User Tasks in `[Verb][Object]` format can hide bundled work. Scan each task name for these patterns before finalizing the backbone.

---

## 1. Coordinating Conjunctions (y, o, and, or, but, yet, nor...)

**Why it signals bundling:** If a task says "X and Y," it's likely two tasks — one for X, one for Y. Each observable action delivers its own value independently.

- "Registrar y Verificar Cuenta" → "Registrar Cuenta" + "Verificar Email"
- "Upload and Download Files" → "Upload File" + "Download File"

---

## 2. Action-Related Connectors (gestionar, manejar, administrar, manage, handle, support, process, maintain, administer...)

**Why it signals bundling:** These generic verbs hide multiple concrete actions. "Gestionar" almost always means create + read + update + delete — each of which could be its own task. The exception is when the task is genuinely a goal-level grouping (e.g., "Player Manages Competitive Profile" as a Feature is fine; as a User Task it likely bundles too much).

- "Gestionar Perfil" → "Crear Perfil" + "Editar Perfil" + "Eliminar Cuenta"
- "Manage Notifications" → "Enable Notifications" + "Configure Notification Preferences"

**How to decide:** Ask — does the user experience this as one flow, or as multiple distinct moments? If distinct, split.

---

## 3. Sequence Connectors (antes de, después de, mientras, before, after, then, while, during, when...)

**Why it signals bundling:** Sequence words indicate a process with multiple phases. Each phase is a candidate for its own task because users experience them at different moments.

- "Guardar Partida Antes de Salir" → "Guardar Partida" + "Salir de la Partida"
- "Review Before Submit" → "Review Draft" + "Submit Form"

---

## 4. Scope Indicators (incluyendo, también, además, including, also, additionally, plus, along with, as well as...)

**Why it signals bundling:** These words introduce extra requirements that were added as afterthoughts. They're usually separable features, not parts of the same action.

- "Buscar Partidas incluyendo filtros avanzados" → "Buscar Partidas" + "Filtrar Resultados"
- "Send Notifications including email and SMS" → "Send Email Notification" + "Send SMS Notification"

---

## 5. Option Indicators (opcionalmente, ya sea, either/or, whether, alternatively, optionally...)

**Why it signals bundling:** Options mean multiple paths through the system. Each path usually deserves its own task because it has different rules, preconditions, and behavior.

- "Iniciar Sesión con contraseña o con Google" → "Iniciar Sesión con Contraseña" + "Iniciar Sesión con Google"
- "Pay with card or bank transfer" → "Pay with Card" + "Pay with Bank Transfer"

---

## 6. Exception Indicators (excepto, a menos que, sin embargo, except, unless, however, although, despite...)

**Why it signals bundling:** Exceptions point to edge cases or special rules that apply to a subset of users or conditions. These are usually distinct enough in business logic to warrant a separate task.

- "Eliminar Cuenta a menos que sea Admin" → "Eliminar Cuenta de Usuario" + "Restricciones de Cuenta Admin"
- "Cancel Order unless shipped" → "Cancel Pending Order" + "Request Return for Shipped Order"

---

## When NOT to split

Not every instance of these words signals bundling:

- **Feature level** (Activities): "Player Manages Competitive Profile" as a **Feature** is fine — it's a goal-level grouping. The same words at **User Task** level are the problem.
- **Naturally atomic actions**: "Search and Display Results" in context could be one task if search + display is a single user-facing interaction with no separate value delivery.
- **Gherkin scenarios** within a task often use sequence words — that's not bundling, that's describing the flow.

Use judgment: the test is whether each part can deliver **independent observable value** to the user.
