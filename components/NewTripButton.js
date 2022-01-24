import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
const NewTripButton = () => {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate("NewTrip")}>
      <Ionicons name="ios-add-sharp" size={50} color="black" />
    </Container>
  );
};

export default NewTripButton;
const Container = styled.TouchableOpacity`
  margin: 5px 0;
  background-color: ${(props) => props.theme.colors.paleYellow};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 120;
  width: 50%;
  border-radius: 20px;
`;
