import {
  View,
  Text,
  Dimensions,
  Alert,
  Platform,
  AlertIOS,
} from "react-native";
import React from "react";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { useState } from "react";
import { auth, db } from "../utils/firebase/config";
import Wrapper from "../common/Wrapper.styled";
import StyledText from "../common/Text.styled";
import { ThemeContext } from "styled-components";
import { useContext } from "react";
import { Button } from "react-native-elements";
import requests from "../utils/Api/EndPoints";

const CheckoutScreen = ({ navigation, route }) => {
  const theme = useContext(ThemeContext);
  const stripe = useStripe();
  const authUserId = auth?.currentUser?.uid; //get authenticated users unique id
  const amount = route.params.amount;
  const hotelName = route.params.hotelName;
  const name = auth?.currentUser?.displayName;
  // console.log(name);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const handleBooking = () => {
    let docRef = db.collection("trips").doc(authUserId);
    return docRef
      .update({
        hotelName: hotelName,
      })
      .then(() => {
        console.log("Document successfully updated!");
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      })
      .catch((err) => console.log(err));
  };

  const processPayment = async () => {
    try {
      const finalAmount = amount * 100;
      if (finalAmount < 1) return Alert.alert("You cannot donate below 1 INR");
      const response = await fetch(requests.payment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount,
          name,
          authUserId,
          date: new Date(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        return Alert.alert(data.message);
      }
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
      });
      if (initSheet.error) {
        console.error(initSheet.error);
        return Alert.alert(initSheet.error.message);
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.clientSecret,
      });
      if (presentSheet.error) {
        console.error(presentSheet.error);
        return Alert.alert(presentSheet.error.message);
      }
      Alert.alert("Payment successfully!");
      // console.log(presentSheet);
      handleBooking();
    } catch (err) {
      console.error(err);
      Alert.alert("Payment failed!");
    }
  };
  return (
    <Wrapper>
      <StripeProvider
        publishableKey={process.env.STRIPE_PUB_KEY}
      ></StripeProvider>
      <StyledText
        family="Poppins"
        weight="medium"
        style={{
          fontSize: 24,
          color: "#000",
          textAlign: "center",
          marginTop: windowHeight / 50,
        }}
      >
        Confirm details
      </StyledText>
      <View
        style={{
          padding: windowWidth / 10,
          margin: windowWidth / 50,
          flex: 1,
          marginHorizontal: "auto",
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.gray,
            padding: 10,
            borderRadius: 12,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <StyledText family="Poppins" style={{ fontSize: 16 }}>
            You are paying
          </StyledText>
          <StyledText
            family="Poppins"
            style={{ fontSize: 26, paddingVertical: 5 }}
          >
            {amount.toLocaleString()}₹
          </StyledText>
          <StyledText family="Poppins" style={{ fontSize: 14, opacity: 50 }}>
            This amount has to be paid to confirm your bookings at the hotel
          </StyledText>
        </View>
        <Button
          onPress={() => processPayment()}
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
              Pay
            </StyledText>
          }
        />
      </View>
    </Wrapper>
  );
};

export default CheckoutScreen;
