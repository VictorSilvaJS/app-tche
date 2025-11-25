import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/storage/authContext';
import { colors } from './src/theme/colors';

const navTheme = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.muted,
  }
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer theme={navTheme}>
        <RootNavigator />
        <StatusBar style="dark" />
      </NavigationContainer>
    </AuthProvider>
  );
}
