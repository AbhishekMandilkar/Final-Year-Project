import React, { useState } from "react";
import { Camera } from "expo-camera";
import { Dimensions, Image, Touchable, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import HeaderBackButton from "../common/HeaderBackButton";
import Wrapper from "../common/Wrapper.styled";
import StyledText from "../common/Text.styled";
import BtnPrimary from "../common/BtnPrimary";
function CameraScreen({ camera, stopCamera, navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [clicked, setClicked] = useState(false);
  const [image, setImage] = useState();

  const onSnap = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setImage(photo.uri);
      setClicked(true);
    }
  };

  return (
    <>
      {clicked ? (
        <Wrapper>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              // width: "90%",
              paddingHorizontal: 20,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                borderRadius: 20,
                height: windowHeight / 2,
                width: windowWidth / 1.1,
              }}
            />
            <View style={{ padding: 20 }}>
              <StyledText weight="medium" style={{ fontSize: 18 }}>
                Consectetur minim incididunt voluptate eiusmod Lorem irure ut et
                excepteur minim excepteur voluptate. Sit amet ea nostrud fugiat
                nisi proident sit consequat. Irure reprehenderit minim commodo
                voluptate ex mollit minim sunt duis non sunt proident. Amet enim
              </StyledText>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",

                width: "100%",
              }}
            >
              <BtnPrimary
                width={windowWidth / 2.5}
                title={"Home"}
                handleClick={() =>
                  navigation.reset({ index: 0, routes: [{ name: "Home" }] })
                }
              />
              <BtnPrimary
                width={windowWidth / 2.5}
                title={"Click again"}
                handleClick={() => setClicked(false)}
              />
            </View>
          </View>
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
              onPress={() => onSnap()}
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
