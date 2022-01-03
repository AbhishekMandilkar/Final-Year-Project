import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { db, auth } from "../utils/firebase/config.js";
import Wrapper from "../common/Wrapper.styled.js";
import { Ionicons } from "@expo/vector-icons";
import StyledText from "../common/Text.styled.js";
import CurrentTripCard from "../components/CurrentTripCard.js";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice.js";
import CameraButton from "../components/CameraButton.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const HomeScreen = ({ navigation }) => {
  // const { setUserName, userName } = useContext(UserContext);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
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
