// screens/ResourcesScreen.js
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { resourcesContent } from '../data/resourcesContent';

const ResourcesScreen = () => {
  const theme = useTheme();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleAccordionPress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderBody = (body) => {
    if (Array.isArray(body)) {
      return body.map((line, idx) => (
        <Text key={idx} style={styles.bulletText}>
          {line}
        </Text>
      ));
    }
    return <Text style={styles.bodyText}>{body}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>📚 Educational Resources</Text>
        {resourcesContent.map((section, index) => (
          <List.Accordion
            key={index}
            title={section.title}
            titleStyle={styles.accordionTitle}
            expanded={expandedIndex === index}
            onPress={() => handleAccordionPress(index)}
            style={styles.accordion}
            theme={{ colors: { primary: theme.colors.primary } }}
          >
            {renderBody(section.body)}
          </List.Accordion>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResourcesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#4B2E83',
  },
  accordion: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bodyText: {
    fontSize: 15,
    padding: 16,
    color: '#444',
    lineHeight: 22,
  },
  bulletText: {
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 4,
    color: '#444',
    lineHeight: 22,
  },
});
