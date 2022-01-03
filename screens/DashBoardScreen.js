import React, { useContext, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./HomeScreen.js";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext } from "styled-components";
import ProfileScreen from "./ProfileScreen.js";
const Tab = createMaterialTopTabNavigator();
const DashBoard = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerShown: false,
      elavation: 0,
    });
  }, [navigation]);

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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default DashBoard;

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
