import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-paper';

export default function ProfileScreen() {
  const navigation = useNavigation();

  // Dummy profile info
  const profile = {
    firstName: 'YourFirstName',
    middleName: 'YourMiddleName',
    surname: 'YourSurname',
    phone: '0712345678',
    nationalID: '12345678',
    location: 'Gatundu South, Ngenda Ward, Kamenu Village',
    gender: 'Male',
    role: 'Community Health Promoter',
    email: 'you@example.com',
    photo: require('../assets/login3-bg.jpg'),
  };

  // Handle hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('MainTabs', { screen: 'Home' });
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove(); // ✅ avoids the error
    }, [navigation])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('currentUser');
    await AsyncStorage.setItem('hasCompletedProfile', 'false');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Profile</Text>

      <Image
        source={profile.photo}
        style={styles.photo}
        resizeMode="cover"
      />

      <Text style={styles.label}>First Name:</Text>
      <Text style={styles.value}>{profile.firstName}</Text>

      <Text style={styles.label}>Middle Name:</Text>
      <Text style={styles.value}>{profile.middleName}</Text>

      <Text style={styles.label}>Surname:</Text>
      <Text style={styles.value}>{profile.surname}</Text>

      <Text style={styles.label}>Phone Number:</Text>
      <Text style={styles.value}>{profile.phone}</Text>

      <Text style={styles.label}>National ID Number:</Text>
      <Text style={styles.value}>{profile.nationalID}</Text>

      <Text style={styles.label}>Location:</Text>
      <Text style={styles.value}>{profile.location}</Text>

      <Text style={styles.label}>Gender:</Text>
      <Text style={styles.value}>{profile.gender}</Text>

      <Text style={styles.label}>Role:</Text>
      <Text style={styles.value}>{profile.role}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{profile.email}</Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.primaryButton}
          onPress={() => navigation.navigate('CompleteProfile')}
        >
          Edit Profile
        </Button>

        <Button
          mode="contained"
          style={styles.primaryButton}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        >
          Go to Home
        </Button>

        <Button
          mode="outlined"
          style={styles.logoutButton}
          onPress={handleLogout}
          textColor="#B22222"
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8',
    flexGrow: 1,
    paddingBottom: 50,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    marginTop: 12,
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    marginTop: 2,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
    gap: 12,
  },
  primaryButton: {
    width: '70%',
    backgroundColor: '#483D8B',
    borderRadius: 10,
  },
  logoutButton: {
    width: '70%',
    borderRadius: 10,
    borderColor: '#B22222',
    borderWidth: 1,
  },
});
