import { Property, UserPreferences, ScoreBreakdown, RoomRestrictions } from '../types';

// Normalización Min-Max inversa para costos (menor precio = mayor puntaje)
export function normalizePrice(price: number, minPrice = 150, maxPrice = 800): number {
  if (price <= minPrice) return 100;
  if (price >= maxPrice) return 0;
  return Math.round(((maxPrice - price) / (maxPrice - minPrice)) * 100);
}

// Normalización Min-Max inversa para distancia a la UNA Puno
export function normalizeDistance(distance: number, minDistance = 50, maxDistance = 3000): number {
  if (distance <= minDistance) return 100;
  if (distance >= maxDistance) return 0;
  return Math.round(((maxDistance - distance) / (maxDistance - minDistance)) * 100);
}

// Normalización lineal para seguridad (1 a 5 estrellas)
export function normalizeSecurity(rating: number): number {
  return Math.round(Math.min(Math.max((rating / 5) * 100, 0), 100));
}

// Puntuación de servicios básicos 24 horas
export function normalizeServices(services: { water: boolean; electricity: boolean; internet: boolean }): number {
  let score = 0;
  if (services.water) score += 40;
  if (services.electricity) score += 30;
  if (services.internet) score += 30;
  return score;
}

// Cálculo de deducción por restricciones
export function calculateRestrictionsPenalty(restrictions: RoomRestrictions): { penalty: number; notes: string[] } {
  let penalty = 0;
  const notes: string[] = [];

  // Penalización por hora de entrada / toque de queda
  if (restrictions.hasCurfew) {
    const hour = restrictions.curfewHour ?? 22;
    if (hour <= 21) {
      penalty += 15;
      notes.push('Toque de queda estricto (9:00 PM o antes): -15 pts');
    } else if (hour <= 22) {
      penalty += 10;
      notes.push('Toque de queda regular (10:00 PM): -10 pts');
    } else {
      penalty += 5;
      notes.push(`Hora límite (${hour}:00 hrs): -5 pts`);
    }
  }

  // Penalización por visitas
  if (!restrictions.allowsVisitors) {
    penalty += 10;
    notes.push('No permite visitas de estudio/familiares: -10 pts');
  }

  // Falta de transparencia declarada (penalización crítica de confianza)
  if (!restrictions.declaredTransparently) {
    penalty += 20;
    notes.push('Restricciones no transparentadas en el anuncio: -20 pts');
  }

  return { penalty, notes };
}

// Cálculo formal del CASA SCORE
export function calculateCasaScore(property: Property, prefs: UserPreferences): ScoreBreakdown {
  const pScore = normalizePrice(property.price);
  const dScore = normalizeDistance(property.distanceMeters);
  const sScore = normalizeSecurity(property.securityRating);
  const srvScore = normalizeServices(property.services24h);

  const totalWeight = prefs.weightPrice + prefs.weightDistance + prefs.weightSecurity + prefs.weightServices;
  const factor = totalWeight > 0 ? totalWeight : 1;

  // Puntaje ponderado base
  const baseWeightedScore = Math.round(
    (pScore * prefs.weightPrice +
      dScore * prefs.weightDistance +
      sScore * prefs.weightSecurity +
      srvScore * prefs.weightServices) / factor
  );

  // Evaluación de impacto por restricciones
  const { penalty, notes } = calculateRestrictionsPenalty(property.restrictions);

  // El score final no puede ser menor a 0 ni mayor a 100
  const finalScore = Math.max(0, Math.min(100, baseWeightedScore - penalty));

  return {
    priceScore: pScore,
    distanceScore: dScore,
    securityScore: sScore,
    servicesScore: srvScore,
    restrictionPenalty: penalty,
    baseWeightedScore,
    finalScore,
    explanationNotes: notes,
  };
}