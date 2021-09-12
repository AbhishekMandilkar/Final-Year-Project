import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { Button } from "react-native-elements";
import { auth, db } from "../firebase/config";
import { AntDesign } from "@expo/vector-icons";
import {
  StyledButtonPrimary,
  StyledTextInput,
} from "../styles/styledComponents";

const RegisterScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    //configure header
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "white",
        elevation: 0,
      },
      visible: false,
      headerTransparent: true,
      headerTitleStyle: { color: "white" },
      headerLeft: () => (
        <View style={{ marginLeft: 15, alignContent: "center" }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              backgroundColor: "#f1f2f6",
              borderRadius: 100,
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.replace("Login")}
          >
            <AntDesign name="left" size={20} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const registerUser = () => {
    console.log(email, password);
    //register user to FB
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        //add displayName to authUser Object
        authUser.user.updateProfile({
          displayName: username,
        });
        console.log(authUser.additionalUserInfo.isNewUser);
        //move user to set new trip
        navigation.replace("NewTrip");
      })
      .catch((error) => console.log(error.message));
  };

  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        backgroundColor: "white",
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("./../assets/Vectors/RegistrationScreenVector.jpg")}
          style={{ height: 300, width: 300 }}
        />
      </View>
      <View style={styles.formContainer}>
        <StyledTextInput
          autoFocus
          type="text"
          placeholder="Enter your Name"
          onChangeText={(text) => setUsername(text)}
        />
        <StyledTextInput
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <StyledTextInput
          placeholder="Set a password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <StyledButtonPrimary onPress={registerUser}>
          <Text style={{ color: "white", fontSize: 15 }}>Create Account</Text>
        </StyledButtonPrimary>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "green",
    height: 300,
    paddingTop: 60,
  },
});
