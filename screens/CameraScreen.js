import React from "react";
import { Camera } from "expo-camera";
import { Dimensions, Touchable, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import HeaderBackButton from "../common/HeaderBackButton";
function CameraScreen({ camera, stopCamera }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <Camera
      style={{ flex: 1, width: "100%", height: "100%" }}
      ref={(r) => {
        camera = r;
      }}
    >
      <View
        style={{
          width: "100%",
          bottom: 0,
          position: "absolute",
          height: windowHeight / 6,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            width: windowWidth / 3,
            paddingTop: 30,
            justifyContent: "center",
          }}
        >
          <HeaderBackButton goBack color="#fff" size={35} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: windowWidth / 3,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Icon
            raised
            name="circle"
            type="font-awesome"
            color="#fff"
            size={40}
            onPress={() => console.log("hello")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: windowWidth / 3,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 20,
          }}
        ></TouchableOpacity>
      </View>
    </Camera>
  );
}

export default CameraScreen;
