import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import globalScreenOptions from "./navigation/GlobalNavOptions";
import HomeScreen from "../screens/HomeScreen";
import NewTripScreen from "../screens/NewTripScreen";
import HotelRecommendationScreen from "../screens/HotelRecommendationScreen";
const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={globalScreenOptions}
      mode="modal"
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" initialS component={HomeScreen} />
      <Stack.Screen name="NewTrip" component={NewTripScreen} />
      <Stack.Screen
        name="HotelSelection"
        component={HotelRecommendationScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
