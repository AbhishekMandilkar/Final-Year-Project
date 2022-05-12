import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
  Platform,
  ScrollView,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
var screenWidth = Dimensions.get("window").width;
import DateTimePicker from "@react-native-community/datetimepicker";
import HeaderBackButton from "../common/HeaderBackButton";

import { auth, db } from "../utils/firebase/config.js";
import Wrapper from "../common/Wrapper.styled";
import StyledText from "../common/Text.styled";
import StyledTextInput from "../common/TextInput.styled";
import BtnPrimary from "../common/BtnPrimary";
import { Button, Text } from "react-native-elements";
import { ThemeContext } from "styled-components";

const NewTripScreen = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const authUserId = auth?.currentUser?.uid; //get authenticated users unique id
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  //states
  const [date, setDate] = useState(new Date());

  const [userBudget, setUserBudget] = useState(0);
  const [noOfDays, setNoOfDays] = useState(0);
  const [validBudget, setValidBudget] = useState(true);
  const [validDays, setValidDays] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const setUserTripInfo = () => {
    setIsLoading(true);
    //push user data to firestore
    validateBudget(parseInt(userBudget));
    validateDays(parseInt(noOfDays));
    if (validBudget === true && validDays === true) {
      console.log("valid budget and days");
      if (userBudget !== 0 || noOfDays !== 0) {
        setIsLoading(true);
        db.collection("trips")
          .doc(authUserId) //usiing auth users uniq id as document id in firestore
          .set({
            days: parseInt(noOfDays),
            budget: parseInt(userBudget),
            startDate: date,
          })
          .then((res) => {
            console.log(res);
            setIsLoading(false);
            navigation.navigate("HotelSelection");
          })
          .catch((err) => {
            console.log(err);
          });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    } else {
      console.log("invalid budget or days");
      setIsLoading(false);
    }
  };

  //validation
  const validateBudget = (budget) => {
    if (budget >= 8000) {
      console.log("valid budget");
      setValidBudget(true);
    } else {
      setValidBudget(false);
    }
  };
  const validateDays = (days) => {
    if (days >= 3) {
      console.log("valid days");
      setValidDays(true);
    } else {
      setValidDays(false);
    }
  };
  const HandleDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <Wrapper>
      <View style={{ height: windowHeight / 8, flexDirection: "row" }}>
        <HeaderBackButton goBack />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={20}
        enabled
        style={{ flex: 1 }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <StyledText family="Poppins" weight="bold" style={{ fontSize: 36 }}>
            Start a new trip!
          </StyledText>
          <View
            style={{
              width: "100%",
              paddingTop: 20,
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
        <ScrollView bounces={false}>
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
            <ScrollView>
              <StyledTextInput
                value={userBudget === 0 ? "" : userBudget.toString()}
                keyboardType={"numeric"}
                placeholder="How much is your budget in ₹?"
                onChangeText={(text) => setUserBudget(text)}
                width={windowWidth / 1.5}
              />
              {!validBudget && (
                <>
                  <StyledText
                    family="Poppins"
                    weight="medium"
                    style={{ color: "red", fontSize: 12 }}
                  >
                    Enter valid budget, minimum budget is ₹8000
                  </StyledText>
                </>
              )}
              <StyledTextInput
                value={noOfDays === 0 ? "" : noOfDays.toString()}
                keyboardType={"numeric"}
                placeholder="How long is your vacation?"
                onChangeText={(text) => setNoOfDays(text)}
                width={windowWidth / 1.5}
              />
              {!validDays && (
                <>
                  <StyledText
                    family="Poppins"
                    weight="medium"
                    style={{ color: "red", fontSize: 12 }}
                  >
                    Enter valid days, minimum budget is 3 days
                  </StyledText>
                </>
              )}
              {/* <BtnPrimary
            title="Get Started"
            handleClick={setUserTripInfo}
            width={windowWidth / 1.5}
          /> */}

              <>{/* <StyledText>{date}</StyledText> */}</>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"date"}
                  is24Hour={true}
                  minimumDate={new Date()}
                  onChange={HandleDate}
                />
              )}
              <Button
                title={
                  date === new Date()
                    ? "Select Date"
                    : `Date: ${date.toISOString().slice(0, 10)}`
                }
                type="clear"
                icon="home"
                onPress={() => setShow(true)}
              />

              <Button
                onPress={() => setUserTripInfo()}
                loading={isLoading}
                title={
                  <StyledText
                    family="Poppins"
                    style={{
                      color: "#fff",
                      flexDirection: "row",
                      alignItems: "center",
                      fontSize: 18,
                    }}
                  >
                    Get Started
                  </StyledText>
                }
                type="solid"
                buttonStyle={{
                  backgroundColor: theme.colors.primary,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                containerStyle={{
                  borderRadius: 20,
                  width: windowWidth / 1.5,
                }}
              />
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default NewTripScreen;
