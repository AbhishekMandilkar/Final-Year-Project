import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import "@firebase/firestore";

const Stack = createStackNavigator();

//screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import NewTripScreen from "./screens/NewTripScreen";
import HotelRecommendationScreen from "./screens/HotelRecommendationScreen";

//global header styling
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#fff", elevation: 0 },
  headerTitleStyle: { color: "black" },
  headerTintColor: "black",
  // remove shadow on Android
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions} mode="modal">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewTrip" component={NewTripScreen} />
        <Stack.Screen
          name="HotelSelection"
          component={HotelRecommendationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
