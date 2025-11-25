import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../storage/authContext';
import { api } from '../api/client';
import { colors } from '../theme/colors';

export default function RegisterScreen({ navigation }: any) {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleRegister() {
    setError(null);
    try {
      await api.post('/users/', { name, email, password });
      await login(email, password);
    } catch (e: any) {
      setError(e.message || 'Falha ao registrar');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput placeholder="Nome" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Registrar" onPress={handleRegister} color={colors.primary} />
      <View style={{ height: 12 }} />
      <Button title="Voltar" onPress={() => navigation.goBack()} color={colors.muted} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: colors.primary },
  input: { borderWidth: 1, borderColor: colors.muted, borderRadius: 6, padding: 12, marginBottom: 12 },
  error: { color: colors.danger, marginBottom: 12 }
});
