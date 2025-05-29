import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function ProfileScreen({ setUserRole }) {
  const handleLogout = () => {
    setUserRole(null);
    Toast.show({ type: 'success', text1: 'Logged out successfully' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Role: Community Health Promoter</Text>
      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.button}
        accessibilityLabel="Logout button"
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  info: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  button: { marginTop: 10, padding: 8 },
}); 
