import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { api } from '../api/client';

interface Summary {
  properties: number;
  fields: number;
  sample_points: number;
}

export default function DashboardScreen() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true); setError(null);
    try {
      const res = await api.get('/dashboard');
      setSummary(res.data);
    } catch (e: any) {
      setError('Falha ao carregar dashboard');
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}>
      <Text style={styles.title}>Dashboard</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {!summary ? (
        <Text>Carregando...</Text>
      ) : (
        <View style={styles.grid}>
          <View style={styles.card}><Text style={styles.cardLabel}>Propriedades</Text><Text style={styles.cardValue}>{summary.properties}</Text></View>
          <View style={styles.card}><Text style={styles.cardLabel}>Talhões</Text><Text style={styles.cardValue}>{summary.fields}</Text></View>
          <View style={styles.card}><Text style={styles.cardLabel}>Amostras</Text><Text style={styles.cardValue}>{summary.sample_points}</Text></View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: colors.text },
  error: { color: colors.danger, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { backgroundColor: colors.primary, padding: 16, borderRadius: 10, width: '30%' },
  cardLabel: { color: colors.surface, fontSize: 12 },
  cardValue: { color: colors.surface, fontSize: 20, fontWeight: 'bold', marginTop: 4 }
});
