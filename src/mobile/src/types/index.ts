export interface PropertyPhotos {
  facadeUri: string;      // Foto 1: Fachada / Acceso exterior
  roomUri: string;        // Foto 2: Habitación principal
  bathroomUri: string;    // Foto 3: Servicios higiénicos
  windowUri: string;      // Foto 4: Ventana / Iluminación natural
}

export interface RoomRestrictions {
  freeEntry24h: boolean;         // Ingreso libre 24 horas con llave propia
  hasCurfew: boolean;            // Tiene horario de cierre o toque de queda
  curfewHour?: number;           // Hora límite de ingreso (ej. 22 para 10:00 PM)
  allowsVisitors: boolean;       // Permite visitas de estudio o familiares
  allowsCooking: boolean;        // Permite cocinar dentro de la habitación o área común
  petFriendly: boolean;          // Admite mascotas
  declaredTransparently: boolean;// Transparencia al declarar condiciones
}

export interface Property {
  id: string;
  title: string;
  price: number;                 // Canon mensual en Soles (S/.)
  sizeSqm: number;               // Área en metros cuadrados (m2)
  distanceMeters: number;        // Distancia física al campus UNA Puno en metros
  timeMinutesWalk: number;       // Tiempo peatonal estimado desde la UNA Puno
  hasNaturalLight: boolean;      // Ventana exterior con iluminación natural
  securityRating: number;        // Escala de 1 a 5 estrellas
  services24h: {
    water: boolean;
    electricity: boolean;
    internet: boolean;
  };
  restrictions: RoomRestrictions;
  landlordVerified: boolean;     // DNI cotejado del arrendador
  realPhotosVerified: boolean;   // Inspección documental de fotos
  photos: PropertyPhotos;
  address: string;
  zone: string;
}

export interface UserPreferences {
  weightPrice: number;           // 0 a 100%
  weightDistance: number;        // 0 a 100%
  weightSecurity: number;        // 0 a 100%
  weightServices: number;        // 0 a 100%
}

export interface ScoreBreakdown {
  priceScore: number;
  locationScore: number;         // Ponderación de distancia y tiempo
  securityScore: number;
  servicesScore: number;
  naturalLightBonus: number;     // Bonificación positiva por iluminación
  freeEntryBonus: number;        // Bonificación por llave propia 24h
  restrictionPenalty: number;    // Penalización acumulada por restricciones
  baseWeightedScore: number;
  finalScore: number;            // Índice final [0 - 100]
  explanationNotes: string[];    // Justificación explícita de cálculo
}