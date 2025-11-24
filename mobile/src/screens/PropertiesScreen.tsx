import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { api } from '../api/client';

interface Property {
  id: string;
  name: string;
  owner_id: string;
}

export default function PropertiesScreen() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/properties/');
      setProperties(res.data);
    } catch (e: any) {
      setError('Falha ao carregar');
    } finally {
      setLoading(false);
    }
  }

  async function createProperty() {
    if (!name.trim()) return;
    try {
      await api.post('/properties/', { name });
      setName('');
      load();
    } catch (e: any) {
      setError('Falha ao criar');
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Propriedades</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.row}>
        <TextInput placeholder="Nome" value={name} onChangeText={setName} style={styles.input} />
        <Button title="Adicionar" onPress={createProperty} />
      </View>
      {loading ? <Text>Carregando...</Text> : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}><Text style={styles.itemText}>{item.name}</Text></View>
          )}
          ListEmptyComponent={<Text>Nenhuma propriedade</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  error: { color: 'red', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  itemText: { fontSize: 16 }
});
