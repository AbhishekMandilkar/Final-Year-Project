import React, { useContext, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./HomeScreen.js";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components";
import ProfileScreen from "./ProfileScreen.js";
import HotelRecommendationScreen from "./HotelRecommendationScreen.js";
import { DashBoardStack } from "../navigation/AppStack.js";

const DashBoard = ({ navigation }) => {
  return <DashBoardStack />;
};

export default DashBoard;
