import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button } from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { api } from '../api/client';
import { colors } from '../theme/colors';
import { parseWktPolygon, computeBoundingBox } from '../domain/wkt';

interface Field {
  id: string;
  name: string;
  property_id: string;
  polygon_wkt?: string | null;
}

export default function MapScreen() {
  const [fields, setFields] = useState<Field[]>([]);
  const [propertyId, setPropertyId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [regionReady, setRegionReady] = useState(false);

  async function requestLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Permissão de localização negada');
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
  }

  async function loadFields() {
    if (!propertyId.trim()) { setFields([]); return; }
    setLoading(true); setError(null);
    try {
      const res = await api.get('/fields/', { params: { property_id: propertyId.trim() } });
      setFields(res.data);
      // Ajusta região com base nos polígonos
      const allCoords: { latitude: number; longitude: number }[] = [];
      res.data.forEach((f: Field) => {
        if (f.polygon_wkt) allCoords.push(...parseWktPolygon(f.polygon_wkt));
      });
      const bbox = computeBoundingBox(allCoords);
      if (bbox && location) {
        // latitudeDelta/longitudeDelta simples baseado na bbox
        const latDelta = Math.max(0.01, (bbox.maxLat - bbox.minLat) * 1.2);
        const lonDelta = Math.max(0.01, (bbox.maxLon - bbox.minLon) * 1.2);
        mapRegion = {
          latitude: bbox.centerLat,
          longitude: bbox.centerLon,
          latitudeDelta: latDelta,
          longitudeDelta: lonDelta,
        };
      }
    } catch (e: any) {
      setError('Falha ao carregar talhões');
    } finally { setLoading(false); }
  }

  useEffect(() => { requestLocation(); }, []);
  useEffect(() => { loadFields(); }, [propertyId]);

  let mapRegion = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  } : undefined;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa de Talhões</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.row}>
        <TextInput placeholder="property_id" value={propertyId} onChangeText={setPropertyId} style={styles.input} />
        <Button title="Recarregar" onPress={loadFields} color={colors.primary} />
      </View>
      {!mapRegion ? (
        <ActivityIndicator />
      ) : (
        <MapView style={styles.map} initialRegion={mapRegion} onMapReady={() => setRegionReady(true)}>
          {location && (
            <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} title="Você" />
          )}
          {fields.map(f => {
            const coords = f.polygon_wkt ? parseWktPolygon(f.polygon_wkt) : [];
            if (coords.length < 3) return null; // precisa ter área
            return (
              <Polygon
                key={f.id}
                coordinates={coords}
                strokeColor={colors.primary}
                fillColor={colors.primary + '4D'}
                strokeWidth={2}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: 18, fontWeight: 'bold', padding: 12, color: colors.text },
  error: { color: colors.danger, paddingHorizontal: 12 },
  row: { flexDirection: 'row', paddingHorizontal: 12, alignItems: 'center', gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: colors.muted, borderRadius: 6, padding: 8, marginVertical: 8 },
  map: { flex: 1 },
});