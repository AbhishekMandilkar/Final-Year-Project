import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { db, auth } from "../utils/firebase/config.js";
import { SimpleLineIcons } from "@expo/vector-icons";
import Wrapper from "../common/Wrapper.styled.js";
import { EvilIcons } from "@expo/vector-icons";
import StyledText from "../common/Text.styled.js";
import CurrentTripCard from "../components/CurrentTripCard.js";
import MenuOptions from "../components/MenuOptions.js";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice.js";
import { UserContext } from "../contexts/userContext.js";
import CameraButton from "../components/CameraButton.js";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const HomeScreen = ({ navigation }) => {
  const { setUserName, userName } = useContext(UserContext);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ padding: 7 }} onPress={() => signUserOut()}>
          <EvilIcons name="user" size={45} color="black" />
        </TouchableOpacity>
      ),
      headerTitle: "",
    });
  }, [navigation]);

  const signUserOut = () => {
    setUserName("");
    auth
      .signOut()
      .then(() => {
        console.log("user signed out");
        dispatch(logout());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <Wrapper homeScreen style={{ paddingHorizontal: 20 }}>
      <View>
        <StyledText family="Poppins" weight="medium" style={{ fontSize: 24 }}>
          Hi {user?.name ? user?.name : "there"} 👋
        </StyledText>
        <CurrentTripCard />
        <CameraButton />
      </View>
    </Wrapper>
  );
};

export default HomeScreen;
