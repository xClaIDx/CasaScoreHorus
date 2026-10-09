# Ficha Técnica — Horus Sentinel

> Propuesta 2 (Unidad I) · Gestión de Proyectos TICs – EST315 · Team Sobrevivientes

## Datos generales

| Campo | Detalle |
|---|---|
| **Nombre** | Horus Sentinel |
| **Subtítulo** | Sistema de mapeo predictivo de zonas de riesgo delictivo |
| **Tipo de solución** | Plataforma geoespacial con mapa de calor de riesgo y ruteo seguro |
| **Enfoque principal** | Estadística espacial (dónde y cuándo es más probable un delito) + mapa visual + sugerencia de ruta |
| **Complejidad estimada** | Media (modelado estadístico espaciotemporal + geolocalización) |
| **Metodología** | Ágil (Scrum), en fases: recolectar datos → construir el modelo → armar mapa/ruteo → probar en zona piloto → ajustar |

## Problema u oportunidad

No existe información clara y actualizada sobre qué zonas son más peligrosas y en qué horarios, por lo que el patrullaje y los desplazamientos de las personas se hacen sin datos que los respalden.

## Objetivo general

Crear un sistema que analice datos de denuncias/incidentes y muestre un mapa de calor de riesgo por zona y horario, útil para patrullaje policial y para que ciudadanos/turistas elijan rutas más seguras.

## Objetivos específicos

1. Analizar datos disponibles (denuncias, reportes) para estimar el riesgo por zona y horario.
2. Detectar zonas con concentración inusual o creciente de incidentes.
3. Mostrar los resultados en un mapa interactivo con sugerencia de rutas seguras.

## Beneficiarios

Policía/serenazgo, ciudadanos, turistas, municipios.

## Alcance

| Incluye | No incluye |
|---|---|
| Mapa de riesgo por zona y horario | Cobertura nacional (se inicia con un distrito piloto) |
| Sugerencia de ruta más segura | Identificación de personas o sospechosos |
| Detección de zonas con patrones anómalos | Cámaras o vigilancia en tiempo real |

## Justificación

La inseguridad ciudadana es un problema visible y los recursos de patrullaje son limitados; usar datos para priorizar dónde actuar es más eficiente que decidir sin información.

## Técnicas principales

- KDE (Kernel Density Estimation) para el mapa de calor base.
- Proceso de Poisson no homogéneo espaciotemporal para modelar cómo un incidente eleva la probabilidad de otro cercano.
- A* modificado sobre el grafo de calles: `Costo = α·Distancia + β·Riesgo`.

## Principal valor

Convierte datos dispersos de criminalidad en información preventiva y accionable, como el "ojo que todo lo ve" de Horus.

## Riesgo clave

Sesgo hacia zonas históricamente más vigiladas (tipo PredPol). Mitigación: combinar denuncias oficiales con reportes ciudadanos y auditar el modelo.
