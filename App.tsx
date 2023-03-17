/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Home from './screens/Home';
import NewRecipe from './screens/NewRecipe';
import ImageTaking from './screens/ImageTaking';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" options={{ headerShown:false }} component={SplashScreen} />
        <Stack.Screen name="Login" options={{ headerShown:false }} component={Login} />
        <Stack.Screen name="Home" options={{ title: "Home" }} component={Home} />
        <Stack.Screen name="NewRecipe" options={{ title: "New Recipe" }} component={NewRecipe} />
        <Stack.Screen name="ImageTaking" options={{ headerShown:false }} component={ImageTaking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}