import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { api } from '../api/client';
import { enqueue, flushQueue, OfflineOperation } from '../storage/offlineQueue';
import { v4 as uuidv4 } from 'uuid';

interface SamplePoint {
  id: string;
  field_id: string;
  depth_cm: number;
  collected_at: string;
  latitude?: number | null;
  longitude?: number | null;
}

export default function SamplePointsScreen() {
  const [samples, setSamples] = useState<SamplePoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldId, setFieldId] = useState('');
  const [depth, setDepth] = useState('0');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  async function load() {
    setLoading(true); setError(null);
    try {
      const res = await api.get('/samples/', { params: fieldId ? { field_id: fieldId } : {} });
      setSamples(res.data);
    } catch (e: any) {
      setError('Falha ao carregar');
    } finally { setLoading(false); }
  }

  async function createSample() {
    if (!fieldId.trim()) { setError('field_id obrigatório'); return; }
    const payload = {
      field_id: fieldId.trim(),
      depth_cm: Number(depth) || 0,
      collected_at: new Date().toISOString(),
      latitude: lat ? Number(lat) : null,
      longitude: lon ? Number(lon) : null
    };
    try {
      await api.post('/samples/', payload);
      clearInputs();
      load();
    } catch (e: any) {
      // offline fallback: enfileira
      const op: OfflineOperation = {
        id: uuidv4(),
        type: 'CREATE_SAMPLE',
        payload,
        createdAt: Date.now()
      };
      await enqueue(op);
      clearInputs();
      setError('Sem conexão: amostra enfileirada');
    }
  }

  function clearInputs() {
    setDepth('0'); setLat(''); setLon('');
  }

  async function syncQueue() {
    setError(null);
    try {
      await flushQueue(async (op) => {
        if (op.type === 'CREATE_SAMPLE') {
          await api.post('/samples/', op.payload);
        }
      });
      load();
    } catch {
      setError('Falha ao sincronizar fila');
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pontos de Amostra</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput placeholder="field_id" value={fieldId} onChangeText={setFieldId} style={styles.input} />
      <TextInput placeholder="profundidade cm" value={depth} onChangeText={setDepth} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="latitude" value={lat} onChangeText={setLat} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="longitude" value={lon} onChangeText={setLon} style={styles.input} keyboardType="numeric" />
      <Button title="Adicionar" onPress={createSample} />
      <View style={{ height: 8 }} />
      <Button title="Sincronizar Fila" onPress={syncQueue} />
      <View style={{ height: 16 }} />
      {loading ? <Text>Carregando...</Text> : (
        <FlatList
          data={samples}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.field_id}</Text>
              <Text style={styles.itemMeta}>Prof: {item.depth_cm} cm | {item.latitude ?? '-'}, {item.longitude ?? '-'}</Text>
              <Text style={styles.itemMeta}>{new Date(item.collected_at).toLocaleString()}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>Nenhuma amostra</Text>}
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
  itemMeta: { fontSize: 12, color: '#555' }
});