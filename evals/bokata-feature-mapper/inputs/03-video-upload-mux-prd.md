# PRD: Video Upload with Mux Integration

**Status:** Draft
**Created:** 2025-12-28
**Owner:** Product Team
**Version:** 1.0

---

## 1. Executive Summary

### Overview
Permitir a los usuarios de Clip2Coach subir sus propios videos directamente a la plataforma utilizando Mux como infraestructura de storage y streaming, en lugar de depender únicamente de URLs externas (YouTube, Vimeo, Twitch).

### Business Goals
- **Independencia de plataformas externas:** Reducir dependencia de YouTube/Vimeo para contenido privado
- **Monetización:** Nuevo modelo de ingresos basado en créditos para almacenamiento de videos
- **Retención:** Mayor valor percibido al permitir contenido completamente privado
- **Diferenciación:** Competir con plataformas como Hudl que permiten uploads propios

### Success Metrics
- Número de videos subidos por mes
- Tasa de conversión: usuarios que suben videos vs. usuarios totales
- Ingresos por compra de créditos para videos
- Tasa de renovación/extensión de videos antes de expiración
- Tiempo promedio de retención de videos

---

## 2. User Problem & Solution

### Problem Statement
Los entrenadores deportivos que usan Clip2Coach actualmente deben subir sus videos privados a YouTube/Vimeo primero, lo que genera:
- Pasos adicionales en el flujo de trabajo
- Preocupaciones de privacidad (videos públicos o no listados)
- Limitaciones de almacenamiento en plataformas externas
- Dependencia de políticas de terceros

### Proposed Solution
Implementar sistema de upload directo integrado con Mux que permita:
- Subir videos directamente desde Clip2Coach
- Almacenamiento seguro y privado en Mux
- Streaming optimizado con la infraestructura de Mux
- Sistema de créditos flexible con 3 planes de pricing
- Gestión completa del ciclo de vida de los videos

---

## 3. User Stories & Personas

### Primary Persona: Coach Carlos
**Perfil:** Entrenador de fútbol, 35 años, graba entrenamientos con cámara/móvil

**User Stories:**
1. Como Coach Carlos, quiero subir videos de entrenamientos directamente desde mi ordenador para no tener que subirlos primero a YouTube
2. Como Coach Carlos, quiero ver cuántos días me quedan antes de que un video expire para decidir si renovarlo
3. Como Coach Carlos, quiero crear múltiples clips de un video 
4. quiero gestionar todos mis videos subidos en un solo lugar
5. quiero recibir notificaciones antes de que los videos importantes expiren

---

## 4. Functional Requirements

### 4.1 Video Upload

#### FR-1.1: Iniciación de Upload
- **Ubicaciones de acceso:**
  - Botón "Subir Video" en página de análisis existente
  - Nueva sección "Mis Videos" en navegación principal
  - Modal accesible desde múltiples ubicaciones en la app

#### FR-1.2: Validación Pre-Upload
- Verificar créditos suficientes antes de permitir upload
- Si no hay créditos suficientes: bloquear subida y mostrar mensaje con CTA a compra de créditos
- Validar tamaño de archivo ≤ 5GB
- Aceptar todos los formatos soportados por Mux (MP4, MOV, AVI, MKV, WebM, etc.)

#### FR-1.3: Información Requerida
- **Obligatorio:**
  - Título del video
  - Selección de plan de pricing (20, 30, o 60 créditos)
- **Opcional:**
  - Descripción
  - Tags/categorías (para búsqueda futura)

#### FR-1.4: Proceso de Upload
- Barra de progreso visual durante la subida
- Estimación de tiempo restante
- Opción de cancelar upload en progreso
- Upload directo a Mux usando Direct Uploads API
- Proceso en background: usuario puede continuar navegando

#### FR-1.5: Post-Upload
- Notificación de éxito con link al video
- Descuento automático de créditos según plan elegido
- Inicio automático de procesamiento/transcoding en Mux
- Estado visible: "Procesando..." → "Listo"

### 4.2 Pricing Plans & Credits System

#### FR-2.1: Planes de Pricing
| Plan | Créditos | Duración | Creación de Clips | Uso Ideal |
|------|----------|----------|-------------------|-----------|
| **Basic** | 20 | 1 mes | Ilimitados gratis | Videos de uso temporal, análisis rápido |
| **Standard** | 30 | 1 año | 1 crédito por clip | Videos de archivo con uso moderado de clips |
| **Premium** | 60 | 1 año | Ilimitados gratis | Videos de referencia con muchos clips |

#### FR-2.2: Sistema de Créditos Global
- Créditos compartidos entre todos los videos y features del usuario
- Compra de paquetes de créditos mediante Stripe (integración existente)
- Balance de créditos visible en todo momento en UI
- Historial de transacciones de créditos (compras, gastos)

#### FR-2.3: Cobro de Clips en Plan Standard
- En plan de 30 créditos: cobro de 1 crédito al guardar clip desde draft
- Seguir flujo actual: crear clip → editar/previsualizar → guardar (descuento de crédito)

### 4.3 Video Management ("Mis Videos")

#### FR-3.1: Listado de Videos
**Visualización:**
- Grid/lista de videos con thumbnails generados por Mux
- Información por video:
  - Thumbnail/preview
  - Título
  - Duración
  - Tamaño de archivo
  - Fecha de subida
  - Fecha de expiración (días restantes)
  - Estado: Activo/Procesando/Expirado
  - Plan seleccionado (Basic/Standard/Premium)
  - Indicador de tarifa plana de clips (✓ o ✗)
  - Número de clips creados desde este video

**Funcionalidades:**
- Ordenar por: fecha, duración, expiración, nombre
- Filtrar por: estado, plan, expiración próxima
- Búsqueda por título/tags
- Paginación (20 videos por página)

#### FR-3.2: Edición de Videos
- Editar título después de subir
- Editar descripción y tags
- **NO permitido:** cambiar plan después de subir
- **NO permitido:** descargar video original

#### FR-3.3: Eliminación de Videos
- Usuario puede eliminar video manualmente antes de expiración
- Confirmación requerida (modal: "¿Estás seguro?")
- **Importante:** Créditos NO se recuperan al eliminar
- Advertencia si hay clips activos creados desde ese video
- Clips creados se mantienen después de eliminación, pero no seran activos (ver FR-4.2)

#### FR-3.4: Sin Límites de Videos Simultáneos
- Usuario puede tener tantos videos como créditos permitan
- No hay límite de almacenamiento total
- Solo limitado por créditos disponibles

### 4.4 Expiración y Renovación

#### FR-4.1: Proceso de Expiración
**Al alcanzar fecha de expiración:**
1. Video se marca como "Expirado" en base de datos
2. Video se elimina de Mux storage (libera espacio)
3. Registro en BD cambia estado a `expired: true`
4. Mantener metadata: título, fecha upload, créditos usados, etc.
5. Clips creados desde ese video **se mantienen pero inactivos** (ver FR-4.2)

**Notificaciones:**
- Email 30 días antes de expiración
- Email 7 días antes de expiración

#### FR-4.2: Clips de Videos Expirados
**Comportamiento:**
- Clips creados desde video expirado **continúan pero inactivos**
- Indicador visual en clip: "Video original expirado"

#### FR-4.3: Renovación/Extensión
**Opción 1: Antes de Expiración**
- Botón "Renovar" en listado y detalle de video
- Modal de selección:
  - Extender 1 mes más: 10 créditos
  - Extender 1 año más: 20 créditos
- Se extiende fecha de expiración desde fecha actual

### 4.5 Creación de Clips desde Videos Propios

#### FR-5.1: Interfaz Unificada
**Flujo de creación de clips:**
1. Usuario accede a crear nuevo clip
2. Selección de fuente (nuevo):
   - "Video propio" / "URL externa (YouTube, Vimeo, Twitch)"
3. Si "Video propio": Dropdown con lista de videos activos del usuario
4. Si "URL externa": Input para pegar URL (flujo actual)
5. Continuar con flujo de creación de clip existente

#### FR-5.2: Cobro de Créditos por Clip
**Solo para Plan Standard (30 créditos):**
- Como flujo actual

**Para Plan Basic y Premium:**
- Sin cobro adicional por clips
- Clips ilimitados

#### FR-5.3: Validaciones
- Validar que video seleccionado no esté expirado
- Si video está "Procesando": mostrar mensaje "El video aún está procesando, intenta en unos minutos"
- Reutilizar toda la lógica de análisis existente (telestrator, drawings, etc.)

### 4.6 Integración con Mux

#### FR-6.1: Mux Direct Uploads
- Usar Mux Direct Uploads API para uploads desde cliente
- Generar signed upload URL desde backend
- Cliente sube directamente a Mux (no pasa por nuestros servidores)

#### FR-6.2: Mux Video Processing
- Transcoding automático a múltiples calidades (SD, HD, adaptativo)
- Generación de thumbnails automática
- HLS/DASH para streaming adaptativo
- Webhook de Mux para notificar cuando procesamiento completa

#### FR-6.3: Mux Playback
- Generar signed playback URLs para seguridad
- Reutilizar componente de video player existente
- Soporte para todas las features actuales: frame-by-frame, telestrator, etc.

#### FR-6.4: Mux Data (Analytics)
- Opcional: integrar Mux Data para analytics de reproducción
- Métricas: views, tiempo de visualización, calidad de reproducción
- Mostrar en detalle de video (fase 2)

---

## 5. Non-Functional Requirements

### NFR-1: Performance
- Upload de video 5GB: completarse en tiempo razonable (≤ 30 min con conexión promedio)
- Procesamiento de video: ≤ 10 minutos para video de 1 hora
- Listado de videos: cargar ≤ 2 segundos
- Thumbnails: lazy loading para mejorar performance

### NFR-2: Security
- Videos privados por defecto (solo accesibles por owner)
- Signed URLs de Mux con expiración (24 horas)
- Validación de ownership en cada operación (upload, delete, edit)
- Sanitización de inputs (títulos, descripciones)

### NFR-3: Reliability
- Reintentos automáticos en caso de fallo de upload
- Manejo de desconexiones durante upload (resumable uploads)
- Rollback de créditos si upload falla definitivamente

### NFR-4: Scalability
- Soportar crecimiento de usuarios sin degradación
- Mux se encarga de escalabilidad de storage/streaming
- Backend debe escalar para gestión de metadata y créditos

### NFR-5: Usability
- Feedback claro en cada paso del proceso
- Mensajes de error descriptivos y accionables
- Interfaz intuitiva para usuarios no técnicos

---

## 6. Risks & Mitigation

### Risk 1: Mux Costs Higher Than Expected
**Impact:** High
**Probability:** Medium
**Mitigation:**
- Analyze Mux pricing carefully before launch
- Monitor usage in beta phase
- Adjust credit pricing if needed
- Set hard limits per user if necessary

### Risk 2: Users Confused by Credit System
**Impact:** Medium
**Probability:** Medium
**Mitigation:**
- Clear UI with explanations and tooltips
- Onboarding tutorial for credit system
- FAQ section
- In-app calculator: "How many credits do I need?"

### Risk 3: Large Upload Failures
**Impact:** High
**Probability:** Medium
**Mitigation:**
- Use Mux Direct Uploads (resumable)
- Implement @mux/upchunk for chunk-based uploads
- Clear error messages and retry mechanisms
- Rollback credits if upload fails

### Risk 4: Video Expiration Issues
**Impact:** Medium
**Probability:** Low
**Mitigation:**
- Robust cron job for expiration processing
- Webhooks from Mux for deletion confirmation
- Grace period (30 days) for recovery
- Thorough testing of expiration flow

### Risk 5: Clips Broken After Video Expiration
**Impact:** High
**Probability:** Low
**Mitigation:**
- Clips stored as independent Mux assets
- Test extensively: create clip → delete video → verify clip works
- If issue found, adjust architecture (store clip video separately)

---

## 10. Open Questions

1. **Mux Account Setup:**
   - ¿Ya tienen cuenta de Mux o necesitan crearla?
    - Tengo cuenta
   - ¿Pricing tier inicial? (On-demand vs Reserved)
    - On-demand

2. **Video Quality Settings:**
   - ¿Qué resoluciones máximas soportar? (1080p, 4K?)
    - Las resoluciones que permita Mux en su plan Basic, creo que es hasta 2160p (4K)
   - ¿Permitir usuario elegir calidad de upload vs. auto?
    - De momento auto

3. **Credit Pricing:**
   - ¿Descuentos para usuarios existentes en lanzamiento?
    - Si, pero tengo que pensarlo

4. **Notifications:**
   - ¿Sistema de notificaciones ya existe o hay que crearlo?
    - hay que crearlo
   - ¿Solo email o también push notifications?
    - Solo email

5. **Analytics:**
   - ¿Integrar Mux Data desde v1 o dejarlo para v2?
    - desde v1
   - ¿Qué métricas son críticas desde día 1?
    - Número de videos subidos por mes
    - Tasa de conversión: usuarios que suben videos vs. usuarios creando clips totales
    - Ingresos por compra de créditos para videos
    - Tasa de renovación/extensión de videos antes de expiración
    - Tiempo promedio de retención de videos

6. **Permissions:**
   - ¿En el futuro permitir compartir videos entre usuarios?
    - si
   - ¿Equipos/organizaciones pueden compartir videos?
    - si

7. **Storage Limits:**
   - ¿Mux tiene límites de storage total por cuenta?
    - creo que no
   - ¿Cuántos usuarios simultáneos uploading soporta?
    - no lo se

8. **Testing:**
   - ¿Ambiente de prueba de Mux separado para development?
    - si

---

## 11. Success Criteria

### Launch Criteria (MVP)
- [ ] Usuario puede subir video ≤ 5GB
- [ ] 3 planes de pricing funcionan correctamente
- [ ] Sistema de créditos integrado con Stripe
- [ ] Listado de "Mis Videos" funcional
- [ ] Crear clips desde videos subidos
- [ ] Expiración automática funciona
- [ ] Notificaciones pre-expiración enviadas
- [ ] 0 bugs críticos
- [ ] Tiempo de upload razonable (5GB en ≤ 30 min)

### 30 Days Post-Launch
- 10% de usuarios activos suben al menos 1 video
- $5,000 en ingresos por compra de créditos
- < 5% tasa de error en uploads
- < 2% tasa de soporte relacionado con videos
- NPS ≥ 40 para feature de upload

### 90 Days Post-Launch
- 25% de usuarios activos suben al menos 1 video
- $20,000 en ingresos acumulados por créditos
- 50% de videos renovados antes de expiración (engagement)
- Promedio de 3+ clips creados por video subido

---

## 12. Future Enhancements (Post-MVP)

### Phase 2 Features
- **Bulk Upload:** Subir múltiples videos simultáneamente
- **Video Sharing:** Compartir videos entre usuarios/equipos
- **Advanced Analytics:** Mux Data integration con dashboards
- **Mobile Upload:** Upload desde apps móviles
- **Video Editing:** Trim/cut video antes de subir o después

### Phase 3 Features
- **Team/Organization Plans:** Créditos compartidos en equipos
- **Auto-tagging:** AI para auto-detectar deporte, jugadas, jugadores
- **Live Streaming:** Transmitir y grabar entrenamientos en vivo
- **Video Playlists:** Organizar múltiples videos en playlists
- **Export Formats:** Descargar videos en diferentes formatos

---

## Appendix A: Glossary

- **Mux:** Plataforma de infraestructura de video (storage, encoding, streaming)
- **Créditos:** Moneda virtual de Clip2Coach para pagar por videos y clips
- **Plan Basic/Standard/Premium:** Niveles de pricing para almacenamiento de videos
- **Draft Clip:** Clip en proceso de creación, no guardado definitivamente
- **Expiración:** Fecha en que un video se elimina del storage
- **Renovación:** Extender la fecha de expiración de un video
- **Tarifa Plana:** Plan que permite clips ilimitados sin costo adicional (Basic y Premium)

---

**End of PRD**

