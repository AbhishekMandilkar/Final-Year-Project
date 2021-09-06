import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Rating } from "react-native-elements";

import { AntDesign } from "@expo/vector-icons";

const HotelRecommendationScreen = ({ navigation }) => {
  //header Customizations
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",

      headerTransparent: false,
      //   header: null,
      headerStyle: {
        // position: "absolute",
        backgroundColor: "white",
        elevation: 0,
      },
      headerTitleStyle: { color: "white" },
      headerLeft: () => (
        <View style={{ marginLeft: 15, alignContent: "center" }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Home")}
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text style={{ fontSize: 24, marginLeft: 8 }}>Recommended Hotels</Text>
      <ScrollView style={{ marginTop: 15 }}>
        <View>
          <Image source={{ uri: "https://picsum.photos/400/300" }} />
          <View>
            <View>
              <Text>Name</Text>
              <Text>Cost</Text>
            </View>
            <Rating readonly imageSize={20} count={5} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HotelRecommendationScreen;
