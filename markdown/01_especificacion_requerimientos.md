# ESPECIFICACIÓN FORMAL DE REQUERIMIENTOS DE SOFTWARE (SRS)

**Proyectos Analizados:** CASA SCORE (AlquilaPuno) vs. Horus Sentinel  
**Curso:** Gestión de Proyectos TICS (EST315) — Ciclo Académico 2026-I  
**Docente:** Ing. Renzo Apaza Cutipa  
**Equipo:** Team Sobrevivientes  
**Fecha de Emisión:** 04 de septiembre de 2026  
**Versión:** 1.0 Línea Base Oficial  

---

## 1. Propósito y Marco Metodológico
El presente documento consolida la captura y especificación técnica de requerimientos para las dos propuestas evaluadas en la Unidad I. Siguiendo el principio de **"Sistematizar antes de automatizar"** y el ciclo **IPO (Inputs → Process → Outputs)**, se desglosan los requerimientos funcionales (RF), requerimientos no funcionales (RNF) y límites operativos de cada alternativa para determinar su viabilidad técnica en un horizonte de 6 semanas.

---

## 2. Propuesta 1: CASA SCORE (AlquilaPuno)

### 2.1 Definición y Objetivos
* **Problema Central:** La migración estudiantil masiva hacia la UNA Puno genera dificultades críticas para arrendar habitaciones: comparación manual dispersa de costo, distancia y servicios, asimetría de información y vulnerabilidad ante ofertas fraudulentas o condiciones abusivas.
* **Objetivo General:** Desarrollar un sistema TIC inteligente de recomendación multicriterio tipo marketplace donde propietarios publiquen habitaciones y estudiantes/trabajadores encuentren opciones seguras mediante un Índice de Confianza y un sistema de reseñas bidireccional.
* **Objetivos Específicos:**
  1. Capturar preferencias, presupuesto y cercanía al campus de interés.
  2. Analizar y ponderar variables objetivas del inmueble y de confianza.
  3. Generar un ranking personalizado explicando de forma transparente el motivo matemático del CASA SCORE.
* **Beneficiarios:** Estudiantes migrantes, familias, trabajadores que buscan alojamiento y arrendadores que publican inmuebles en Puno.

### 2.2 Requerimientos Funcionales (RF)
* **RF-CS-01 (Autenticación y Perfilado):** Registro e inicio de sesión con Supabase Auth para arrendatarios y propietarios, con validación de credenciales.
* **RF-CS-02 (Registro de Publicaciones):** Formulario para registrar cuartos detallando variables obligatorias: canon de alquiler (S/.), geolocalización precisa, tamaño de habitación ($m^2$), servicios básicos 24 horas (agua, luz, internet), restricciones declaradas y fotografías.
* **RF-CS-03 (Ponderación de Preferencias):** Interfaz donde el usuario configura los pesos porcentuales de sus prioridades:
  $$w_{\text{precio}} + w_{\text{distancia}} + w_{\text{seguridad}} + w_{\text{servicios}} = 100\%$$
* **RF-CS-04 (Normalización Obligatoria 0–100):** Transformación algebraica lineal min-max que estandariza todas las variables cuantitativas a una escala común $[0, 100]$ antes de entrar al motor multicriterio para evitar sesgos numéricos.
* **RF-CS-05 (Motor de Ranking):** Cálculo en tiempo real del puntaje consolidado mediante suma ponderada y ordenamiento interactivo de la oferta habitacional.
* **RF-CS-06 (Transparencia Algorítmica / Cero Caja Negra):** Visualización obligatoria del desglose de criterios que determinaron el puntaje de cada cuarto recomendado.
* **RF-CS-07 (Índice de Confianza):** Cálculo de puntuación de confianza basado en dos conjuntos de variables:
  * *Variables del cuarto:* Ubicación, tamaño, servicios 24h, restricciones declaradas.
  * *Variables de confianza:* Verificación del propietario (DNI validado + fotos reales), calificación promedio de inquilinos, transparencia de restricciones e historial de contratos previos.
* **RF-CS-08 (Reseñas Bidireccionales y Anti-Abuso):** Calificación mutua (inquilino califica al arrendador y arrendador al inquilino) habilitada exclusivamente tras un alquiler confirmado, con alertas automáticas por reportes repetidos y botones de "Reportar anuncio/usuario".

### 2.3 Requerimientos No Funcionales (RNF)
* **RNF-CS-01 (Tiempo de Respuesta):** Procesamiento del cálculo algorítmico y renderizado del catálogo en menos de 250 ms en clientes web y móviles.
* **RNF-CS-02 (Stack y Despliegue Gratuito):** Frontend en Next.js (web) y prototipo móvil en Expo (React Native), backend y base de datos con Supabase (PostgreSQL), y mapas interactivos con Leaflet / OpenStreetMap operando sobre capas gratuitas.
* **RNF-CS-03 (Seguridad de Datos):** Reglas de seguridad Row Level Security (RLS) en PostgreSQL para aislamiento y protección de información confidencial.

### 2.4 Delimitación del Alcance (No Incluye)
* No realiza intermediación ni procesamiento de pagos bancarios directos (fase futura con Culqi/Mercado Pago que no bloquea el MVP).
* No genera contratos de arrendamiento con valor legal o notarial.
* No garantiza la seguridad física estructural del inmueble ni reemplaza la inspección presencial obligatoria por parte del estudiante.
* No garantiza de manera vinculante que el usuario encuentre habitación.

---

## 3. Propuesta 2: Horus Sentinel (Mapeo Predictivo Delictivo)

### 3.1 Definición y Objetivos
* **Problema Central:** Carencia de información analítica georreferenciada sobre qué zonas urbanas presentan mayor concentración de delitos y en qué horarios, operando el patrullaje preventivo y el tránsito peatonal sin respaldo de datos estructurados.
* **Objetivo General:** Crear una plataforma geoespacial predictiva que analice microdatos de denuncias e incidentes para generar mapas de calor dinámicos por zona y horario, facilitando el patrullaje preventivo y el ruteo peatonal seguro.
* **Objetivos Específicos:**
  1. Analizar registros delictivos para estimar el riesgo espaciotemporal.
  2. Detectar cuadrantes con concentración anómala o emergente de incidentes.
  3. Desplegar los resultados en un mapa interactivo con cálculo de rutas de bajo riesgo.
* **Beneficiarios:** Policía Nacional, serenazgo distrital, ciudadanos transeúntes, turistas y municipalidades.

### 3.2 Requerimientos Funcionales (RF)
* **RF-HS-01 (Ingesta Espaciotemporal):** Carga y limpieza estructurada de denuncias con atributos de marca temporal (fecha/hora), coordenadas espaciales ($x,y$), tipología penal y severidad.
* **RF-HS-02 (Densidad Kernel - KDE):** Implementación de Kernel Density Estimation para estimar la superficie continua de calor delictivo base sobre la malla urbana.
* **RF-HS-03 (Proceso de Poisson no Homogéneo):** Modelado espaciotemporal de réplicas y correlación de eventos delictivos próximos en tiempo y espacio.
* **RF-HS-04 (Capas por Franjas Horarias):** Segmentación interactiva de capas de riesgo según rangos temporales (mañana, tarde, noche y madrugada).
* **RF-HS-05 (Detección de Anomalías):** Identificación estadística automatizada de brotes atípicos frente a la línea base histórica del cuadrante.
* **RF-HS-06 (Algoritmo de Ruteo Seguro):** Implementación de búsqueda sobre grafo de calles mediante $A^*$ modificado minimizando la función de coste:
  $$\text{Costo} = \alpha \cdot \text{Distancia} + \beta \cdot \text{Riesgo}$$

### 3.3 Requerimientos No Funcionales, Riesgos y Límites
* **RNF-HS-01 (Precisión Espacial):** Georreferenciación de hechos con radio de tolerancia de 15 metros en el plano cartográfico.
* **RNF-HS-02 (Mitigación del Riesgo Clave):** Control del sesgo de sobrevigilancia hacia zonas históricamente más reportadas (riesgo tipo PredPol) mediante la auditoría del modelo y la combinación de denuncias oficiales con reportes ciudadanos.
* **Delimitación del Alcance (No Incluye):** No contempla cobertura nacional (acotado exclusivamente a un distrito piloto urbano), no ejecuta reconocimiento facial ni monitoreo de cámaras en vivo, y no realiza identificación biométrica de personas sospechosas.

---

## 4. Matriz Comparativa y Criterios de Decisión Técnica

| Factor Evaluado | CASA SCORE (AlquilaPuno) | Horus Sentinel |
| :--- | :--- | :--- |
| **Complejidad Algorítmica** | **Media:** Normalización lineal min-max y suma ponderada multicriterio. | **Alta:** Densidad KDE, procesos estocásticos de Poisson y ruteo $A^*$ multiobjetivo. |
| **Fuentes e Insumos de Datos** | **Inmediata y Factible:** Recopilación directa de cuartos en el entorno de la UNA Puno. | **Crítica y Bloqueante:** Dependencia de microdatos policiales protegidos bajo reserva legal. |
| **Factibilidad en 6 Semanas** | **Alta:** MVP modular ejecutable y verificable en 5 sprints semanales. | **Inviable:** La gestión de convenios y calibración espacial excede los plazos del semestre. |
| **Costo de Infraestructura** | **Cero:** Capas gratuitas completas (Supabase, Vercel, Expo, Leaflet). | **Elevado:** Demanda servidores dedicados de cómputo geoespacial intensivo. |
| **Dictamen del Equipo** | **SELECCIONADO (Línea Base del Semestre)** | **DESESTIMADO (Inviable en el plazo)** |

---

## 5. Suscripción y Visto Bueno Técnico
Con la suscripción de este documento, los miembros del equipo técnico congelan la especificación de requerimientos de **CASA SCORE**, adoptándola como la Línea Base de Alcance sobre la cual se formularán el Project Charter y la WBS:

* **Clyde Neil Paricahua Pari** — *Project Manager*
* **Ruth Karina Apaza Solis** — *Analista de Planificación*
* **Eliseo Tarqui Ajahuana** — *Especialista Técnico / Arquitectura*
* **Viviana Mary Quisbert Quispe** — *Gestora de Comunicación y Riesgos*