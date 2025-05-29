import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CryptoJS from 'crypto-js';
import Toast from 'react-native-toast-message';

export default function ReportScreen() {
  const [caseType, setCaseType] = useState('');
  const [victimDetails, setVictimDetails] = useState('');
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Location permission error', text2: error.message });
      return false;
    }
  };

  const getLocation = async () => {
    if (await requestLocationPermission()) {
      try {
        const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        Toast.show({ type: 'success', text1: 'Location captured' });
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Geolocation error', text2: error.message });
      }
    }
  };

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), 'MySecretKey123!').toString();
  };

  const submitReport = async () => {
    if (!caseType || !victimDetails) {
      Toast.show({ type: 'error', text1: 'Please fill all fields' });
      return;
    }

    const reportData = {
      id: Date.now().toString(),
      caseType,
      victimDetails: encryptData(victimDetails),
      location,
      timestamp: new Date().toISOString(),
      status: 'Pending',
    };

    try {
      const existingReports = JSON.parse(await AsyncStorage.getItem('reports') || '[]');
      existingReports.push(reportData);
      await AsyncStorage.setItem('reports', JSON.stringify(existingReports));
      Toast.show({ type: 'success', text1: 'Report saved locally' });
      setCaseType('');
      setVictimDetails('');
      setLocation(null);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Save failed', text2: error.message });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report a Case</Text>
      <TextInput
        label="Case Type (e.g., Physical Abuse)"
        value={caseType}
        onChangeText={setCaseType}
        style={styles.input}
        mode="outlined"
        accessibilityLabel="Case type input"
      />
      <TextInput
        label="Victim Details (Confidential)"
        value={victimDetails}
        onChangeText={setVictimDetails}
        style={styles.input}
        mode="outlined"
        multiline
        accessibilityLabel="Victim details input"
      />
      <Button
        mode="contained"
        onPress={getLocation}
        style={styles.button}
        accessibilityLabel="Capture location button"
      >
        Capture Location
      </Button>
      {location && (
        <Text style={styles.location}>
          Location: {location.latitude}, {location.longitude}
        </Text>
      )}
      <Button
        mode="contained"
        onPress={submitReport}
        style={styles.button}
        accessibilityLabel="Submit report button"
      >
        Submit Report
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { marginBottom: 10, fontSize: 16 },
  button: { marginVertical: 10, padding: 8 },
  location: { marginVertical: 10, fontSize: 16 },
}); 
