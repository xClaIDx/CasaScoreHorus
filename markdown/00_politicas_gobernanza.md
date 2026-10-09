# POLÍTICAS DEL PROYECTO Y MARCO DE GOBERNANZA

**Proyecto:** CasScore (AlquilaPuno) — Sistema Multicriterio de Alquileres  
**Curso:** Gestión de Proyectos TICS (EST315) — Ciclo 2026-I  
**Docente:** Ing. Renzo Apaza Cutipa  
**Equipo:** Team Sobrevivientes  
**Fecha de Aprobación:** 28 de agosto de 2026  
**Versión:** 1.0 Oficial  

---

## 1. Fundamento Metodológico y Principios Rectores
El equipo adopta el principio de gestión **"Sistematizar antes de automatizar"** fundamentado en el ciclo **IPO (Inputs → Process → Outputs)**. Ninguna actividad de desarrollo de software ni módulo de arquitectura se iniciará sin contar previamente con insumos validados, asignación unívoca de responsabilidades y criterios explícitos de aceptación.

La metodología general es de carácter híbrido: predictiva para la gobernanza, planificación del alcance y control de riesgos; y adaptativa bajo Scrum para la construcción iterativa de los módulos de software.

---

## 2. Organización del Equipo y Roles

| Integrante | Rol Titular | Atribuciones y Compromisos |
| :--- | :--- | :--- |
| **Paricahua Pari, Clyde Neil** | Project Manager (PM) | Conducción ejecutiva, control de alcance, resolución de discrepancias, relación con la cátedra y firma de actas. |
| **Apaza Solis, Ruth Karina** | Analista de Planificación | Estructura WBS/EDT, gestión del tablero Kanban, control del cronograma Gantt y supervisión de holguras. |
| **Tarqui Ajahuana, Eliseo** | Especialista Técnico / Arquitectura | Modelo relacional en Supabase, normalización matemática (0–100), pruebas técnicas y codificación del aplicativo. |
| **Quisbert Quispe, Viviana Mary** | Gestora de Comunicación, Riesgos y Docs | Matriz de riesgos (PDCA), redacción de actas de seguimiento, control de la Wiki y expedientes en LaTeX. |

### Protocolo de Reuniones
* **Horario Oficial:** Sesiones de sincronización ordinarias los **martes y viernes de 20:00 a 21:00 horas**, inmediatamente después del término de las clases universitarias.
* **Dinámica:** Revisión de acuerdos precedentes, informe de impedimentos, verificación de compromisos y asignación de prioridades en el tablero.
* **Resolución de Conflictos:** Deliberación fundamentada al interior del equipo; ante discrepancia persistente, el Project Manager asume la decisión final en coordinación con el docente.

---

## 3. Políticas de Control de Versiones en GitHub

* **Repositorio Único:** Todo el código fuente, artefactos técnicos y expedientes documentales se gestionan centralizadamente en GitHub. Se prohíbe el trabajo local aislado.
* **Protección de la Rama `main`:** Queda prohibido el ingreso de modificaciones directas a la rama de producción.
* **Flujo de Ramas:**
  * `feature/<nombre>`: Desarrollo de funcionalidades específicas.
  * `fix/<nombre>`: Subsanación de errores detectados durante el control de calidad.
  * `docs/<nombre>`: Redacción o actualización de manuales, actas y documentación de ingeniería.
* **Pull Requests Obligatorios:** La integración a `main` requiere la revisión y visto bueno documentado de al menos un miembro del equipo mediante Code Review.
* **Commits Semánticos:** Estructura estricta: `<tipo>(<alcance>): <descripción>`  
  *(Ejemplos: `feat(ranking): normalizacion 0-100 para precio`, `fix(auth): validacion de token estudiantil`, `docs(gantt): ajuste de linea base`)*.

---

## 4. Herramientas de Supervisión y Soporte

* **GitHub Projects (Tablero Kanban):** Monitoreado por la Analista de Planificación (Ruth Karina) bajo el flujo: *Backlog*, *En Progreso*, *En Revisión (PR)* y *Completado*.
* **Issues Oficiales:** Todo entregable de la WBS se respalda con un Issue individual con responsable único asignado y fecha límite inalterable.
* **Gestión de Versiones (Tags):** Etiquetado formal de hitos en el repositorio (`v0.1-charter`, `v1.0-MVP`).
* **Custodia Documental:** Centralización permanente en `/docs` con respaldo de archivos fuente Markdown y compilados oficiales en LaTeX/PDF.

---

## 5. Políticas de Cliente y Producto

* **Accesibilidad Universal:** Formularios claros y directos orientados a estudiantes y personas en búsqueda de alojamiento, sin fricción técnica.
* **Confidencialidad:** Prohibición absoluta de comercializar o ceder datos de usuarios y patrones de búsqueda.
* **Límites Operativos del Sistema:** El producto no gestiona transacciones monetarias, no formaliza contratos legales ni certifica de forma física la seguridad estructural del inmueble.
* **Normalización Matemática (0–100):** Transformación estricta de variables dispares (precios en Soles, distancias en metros, seguridad cualitativa) a la escala uniforme $[0, 100]$ previa al cómputo del ranking.
* **Transparencia Algorítmica:** Presentación desglosada y comprensible de los criterios que determinan el puntaje de recomendación del alojamiento.

---

## 6. Suscripción y Compromiso

* **Clyde Neil Paricahua Pari** — *Project Manager*  
* **Ruth Karina Apaza Solis** — *Analista de Planificación*  
* **Eliseo Tarqui Ajahuana** — *Especialista Técnico*  
* **Viviana Mary Quisbert Quispe** — *Gestora de Documentación y Riesgos*