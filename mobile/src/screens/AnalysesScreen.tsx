import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import { api } from '../api/client';

interface Analysis {
  id: string;
  sample_point_id: string;
  ph_h2o?: number | null;
  p_mg_dm3?: number | null;
  k_cmol_dm3?: number | null;
  recommendation?: {
    id: string;
    n_kg_ha?: number | null;
    p2o5_kg_ha?: number | null;
    k2o_kg_ha?: number | null;
    lime_t_ha?: number | null;
  } | null;
}

export default function AnalysesScreen() {
  const [samplePointId, setSamplePointId] = useState('');
  const [ph, setPh] = useState('');
  const [p, setP] = useState('');
  const [k, setK] = useState('');
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!samplePointId.trim()) { setAnalyses([]); return; }
    setLoading(true); setError(null);
    try {
      const res = await api.get('/analyses/', { params: { sample_point_id: samplePointId.trim() } });
      setAnalyses(res.data);
    } catch { setError('Falha ao carregar análises'); }
    finally { setLoading(false); }
  }

  async function create() {
    if (!samplePointId.trim()) { setError('sample_point_id obrigatório'); return; }
    setError(null);
    try {
      const payload: any = {
        sample_point_id: samplePointId.trim(),
        ph_h2o: ph ? Number(ph) : null,
        p_mg_dm3: p ? Number(p) : null,
        k_cmol_dm3: k ? Number(k) : null,
      };
      const res = await api.post('/analyses/', payload);
      setPh(''); setP(''); setK('');
      load();
    } catch { setError('Falha ao criar análise'); }
  }

  useEffect(() => { load(); }, [samplePointId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Análises Laboratoriais</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput placeholder="sample_point_id" value={samplePointId} onChangeText={setSamplePointId} style={styles.input} />
      <TextInput placeholder="pH H2O" value={ph} onChangeText={setPh} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="P mg/dm³" value={p} onChangeText={setP} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="K cmol/dm³" value={k} onChangeText={setK} style={styles.input} keyboardType="numeric" />
      <Button title="Criar Análise" onPress={create} />
      <View style={{ height: 16 }} />
      {loading ? <Text>Carregando...</Text> : (
        <FlatList
          data={analyses}
          keyExtractor={a => a.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>Análise {item.id.substring(0,8)}</Text>
              <Text style={styles.itemMeta}>pH: {item.ph_h2o ?? '-'} | P: {item.p_mg_dm3 ?? '-'} | K: {item.k_cmol_dm3 ?? '-'} </Text>
              {item.recommendation && (
                <Text style={styles.itemRec}>Rec N:{item.recommendation.n_kg_ha ?? '-'} P2O5:{item.recommendation.p2o5_kg_ha ?? '-'} K2O:{item.recommendation.k2o_kg_ha ?? '-'} Calcário:{item.recommendation.lime_t_ha ?? '-'} </Text>
              )}
            </View>
          )}
          ListEmptyComponent={<Text>Nenhuma análise</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  error: { color: 'red', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 8 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  itemTitle: { fontWeight: 'bold' },
  itemMeta: { fontSize: 12, color: '#555' },
  itemRec: { fontSize: 12, color: '#15616d', marginTop: 4 }
});