import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function KCDCSReportScreen() {
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

  const updateStatus = async (reportId, newStatus) => {
    try {
      const storedReports = await AsyncStorage.getItem('reports');
      let reports = storedReports ? JSON.parse(storedReports) : [];
      reports = reports.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      );
      await AsyncStorage.setItem('reports', JSON.stringify(reports));
      setReports(reports);
      Toast.show({ type: 'success', text1: `Status updated to ${newStatus}` });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Status update failed', text2: error.message });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KCDCS Reports</Text>
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
            <Card.Actions>
              <Button onPress={() => updateStatus(item.id, 'Under Review')}>
                Mark as Under Review
              </Button>
              <Button onPress={() => updateStatus(item.id, 'Referred')}>
                Mark as Referred
              </Button>
            </Card.Actions>
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
