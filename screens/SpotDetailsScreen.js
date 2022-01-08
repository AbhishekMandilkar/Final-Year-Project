import React from "react";
import { View, Text, Image } from "react-native";
import Wrapper from "../common/Wrapper.styled";
import { Dimensions } from "react-native";
import StyledText from "../common/Text.styled";
import BtnPrimary from "../common/BtnPrimary";
const SpotDetailsScreen = ({ route, navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const { spotInfo } = route.params;
  console.log(spotInfo);
  return (
    <Wrapper>
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          paddingHorizontal: 15,
          flex: 1,
        }}
      >
        <Image
          source={{ uri: "https://" + spotInfo.Image }}
          style={{
            width: "100%",
            height: "60%",
            borderRadius: 20,
          }}
        />
        <View style={{ flex: 1, paddingVertical: 10 }}>
          <StyledText family="Poppins" weight="bold" style={{ fontSize: 24 }}>
            {spotInfo?.Name}
          </StyledText>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <BtnPrimary
              title="Visit"
              fullWidth
              radius={5}
              family="Poppins"
              weight="bold"
            />
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

export default SpotDetailsScreen;
