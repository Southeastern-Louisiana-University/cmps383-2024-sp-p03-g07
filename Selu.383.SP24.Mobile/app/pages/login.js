import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

const baseUrl = 'https://selu383-sp24-p03-g07.azurewebsites.net'

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async () => {
    try {
      let res = await fetch(`${baseUrl}/api/authentication/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!res.ok) {
        console.log('Response status:', res.status);
        console.log('Response text:', await res.text());
        throw new Error('Network response was not ok');
      }
      
      if (res.ok) {
        setIsLoggedIn(true);
        Alert.alert('Success', 'Login successful!');
      } else {
        Alert.alert('Error', 'Password or username is incorrect. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn && (
        <>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            value={username}
            onChangeText={d => setUsername(d)}
          />
          <TextInput
            style={[styles.textInput, { marginVertical: 30 }]}
            placeholder="Password"
            value={password}
            onChangeText={d => setPassword(d)}
            secureTextEntry
          />
        </>
      )}
      
      <TouchableOpacity onPress={() => login()} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>{isLoggedIn ? "Logged In" : "Submit"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textInput: {
    width: 350,
    height: 50,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  loginButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fcd34d',
  },
  loginButtonText: { color: 'black', fontSize: 16, fontWeight: '500' },
});

export default LoginScreen;