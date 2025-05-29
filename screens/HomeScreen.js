import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to WellNest</Text>
      <Text style={styles.subtitle}>Empowering CHPs to protect children</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Report')}
        style={styles.button}
        icon="alert-circle-outline"
        accessibilityLabel="Report a case"
      >
        Report a Case
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Track')}
        style={styles.button}
        icon="map-marker-check-outline"
        accessibilityLabel="Track cases"
      >
        Track Cases
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Profile')}
        style={styles.button}
        icon="account"
        accessibilityLabel="View profile"
      >
        My Profile
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  button: { marginVertical: 10, padding: 8, fontSize: 16 },
}); 
