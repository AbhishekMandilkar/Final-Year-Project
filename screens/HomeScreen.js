import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { db, auth } from "../firebase/config";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Button } from "react-native-elements";

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <SimpleLineIcons
          onPress={signUserOut}
          name="logout"
          size={24}
          color="black"
        />
      ),
      // headerTransparent: true,
    });
  }, [navigation]);

  const name = auth.currentUser.displayName;

  const signUserOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("user signed out");
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView
      style={{ paddingTop: Platform.OS === "android" ? 25 : 0, flex: 1 }}
    >
      <View>
        <Text>HI from {name}</Text>
      </View>
      <Button title=" NewTrip" onPress={() => navigation.navigate("NewTrip")} />
      <Button
        title="Hotels"
        onPress={() => navigation.navigate("HotelSelection")}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
