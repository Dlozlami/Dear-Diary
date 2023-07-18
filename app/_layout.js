import { Tabs } from 'expo-router/tabs';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hide tab labels
        activeTintColor: '#d2ff58',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
            title:'Home | My Journal',
            headerShown: false,
          tabBarIcon: ({ focused,color, size }) => (
            <Foundation name="home" size={24} style={{color: focused ? 'black' : color}} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
            title:'Log in | My Journal',
            headerShown: false,
          tabBarIcon: ({ focused,color, size }) => (
            <Foundation name="user" size={24} style={{color: focused ? 'black' : color}} />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
            title:'Sign up | My Journal',
            headerShown: false,
          tabBarIcon: ({ focused,color, size }) => (
            <MaterialCommunityIcons name="clipboard-edit-outline" size={24} style={{color: focused ? 'black' : color}} />
          ),
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
            title:'Diary | My Journal',
            headerShown: false,
          tabBarIcon: ({ focused,color, size }) => (
            <Foundation name="book" size={24} style={{color: focused ? 'black' : color}} />
          ),
        }}
      />
       <Tabs.Screen
        name="entry"
        options={{
            title:'New Entry | My Journal',
            headerShown: false,
          tabBarIcon: ({ focused,color, size }) => (
            <Foundation name="edit" size={24} style={{color: focused ? 'black' : color}} />
          ),
        }}
      />
    </Tabs>
  );
}