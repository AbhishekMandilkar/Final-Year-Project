import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import globalScreenOptions from "./GlobalNavOptions";
import HomeScreen from "../screens/HomeScreen";
import NewTripScreen from "../screens/NewTripScreen";
import HotelRecommendationScreen from "../screens/HotelRecommendationScreen";
import HotelInfoScreen from "../screens/HotelInfoScreen";
import PaymentScreen from "../screens/PaymentScreen";
import DashBoard from "../screens/DashBoardScreen";
const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={globalScreenOptions}
      mode="modal"
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" initialS component={DashBoard} />
      <Stack.Screen name="NewTrip" component={NewTripScreen} />
      <Stack.Screen
        name="HotelSelection"
        component={HotelRecommendationScreen}
      />
      <Stack.Screen name="Payments" component={PaymentScreen} />
      <Stack.Screen name="HotelInfo" component={HotelInfoScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
