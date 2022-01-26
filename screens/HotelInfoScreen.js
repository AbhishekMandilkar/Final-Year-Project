import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useLayoutEffect } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Button, Image } from "react-native-elements";
import styled, { ThemeContext } from "styled-components";
import BtnPrimary from "../common/BtnPrimary";
import HeaderBackButton from "../common/HeaderBackButton";
import StyledText from "../common/Text.styled";
import Wrapper from "../common/Wrapper.styled";
import { SliderBox } from "react-native-image-slider-box";
const HotelInfoScreen = ({ navigation, route }) => {
  const theme = useContext(ThemeContext);
  const data = route.params.data;
  console.log(data);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <Wrapper>
      <View
        style={{
          height: windowHeight / 30,
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 20,
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            left: 0,
            // paddingTop: 15,
          }}
        >
          <HeaderBackButton />
        </View>
      </View>
      <View>
        <SliderBox
          sliderBoxHeight={windowHeight / 2}
          parentWidth={windowWidth}
          images={data?.image}
          dotColor={theme.colors.primary}
          inactiveDotColor="#90A4AE"
          dotStyle={{
            width: 15,
            height: 15,
            borderRadius: 15,
            marginHorizontal: 10,
            padding: 0,
            margin: 0,
          }}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 10,
          }}
          ImageComponentStyle={{
            borderRadius: 20,
            width: "97%",
            marginTop: 10,
          }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 20,
        }}
      >
        <StyledText
          family="Poppins"
          weight="bold"
          style={{ fontSize: 36, textAlign: "center" }}
        >
          {data.name}
        </StyledText>
        <StyledText
          family="Poppins"
          weight="medium"
          style={{ fontSize: 18, color: "rgba(0,0,0,0.5)" }}
        >
          {`Cost :${data?.cost}₹/Night`}
        </StyledText>

        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            paddingTop: windowHeight / 30,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            // onPress={handleGetDirections}
            title={
              <StyledText
                family="Poppins"
                weight="bold"
                style={{
                  color: "#fff",
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: 18,
                }}
              >
                Book
              </StyledText>
            }
            buttonStyle={{
              borderWidth: 0,
              borderColor: "transparent",
              borderRadius: 10,
              backgroundColor: theme.colors.primary,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            containerStyle={{
              width: "100%",

              marginHorizontal: 50,
              marginVertical: 10,
            }}
            icon={{
              name: "arrow-right",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
            iconRight
            iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
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
