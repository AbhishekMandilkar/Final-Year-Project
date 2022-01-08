import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";
const CameraButton = ({ startCamera }) => {
  return (
    <Container onPress={startCamera}>
      <LottieView
        source={require("../assets/animations/camera.json")}
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
      {/* <MaterialIcons name="photo-camera" size={42} color={"white"} /> */}
    </Container>
  );
};

export default CameraButton;
const Container = styled.TouchableOpacity`
  margin: 5px 0;
  background-color: #7c2d27;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 20%;
  border-radius: 20px;
`;
