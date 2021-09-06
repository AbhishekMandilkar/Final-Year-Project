import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { FAB, Button, Slider } from "react-native-elements";
//test
import { auth, db } from "../firebase/config";

const NewTripScreen = ({ navigation }) => {
  //customize header
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTransparent: true,
      headerLeft: () => (
        <View style={{ marginLeft: 15, alignContent: "center" }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              auth
                .signOut()
                .then(() => {
                  console.log("user signed out");
                  navigation.replace("Login");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const authUserId = auth?.currentUser?.uid; //get authenticated users unique id

  const setUserTripInfo = () => {
    //push user data to firestore
    db.collection("users")
      .doc(authUserId) //usiing auth users uniq id as document id in firestore
      .set({ numberOfDays: noOfDays, userBudget: userBudget })
      .catch((err) => {
        console.log(err);
      });
  };

  //states
  const [getStarted, setGetStarted] = useState(false);
  const [userBudget, setUserBudget] = useState("");
  const [noOfDays, setNoOfDays] = useState("");

  return (
    <View
      style={{
        marginTop: Platform.OS === "android" ? 25 : 0,
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "red",
      }}
    >
      {getStarted ? (
        <KeyboardAvoidingView
          style={{
            padding: 25,
            // height: 400,
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            justifyContent: "center",
          }}
        >
          <TextInput
            placeholder="Enter your budget"
            value={userBudget}
            onChangeText={(text) => setUserBudget(text)}
            keyboardType="number-pad"
            autoFocus
          />
          <Text>Selct Number of Days</Text>
          <TextInput
            placeholder="Days"
            value={noOfDays}
            onChangeText={(text) => setNoOfDays(text)}
            keyboardType="number-pad"
          />

          <Button title="Submit" onPress={setUserTripInfo} />
        </KeyboardAvoidingView>
      ) : (
        <View
          style={{
            padding: 25,
            // height: 400,
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 32, padding: 20 }}>Get started</Text>
          <FAB
            size="large"
            onPress={() => {
              setGetStarted(true);
            }}
            color="blue"
            icon={<Ionicons name="arrow-forward" size={24} color="white" />}
          />
        </View>
      )}
    </View>
  );
};

export default NewTripScreen;
