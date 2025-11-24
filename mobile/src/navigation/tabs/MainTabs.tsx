import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../../screens/DashboardScreen';
import PropertiesScreen from '../../screens/PropertiesScreen';
import SamplePointsScreen from '../../screens/SamplePointsScreen';
import FieldsScreen from '../../screens/FieldsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Properties" component={PropertiesScreen} />
      <Tab.Screen name="Samples" component={SamplePointsScreen} />
      <Tab.Screen name="Fields" component={FieldsScreen} />
    </Tab.Navigator>
  );
}
