import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function LoginScreen({ setUserRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      setUserRole('promoter');
      Toast.show({ type: 'success', text1: 'Login successful' });
    } else {
      Toast.show({ type: 'error', text1: 'Please fill all fields' });
    }
  };

  const handleRegister = () => {
    if (email && password) {
      setUserRole('promoter');
      Toast.show({ type: 'success', text1: 'Account created successfully' });
    } else {
      Toast.show({ type: 'error', text1: 'Registration failed', text2: 'Please fill all fields' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Create Account' : 'Login'}</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        autoCapitalize="none"
        accessibilityLabel="Email input"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        accessibilityLabel="Password input"
      />
      <Button
        mode="contained"
        onPress={isRegistering ? handleRegister : handleLogin}
        style={styles.button}
        accessibilityLabel={isRegistering ? 'Register button' : 'Login button'}
      >
        {isRegistering ? 'Register' : 'Login'}
      </Button>
      <Button
        onPress={() => setIsRegistering(!isRegistering)}
        style={styles.toggleButton}
        accessibilityLabel="Toggle between login and register"
      >
        {isRegistering ? 'Already have an account? Login' : 'No account? Register'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 10, fontSize: 16 },
  button: { marginTop: 10, padding: 8 },
  toggleButton: { marginTop: 10 },
}); 
