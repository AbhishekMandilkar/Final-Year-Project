import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import Wrapper from "../components/Wrapper.styled";
import StyledText from "../components/Text.styled";
import HeaderBackButton from "../components/HeaderBackButton";

import HotelCard from "../components/HotelCard";
import { db } from "../utils/firebase/config";

const HotelRecommendationScreen = ({ navigation }) => {
  //states
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  //header Customizations
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        elevation: 0,
      },
      headerLeft: () => <HeaderBackButton navigateTo="Home" />,
    });
  }, [navigation]);
  //fetch hotels data

  useEffect(() => {
    db.collection("hotels").onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
      setLoading(false);
    });
  }, []);
  console.log(data);
  return (
    <Wrapper style={{ paddingHorizontal: 20 }}>
      <View>
        <StyledText family="Poppins" weight="medium" style={{ fontSize: 24 }}>
          Hotels
        </StyledText>
      </View>
      {isLoading ? (
        <View style={{ flex: 1, marginTop: 250 }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={HotelCard}
          ListEmptyComponent={<ActivityIndicator />}
        />
      )}
    </Wrapper>
  );
};

export default HotelRecommendationScreen;
