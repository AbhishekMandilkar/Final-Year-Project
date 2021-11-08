import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import StyledText from "./Text.styled";

const CurrentTripCard = () => {
  return (
    <Container>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          //   justifyContent: "center",
        }}
      >
        <StyledText family="Poppins" style={{ color: "white", fontSize: 18 }}>
          Your current trip{" "}
        </StyledText>
      </View>
    </Container>
  );
};

export default CurrentTripCard;

const Container = styled.View`
  padding: 15px;
  width: 100%;
  height: 250px;
  background-color: #eee;
  margin: 10px auto;
  border-radius: 20px;
  background: #3494e6; /* fallback for old browsers */
`;
