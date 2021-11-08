import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

var screenWidth = Dimensions.get("window").width;

import HeaderBackButton from "../components/HeaderBackButton";

import FAB from "../components/FAB";

//test
import { auth, db } from "../utils/firebase/config.js";
import Wrapper from "../components/Wrapper.styled";
import StyledText from "../components/Text.styled";
import StyledTextInput from "../components/TextInput.styled";
import BtnPrimary from "../components/BtnPrimary";

const NewTripScreen = ({ navigation }) => {
  //customize header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => <HeaderBackButton navigateTo="Home" />,
    });
  }, [navigation]);

  const authUserId = auth?.currentUser?.uid; //get authenticated users unique id

  const setUserTripInfo = () => {
    //push user data to firestore
    db.collection("users")
      .doc(authUserId) //usiing auth users uniq id as document id in firestore
      .set({ numberOfDays: noOfDays, userBudget: userBudget })
      .catch((err) => {
        console.log(err);
      });
  };

  //states
  const [getStarted, setGetStarted] = useState(false);
  const [userBudget, setUserBudget] = useState("");
  const [noOfDays, setNoOfDays] = useState("");

  return (
    <Wrapper>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <StyledText family="Poppins" weight="bold" style={{ fontSize: 36 }}>
          Start a new trip!
        </StyledText>
        <StyledText
          family="Poppins"
          weight="medium"
          style={{ color: "gray", fontSize: 16 }}
        >
          Enter the following details
        </StyledText>
      </View>
      <View style={{ width: "100%", paddingTop: 30, alignItems: "center" }}>
        <Image
          style={{ width: 250, height: 250, resizeMode: "contain" }}
          source={require("../assets/vectors/NewTripVector.png")}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 40,
          width: "100%",
          position: "absolute",
          backgroundColor: "white",
          bottom: 0,
        }}
      >
        <StyledTextInput placeholder="Enter Budget" width={270} />
        <StyledTextInput placeholder="Enter Number of Days" width={270} />
        <BtnPrimary title="Get Started" handleClick={setUserTripInfo} />
      </View>
    </Wrapper>
  );
};

export default NewTripScreen;
