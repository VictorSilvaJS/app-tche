import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './auth/AuthStack';
import MainTabs from './tabs/MainTabs';
import { useAuth } from '../storage/authContext';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { session } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {session?.token ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
