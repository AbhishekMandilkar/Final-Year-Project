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

import SpotsRecommCard from "../components/SpotsRecommCard.js";
import NewTripButton from "../components/NewTripButton.js";
import { auth, db } from "../utils/firebase/config.js";
import CameraScreen from "./CameraScreen.js";
const Tab = createBottomTabNavigator();
const HomeScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  let camera = useRef(null);
  const user = useSelector(selectUser);
  const [tripInfo, setTripInfo] = useState({});
  const [startCamera, setStartCamera] = useState(false);
  const usersRef = db.collection("trips").doc(auth?.currentUser?.uid);
  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      console.log(status);
    };
    getPermissions();
  }, []);
  const _startCamera = () => {
    navigation.navigate("Camera", camera);
  };

  useEffect(() => {
    usersRef.get().then((docSnap) => {
      if (docSnap.exists) {
        usersRef.onSnapshot((doc) => {
          setTripInfo(doc.data());
        });
      } else {
        setTripInfo(null);
      }
    });
  }, []);
  return (
    <>
      <Wrapper homeScreen style={{ paddingHorizontal: 20 }}>
        <View>
          <StyledText family="Poppins" weight="medium" style={{ fontSize: 24 }}>
            Hi {user?.name ? user?.name : "there"} 👋
          </StyledText>
          {tripInfo !== null && <CurrentTripCard tripInfo={tripInfo} />}

          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <CameraButton startCamera={_startCamera} />
            <NewTripButton />
          </View>
          <SpotsRecommCard />
        </View>
      </Wrapper>
    </>
  );
};

export default HomeScreen;
