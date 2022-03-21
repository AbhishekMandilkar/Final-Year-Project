import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import StyledText from "../common/Text.styled";
import LottieView from "lottie-react-native";
const CurrentTripCard = ({ tripInfo }) => {
  console.log("this is your trip", tripInfo);
  return (
    <Container>
      {tripInfo?.budget !== undefined && tripInfo?.days !== undefined ? (
        <>
          <View
            style={{
              width: "100%",
            }}
          >
            <View>
              <StyledText
                family="Poppins"
                weight="bold"
                style={{ color: "white", fontSize: 18 }}
              >
                Your current trip
              </StyledText>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <StyledText
                family="Poppins"
                style={{ color: "white", fontSize: 14 }}
              >
                {`Budget💰: ${tripInfo?.budget}₹`}
              </StyledText>
              <StyledText
                family="Poppins"
                style={{ color: "white", fontSize: 14 }}
              >
                {`Days📆: ${tripInfo?.days} days`}
              </StyledText>
              <StyledText
                family="Poppins"
                style={{ color: "white", fontSize: 14 }}
              >
                {`Hotel🛌: ${tripInfo?.hotelName} days`}
              </StyledText>
            </View>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              width: "100%",
              height: "100%",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LottieView
              source={require("../assets/animations/card-loading.json")}
              autoPlay
              loop
              speed={0.8}
              style={{
                width: 64,
                height: 72,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
        </>
      )}
    </Container>
  );
};

export default CurrentTripCard;

const Container = styled.View`
  padding: 15px;
  width: 100%;
  height: 35%;
  background-color: #eee;
  margin: 10px auto;
  border-radius: 20px;
  background: #3494e6; /* fallback for old browsers */
`;
