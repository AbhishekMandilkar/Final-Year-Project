import React, { useContext } from "react";
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
import SpotDetailsScreen from "../screens/SpotDetailsScreen";
import SpotDirectionScreen from "../screens/SpotDirectionScreen";
import HeaderBackButton from "../common/HeaderBackButton";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import { ThemeContext } from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import CameraScreen from "../screens/CameraScreen";
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={globalScreenOptions}
      mode="modal"
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" initialS component={DashBoard} />
      <Stack.Screen
        name="NewTrip"
        component={NewTripScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HotelSelection"
        component={HotelRecommendationScreen}
        options={{ headerLeft: () => <HeaderBackButton /> }}
      />
      <Stack.Screen name="Payments" component={PaymentScreen} />
      <Stack.Screen
        name="HotelInfo"
        component={HotelInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SpotDetails" component={SpotDetailsScreen} />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SpotDirection"
        component={SpotDirectionScreen}
        options={{
          headerTransparent: true,
          headerLeft: () => <HeaderBackButton goBack />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const DashBoardStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        showLabel: false,
        indicatorStyle: {
          opacity: 0,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 70,
          borderTopWidth: 1,
          borderTopColor: theme.colors.gray,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          } else if (route.name === "HotelSelection") {
            iconName = focused ? "ios-fast-food" : "ios-fast-food-outline";
          }

          // You can return any component that you like here!
          return (
            <View style={{ paddingVertical: 8 }}>
              <Ionicons name={iconName} size={26} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
export { DashBoardStack };
