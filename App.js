import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Theme from "./utils/theme/theme";
import { useFonts } from "expo-font";

//navigators
import AppStack from "./navigation/AppStack";
import AuthStack from "./navigation/AuthStack";
import { Provider, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "./utils/firebase/config";
import { store } from "./app/store";

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const user = useSelector(selectUser);
  // console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, []);

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
      <Provider store={store}>
        <NavigationContainer>
          {!user ? <AppStack /> : <AuthStack />}
          {/* <AppStack /> */}
        </NavigationContainer>
      </Provider>
    </Theme>
  );
}
function NavigationStack() {
  return <> </>;
}
