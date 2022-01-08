import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { Dimensions, View } from "react-native";
import Wrapper from "../common/Wrapper.styled.js";
import StyledText from "../common/Text.styled.js";
import CurrentTripCard from "../components/CurrentTripCard.js";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice.js";
import CameraButton from "../components/CameraButton.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Permissions from "expo-permissions";
import CameraView from "../components/CameraView.js";
import SpotsRecommCard from "../components/SpotsRecommCard.js";
const Tab = createBottomTabNavigator();
const HomeScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  let camera = useRef(null);
  const user = useSelector(selectUser);
  const [startCamera, setStartCamera] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      console.log(status);
    };
    getPermissions();
  }, []);
  const _startCamera = () => {
    setStartCamera(true);
    console.log("hi");
  };
  const _stopCamera = () => {
    setStartCamera(false);
  };
  return (
    <>
      {startCamera ? (
        <>
          <CameraView stopCamera={_stopCamera} camera={camera} />
        </>
      ) : (
        <Wrapper homeScreen style={{ paddingHorizontal: 20 }}>
          <View>
            <StyledText
              family="Poppins"
              weight="medium"
              style={{ fontSize: 24 }}
            >
              Hi {user?.name ? user?.name : "there"} 👋
            </StyledText>
            <CurrentTripCard />
            <SpotsRecommCard />
            <CameraButton startCamera={_startCamera} />
          </View>
        </Wrapper>
      )}
    </>
  );
};

export default HomeScreen;
