import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { initDatabase, getAllProperties, resetAndSeedDatabase } from './src/data/database';
import { calculateCasaScore } from './src/utils/scoring';
import { Property, UserPreferences, ScoreBreakdown } from './src/types';

interface RankedProperty extends Property {
  breakdown: ScoreBreakdown;
}

export default function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [rankedList, setRankedList] = useState<RankedProperty[]>([]);

  // Pesos predeterminados del estudiante (suman 100%)
  const [prefs, setPrefs] = useState<UserPreferences>({
    weightPrice: 40,
    weightDistance: 30,
    weightSecurity: 20,
    weightServices: 10,
  });

  const loadData = () => {
    initDatabase();
    const data = getAllProperties();
    setProperties(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Recalcular el CASA SCORE en tiempo real ante cambios de preferencias o datos
  useEffect(() => {
    if (properties.length > 0) {
      const calculated = properties.map((prop) => ({
        ...prop,
        breakdown: calculateCasaScore(prop, prefs),
      }));

      // Orden descendente por score final
      calculated.sort((a, b) => b.breakdown.finalScore - a.breakdown.finalScore);
      setRankedList(calculated);
    }
  }, [properties, prefs]);

  const applyPreset = (type: 'economico' | 'cerca' | 'seguro' | 'equilibrado') => {
    if (type === 'economico') {
      setPrefs({ weightPrice: 60, weightDistance: 20, weightSecurity: 10, weightServices: 10 });
    } else if (type === 'cerca') {
      setPrefs({ weightPrice: 20, weightDistance: 60, weightSecurity: 10, weightServices: 10 });
    } else if (type === 'seguro') {
      setPrefs({ weightPrice: 20, weightDistance: 20, weightSecurity: 50, weightServices: 10 });
    } else {
      setPrefs({ weightPrice: 25, weightDistance: 25, weightSecurity: 25, weightServices: 25 });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>CasScore Puno</Text>
          <TouchableOpacity 
            style={styles.reloadBtn} 
            onPress={() => { resetAndSeedDatabase(); loadData(); }}
          >
            <Text style={styles.reloadBtnText}>↻ Recargar BD</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>
          Recomendación Multicriterio con Penalización por Restricciones
        </Text>
      </View>

      {/* Presets de Prioridades */}
      <View style={styles.presetsContainer}>
        <Text style={styles.presetLabel}>Prioridad del estudiante:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetScroll}>
          <TouchableOpacity 
            style={[styles.presetBtn, prefs.weightPrice === 60 && styles.presetBtnActive]} 
            onPress={() => applyPreset('economico')}
          >
            <Text style={[styles.presetBtnText, prefs.weightPrice === 60 && styles.presetBtnTextActive]}>
              💰 Más Barato
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.presetBtn, prefs.weightDistance === 60 && styles.presetBtnActive]} 
            onPress={() => applyPreset('cerca')}
          >
            <Text style={[styles.presetBtnText, prefs.weightDistance === 60 && styles.presetBtnTextActive]}>
              📍 Más Cerca UNA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.presetBtn, prefs.weightSecurity === 50 && styles.presetBtnActive]} 
            onPress={() => applyPreset('seguro')}
          >
            <Text style={[styles.presetBtnText, prefs.weightSecurity === 50 && styles.presetBtnTextActive]}>
              🛡️ Más Seguro
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.presetBtn, prefs.weightPrice === 25 && prefs.weightDistance === 25 && styles.presetBtnActive]} 
            onPress={() => applyPreset('equilibrado')}
          >
            <Text style={[styles.presetBtnText, prefs.weightPrice === 25 && prefs.weightDistance === 25 && styles.presetBtnTextActive]}>
              ⚖️ Equilibrado
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Listado de Cuartos Clasificados */}
      <FlatList
        data={rankedList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUri }} style={styles.cardImage} />

            <View style={styles.rankBadge}>
              <Text style={styles.rankBadgeText}>#{index + 1}</Text>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.scorePill}>
                  <Text style={styles.scorePillValue}>{item.breakdown.finalScore}</Text>
                  <Text style={styles.scorePillLabel}>CASA SCORE</Text>
                </View>
              </View>

              <Text style={styles.cardPrice}>
                S/. {item.price} <Text style={styles.cardPriceMonth}>/ mes</Text>
              </Text>
              <Text style={styles.cardDistance}>
                📍 {item.distanceMeters}m de la UNA Puno • {item.zone}
              </Text>

              {/* Insignias de Confianza */}
              <View style={styles.badgeRow}>
                {item.landlordVerified && (
                  <Text style={styles.verifiedBadge}>✓ DNI Validado</Text>
                )}
                {item.realPhotosVerified && (
                  <Text style={styles.photoBadge}>📷 Fotos Verificadas</Text>
                )}
                {!item.restrictions.declaredTransparently && (
                  <Text style={styles.alertBadge}>⚠️ Reglas no transparentes</Text>
                )}
              </View>

              {/* Caja de Explicabilidad y Desglose */}
              <View style={styles.breakdownBox}>
                <View style={styles.breakdownHeaderRow}>
                  <Text style={styles.breakdownTitle}>Desglose Base:</Text>
                  <Text style={styles.breakdownBaseScore}>{item.breakdown.baseWeightedScore} pts</Text>
                </View>
                <Text style={styles.breakdownMetrics}>
                  Precio: {item.breakdown.priceScore} | Distancia: {item.breakdown.distanceScore} | Seguridad: {item.breakdown.securityScore} | Servicios: {item.breakdown.servicesScore}
                </Text>

                {/* Penalizaciones por Restricciones */}
                {item.breakdown.restrictionPenalty > 0 && (
                  <View style={styles.penaltyContainer}>
                    <Text style={styles.penaltyTitle}>
                      Penalización por restricciones: -{item.breakdown.restrictionPenalty} pts
                    </Text>
                    {item.breakdown.explanationNotes.map((note, nIdx) => (
                      <Text key={nIdx} style={styles.penaltyNote}>• {note}</Text>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F9' },
  header: { padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#E5E9F0' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#0A2D5A' },
  headerSubtitle: { fontSize: 12, color: '#606060', marginTop: 3 },
  reloadBtn: { backgroundColor: '#EEF2F6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  reloadBtnText: { fontSize: 11, color: '#0A2D5A', fontWeight: '600' },
  presetsContainer: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#FFFFFF' },
  presetLabel: { fontSize: 12, fontWeight: '600', color: '#707070', marginBottom: 6 },
  presetScroll: { flexDirection: 'row' },
  presetBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#EEF2F6',
    marginRight: 8,
  },
  presetBtnActive: { backgroundColor: '#0A2D5A' },
  presetBtnText: { fontSize: 12, fontWeight: '500', color: '#333333' },
  presetBtnTextActive: { color: '#FFFFFF', fontWeight: 'bold' },
  listContent: { padding: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: { width: '100%', height: 160 },
  rankBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#0A2D5A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rankBadgeText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  cardBody: { padding: 14 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', flex: 1, marginRight: 8 },
  scorePill: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  scorePillValue: { fontSize: 18, fontWeight: 'bold', color: '#2E7D32' },
  scorePillLabel: { fontSize: 8, fontWeight: 'bold', color: '#2E7D32' },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: '#0A2D5A', marginTop: 4 },
  cardPriceMonth: { fontSize: 12, fontWeight: 'normal', color: '#666666' },
  cardDistance: { fontSize: 12, color: '#555555', marginTop: 3 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 6 },
  verifiedBadge: {
    fontSize: 10,
    backgroundColor: '#E3F2FD',
    color: '#0D47A1',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    fontWeight: '600',
  },
  photoBadge: {
    fontSize: 10,
    backgroundColor: '#F3E5F5',
    color: '#6A1B9A',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    fontWeight: '600',
  },
  alertBadge: {
    fontSize: 10,
    backgroundColor: '#FFEBEE',
    color: '#C62828',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    fontWeight: '600',
  },
  breakdownBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderColor: '#B48214',
  },
  breakdownHeaderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  breakdownTitle: { fontSize: 11, fontWeight: 'bold', color: '#444444' },
  breakdownBaseScore: { fontSize: 11, fontWeight: 'bold', color: '#0A2D5A' },
  breakdownMetrics: { fontSize: 10, color: '#666666', marginTop: 3 },
  penaltyContainer: { marginTop: 6, paddingTop: 6, borderTopWidth: 1, borderColor: '#EEEEEE' },
  penaltyTitle: { fontSize: 10, fontWeight: 'bold', color: '#D32F2F' },
  penaltyNote: { fontSize: 9, color: '#B71C1C', marginTop: 1 },
});