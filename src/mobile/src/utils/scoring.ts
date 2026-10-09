import { Property, UserPreferences, ScoreBreakdown, RoomRestrictions } from '../types';

// Normalización Min-Max inversa de precio (escala 0 a 100)
export function normalizePrice(price: number, minPrice = 140, maxPrice = 850): number {
  if (price <= minPrice) return 100;
  if (price >= maxPrice) return 0;
  return Math.round(((maxPrice - price) / (maxPrice - minPrice)) * 100);
}

// Normalización conjunta de ubicación: 50% metros y 50% tiempo peatonal
export function normalizeLocation(distanceMeters: number, timeMinutes: number): number {
  // Metros: de 50m (100 pts) a 3000m (0 pts)
  const normDist = distanceMeters <= 50 ? 100 : distanceMeters >= 3000 ? 0 :
    Math.round(((3000 - distanceMeters) / (3000 - 50)) * 100);

  // Minutos: de 2 min (100 pts) a 40 min (0 pts)
  const normTime = timeMinutes <= 2 ? 100 : timeMinutes >= 40 ? 0 :
    Math.round(((40 - timeMinutes) / (40 - 2)) * 100);

  return Math.round((normDist * 0.5) + (normTime * 0.5));
}

// Normalización lineal de seguridad (1 a 5)
export function normalizeSecurity(rating: number): number {
  return Math.round(Math.min(Math.max((rating / 5) * 100, 0), 100));
}

// Puntuación de servicios básicos las 24 horas
export function normalizeServices(services: { water: boolean; electricity: boolean; internet: boolean }): number {
  let score = 0;
  if (services.water) score += 40;
  if (services.electricity) score += 30;
  if (services.internet) score += 30;
  return score;
}

// Cálculo acumulativo de penalizaciones y bonificaciones
export function evaluateConditionAdjustments(
  restrictions: RoomRestrictions,
  hasNaturalLight: boolean,
  sizeSqm: number
): { penalty: number; bonus: number; notes: string[] } {
  let penalty = 0;
  let bonus = 0;
  const notes: string[] = [];

  // Bonificaciones
  if (hasNaturalLight) {
    bonus += 8;
    notes.push('Bonificación: Iluminación natural directa (+8 pts)');
  }

  if (restrictions.freeEntry24h) {
    bonus += 5;
    notes.push('Bonificación: Acceso libre 24 horas con llave propia (+5 pts)');
  }

  if (sizeSqm >= 16) {
    bonus += 4;
    notes.push(`Bonificación: Amplitud de habitación (${sizeSqm} m2) (+4 pts)`);
  }

  // Penalizaciones acumulativas por restricciones
  if (restrictions.hasCurfew) {
    const hour = restrictions.curfewHour ?? 22;
    if (hour <= 20) {
      penalty += 20;
      notes.push(`Penalización severa: Toque de queda ${hour}:00 hrs (-20 pts)`);
    } else if (hour <= 22) {
      penalty += 12;
      notes.push(`Penalización: Toque de queda ${hour}:00 hrs (-12 pts)`);
    } else {
      penalty += 6;
      notes.push(`Penalización: Restricción nocturna ${hour}:00 hrs (-6 pts)`);
    }
  }

  if (!restrictions.allowsVisitors) {
    penalty += 12;
    notes.push('Penalización: Prohibición total de visitas (-12 pts)');
  }

  if (!restrictions.allowsCooking) {
    penalty += 8;
    notes.push('Penalización: No se permite cocinar (-8 pts)');
  }

  if (!restrictions.declaredTransparently) {
    penalty += 25;
    notes.push('Penalización crítica: Restricciones no declaradas en el aviso (-25 pts)');
  }

  return { penalty, bonus, notes };
}

// Motor consolidado del CASA SCORE
export function calculateCasaScore(property: Property, prefs: UserPreferences): ScoreBreakdown {
  const pScore = normalizePrice(property.price);
  const locScore = normalizeLocation(property.distanceMeters, property.timeMinutesWalk);
  const sScore = normalizeSecurity(property.securityRating);
  const srvScore = normalizeServices(property.services24h);

  const totalWeight = prefs.weightPrice + prefs.weightDistance + prefs.weightSecurity + prefs.weightServices;
  const factor = totalWeight > 0 ? totalWeight : 1;

  // Puntuación base ponderada
  const baseWeightedScore = Math.round(
    (pScore * prefs.weightPrice +
      locScore * prefs.weightDistance +
      sScore * prefs.weightSecurity +
      srvScore * prefs.weightServices) / factor
  );

  const { penalty, bonus, notes } = evaluateConditionAdjustments(
    property.restrictions,
    property.hasNaturalLight,
    property.sizeSqm
  );

  const naturalLightBonus = property.hasNaturalLight ? 8 : 0;
  const freeEntryBonus = property.restrictions.freeEntry24h ? 5 : 0;

  // Puntuación final acotada al intervalo estricto [0, 100]
  const finalScore = Math.max(0, Math.min(100, baseWeightedScore + bonus - penalty));

  return {
    priceScore: pScore,
    locationScore: locScore,
    securityScore: sScore,
    servicesScore: srvScore,
    naturalLightBonus,
    freeEntryBonus,
    restrictionPenalty: penalty,
    baseWeightedScore,
    finalScore,
    explanationNotes: notes,
  };
}