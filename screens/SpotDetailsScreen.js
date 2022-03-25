import React, { useContext, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Wrapper from "../common/Wrapper.styled";
import { Dimensions } from "react-native";
import StyledText from "../common/Text.styled";
import BtnPrimary from "../common/BtnPrimary";
import { ThemeContext } from "styled-components";
// import {  } from "react-native-gesture-handler";
const SpotDetailsScreen = ({ route, navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const { spotInfo } = route.params;

  const [clipText, setClipText] = useState(true);

  // console.log(spotInfo);
  const theme = useContext(ThemeContext);
  const handleTextSize = () => {
    setClipText(!clipText);
  };
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
          source={{ uri: spotInfo.image }}
          style={{
            width: "100%",
            height: "60%",
            borderRadius: 20,
          }}
          resizeMode="cover"
        />
        <View style={{ flex: 1, paddingVertical: 10 }}>
          <StyledText family="Poppins" weight="bold" style={{ fontSize: 24 }}>
            {spotInfo?.name}
          </StyledText>
          <ScrollView>
            <StyledText
              family="Poppins"
              style={{ fontSize: 16, color: "#4a4a4a" }}
            >
              {spotInfo.description.length <= 240 ? (
                <>{spotInfo?.description}</>
              ) : (
                <>
                  {clipText
                    ? spotInfo?.description.substring(0, 240)
                    : spotInfo?.description}
                </>
              )}
            </StyledText> 
            {spotInfo.description.length > 240 && (
              <StyledText
                family="Poppins"
                style={{ fontSize: 16, color: theme.colors.primary }}
                onPress={() => handleTextSize()}
              >
                {clipText ? "read more" : "show less"}
              </StyledText>
            )}
          </ScrollView>

          <View
            style={{
              position: "absolute",
              bottom: 0,
            }}
          >
            <BtnPrimary
              title="Visit"
              fullWidth
              radius={5}
              font="Poppins"
              weight="bold"
              width={windowWidth / 1.1}
              handleClick={() =>
                navigation.navigate("SpotDirection", {
                  spotInfo: spotInfo,
                })
              }
            />
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

export default SpotDetailsScreen;
