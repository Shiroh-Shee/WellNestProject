import React, { useEffect } from 'react'; 
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');

const tips = [
  {
    id: 1,
    text: 'Always report suspicious behavior immediately.',
    icon: 'alert-circle-outline',
    image: require('../assets/kidsad3.jpg'),
  },
  {
    id: 2,
    text: 'Keep children’s safety as your top priority.',
    icon: 'shield-check-outline',
    image: require('../assets/kidsad2.jpg'),
  },
  {
    id: 3,
    text: 'You can follow up on your reports anytime.',
    icon: 'history',
    image: require('../assets/kidsad1.jpg'),
  },
  {
    id: 4,
    text: 'Learn more about child protection in Resources.',
    icon: 'book-open-variant',
    image: require('../assets/kidsad4.jpg'),
  },
];

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const userName = 'Friend';

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.replace('Welcome');
      return true;
    });
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.safeArea]} edges={['top']}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Animated.View entering={FadeInUp.duration(800)} style={styles.container}>
            {/* Header with centered logo and app title */}
            <View style={styles.header}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
             
            </View>

            {/* Welcome */}
            <Text style={styles.welcomeMessage}>
              Welcome, <Text style={styles.userName}>{userName}</Text>
            </Text>

            <Text style={styles.welcomeDescription}>
              We appreciate your commitment to safeguarding the children in your community.
            </Text>

            {/* Carousel */}
            <View style={styles.carouselContainer}>
              <Carousel
                width={width * 0.8}
                height={180}
                autoPlay
                data={tips}
                scrollAnimationDuration={2000}
                loop
                panGestureHandlerProps={{
                  activeOffsetX: [-10, 10],
                }}
                renderItem={({ item }) => (
                  <ImageBackground
                    source={item.image}
                    style={styles.tipCard}
                    imageStyle={{ borderRadius: 12 }}
                    resizeMode="cover"
                  >
                    <View style={styles.tipOverlay}>
                      <MaterialCommunityIcons
                        name={item.icon}
                        size={36}
                        color="#fff"
                        style={{ marginBottom: 1 }}
                      />
                      <Text style={styles.tipText}>{item.text}</Text>
                    </View>
                  </ImageBackground>
                )}
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttonsContainer}>
              <Button
                icon={() => <MaterialCommunityIcons name="alert-circle" size={20} color="#fff" />}
                mode="contained"
                onPress={() => navigation.navigate('Report')}
                style={styles.rectButton}
                labelStyle={styles.buttonLabel}
              >
                Report a Case
              </Button>

              <Button
                icon={() => <MaterialCommunityIcons name="history" size={20} color="#fff" />}
                mode="contained"
                onPress={() => navigation.navigate('Track')}
                style={styles.rectButton}
                labelStyle={styles.buttonLabel}
              >
                My Reports
              </Button>

              <Button
                icon={() => <MaterialCommunityIcons name="book-open-variant" size={20} color="#fff" />}
                mode="contained"
                onPress={() => navigation.navigate('Resources')}
                style={styles.rectButton}
                labelStyle={styles.buttonLabel}
              >
                Learn & Support
              </Button>

              <Button
                icon={() => <MaterialCommunityIcons name="account" size={20} color="#fff" />}
                mode="contained"
                onPress={() => navigation.navigate('Profile')}
                style={styles.rectButton}
                labelStyle={styles.buttonLabel}
              >
                My Profile
              </Button>
            </View>

            {/* Quick Links */}
            <Text style={styles.quickLinksTitle}>Quick Links</Text>
            <View style={styles.quickLinksContainer}>
              <Button
                icon="phone"
                mode="text"
                onPress={() => alert('Call helpline')}
                style={styles.quickLinkButton}
                textColor="#eee"
              >
                Helpline
              </Button>
              <Button
                icon="information"
                mode="text"
                onPress={() => alert('FAQ')}
                style={styles.quickLinkButton}
                textColor="#eee"
              >
                FAQs
              </Button>
              <Button
                icon="web"
                mode="text"
                onPress={() => alert('Open website')}
                style={styles.quickLinkButton}
                textColor="#eee"
              >
                Visit Website
              </Button>
            </View>

            {/* Footer */}
            <Text style={styles.poweredBy}>
              Powered by Kiambu County Directorate of Children’s Services
            </Text>
          </Animated.View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 1,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 1,
  },
  
  welcomeMessage: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 0,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5A9BD5',
    marginBottom: 0,
  },
  welcomeDescription: {
    fontSize: 14,
    color: '#eee',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 20,
    marginBottom: 1,
  },
  carouselContainer: {
    marginBottom: 1,
  },
  tipCard: {
    borderRadius: 12,
    overflow: 'hidden',
    width: width * 0.8,
    height: 180,
  },
  tipOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'bottom',
    fontWeight: '500',
  },
  buttonsContainer: {
    width: '90%',
  },
  rectButton: {
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: '#008080',
  },
  buttonLabel: {
    fontSize: 16,
    color: '#fff',
  },
  quickLinksTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 7,
    alignSelf: 'flex-start',
  },
  quickLinksContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickLinkButton: {
    marginHorizontal: 2,
  },
  poweredBy: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 10,
  },
});
