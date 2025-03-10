// OnboardingScreen.tsx
import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

export default function OnboardingScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Initialize the navigation hook

  const handleLogin = () => {
    
    navigation.navigate('Dashboard', { username }); // Pass username as a parameter
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor="#A9A9A9"
        value={username}
        onChangeText={setUsername} // Update the username state
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        value={password}
        onChangeText={setPassword} // Update the password state
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  label: {
    color: '#800080',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#800080',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#333',
    color: '#FFFFFF',
    marginBottom: 20,
  },
});
