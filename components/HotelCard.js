import React from "react";
import { Image } from "react-native";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import StyledText from "./Text.styled";
import { AntDesign } from "@expo/vector-icons";
const HotelCard = ({ item }) => {
  const nav = useNavigation();

  return (
    <CardContainer onPress={() => nav.navigate("HotelInfo", { data: item })}>
      <CardImage source={{ uri: item.imageUrl }} />
      <CardInfo>
        <Details>
          <StyledText family="Poppins" weight="medium" style={{ fontSize: 20 }}>
            {item.name}
          </StyledText>
          <StyledText family="Lato" style={{ color: "gray" }}>
            City name
          </StyledText>
        </Details>
        <Rating>
          <AntDesign
            name="staro"
            size={24}
            color="black"
            style={{ paddingRight: 5 }}
          />
          <StyledText>{item.rating}</StyledText>
        </Rating>
      </CardInfo>
    </CardContainer>
  );
};

export default HotelCard;

const CardContainer = styled.TouchableOpacity`
  margin: 20px 0;
  border-radius: 20px;
  flex-direction: row;
`;
const CardImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 25px;
`;
const CardInfo = styled.View`
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;
const Rating = styled.View`
  padding-bottom: 10px;
  flex-direction: row;
  align-items: center;
`;
const Details = styled.View`
  justify-content: flex-start;
`;
