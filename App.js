import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import CompleteProfileScreen from './screens/CompleteProfileScreen';
import ProfileScreen from './screens/ProfileScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MainTabs from './screens/MainTabs';
import NotificationsScreen from './screens/NotificationsScreen'; // ✅ NEW import
import ResourcesScreen from './screens/ResourcesScreen';


const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('Login');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const stayLoggedIn = await AsyncStorage.getItem('stayLoggedIn');
      const email = await AsyncStorage.getItem('currentUser');
      if (email && stayLoggedIn === 'true') {
        const profileJSON = await AsyncStorage.getItem(`profile_${email}`);
        const profile = profileJSON ? JSON.parse(profileJSON) : null;
        if (profile?.hasCompletedProfile) {
          setUserRole(profile?.role || 'promoter');
          setInitialRoute('MainTabs');
        } else {
          setInitialRoute('Welcome');
        }
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setUserRole={setUserRole} />}
        </Stack.Screen>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="CompleteProfile">
          {(props) => <CompleteProfileScreen {...props} setUserRole={setUserRole} />}
        </Stack.Screen>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="MainTabs">
          {(props) => <MainTabs {...props} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen
          name="Notifications" // ✅ Added this to allow bell icon navigation
          component={NotificationsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
