import React from 'react';
import { View, StyleSheet, Image, Platform, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function HomeScreen({ route, navigation }) {
  const { colors } = useTheme();
  const userRole = route.params?.role || 'Community Member';

  const handleCall = () => {
    Linking.openURL('tel:0742000888');
  };

  const handleWebsite = () => {
    Linking.openURL('https://kiambu.go.ke/departments/education-gender-culture-social-services/');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Animated.View entering={FadeInUp.duration(800)} style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Screen Title */}
        <Text style={styles.homeText}>Home</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>
          Report cases, follow up, and help protect children in your community.
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            icon={() => <MaterialCommunityIcons name="alert-circle" size={20} color="#fff" />}
            mode="contained"
            onPress={() => navigation.navigate('Report')}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Report a Case
          </Button>

          <Button
            icon={() => <MaterialCommunityIcons name="history" size={20} color="#fff" />}
            mode="contained"
            onPress={() => navigation.navigate('Cases')}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            My Reports
          </Button>

          <Button
            icon={() => <MaterialCommunityIcons name="book-open-variant" size={20} color="#fff" />}
            mode="outlined"
            onPress={() => navigation.navigate('Resources')}
            style={styles.outlinedButton}
            labelStyle={styles.buttonLabel}
          >
            Learn & Support
          </Button>
        </View>

        {/* Quick Links */}
        <Text style={styles.quickLinksTitle}>Quick Links</Text>
        <View style={styles.quickLinksContainer}>
          <Button
            icon="phone"
            mode="text"
            onPress={handleCall}
            style={styles.quickLinkButton}
          >
            Helpline
          </Button>
          <Button
            icon="information"
            mode="text"
            onPress={() => alert('FAQ')}
            style={styles.quickLinkButton}
          >
            FAQs
          </Button>
          <Button
            icon="web"
            mode="text"
            onPress={handleWebsite}
            style={styles.quickLinkButton}
          >
            Visit Website
          </Button>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          Powered by Kiambu County Directorate of Children’s Services
        </Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f3f3ff',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  homeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6200EE',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#6200EE',
  },
  outlinedButton: {
    marginVertical: 8,
    borderRadius: 8,
    borderColor: '#6200EE',
    borderWidth: 1,
  },
  buttonLabel: {
    fontSize: 16,
    color: '#fff',
  },
  quickLinksTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6200EE',
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  quickLinksContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  quickLinkButton: {
    marginHorizontal: 4,
  },
  footerText: {
    marginTop: 30,
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
});
