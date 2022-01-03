import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";
const CameraButton = () => {
  return (
    <Container>
      <MaterialIcons name="photo-camera" size={42} color={"white"} />
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
  height: 24%;
  border-radius: 20px;
`;
