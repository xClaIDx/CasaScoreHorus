export interface RoomRestrictions {
  hasCurfew: boolean;         // ¿Tiene toque de queda / hora límite?
  curfewHour?: number;        // Hora de entrada (ej: 22 para 10:00 PM, 0 si no hay)
  allowsVisitors: boolean;    // ¿Permite visitas de compañeros/familiares?
  petFriendly: boolean;       // ¿Permite mascotas?
  declaredTransparently: boolean; // Transparencia: si oculta reglas, baja drásticamente el score
}

export interface Property {
  id: string;
  title: string;
  price: number;              // Canon en Soles (S/.)
  distanceMeters: number;     // Distancia a la UNA Puno en metros
  securityRating: number;     // Escala de 1 a 5 estrellas
  services24h: {
    water: boolean;
    electricity: boolean;
    internet: boolean;
  };
  restrictions: RoomRestrictions; // Restricciones declaradas
  landlordVerified: boolean;  // DNI validado
  realPhotosVerified: boolean;
  imageUri: string;
  address?: string;
  zone?: string;
}

export interface UserPreferences {
  weightPrice: number;        // Peso en % (0 a 100)
  weightDistance: number;
  weightSecurity: number;
  weightServices: number;
  // Tolerancia a restricciones: 1 (muy estricto, no tolera reglas) a 0 (indiferente)
  strictnessPenaltyWeight?: number; 
}

export interface ScoreBreakdown {
  priceScore: number;
  distanceScore: number;
  securityScore: number;
  servicesScore: number;
  restrictionPenalty: number; // Puntos descontados por restricciones severas
  baseWeightedScore: number;  // Puntuación ponderada previa
  finalScore: number;         // CASA SCORE final (acotado a [0, 100])
  explanationNotes: string[]; // Justificación explícita (política de cero caja negra)
}