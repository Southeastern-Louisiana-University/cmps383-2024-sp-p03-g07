import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
const BookScreen = () => {
    return (
    <View style={styles.searchBox}>
      <TextInput>SELECT A HOTEL</TextInput>
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
  export default BookScreen;