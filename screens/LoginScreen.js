import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { TextInput, Button, Text, Checkbox, IconButton } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

export default function LoginScreen({ setUserRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  useEffect(() => {
    opacity.value = withDelay(200, withTiming(1, { duration: 500 }));
    translateY.value = withTiming(0, { duration: 500 });

    (async () => {
      const savedEmail = await AsyncStorage.getItem('currentUser');
      if (savedEmail) setEmail(savedEmail);
    })();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const validatePassword = (pw) => /[a-zA-Z]/.test(pw) && /\d/.test(pw);

  const handleAuth = async () => {
    if (!email || !password) {
      return Toast.show({ type: 'error', text1: 'Please fill all fields' });
    }

    if (!validatePassword(password)) {
      return Toast.show({
        type: 'error',
        text1: 'Password must contain letters and numbers',
      });
    }

    setLoading(true);

    try {
      const existingUsersJSON = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

      const foundUser = existingUsers.find((u) => u.email === email);

      if (isRegistering) {
        if (foundUser) {
          setLoading(false);
          return Toast.show({ type: 'error', text1: 'User already exists' });
        }

        existingUsers.push({ email, password });
        await AsyncStorage.setItem('users', JSON.stringify(existingUsers));
        Toast.show({ type: 'success', text1: 'Account created successfully' });
      } else {
        if (!foundUser) {
          setLoading(false);
          return Alert.alert(
            'Account Not Found',
            'Would you like to register instead?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Register', onPress: () => setIsRegistering(true) },
            ]
          );
        }

        if (foundUser.password !== password) {
          setLoading(false);
          return Toast.show({ type: 'error', text1: 'Invalid password' });
        }

        Toast.show({ type: 'success', text1: 'Login successful' });
      }

      await AsyncStorage.setItem('currentUser', email);
      await AsyncStorage.setItem('stayLoggedIn', stayLoggedIn ? 'true' : 'false');

      const profileJSON = await AsyncStorage.getItem(`profile_${email}`);
      const profile = profileJSON ? JSON.parse(profileJSON) : null;
      const hasCompletedProfile = profile?.hasCompletedProfile || false;

      if (setUserRole) setUserRole(profile?.role || 'promoter');

      setLoading(false);

      navigation.reset({
        index: 0,
        routes: [{ name: hasCompletedProfile ? 'MainTabs' : 'Welcome' }],
      });
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      Toast.show({ type: 'error', text1: 'An unexpected error occurred' });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/welcome-bg.jpg')} style={styles.background} resizeMode="cover">
        <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles.container, animatedStyle]}>
              <View style={styles.header}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.tagline}>
                  Safely & confidentially report child abuse.{"\n"}Because every child deserves a safe community.
                </Text>
                <Text style={styles.title}>{isRegistering ? 'Create Account' : 'Login'}</Text>
              </View>

              <View style={styles.form}>
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  style={styles.input}
                  placeholder="you@example.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <View style={{ position: 'relative' }}>
                  <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry={!passwordVisible}
                    style={[styles.input, { paddingRight: 40 }]}
                    placeholder="Must contain letters and numbers"
                    autoCapitalize="none"
                  />
                  <IconButton
                    icon={passwordVisible ? 'eye-off' : 'eye'}
                    size={24}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.eyeIcon}
                  />
                </View>

                <View style={styles.checkboxRow}>
                  <Checkbox
                    status={stayLoggedIn ? 'checked' : 'unchecked'}
                    onPress={() => setStayLoggedIn(!stayLoggedIn)}
                  />
                  <Text style={styles.checkboxLabel}>Stay Logged In</Text>
                </View>

                <Button
                  mode="contained"
                  onPress={handleAuth}
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                  loading={loading}
                  disabled={loading}
                >
                  {isRegistering ? 'Register' : 'Login'}
                </Button>

                <Button onPress={() => setIsRegistering(!isRegistering)}>
                  <Text style={styles.toggleText}>
                    {isRegistering ? 'Already have an account? Login' : 'No account? Register'}
                  </Text>
                </Button>
              </View>

              <View style={styles.footer}>
                <Image
                  source={require('../assets/kiambu2-logo.png')}
                  style={styles.kiambuLogo}
                  resizeMode="contain"
                />
                <Text style={styles.poweredBy}>
                  Powered by Kiambu County Directorate of Children’s Services
                </Text>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  header: { alignItems: 'center', marginTop: 10 },
  logo: { width: 180, height: 180, marginBottom: 5 },
  tagline: {
    fontSize: 14,
    color: '',
    textAlign: 'center',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  title: { fontSize: 22, color: '#333', marginBottom: 10 },
  form: {},
  input: { marginBottom: 10, backgroundColor: 'white' },
  eyeIcon: { position: 'absolute', right: 2, top: 9, zIndex: 10 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center' },
  checkboxLabel: { fontSize: 14, color: '#333' },
  button: { backgroundColor: '#7C4DFF', marginTop: 10, paddingVertical: 6 },
  buttonLabel: { fontSize: 16, color: '#FFF' },
  toggleText: { fontSize: 14, color: '', marginTop: 10, textAlign: 'center' },
  footer: { alignItems: 'center', marginTop: 20 },
  kiambuLogo: { width: 100, height: 100 },
  poweredBy: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
});
