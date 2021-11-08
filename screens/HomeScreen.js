import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { db, auth } from "../utils/firebase/config.js";
import { SimpleLineIcons } from "@expo/vector-icons";
import Wrapper from "../components/Wrapper.styled.js";
import { EvilIcons } from "@expo/vector-icons";
import StyledText from "../components/Text.styled.js";
import CurrentTripCard from "../components/CurrentTripCard.js";
import MenuOptions from "../components/MenuOptions.js";

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ padding: 7 }}
          onPress={() => navigation.navigate("Login")}
        >
          <EvilIcons name="user" size={45} color="black" />
        </TouchableOpacity>
      ),
      headerTitle: "",
    });
  }, [navigation]);

  // const signUserOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       console.log("user signed out");
  //       navigation.replace("Login");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <Wrapper homeScreen style={{ paddingHorizontal: 20 }}>
      <View>
        <StyledText family="Poppins" weight="medium" style={{ fontSize: 24 }}>
          Hi Abhishek
        </StyledText>
        <CurrentTripCard />
        <MenuOptions />
      </View>
    </Wrapper>
  );
};

export default HomeScreen;
