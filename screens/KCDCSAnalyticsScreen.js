import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function KCDCSAnalyticsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>KCDCS Analytics</Text>
      <Text style={styles.info}>Analytics dashboard coming soon...</Text>
      <Text style={styles.info}>Will include case statistics, trends, and export options.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
}); 
