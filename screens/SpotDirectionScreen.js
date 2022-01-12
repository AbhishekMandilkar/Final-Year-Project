import React, { useEffect, useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import * as Location from "expo-location";
import Wrapper from "../common/Wrapper.styled";
import MapView, { Marker, MarkerAnimated } from "react-native-maps";
import { Dimensions } from "react-native";
import BtnPrimary from "../common/BtnPrimary";
const SpotDirectionScreen = ({ navigation, route }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const spotInfo = route.params.spotInfo;
  const destination = { lat: spotInfo.lat, lng: spotInfo.lng };
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        ToastAndroid.show("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  console.log(location);
  return (
    <Wrapper>
      <MapView
        style={{
          height: windowHeight / 1.5,
          marginHorizontal: 10,
          borderRadius: 20,
        }}
        mapType="mutedStandard"
        initialRegion={{
          latitude: destination.lat,
          longitude: destination.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: destination.lat,
            longitude: destination.lng,
          }}
          title={spotInfo.name}
          identifier="origin"
        />
      </MapView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          justifyContent: "center",
          // backgroundColor: "red",
          width: windowWidth,
        }}
      >
        <BtnPrimary
          title="Visit"
          fullWidth
          radius={5}
          font="Poppins"
          weight="bold"
          width={windowWidth / 1.1}
          handleClick={() =>
            navigation.navigate("SpotDirection", {
              spotInfo: spotInfo,
            })
          }
        />
      </View>
    </Wrapper>
  );
};

export default SpotDirectionScreen;
