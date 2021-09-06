import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

import { auth } from "../firebase/config";
import { customStyledComponent } from "../styles/styledComponents";

const LoginScreen = ({ navigation }) => {
  //hide header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  //sign in user
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        if (response.additionalUserInfo.isNewUser === true) {
          navigation.navigate("NewTrip");
        } else {
          navigation.replace("Home");
        }
      })
      .catch((err) => console.error(err));
  };

  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{ backgroundColor: "white", flexDirection: "column" }}
    >
      <View
        style={{
          paddingTop: 150,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("./../assets/Vectors/LoginScreenVector.jpg")}
          style={{ height: 300, width: 300 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#2B40CA", fontWeight: "bold", fontSize: 25 }}>
          Hello Traveler👋
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          autoFocus
          mode="outlined"
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          style={customStyledComponent.styledTextInput}
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Password"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={customStyledComponent.styledTextInput}
        />
        <TouchableOpacity
          title="Login"
          onPress={signIn}
          style={[
            customStyledComponent.styledButton,
            {
              backgroundColor: "#2B40CA",
              elevation: 7,
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 25 }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ color: "black", fontSize: 15 }}>
            New User? Create account
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  formContainer: {
    padding: 30,
    height: 300,
    alignItems: "center",
  },
});
