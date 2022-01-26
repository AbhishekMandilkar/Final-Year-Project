import React, { useState } from "react";
import { Camera } from "expo-camera";
import { Dimensions, Image, Touchable, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import HeaderBackButton from "../common/HeaderBackButton";
import Wrapper from "../common/Wrapper.styled";
import StyledText from "../common/Text.styled";
function CameraScreen({ camera, stopCamera }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [clicked, setClicked] = useState(false);
  const [image, setImage] = useState();
  return (
    <>
      {clicked ? (
        <Wrapper>
          <TouchableOpacity
            onPress={() => setClicked(false)}
            style={{
              backgroundColor: "Red",
            }}
          >
            <StyledText>go back</StyledText>
          </TouchableOpacity>
          {/* <Image source={{ uri: image }} style={{ height: 100, width: 100 }} /> */}
        </Wrapper>
      ) : (
        <Camera
          style={{ flex: 1, width: "100%", height: "100%" }}
          ref={(r) => {
            camera = r;
          }}
          ratio="16:9"
        >
          <View
            style={{
              width: "100%",
              bottom: 0,
              position: "absolute",
              height: windowHeight / 6,
              flexDirection: "row",
              justifyContent: "space-evenly",
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
              onPress={async () => {
                if (camera) {
                  let photo = await camera.takePictureAsync();
                  setImage(photo);
                  setTimeout(() => {
                    setClicked(true);
                  }, 3000);
                }
              }}
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
      )}
    </>
  );
}

export default CameraScreen;
