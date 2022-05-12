import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { Dimensions, Touchable, TouchableOpacity, View } from "react-native";
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
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeContext } from "styled-components";
const Tab = createBottomTabNavigator();
const HomeScreen = ({ navigation }) => {
  const theme = useContext(ThemeContext);
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
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    });
  }, [navigation]);
  return (
    <>
      <Wrapper homeScreen style={{ paddingHorizontal: 20 }}>
        <View>
          <View
            style={{
              margin: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <StyledText
              family="Poppins"
              weight="medium"
              style={{ fontSize: 24 }}
            >
              Hi {user?.name ? user?.name : "there"} 👋
            </StyledText>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <FontAwesome5
                name="user-circle"
                size={26}
                color={theme.colors.darkGray}
              />
            </TouchableOpacity>
          </View>
          {tripInfo !== null && <CurrentTripCard tripInfo={tripInfo} />}
          <SpotsRecommCard />

          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <CameraButton startCamera={_startCamera} />
            <NewTripButton />
          </View>
        </View>
      </Wrapper>
    </>
  );
};

export default HomeScreen;
