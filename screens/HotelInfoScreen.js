import { AntDesign } from "@expo/vector-icons";
import React, { useLayoutEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "react-native-elements";
import styled from "styled-components";
import BtnPrimary from "../components/BtnPrimary";
import HeaderBackButton from "../components/HeaderBackButton";
import StyledText from "../components/Text.styled";
import Wrapper from "../components/Wrapper.styled";

const HotelInfoScreen = ({ navigation, route }) => {
  //header Customizations
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const data = route.params.data;
  console.log(data);
  return (
    <Wrapper>
      <View
        style={{
          height: "100%",
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 20,
          position: "relative",
        }}
      >
        <HotelImage source={{ uri: data.imageUrl }} />
        <View
          style={{
            position: "absolute",
            left: 0,
            paddingTop: 15,
            paddingLeft: 5,
          }}
        >
          <HeaderBackButton goBack />
        </View>
      </View>

      <View
        style={{
          // backgroundColor: "red",
          bottom: 0,
          position: "absolute",
          width: "100%",
          height: "40%",
          paddingHorizontal: 16,
        }}
      >
        <StyledText family="Poppins" weight="bold" style={{ fontSize: 24 }}>
          {data.name}
        </StyledText>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
          }}
        >
          {data.categories.map((category) => (
            <Category>
              <StyledText style={{ fontSize: 16, color: "white" }}>
                {category.toString()}
              </StyledText>
            </Category>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <AntDesign name="star" size={24} color="gold" />
          <StyledText style={{ fontSize: 16, marginLeft: 8 }}>
            {" "}
            {data.rating}
          </StyledText>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <AntDesign name="message1" size={24} color="black" />
          <StyledText style={{ fontSize: 16, marginLeft: 8 }}>
            {data.reviews}
          </StyledText>
        </View>
        <View
          style={{
            bottom: 0,
            position: "absolute",
            width: "110%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <BtnPrimary
            title="Book"
            fullWidth
            radius={5}
            family="Poppins"
            weight="bold"
          />
        </View>
      </View>
    </Wrapper>
  );
};

export default HotelInfoScreen;

const HotelImage = styled.Image`
  width: 95%;
  height: 55%;
  border-radius: 20px;
`;
const Category = styled.TouchableOpacity`
  background-color: ${(props) => `${props.theme.colors.primary}`};
  border-radius: 20px;
  padding: 5px 8px;
  margin-left: 5px;
`;
