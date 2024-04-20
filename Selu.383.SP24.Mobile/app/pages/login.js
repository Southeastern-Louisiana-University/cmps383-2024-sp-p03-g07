import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const LoginScreen = () => {
    return (
      <View style={styles.screenContainer}>
        <Text>Login Screen</Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      color: '#0A0A0A',
      flex: 1,
      padding: 10,
    },
    screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  
    },
  });
  export default LoginScreen;