import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useAuth } from '../storage/authContext';

export default function SettingsScreen() {
  const { logout } = useAuth();

  function confirmLogout() {
    Alert.alert('Sair', 'Deseja realmente sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: async () => { await logout(); } }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <View style={{ height: 12 }} />
      <Button title="Sair" color="#d9534f" onPress={confirmLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' }
});
