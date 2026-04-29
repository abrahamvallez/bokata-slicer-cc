# PRD: Social Proof Toast — Clip2Coach

**Estado:** Draft
**Fecha:** Abril 2026
**Autor:** Abraham Vallez

---

## Overview

Implementar un componente de tipo toast/banner de prueba social que muestre actividad reciente de la plataforma (nuevos registros y clips creados) a visitantes no autenticados en la landing page y la página de registro. El objetivo es reducir la fricción de onboarding y aumentar la tasa de conversión a registro.

---

## Problem Statement

Los visitantes que llegan a Clip2Coach no tienen contexto sobre si otros entrenadores están usando activamente la plataforma. Esta falta de prueba social genera incertidumbre y aumenta la tasa de abandono antes del registro.

### Datos actuales (PostHog, abril 2026)

| Métrica | Últimas 48h | Últimos 7 días |
|---|---|---|
| `register_button` (clics únicos) | ~21 | ~95 |
| `onboarding_started` | ~27 | ~125 |
| `draft_clip_created` | 150 | 345 |
| `clip_created` / `clip_saved` | 18 | 63 |
| `video_upload_completed` | 4 | 26 |
| Usuarios únicos en páginas de signup | — | ~116 |

Con ~116 usuarios/semana en signup y ~13 nuevos registros por día, el volumen es suficiente para mostrar actividad real pero bajo para A/B tests sofisticados (se requieren 3-4 semanas para detectar lifts >20-30%).

---

## Goals & Success Metrics

### Goal principal
Aumentar la tasa de conversión de visitante → registro en landing y signup page.

### Métricas de éxito

| Métrica | Baseline (actual) | Target | Plazo |
|---|---|---|---|
| CTR en botón de registro (landing) | A medir en Fase 1 | +20-30% lift | 4 semanas |
| Tasa de activación (primer clip <48h post-registro) | A medir en Fase 1 | +15% | 4 semanas |
| Toast dismissal rate | — | <40% | Fase 2 |

### Goal secundario
Validar que el componente no genera efecto negativo (efecto "spam") en usuarios que ya estaban a punto de registrarse.

---

## User Stories

**US-1 — Visitante en landing page**
Como entrenador que visita Clip2Coach por primera vez, quiero ver evidencia de que otros entrenadores están usando activamente la plataforma, para sentirme seguro de que vale la pena registrarme.

**US-2 — Visitante en página de registro**
Como entrenador que ya está considerando registrarse, quiero ver confirmación de actividad reciente en el momento en que estoy rellenando el formulario, para reducir mis dudas de último momento.

**US-3 — Usuario ya autenticado**
Como entrenador ya registrado, no quiero ver el toast de social proof porque ya soy usuario — ese mensaje no es relevante para mí.

**US-4 — Visitante que ya vio el toast en esta sesión**
Como visitante, no quiero ver el mismo toast repetido en la misma sesión, porque sería molesto y reduciría la credibilidad.

---

## Functional Requirements

### FR-1: Condiciones de visualización

El toast se muestra únicamente cuando:
- El usuario NO está autenticado (no tiene sesión activa)
- Es la primera vez que aparece en la sesión actual
- Los datos superan los thresholds mínimos (ver FR-3)
- La página actual es landing page o página de registro

### FR-2: Placement y timing

| Página | Timing de aparición | Posición |
|---|---|---|
| Landing page | 4 segundos después de carga, O al llegar al 40% de scroll (lo primero) | Bottom-left, fixed |
| Página de registro | Inmediatamente al cargar | Bottom-left, fixed |

### FR-3: Lógica de fallback y thresholds

```
IF register_button_48h >= 10 AND draft_clip_created_48h >= 50:
    mostrar con ventana "últimas 48h"
ELSE IF register_button_7d >= 20 AND draft_clip_created_7d >= 100:
    mostrar con ventana "esta semana"
ELSE:
    no mostrar el toast
```

**Rationale:** Un número bajo de actividad hace más daño que no mostrar nada — destruye credibilidad.

### FR-4: Copy del mensaje

**Variante A — landing, ventana 48h (ES):**
> "21 entrenadores se han registrado y ya hay 150 clips nuevos creados en las últimas 48h"

**Variante A — landing, ventana 48h (EN):**
> "21 coaches joined and 150 new clips were created in the last 48h"

**Variante B — signup, ventana 7 días (ES):**
> "Esta semana, 89 entrenadores han subido vídeos a sus deportistas. Únete a ellos."

**Variante B — signup, ventana 7 días (EN):**
> "This week, 89 coaches shared video feedback with their athletes. Join them."

Los números en el copy deben sustituirse con datos reales del endpoint (Fase 2). En Fase 1 usar valores hardcodeados representativos.

### FR-5: Comportamiento del componente

- **Duración visible:** 8 segundos, luego auto-dismiss
- **Pausa en hover:** sí — el timer se pausa si el usuario hace hover sobre el toast
- **Dismissible:** siempre, con botón × visible
- **Frecuencia:** una vez por sesión (guardar en sessionStorage que ya fue mostrado)
- **Usuarios autenticados:** nunca mostrar

### FR-6: Diseño y animaciones

- **Dimensiones:** 280-320px ancho, ~70px alto
- **Indicador de actividad:** punto verde pulsante (señal "en vivo")
- **Sin foto de perfil** de usuario real
- **Animación entrada:** slide-up desde abajo + fade-in, 300ms, ease-out
- **Animación salida:** fade-out, 200ms
- **Sin animaciones de shake o bounce** (parecen spam)

---

## Technical Requirements

### TR-1: Frontend

- Componente dismissible con gestión de estado en sessionStorage
- IntersectionObserver para detectar scroll al 40% en landing
- Timer con pause-on-hover
- Accesibilidad: `role="status"`, `aria-live="polite"`, botón × con `aria-label="Cerrar"`
- Compatible con i18n (ES/EN)

### TR-2: Backend (Fase 2)

**Endpoint:** `GET /api/social-proof`

**Response:**
```json
{
  "window": "48h" | "7d" | "none",
  "registrations": 21,
  "clips_created": 150,
  "cached_at": "2026-04-05T10:30:00Z"
}
```

**Cacheo:** Redis con TTL de 30 minutos. Recalcular en background, nunca bloquear la respuesta al usuario.

**Queries necesarias:**
```sql
-- Registros últimas 48h
SELECT COUNT(DISTINCT person_id) FROM events
WHERE event = 'register_button' AND timestamp >= NOW() - INTERVAL 48 HOUR

-- Clips creados últimas 48h
SELECT COUNT(*) FROM events
WHERE event = 'draft_clip_created' AND timestamp >= NOW() - INTERVAL 48 HOUR
```

**Alternativa sin infraestructura adicional:** Usar PostHog API con rolling window de 48h si no se quiere añadir Redis en Fase 1.

---

## Analytics & Tracking

### Eventos nuevos a implementar

**`social_proof_toast_viewed`**
```json
{
  "variant": "48h" | "7d",
  "registrations_count": 21,
  "clips_count": 150,
  "page": "landing" | "signup",
  "language": "es" | "en"
}
```

**`social_proof_toast_dismissed`**
```json
{
  "time_visible_seconds": 4.2,
  "page": "landing" | "signup",
  "dismissed_by": "button" | "auto"
}
```

### Eventos existentes como métricas de conversión
- `register_button` → mide CTR en landing
- `onboarding_started` → mide inicio de registro
- `draft_clip_created` → mide activación post-registro

### Funnel de medición
`social_proof_toast_viewed` → `register_button` → `onboarding_started` → `draft_clip_created`

---

## A/B Test

### Diseño del test (Fase 1)
**Hipótesis:** Mostrar el social proof toast aumenta la tasa de clics en el botón de registro en la landing page.

**Control:** Sin toast
**Variante:** Con toast (datos hardcodeados)
**Split:** 50/50
**Métrica primaria:** CTR en `register_button`
**Métrica secundaria:** Tasa de activación (`draft_clip_created` en <48h post-registro)

**Estimación de tiempo:** Con ~116 usuarios/semana en signup, para detectar un lift del 25% con 80% de potencia estadística se necesitan aproximadamente 3-4 semanas por variante.

**Nota:** No hacer tests de variantes de copy hasta tener mayor volumen de tráfico. El único test prioritario ahora es presencia vs. ausencia.

---

## Implementation Phases

### Fase 1 — MVP (Esta semana)
- Implementar el componente frontend con datos hardcodeados
- Activar en landing page y signup page
- Configurar feature flag para el A/B test (con/sin toast, 50/50)
- Implementar tracking de `social_proof_toast_viewed` y `social_proof_toast_dismissed`
- **No se necesita backend nuevo**

**Criterio de paso a Fase 2:** Si se detecta lift ≥10% en registro CTR con significancia estadística.

### Fase 2 — Datos reales (Semanas 3-4)
- Crear endpoint `GET /api/social-proof` con Redis cache (TTL 30 min)
- Implementar lógica de fallback automático (48h → 7d → no mostrar)
- Conectar componente frontend al endpoint
- Añadir i18n para ES/EN

---

## Open Questions

| Pregunta | Owner | Estado |
|---|---|---|
| ¿Dónde está el feature flag system actual en el stack? | Engineering | Abierto |
| ¿Se usa Redis ya en producción? | Engineering | Abierto |
| ¿El copy debe localizarse a otros idiomas además de ES/EN? | Abraham | Abierto |
| ¿Hay restricciones de GDPR sobre mostrar datos de actividad agregados? | Legal/Abraham | Abierto |
| ¿El threshold de 10 registros/48h es correcto dado el crecimiento esperado? | Abraham | Revisar en 30 días |
| ¿Mostrar el toast también en páginas de precios o solo landing/signup? | Abraham | Abierto |

---

## Apéndice: Flujo de decisión

```
Usuario carga página (landing o signup)
        │
        ▼
¿Está autenticado? ──── SÍ ──→ No mostrar. FIN.
        │
       NO
        │
        ▼
¿Ya vio el toast esta sesión? ──── SÍ ──→ No mostrar. FIN.
        │
       NO
        │
        ▼
Fetch /api/social-proof
        │
        ▼
¿window = "none"? ──── SÍ ──→ No mostrar. FIN.
        │
       NO
        │
        ▼
Esperar trigger (4s o scroll 40% en landing / inmediato en signup)
        │
        ▼
Mostrar toast con datos del endpoint
Registrar social_proof_toast_viewed
        │
        ▼
¿Auto-dismiss (8s) o usuario cierra (×)?
        │
        ▼
Registrar social_proof_toast_dismissed
Guardar en sessionStorage: "toast_shown = true"
```
