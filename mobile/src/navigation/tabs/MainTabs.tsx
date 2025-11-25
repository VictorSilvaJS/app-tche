import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../../screens/DashboardScreen';
import PropertiesScreen from '../../screens/PropertiesScreen';
import SamplePointsScreen from '../../screens/SamplePointsScreen';
import FieldsScreen from '../../screens/FieldsScreen';
import MapScreen from '../../screens/MapScreen';
import AnalysesScreen from '../../screens/AnalysesScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import { colors } from '../../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const iconsMap: Record<string, string> = {
  Dashboard: 'dashboard',
  Properties: 'home',
  Samples: 'science',
  Fields: 'grid-view',
  Map: 'map',
  Analyses: 'analytics',
  Settings: 'settings'
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface },
        tabBarIcon: ({ color, size }) => {
          const name = iconsMap[route.name] || 'circle';
          return <MaterialIcons name={name as any} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Properties" component={PropertiesScreen} />
      <Tab.Screen name="Samples" component={SamplePointsScreen} />
      <Tab.Screen name="Fields" component={FieldsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Analyses" component={AnalysesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
