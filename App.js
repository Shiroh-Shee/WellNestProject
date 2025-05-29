import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen';
import TrackScreen from './screens/TrackScreen';
import ProfileScreen from './screens/ProfileScreen';
import KCDCSReportScreen from './screens/KCDCSReportScreen';
import KCDCSAnalyticsScreen from './screens/KCDCSAnalyticsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [userRole, setUserRole] = useState(null);

  const CHPTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Report') iconName = 'alert-circle-outline';
          else if (route.name === 'Track') iconName = 'map-marker-check-outline';
          else if (route.name === 'Profile') iconName = 'account';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Track" component={TrackScreen} />
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} setUserRole={setUserRole} />}
      </Tab.Screen>
    </Tab.Navigator>
  );

  const KCDCSTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Reports') iconName = 'file-document';
          else if (route.name === 'Analytics') iconName = 'chart-bar';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Reports" component={KCDCSReportScreen} />
      <Tab.Screen name="Analytics" component={KCDCSAnalyticsScreen} />
    </Tab.Navigator>
  );

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!userRole ? (
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setUserRole={setUserRole} />}
            </Stack.Screen>
          ) : userRole === 'promoter' ? (
            <Stack.Screen name="Main" component={CHPTabs} />
          ) : (
            <Stack.Screen name="Admin" component={KCDCSTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
} 
