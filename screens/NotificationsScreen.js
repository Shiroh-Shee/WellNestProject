import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Appbar, Divider } from 'react-native-paper';

const mockNotifications = [
  { id: '1', message: 'New case reported in your area.' },
  { id: '2', message: 'Weekly report is now available.' },
  { id: '3', message: 'Your profile has been approved.' },
];

export default function NotificationsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Notifications" />
      </Appbar.Header>

      <FlatList
        data={mockNotifications}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16 },
  notificationItem: {
    paddingVertical: 12,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
});
