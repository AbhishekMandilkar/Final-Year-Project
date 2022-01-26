import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
var screenWidth = Dimensions.get("window").width;

import HeaderBackButton from "../common/HeaderBackButton";

import FAB from "../common/FAB";

//test
import { auth, db } from "../utils/firebase/config.js";
import Wrapper from "../common/Wrapper.styled";
import StyledText from "../common/Text.styled";
import StyledTextInput from "../common/TextInput.styled";
import BtnPrimary from "../common/BtnPrimary";

const NewTripScreen = ({ navigation }) => {
  const authUserId = auth?.currentUser?.uid; //get authenticated users unique id
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const setUserTripInfo = () => {
    console.log({ authUserId, noOfDays, userBudget });
    //push user data to firestore
    db.collection("trips")
      .doc(authUserId) //usiing auth users uniq id as document id in firestore
      .set({ days: noOfDays, budget: userBudget })
      .then((res) => {
        console.log(res);
        navigation.navigate("HotelSelection");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //states
  const [userBudget, setUserBudget] = useState(20000);
  const [noOfDays, setNoOfDays] = useState(5);

  return (
    <Wrapper>
      <View style={{ height: windowHeight / 8, flexDirection: "row" }}>
        <HeaderBackButton goBack />
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={20}
        style={{ flex: 1 }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <StyledText family="Poppins" weight="bold" style={{ fontSize: 36 }}>
            Start a new trip!
          </StyledText>
          <View
            style={{
              width: "100%",
              paddingTop: 30,
              alignItems: "center",
              // zIndex: 1000,
            }}
          >
            <Image
              style={{ width: 250, height: 250, resizeMode: "contain" }}
              source={require("../assets/vectors/NewTripVector.png")}
            />
          </View>
          <StyledText
            family="Poppins"
            weight="medium"
            style={{ color: "gray", fontSize: 14 }}
          >
            Enter the following details
          </StyledText>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            // paddingVertical: 40,
            width: "100%",
            backgroundColor: "white",
            bottom: 0,
          }}
        >
          <StyledTextInput
            value={userBudget.toString()}
            keyboardType={"numeric"}
            placeholder="How much is your budget in ₹?"
            onChangeText={(text) => setUserBudget(text)}
            width={windowWidth / 1.5}
          />
          <StyledTextInput
            value={noOfDays.toString()}
            keyboardType={"numeric"}
            placeholder="How long is your vacation?"
            onChangeText={(text) => setNoOfDays(text)}
            width={windowWidth / 1.5}
          />
          <BtnPrimary
            title="Get Started"
            handleClick={setUserTripInfo}
            width={windowWidth / 1.5}
          />
        </View>
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default NewTripScreen;
