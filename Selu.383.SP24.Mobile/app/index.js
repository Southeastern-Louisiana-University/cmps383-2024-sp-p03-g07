import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import  BookScreen  from './pages/book';
import  RoomKeyScreen  from './pages/roomKey';
import  RoomServiceScreen  from './pages/room-service';
import  LoginScreen  from './pages/login';


const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  return (
    
    <View style={styles.container}>
     
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

       if (route.name === 'Book') {
          iconName = 'home', size = 30, color = '#fcd34d';
            } else if (route.name === 'RoomKey') {
                iconName = 'key', size = 30, color = '#fcd34d';
            } else if (route.name === 'Login') {
              iconName = 'login-variant', size = 30, color = '#fcd34d';
            } else if (route.name === 'RoomService') {
                iconName = 'food', size = 30, color = '#fcd34d';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          tabBarStyle: {
            activeTintColor: 'gray',
            inactiveTintColor: '#fcd34d',
            backgroundColor: 'green',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            overflow: "hidden",
          
          },
        }}
      >
       
        <Tab.Screen name="Book" component={BookScreen} />
        <Tab.Screen name="RoomKey" component={RoomKeyScreen} />
        <Tab.Screen name="RoomService" component={RoomServiceScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
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

/**
 * Represents the home screen of the application.
 *
 * @component
 */
/**
 * Represents the home screen component.
 * @module HomeScreen
 * @default
 */
export default HomeScreen;