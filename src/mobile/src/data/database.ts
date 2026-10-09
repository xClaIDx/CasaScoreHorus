import * as SQLite from "expo-sqlite";
import { Property } from "../types";

// Apertura o creación síncrona de la base de datos local
const db = SQLite.openDatabaseSync("casascore_local.db");

export function initDatabase(): void {
  // 1. Crear tabla con variables del cuarto, confianza y restricciones
  db.execSync(`
    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      price REAL NOT NULL,
      distanceMeters REAL NOT NULL,
      securityRating REAL NOT NULL,
      water24h INTEGER NOT NULL,
      electricity24h INTEGER NOT NULL,
      internet24h INTEGER NOT NULL,
      hasCurfew INTEGER NOT NULL,
      curfewHour INTEGER,
      allowsVisitors INTEGER NOT NULL,
      petFriendly INTEGER NOT NULL,
      declaredTransparently INTEGER NOT NULL,
      landlordVerified INTEGER NOT NULL,
      realPhotosVerified INTEGER NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      zone TEXT NOT NULL
    );
  `);

  // 2. Comprobar si existen registros previos
  const countResult = db.getFirstSync<{ count: number }>(
    "SELECT COUNT(*) as count FROM properties;",
  );

  // Si está vacía, sembramos los casos de prueba de Puno
  if (countResult && countResult.count === 0) {
    seedInitialProperties();
  }
}

// Limpiar y repoblar datos (útil durante el desarrollo para reiniciar pruebas)
export function resetAndSeedDatabase(): void {
  db.execSync("DELETE FROM properties;");
  seedInitialProperties();
}

function seedInitialProperties(): void {
  const seedData = [
    {
      id: "puno-01",
      title: "Habitación Universitaria a pasos de Puerta 1",
      price: 230,
      distanceMeters: 150,
      securityRating: 4.5,
      water24h: 1,
      electricity24h: 1,
      internet24h: 1,
      hasCurfew: 1,
      curfewHour: 22, // 10:00 PM
      allowsVisitors: 1,
      petFriendly: 0,
      declaredTransparently: 1,
      landlordVerified: 1,
      realPhotosVerified: 1,
      imageUri:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500",
      address: "Av. Floral 412",
      zone: "Entorno UNA Puno",
    },
    {
      id: "puno-02",
      title: "Minidepartamento Independiente sin Horario",
      price: 480,
      distanceMeters: 600,
      securityRating: 4.2,
      water24h: 1,
      electricity24h: 1,
      internet24h: 1,
      hasCurfew: 0, // Sin toque de queda
      curfewHour: null,
      allowsVisitors: 1,
      petFriendly: 1,
      declaredTransparently: 1,
      landlordVerified: 1,
      realPhotosVerified: 1,
      imageUri:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
      address: "Jr. Los Incas 230",
      zone: "Barrio Laykakota",
    },
    {
      id: "puno-03",
      title: "Cuarto Barato con Restricción Severa Oculta",
      price: 150,
      distanceMeters: 1100,
      securityRating: 3.0,
      water24h: 0,
      electricity24h: 1,
      internet24h: 0,
      hasCurfew: 1,
      curfewHour: 20, // 8:00 PM (muy temprano)
      allowsVisitors: 0,
      petFriendly: 0,
      declaredTransparently: 0, // Reglas no transparentadas (penalización severa)
      landlordVerified: 0,
      realPhotosVerified: 0,
      imageUri:
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=500",
      address: "Jr. Cahuide 780",
      zone: "Barrio Bellavista",
    },
    {
      id: "puno-04",
      title: "Cuarto Amoblado p/ Tesista - Clima Templado",
      price: 310,
      distanceMeters: 380,
      securityRating: 4.7,
      water24h: 1,
      electricity24h: 1,
      internet24h: 1,
      hasCurfew: 1,
      curfewHour: 23, // 11:00 PM
      allowsVisitors: 1,
      petFriendly: 0,
      declaredTransparently: 1,
      landlordVerified: 1,
      realPhotosVerified: 1,
      imageUri:
        "https://images.unsplash.com/photo-1540518614846-7ede433c4b63?w=500",
      address: "Av. Sesquicentenario 305",
      zone: "Facultad de Estadística",
    },
    {
      id: "puno-05",
      title: "Habitación Económica en Segundo Piso",
      price: 190,
      distanceMeters: 800,
      securityRating: 3.5,
      water24h: 1,
      electricity24h: 1,
      internet24h: 1,
      hasCurfew: 1,
      curfewHour: 21, // 9:00 PM
      allowsVisitors: 0, // No permite visitas
      petFriendly: 0,
      declaredTransparently: 1,
      landlordVerified: 1,
      realPhotosVerified: 0,
      imageUri:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500",
      address: "Jr. Huáscar 512",
      zone: "Centro / Huáscar",
    },
  ];

  for (const item of seedData) {
    db.runSync(
      `INSERT INTO properties (
        id, title, price, distanceMeters, securityRating, 
        water24h, electricity24h, internet24h,
        hasCurfew, curfewHour, allowsVisitors, petFriendly, declaredTransparently,
        landlordVerified, realPhotosVerified, imageUri, address, zone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        item.id,
        item.title,
        item.price,
        item.distanceMeters,
        item.securityRating,
        item.water24h,
        item.electricity24h,
        item.internet24h,
        item.hasCurfew,
        item.curfewHour,
        item.allowsVisitors,
        item.petFriendly,
        item.declaredTransparently,
        item.landlordVerified,
        item.realPhotosVerified,
        item.imageUri,
        item.address,
        item.zone,
      ],
    );
  }
}

// Consultar publicaciones y mapear a la estructura tipada Property
export function getAllProperties(): Property[] {
  const rows = db.getAllSync<any>(
    `SELECT
      id,
      title,
      price,
      distanceMeters,
      securityRating,
      water24h,
      electricity24h,
      internet24h,
      hasCurfew,
      curfewHour,
      allowsVisitors,
      petFriendly,
      declaredTransparently,
      landlordVerified,
      realPhotosVerified,
      imageUri,
      address,
      zone
    FROM properties;`,
  );

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    price: row.price,
    distanceMeters: row.distanceMeters,
    securityRating: row.securityRating,
    services24h: {
      water: Boolean(row.water24h),
      electricity: Boolean(row.electricity24h),
      internet: Boolean(row.internet24h),
    },
    restrictions: {
      hasCurfew: Boolean(row.hasCurfew),
      curfewHour: row.curfewHour ?? undefined,
      allowsVisitors: Boolean(row.allowsVisitors),
      petFriendly: Boolean(row.petFriendly),
      declaredTransparently: Boolean(row.declaredTransparently),
    },
    water24h: Boolean(row.water24h),
    electricity24h: Boolean(row.electricity24h),
    internet24h: Boolean(row.internet24h),
    hasCurfew: Boolean(row.hasCurfew),
    curfewHour: row.curfewHour ?? undefined,
    allowsVisitors: Boolean(row.allowsVisitors),
    petFriendly: Boolean(row.petFriendly),
    declaredTransparently: Boolean(row.declaredTransparently),
    landlordVerified: Boolean(row.landlordVerified),
    realPhotosVerified: Boolean(row.realPhotosVerified),
    imageUri: row.imageUri,
    address: row.address,
    zone: row.zone,
  }));
}
