# FASE 1: Desacoplar el Quiz del Clip (Semanas 2-4)

**Objetivo**: Que cualquier usuario registrado pueda crear un quiz sin haber creado un clip antes.

## Opcion A: Quiz desde URL de YouTube (RECOMENDADA)

Flujo nuevo:

```
Coach pega URL de YouTube → Elige momento del video (timestamp) →
Escribe pregunta → Anade opciones de respuesta → Comparte
```

**Cambios necesarios**:

- Nuevo modelo `QuizStandalone` que acepta `videoUrl` + `timestamp` en lugar de `clipId`
- Nueva ruta: `/create-quiz` (sin clipId) con campo de URL de video
- Adaptar el player para mostrar video en timestamp sin necesitar clip guardado
- Mantener compatibilidad: el quiz sigue pudiendo crearse desde un clip existente
- Nuevo CTA en la home/dashboard: "Crea un quiz desde cualquier video"

**Criterio de exito**: un coach nuevo puede crear y compartir un quiz en menos de 3 minutos desde el registro.
