import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{headerShown: false , cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} />
      
    </Stack.Navigator>
  </NavigationContainer>
  )
}