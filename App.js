import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Theme from "./utils/theme/theme";
import { useFonts } from "expo-font";
import globalScreenOptions from "./navigation/GlobalNavOptions";

//navigators
import AppStack from "./navigation/AppStack";
import AuthStack from "./navigation/AuthStack";

const Stack = createStackNavigator();

export default function App() {
  const user = null;
  const [loaded] = useFonts({
    Pop: require("./assets/fonts/Pop.ttf"),
    PopBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PopLight: require("./assets/fonts/Poppins-Light.ttf"),
    PopMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    Lato: require("./assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("./assets/fonts/Lato-Bold.ttf"),
    LatoMedium: require("./assets/fonts/Poppins-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <Theme>
      <NavigationContainer>
        {!user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </Theme>
  );
}
