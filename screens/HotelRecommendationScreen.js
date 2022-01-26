import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Image } from "react-native";
import Wrapper from "../common/Wrapper.styled";
import StyledText from "../common/Text.styled";
import HeaderBackButton from "../common/HeaderBackButton";

import HotelCard from "../components/HotelCard";
import { db, auth } from "../utils/firebase/config";
import axios from "axios";
import requests from "../utils/Api/EndPoints";

const HotelRecommendationScreen = ({ navigation }) => {
  //states
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [tripInfo, setTripInfo] = useState({});
  const usersRef = db.collection("trips").doc(auth?.currentUser?.uid);

  useEffect(() => {
    let body = {
      uid: auth?.currentUser?.uid,
    };
    console.log(requests.getHotels);
    axios
      .post(requests.getHotels, body)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Wrapper style={{ paddingHorizontal: 20 }}>
      <View>
        {isLoading === false && data.length > 0 && (
          <StyledText family="Poppins" weight="medium" style={{ fontSize: 24 }}>
            Hotels
          </StyledText>
        )}
      </View>
      {isLoading ? (
        <View style={{ flex: 1, marginTop: 250 }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <>
          {data.length > 0 ? (
            <>
              <FlatList
                data={data}
                renderItem={({ item }) => <HotelCard item={item} />}
                keyExtractor={(item) => item.name}
              />
            </>
          ) : (
            <>
              <View style={{ flex: 1 }}>
                <Image
                  style={{
                    width: "100%",
                    height: "60%",
                    resizeMode: "contain",
                  }}
                  source={require("../assets/vectors/Empty.png")}
                />
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <StyledText
                    family="Poppins"
                    weight="bold"
                    style={{ fontSize: 24 }}
                  >
                    Opps Coudn't find any Hotel
                  </StyledText>
                  <StyledText
                    family="Poppins"
                    weight="regular"
                    style={{
                      fontSize: 16,
                      color: "'rgba(0,0,0,0.5)'",
                      width: "70%",
                      textAlign: "center",
                    }}
                  >
                    try changing budget from previous screen
                  </StyledText>
                </View>
              </View>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default HotelRecommendationScreen;
