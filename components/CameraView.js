import React from "react";
import { Camera } from "expo-camera";
import { Touchable, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
function CameraView({ camera, stopCamera }) {
  return (
    <Camera
      style={{ flex: 1, width: "100%", height: "100%" }}
      ref={(r) => {
        camera = r;
      }}
    >
      <View
        style={{ flex: 1, width: "100%", height: "100%", position: "absolute" }}
      >
        <TouchableOpacity onPress={stopCamera}>
          <Entypo name="circle-with-cross" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

export default CameraView;
