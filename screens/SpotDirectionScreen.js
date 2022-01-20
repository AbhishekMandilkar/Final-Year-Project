import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import * as Location from "expo-location";
import Wrapper from "../common/Wrapper.styled";
import MapView, { Marker, MarkerAnimated } from "react-native-maps";
import { Dimensions } from "react-native";
import BtnPrimary from "../common/BtnPrimary";
import { GOOGLE_MAP_API } from "../utils/Api/apiKeys";
import MapViewDirections from "react-native-maps-directions";
import StyledText from "../common/Text.styled";
import DirectionCard from "../components/DirectionCard";
const SpotDirectionScreen = ({ navigation, route }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const spotInfo = route.params.spotInfo;
  const destination = { latitude: spotInfo.lat, longitude: spotInfo.lng };
  const [userLocation, setUserLocation] = useState();
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        ToastAndroid.show("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);
  useEffect(() => {
    mapRef.current.fitToCoordinates([userLocation, destination], {
      edgePadding: {
        top: windowHeight / 5.2,
        right: 50,
        bottom: windowHeight / 2.5,
        left: 50,
      },
    });
  }, [userLocation, destination]);

  return (
    <View>
      <MapView
        ref={mapRef}
        style={{
          height: windowHeight + 100,
          width: windowWidth,

          borderRadius: 20,
        }}
        mapType="mutedStandard"
        initialRegion={{
          latitude: destination.latitude,
          longitude: destination.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {userLocation && <Marker coordinate={userLocation} />}
        {destination && (
          <Marker
            coordinate={destination}
            title={spotInfo.name}
            identifier="origin"
          />
        )}
        {userLocation && destination && (
          <MapViewDirections
            mode="DRIVING"
            strokeWidth={3}
            lineCap="square"
            lineDashPattern={[1]}
            strokeColor="black"
            origin={userLocation}
            destination={destination}
            apikey={GOOGLE_MAP_API}
          />
        )}
      </MapView>
      <DirectionCard
        destinationName={spotInfo.name}
        destination={destination}
        origin={userLocation}
      />
    </View>
  );
};

export default SpotDirectionScreen;
