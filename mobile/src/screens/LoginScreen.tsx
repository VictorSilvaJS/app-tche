import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { useAuth } from '../storage/authContext';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setError(null);
    try {
      await login(email, password);
    } catch (e: any) {
      setError(e.message || 'Erro ao autenticar');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tchê Fertilidade</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Entrar" onPress={handleLogin} color={colors.primary} />
      <View style={{ height: 12 }} />
      <Button title="Criar Conta" onPress={() => navigation.navigate('Register')} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: colors.primary },
  input: { borderWidth: 1, borderColor: colors.muted, borderRadius: 6, padding: 12, marginBottom: 12 },
  error: { color: colors.danger, marginBottom: 12 }
});
