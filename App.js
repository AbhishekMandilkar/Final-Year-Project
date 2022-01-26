import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Theme from "./theme/theme";
import { useFonts } from "expo-font";

//navigators
import AppStack from "./navigation/AppStack";
import AuthStack from "./navigation/AuthStack";
import { Provider, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "./utils/firebase/config";
import { store } from "./app/store";
import HandleContextProvider, { UserContext } from "./contexts/userContext";
import { useContext } from "react";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
export default function AppWrapper() {
  return (
    <HandleContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HandleContextProvider>
  );
}

function App() {
  const user = useSelector(selectUser);
  const { userName, setUserName } = useContext(UserContext);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log("from dispatch");

        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            name: userAuth.displayName,
          })
        );
      } else {
        setUserName("");
        dispatch(logout());
      }
    });
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
          {auth.currentUser ? <AppStack /> : <AuthStack />}
          {/* <AppStack /> */}
        </NavigationContainer>
      </Provider>
    </Theme>
  );
}
function NavigationStack() {
  return <> </>;
}
