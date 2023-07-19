import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen = () => <Text>Home</Text>; // Replace with your Home screen component
const LoginScreen = () => <Text>Login</Text>; // Replace with your Login screen component
const SignUpScreen = () => <Text>Sign Up</Text>; // Replace with your Sign Up screen component
const DiaryScreen = () => <Text>Diary</Text>; // Replace with your Diary screen component
const EntryScreen = () => <Text>New Entry</Text>; // Replace with your New Entry screen component

const AppLayout = () => {
  // Function to check for JWT in AsyncStorage
  const checkJWT = async () => {
    try {
      const jwt = await AsyncStorage.getItem('DiaryJWT');
      if (!jwt) {
        return false; // JWT token doesn't exist
      }
      const decodedToken = jwt_decode(jwt);
      // Optionally, you can check the expiration of the token here
      return true; // JWT token exists
    } catch (error) {
      console.error('Error retrieving JWT:', error);
      return false;
    }
  };

  // Effect hook to perform JWT check and redirect to login screen if needed
  useEffect(() => {
    const checkAndRedirect = async () => {
      const isLoggedIn = await checkJWT();
      if (!isLoggedIn) {
        navigation.navigate('login'); // Redirect to login screen
      }
    };
    checkAndRedirect();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false, // Hide tab labels
        activeTintColor: '#d2ff58',
      }}
    >
      <Tab.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="home"
              size={24}
              style={{ color: focused ? 'black' : color }}
            />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="signup"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-edit-outline"
              size={24}
              style={{ color: focused ? 'black' : color }}
            />
          ),
        }}
        component={SignUpScreen}
      />
      <Tab.Screen
        name="diary"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Foundation
              name="book"
              size={24}
              style={{ color: focused ? 'black' : color }}
            />
          ),
        }}
        component={DiaryScreen}
      />
      <Tab.Screen
        name="entry"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="document-text-outline"
              size={24}
              style={{ color: focused ? 'black' : color }}
            />
          ),
        }}
        component={EntryScreen}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="layout" component={AppLayout} />
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default App;
