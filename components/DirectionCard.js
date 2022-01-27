import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import StyledText from "../common/Text.styled";
import BtnPrimary from "../common/BtnPrimary";
import getDestinationMetric from "../helper/getDestinationMatrix";
import LottieView from "lottie-react-native";
import axios from "axios";
import { Button } from "react-native-elements";
import getDirections from "react-native-google-maps-directions";
import { AntDesign } from "@expo/vector-icons";
import { API_URL } from "@env";
import requests, { getMetrics } from "../utils/Api/EndPoints";
const DirectionCard = ({ destinationName, destination, origin }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [spotMetrics, setMetrics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log("user", origin);
  useEffect(() => {
    const getDistanceMetrics = async () => {
      let body = {
        org: origin,
        dst: destination,
      };
      console.log("origin", origin);
      console.log("destination", destination);
      console.log(requests.getDistanceMetrics);
      await axios
        .post(requests.getDistanceMetrics, body, {})
        .then((res) => {
          // console.log(res.data);
          setMetrics(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };
    if (origin && destination) {
      getDistanceMetrics();
    }
  }, [origin, destination]);
  const handleGetDirections = () => {
    const data = {
      source: origin,
      destination: destination,
      params: [
        {
          key: "travelmode",
          value: "driving", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };
    getDirections(data);
  };
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        height: windowHeight / 2.8,
        width: windowWidth,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 15,
        paddingTop: 20,
      }}
    >
      {isLoading ? (
        <>
          <View
            style={{
              // backgroundColor: "red",
              width: "100%",
              height: "100%",

              alignItems: "center",
            }}
          >
            <LottieView
              source={require("../assets/animations/processing.json")}
              autoPlay
              loop
              style={{ width: windowWidth / 2, height: windowHeight / 4.5 }}
              speed={1.5}
            />
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              backgroundColor: "#e3e3e3",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "stretch",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                width: windowWidth / 2.8,
                backgroundColor: "#000",
                justifyContent: "center",
                alignItems: "center",

                borderRadius: 20,
              }}
            >
              <StyledText
                family="Poppins"
                style={{ color: "#fff", fontSize: 12 }}
              >
                Your Location
              </StyledText>
            </View>
            <View style={{ justifyContent: "center" }}>
              <AntDesign name="right" size={22} color="black" />
            </View>
            <View
              style={{
                width: windowWidth / 2.8,

                backgroundColor: "#000",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 15,
                paddingVertical: 8,
                borderRadius: 20,
              }}
            >
              <StyledText
                family="Poppins"
                style={{ color: "#fff", fontSize: 12 }}
              >
                {destinationName}
              </StyledText>
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
              paddingTop: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <StyledText
              family="Poppins"
              weight="bold"
              style={{ color: "black", fontSize: 18 }}
            >
              {spotMetrics?.distance}
            </StyledText>

            <StyledText
              family="Poppins"
              weight="bold"
              style={{ color: "black", fontSize: 18 }}
            >
              {spotMetrics?.time}
            </StyledText>
          </View>
          <View
            style={{
              width: "100%",
              // height: "100%",
              paddingTop: windowHeight / 30,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onPress={handleGetDirections}
              title={
                <StyledText
                  family="Poppins"
                  weight="bold"
                  style={{
                    color: "#fff",
                    flexDirection: "row",
                    alignItems: "center",
                    fontSize: 18,
                  }}
                >
                  Start
                </StyledText>
              }
              buttonStyle={{
                borderWidth: 0,
                borderColor: "transparent",
                borderRadius: 10,
                backgroundColor: "black",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              containerStyle={{
                width: "100%",

                marginHorizontal: 50,
                marginVertical: 10,
              }}
              icon={{
                name: "arrow-right",
                type: "font-awesome",
                size: 15,
                color: "white",
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default DirectionCard;
