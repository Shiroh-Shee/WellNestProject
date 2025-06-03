import React from 'react'; 
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const images = [
    require('../assets/kids1.jpg'),
    require('../assets/kids2.jpg'),
    require('../assets/kids3.jpg'),
    require('../assets/kids4.jpg'),
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.header}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>
              Powered by Kiambu County Directorate of Children’s Services
            </Text>
          </View>

          <Carousel
            width={width * 0.8}
            height={150}
            autoPlay
            data={images}
            scrollAnimationDuration={1500}
            renderItem={({ item }) => (
              <Image source={item} style={styles.carouselImage} resizeMode="cover" />
            )}
            loop
            style={styles.carousel}
          />

          <View style={styles.didYouKnowContainer}>
            <Text style={styles.didYouKnowTitle}>Did You Know?</Text>
            <Text style={styles.didYouKnowText}>
              Over 60% of child abuse cases in Kenya go unreported, leaving many children without the protection and support they urgently need.
            </Text>
            <Text style={styles.callToAction}>
              You can help by reporting any suspected abuse.
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={() => navigation.replace('CompleteProfile')}
            style={styles.button}
            contentStyle={{ paddingVertical: 8 }}
          >
            Complete My Profile
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('MainTabs')}
            style={styles.secondaryButton}
            textColor="#fff"
          >
            Go to Home
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Resources' })}
            style={styles.secondaryButton}
            textColor="#fff"
          >
            Learn More
          </Button>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 1,
  },
  title: {
    fontSize: 4,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '',
    marginTop: 1,
  },
  carousel: {
    marginVertical: 5,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  didYouKnowContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  didYouKnowTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700', // gold for emphasis
    marginBottom: 3,
    textAlign: 'center',
  },
  didYouKnowText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 6,
  },
  callToAction: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  button: {
    width: '70%',
    borderRadius: 10,
    backgroundColor: '#483D8B',
    marginBottom: 4,
  },
  secondaryButton: {
    width: '70%',
    borderRadius: 12,
    borderColor: '#20B2AA',
    marginBottom: 8,
  },
});

export default WelcomeScreen;
