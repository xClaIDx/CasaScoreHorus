# ACTA DE EVALUACIÓN TÉCNICA Y DESESTIMACIÓN DE PROYECTO
**Resolución de Cartera:** Descarte Formal de Horus Sentinel y Priorización de CasScore  
**Curso:** Gestión de Proyectos TICS (EST315) — Ciclo 2026-I  
**Docente:** Ing. Renzo Apaza Cutipa  
**Equipo:** Team Sobrevivientes  
**Fecha de Sesión:** 08 de septiembre de 2026  
**Decisión:** Aprobada por Unanimidad  

---

## 1. Antecedentes
En el marco de la Unidad I del curso Gestión de Proyectos TICS (EST315), el equipo formuló dos propuestas de ingeniería:
1. **Propuesta 1 (CASA SCORE / AlquilaPuno):** Sistema inteligente de recomendación multicriterio para alquileres estudiantiles en Puno.
2. **Propuesta 2 (Horus Sentinel):** Sistema de mapeo predictivo de riesgo delictivo y ruteo seguro mediante estadística espacial.

Tras la sustentación en clase y el posterior análisis de requerimientos y restricciones (plazo inamovible de 6 semanas, disponibilidad de datos y recursos técnicos), el equipo se reunió para definir la cartera definitiva y evitar la dispersión de esfuerzos.

---

## 2. Motivos Técnicos para la Desestimación de Horus Sentinel

El análisis detallado reveló cuatro factores críticos que hacían inviable el desarrollo de Horus Sentinel:

* **Inviabilidad en el Acceso a Microdatos de Criminalidad:**  
  El modelo requería información georreferenciada detallada (fecha, hora, coordenadas y tipología de delitos). Estos datos están sujetos a estricta reserva por la Policía Nacional del Perú y el Ministerio del Interior. Tramitar accesos institucionales o convenios con comisarías y serenazgo habría consumido la totalidad de las 6 semanas de trabajo.
* **Excesiva Complejidad Algorítmica para el Plazo Académico:**  
  La arquitectura contemplaba técnicas de alta demanda matemática:
  * Modelado de calor mediante Estimación de Densidad Kernel (KDE).
  * Procesos de Poisson No Homogéneos espaciotemporales para estimar probabilidades de repetición delictiva.
  * Algoritmo de ruteo $A^*$ modificado con función de coste ponderada:  
    $$\text{Costo} = \alpha \cdot \text{Distancia} + \beta \cdot \text{Riesgo}$$  
  Construir y validar esta base algorítmica requiere un ciclo de investigación de 4 a 6 meses, superando con creces la capacidad operativa de un proyecto universitario semestral.
* **Riesgo Clave de Sesgo Policial (Efecto PredPol):**  
  Sin un mecanismo exhaustivo y auditado de recolección ciudadana, el algoritmo corre el riesgo inherente de concentrar patrullajes en zonas históricamente más denunciadas, perpetuando sesgos de vigilancia selectiva.
* **Costos Elevados de Cómputo:**  
  El procesamiento geoespacial continuo sobre grafos de calles excede las capas gratuitas de infraestructura en la nube, contraviniendo la política de costo cero del equipo.

---

## 3. Matriz de Contraste y Factibilidad

| Dimensión Evaluada | Horus Sentinel (Desestimado) | CASA SCORE (Seleccionado) |
| :--- | :--- | :--- |
| **Complejidad del Modelo** | Muy Alta: KDE, Poisson espaciotemporal y grafos $A^*$. | Media: Normalización 0–100 y suma ponderada. |
| **Fuentes de Información** | Crítica: Dependencia externa de comisarías y PNP. | Inmediata: Levantamiento directo en campo estudiantil. |
| **Factibilidad en 6 Semanas**| Inviable: Riesgo total de no entregar software funcional. | Plenamente Viable: Entrega garantizada de MVP en Sprint 5. |
| **Costos de Servidores** | Elevados por demanda de cómputo espacial. | Cero: Capas gratuitas (Supabase, Vercel, Leaflet). |
| **Veredicto Técnico** | **DESESTIMADO Y ARCHIVADO** | **RATIFICADO AL 100%** |

---

## 4. Resoluciones y Acuerdos del Equipo

1. **Cancelación Definitiva:** Se cancela formalmente el desarrollo de *Horus Sentinel*, archivando su ficha técnica únicamente como evidencia del análisis de selección de la Unidad I.
2. **Priorización Exclusiva:** Se ratifica **CASA SCORE** (bajo la denominación comercial *AlquilaPuno*) como el único proyecto activo del equipo para el semestre académico 2026-I.
3. **Reasignación de Recursos:** Todo el equipo concentrará sus horas en el diseño de base de datos relacional en Supabase, el motor de cálculo del CASA SCORE, las pantallas interactivas y las pruebas con estudiantes de la UNA Puno.
4. **Trazabilidad en GitHub:** Se cierran las ramas o notas de trabajo asociadas a Horus y se centralizan los artefactos de planificación en torno a CasScore.

---

## 5. Suscripción y Compromiso

* **Clyde Neil Paricahua Pari** — *Project Manager*
* **Ruth Karina Apaza Solis** — *Analista de Planificación*
* **Eliseo Tarqui Ajahuana** — *Especialista Técnico / Arquitectura*
* **Viviana Mary Quisbert Quispe** — *Gestora de Comunicación y Riesgos*