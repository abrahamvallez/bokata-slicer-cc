Quiero crear un MVP funcional que permita a usuarios documentar experiencias laborales en formato STAR con asistencia de IA.

Funcionalidades basicas:
- Autenticación con LinkedIn vía Supabase
- Crear experiencias en formato STAR con ayuda de OpenAI
  - Redactar texto en formato libre
  - con openAI formatear el texto en formato STAR (Situaction, Task, Action, Result)
- Visualizar listado de experiencias propias
- Sistema básico de gestión (crear, listar, ver detalle)

**Flujo de Usuario**

1. **Inicio**
   - Usuario click en "Nueva Experiencia"
   - Sistema muestra formulario con campo de texto libre

2. **Input Inicial**
   ```
   ┌─────────────────────────────────────┐
   │ Nueva Experiencia                    │
   │                                      │
   │ Describe una experiencia profesional │
   │ de la que estés orgulloso:          │
   │                                      │
   │ ┌─────────────────────────────────┐ │
   │ │ Escribe libremente...            │ │
   │ │                                  │ │
   │ │                                  │ │
   │ └─────────────────────────────────┘ │
   │                                      │
   │              [Generar STAR con IA]  │
   └─────────────────────────────────────┘
   ```

3. **Procesamiento con IA**
   - Usuario escribe texto libre (min 50 caracteres)
   - Click "Generar STAR con IA"
   - Loading state
   - IA analiza y genera estructura STAR

4. **Revisión y Guardado**
   ```
   ┌─────────────────────────────────────┐
   │ Revisa tu experiencia               │
   │                                      │
   │ Título sugerido:                     │
   │ ┌─────────────────────────────────┐ │
   │ │ [Título generado por IA]         │ │
   │ └─────────────────────────────────┘ │
   │                                      │
   │ 📍 Situación                         │
   │ ┌─────────────────────────────────┐ │
   │ │ [Texto editable]                 │ │
   │ └─────────────────────────────────┘ │
   │                                      │
   │ 🎯 Tarea                             │
   │ ┌─────────────────────────────────┐ │
   │ │ [Texto editable]                 │ │
   │ └─────────────────────────────────┘ │
   │                                      │
   │ ⚡ Acción                            │
   │ ┌─────────────────────────────────┐ │
   │ │ [Texto editable]                 │ │
   │ └─────────────────────────────────┘ │
   │                                      │
   │ 🏆 Resultado                         │
   │ ┌─────────────────────────────────┐ │
   │ │ [Texto editable]                 │ │
   │ └─────────────────────────────────┘ │
   │                                      │
   │          [Cancelar] [Guardar]       │
   └─────────────────────────────────────┘
   ```

5. Usuario puede editar cualquier campo
6. Click "Guardar"
7. Experiencia guardada en Supabase
8. Redirección a listado

---

### 2.3 Listado de Experiencias

**Vista de Listado**
```
┌─────────────────────────────────────────────┐
│  [Logo] fact-cv                [@user] ▼    │
├─────────────────────────────────────────────┤
│                                              │
│  Mis Experiencias                [+ Nueva]  │
│                                              │
│  ┌────────────────────────────────────┐    │
│  │ 🎯 Optimización de dashboard        │    │
│  │ Tech Corp                           │    │
│  │                                      │    │
│  │ Reduje el tiempo de carga de 10s    │    │
│  │ a 1.5s (85% mejora)...              │    │
│  │                                      │    │
│  │ Creada hace 2 días                  │    │
│  └────────────────────────────────────┘    │
│                                              │
│  ┌────────────────────────────────────┐    │
│  │ 🔄 Migración a React                │    │
│  │ Tech Corp                           │    │
│  │                                      │    │
│  │ Migramos el 100% de la aplicación   │    │
│  │ sin downtime...                     │    │
│  │                                      │    │
│  │ Creada hace 1 semana                │    │
│  └────────────────────────────────────┘    │
│                                              │
│  [Estado vacío si no hay experiencias]     │
│                                              │
└─────────────────────────────────────────────┘
```

**Vista de Detalle**
```
┌─────────────────────────────────────────────┐
│  ← Volver al listado                        │
├─────────────────────────────────────────────┤
│                                              │
│  🎯 Optimización de dashboard de analytics  │
│  Tech Corp                                   │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                              │
│  📍 SITUACIÓN                                │
│  El dashboard de analytics tardaba más de   │
│  10 segundos en cargar cuando los clientes  │
│  tenían más de 100,000 registros...         │
│                                              │
│  🎯 TAREA                                    │
│  Optimizar el rendimiento del dashboard     │
│  para que cargara en menos de 2 segundos... │
│                                              │
│  ⚡ ACCIÓN                                   │
│  Implementé virtualización de tablas con    │
│  react-window, agregué paginación del lado  │
│  del servidor...                            │
│                                              │
│  🏆 RESULTADO                                │
│  Reduje el tiempo de carga de 10s a 1.5s   │
│  (85% de mejora). Las quejas de clientes    │
│  disminuyeron en 90%...                     │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                              │
│  Creada el 15 Oct 2025                      │
│                                              │
└─────────────────────────────────────────────┘
```

---
### Stack Tecnológico

**Frontend**
```
- Next.js 14+ (App Router)
- React 19
- TypeScript
- TailwindCSS
- shadcn/ui components
```

**Backend**
```
- Next.js API Routes
- Supabase (PostgreSQL + Auth)
- OpenAI API (GPT-4o-mini)
```

## 7. Flujos de Usuario Completos

### 7.1 Primera Vez: Sign Up + Crear Experiencia

1. Usuario llega a `app.com`
2. Ve landing page con CTA "Sign in with LinkedIn"
3. Click → OAuth LinkedIn → Autoriza
4. Redirige a `/dashboard` (vacío)
5. Ve estado vacío: "No tienes experiencias aún"
6. Click "Crear mi primera experiencia"
7. Escribe en textarea:
   ```
   "En mi trabajo anterior rediseñé toda la arquitectura del backend
   porque estaba muy lenta. Usé Node.js y Redis. Al final la app
   era 5 veces más rápida y los usuarios estaban felices."
   ```
8. Click "Generar STAR con IA"
9. Loading 3-5 segundos
10. Ve formulario pre-llenado con estructura STAR
11. Edita título: "Rediseño de arquitectura backend"
12. Añade empresa: "StartupXYZ"
13. Revisa STAR, hace ajustes menores
14. Click "Guardar"
15. Redirección a `/dashboard`
16. Ve su primera experiencia en el listado

### 7.2 Usuario Recurrente: Ver y Crear

1. Usuario llega a `app.com`
2. Ya tiene sesión activa → auto-redirige a `/dashboard`
3. Ve listado de sus 3 experiencias
4. Click en una experiencia
5. Ve detalle completo en formato STAR
6. Click "← Volver"
7. Click "+ Nueva Experiencia"
8. Repite flujo de creación
9. Ahora tiene 4 experiencias

---
