import { View, Text, Dimensions } from "react-native";
import React from "react";
import StyledText from "../common/Text.styled";
import BtnPrimary from "../common/BtnPrimary";

const DirectionCard = ({ destinationName, destination, origin }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        height: windowHeight / 2.8,
        width: windowWidth,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 15,
        paddingTop: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "#e3e3e3",
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: 20,
        }}
      >
        <View
          style={{
            width: windowWidth / 2.8,
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",

            borderRadius: 20,
          }}
        >
          <StyledText family="Poppins" style={{ color: "#fff", fontSize: 12 }}>
            Your Location
          </StyledText>
        </View>

        <View
          style={{
            width: windowWidth / 2.8,

            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <StyledText family="Poppins" style={{ color: "#fff", fontSize: 12 }}>
            {destinationName}
          </StyledText>
        </View>
      </View>
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <StyledText
          family="Poppins"
          weight="bold"
          style={{ color: "black", fontSize: 18 }}
        >
          112Km
        </StyledText>
        <StyledText
          family="Poppins"
          weight="bold"
          style={{ color: "black", fontSize: 18 }}
        >
          9hr 2mins
        </StyledText>
      </View>
      {/* <BtnPrimary
        style={{ bottom: 0 }}
        title="Visit"
        fullWidth
        radius={5}
        font="Poppins"
        weight="bold"
        width={windowWidth / 1.05}
        handleClick={() =>
          navigation.navigate("SpotDirection", {
            spotInfo: spotInfo,
          })
        }
      /> */}
    </View>
  );
};

export default DirectionCard;
