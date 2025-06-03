// /screens/WardSelectionScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import subCounties from '../data/subCounties';

export default function WardSelectionScreen({ navigation, route }) {
  const theme = useTheme();
  const { selectedSubCounty } = route.params;
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const found = subCounties.find((sc) => sc.name === selectedSubCounty);
    setWards(found ? found.wards : []);
  }, [selectedSubCounty]);

  const onSelect = (ward) => {
    // Pass back the selected ward name
    navigation.navigate('CompleteProfile', { selectedWard: ward });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={wards}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={<Text style={styles.header}>Select Ward</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
});
