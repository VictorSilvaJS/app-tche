import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import { api } from '../api/client';
import { colors } from '../theme/colors';

interface Field {
  id: string;
  name: string;
  property_id: string;
  polygon_wkt?: string | null;
}

export default function FieldsScreen() {
  const [propertyId, setPropertyId] = useState('');
  const [name, setName] = useState('');
  const [polygon, setPolygon] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!propertyId.trim()) { setFields([]); return; }
    setLoading(true); setError(null);
    try {
      const res = await api.get('/fields/', { params: { property_id: propertyId.trim() } });
      setFields(res.data);
    } catch { setError('Falha ao carregar'); }
    finally { setLoading(false); }
  }

  async function createField() {
    if (!propertyId.trim() || !name.trim()) return;
    try {
      await api.post('/fields/', { name: name.trim(), property_id: propertyId.trim(), polygon_wkt: polygon.trim() || null });
      setName(''); setPolygon('');
      load();
    } catch { setError('Falha ao criar'); }
  }

  useEffect(() => { load(); }, [propertyId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Talhões</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput placeholder="property_id" value={propertyId} onChangeText={setPropertyId} style={styles.input} />
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Polygon WKT (opcional)" value={polygon} onChangeText={setPolygon} style={styles.input} />
      <Button title="Adicionar" onPress={createField} color={colors.primary} />
      <View style={{ height: 16 }} />
      {loading ? <Text>Carregando...</Text> : (
        <FlatList
          data={fields}
          keyExtractor={f => f.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemMeta}>{item.polygon_wkt ? item.polygon_wkt.substring(0,40)+'...' : 'Sem geometria'}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>Nenhum talhão</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: colors.text },
  error: { color: colors.danger, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: colors.muted, borderRadius: 6, padding: 8, marginBottom: 8 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: colors.muted },
  itemTitle: { fontWeight: 'bold', color: colors.text },
  itemMeta: { fontSize: 12, color: colors.muted }
});