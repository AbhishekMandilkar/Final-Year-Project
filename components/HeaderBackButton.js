import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
const HeaderBackButton = ({ navigateTo, NewTripScreen }) => {
  const navigation = useNavigation();

  return (
    // <View style={{  }}
    <StyledHeaderButton
      NewTripScreen={NewTripScreen}
      activeOpacity={0.5}
      onPress={() => navigation.replace(navigateTo)}
    >
      <AntDesign name="left" size={20} color="black" />
    </StyledHeaderButton>
    // </View>
  );
};

export default HeaderBackButton;

const StyledHeaderButton = styled.TouchableOpacity`
  margin-left: 15px;
  align-content: center;
  background-color: #f1f2f6;
  border-radius: 100px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  ${(props) => props.NewTripScreen && `background-color: #1FCBE3;`}
`;
