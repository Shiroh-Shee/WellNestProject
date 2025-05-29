import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TrackScreen() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const storedReports = await AsyncStorage.getItem('reports');
        setReports(storedReports ? JSON.parse(storedReports) : []);
      } catch (error) {
        console.log('Error loading reports:', error);
      }
    };
    loadReports();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Reported Cases</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardText}>Case Type: {item.caseType}</Text>
              <Text style={styles.cardText}>Status: {item.status}</Text>
              <Text style={styles.cardText}>
                Location: {item.location ? `${item.location.latitude}, ${item.location.longitude}` : 'N/A'}
              </Text>
              <Text style={styles.cardText}>Date: {new Date(item.timestamp).toLocaleDateString()}</Text>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No reports found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { marginBottom: 10 },
  cardText: { fontSize: 16, marginBottom: 5 },
  empty: { fontSize: 16, textAlign: 'center', marginTop: 20 },
}); 
