import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { Dimensions, Image, Touchable, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import HeaderBackButton from "../common/HeaderBackButton";
import Wrapper from "../common/Wrapper.styled";
import StyledText from "../common/Text.styled";
import BtnPrimary from "../common/BtnPrimary";
import LottieView from "lottie-react-native";
import { db } from "../utils/firebase/config";

function CameraScreen({ camera, stopCamera, navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [image, setImage] = useState("");
  const [info, setInfo] = useState("");
  const [spotInfo, setSpotInfo] = useState({});
  const url = "http://192.168.1.204:5000";
  const [isLoading, setIsLoading] = useState(true);
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", {
      name: new Date().getTime() + ".jpg",
      uri: image,
      type: "image/jpeg",
    });

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setInfo(res);
      })
      .catch((err) => console.log(err));
  };

  const onSnap = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setImage(photo.uri);
      setClicked(true);
    }
  };
  useEffect(() => {
    if (image !== "") {
      uploadImage();
    }
  }, [image]);
  useEffect(() => {
    db.collection("spots").onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  useEffect(() => {
    if (info.status === 1 && data !== []) {
      let spotInfo = data.find((spot) => {
        if (spot?.name?.includes(info.label)) {
          return spot;
        }
      });
      setIsLoading(false);
      setSpotInfo(spotInfo);
    } else if (info.status === 0) {
      setIsLoading(false);
      let spotInfo = {
        name: "No Spot Found",
        description: "Please take another picture or try again later",
      };
      setSpotInfo(spotInfo);
    }
  }, [info]);
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
              {isLoading ? (
                <>
                  <LottieView
                    autoPlay
                    loop
                    speed={0.8}
                    style={{
                      width: 72,
                      height: 72,
                    }}
                    source={require("../assets/animations/card-loading.json")}
                  />
                </>
              ) : (
                <>
                  <StyledText
                    weight="bold"
                    family="Poppins"
                    style={{ fontSize: 22 }}
                  >
                    {spotInfo?.name}
                  </StyledText>
                  <StyledText
                    weight="medium"
                    family="Poppins"
                    style={{ fontSize: 14 }}
                  >
                    {spotInfo?.description}
                  </StyledText>
                </>
              )}
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
                handleClick={() => {
                  setSpotInfo({});
                  setImage("");
                  navigation.reset({ index: 0, routes: [{ name: "Home" }] });
                }}
              />
              <BtnPrimary
                width={windowWidth / 2.5}
                title={"Click again"}
                handleClick={() => {
                  setSpotInfo({});
                  setImage("");
                  setClicked(false);
                }}
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
