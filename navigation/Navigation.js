import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import ChooseTicketScreen from '../screens/ChooseTicketScreen';
import ChooseTheaterScreen from '../screens/ChooseTheaterScreen';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ChooseDateAndShowtime from '../screens/ChooseDateAndShowtime';
import SeatScreen from '../screens/SeatScreen';
import PaymentScreen from '../screens/PaymentScreen';
const Stack = createStackNavigator();



export default function Navigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{headerShown: false , cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} />
      <Stack.Screen name="ChooseTicket" component={ChooseTicketScreen} options={{headerShown: false}} />
      <Stack.Screen name="ChooseTheater" component={ChooseTheaterScreen} options={{headerShown: false}} />
      <Stack.Screen name="ChooseDateAndShowtime" component={ChooseDateAndShowtime} options={{headerShown: false}} />
      <Stack.Screen name="Seat" component={SeatScreen} options={{headerShown: false}} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{headerShown: false}} />
      
    </Stack.Navigator>
  </NavigationContainer>
  )
}