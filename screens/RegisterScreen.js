import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { auth, db } from "../utils/firebase/config.js";
import HeaderBackButton from "../components/HeaderBackButton";
import StyledTextInput from "../components/TextInput.styled.js";
import Wrapper from "../components/Wrapper.styled.js";
import StyledText from "../components/Text.styled.js";
import BtnPrimary from "../components/BtnPrimary.js";

const RegisterScreen = ({ navigation }) => {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  useLayoutEffect(() => {
    //configure header
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "white",
        elevation: 0,
      },
      visible: false,
      headerTitleStyle: { color: "white" },
      headerLeft: () => <HeaderBackButton navigateTo="Login" />,
    });
  }, [navigation]);

  const registerUser = () => {
    console.log("evokes");
    //register user to FB
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const user = firebase.auth().currentUser;
        return user.updateProfile({
          displayName: userName,
        });
      })
      .then((user) => console.log(user))
      .catch((error) => console.log(error.message));
  };

  return (
    <Wrapper>
      <View style={{ alignItems: "center", paddingVertical: 40 }}>
        <View style={{ padding: 30 }}>
          <StyledText family="Poppins" weight="bold" style={{ fontSize: 36 }}>
            Get Started
          </StyledText>
          <StyledText family="Poppins" weight="light" style={{ fontSize: 16 }}>
            Let's create your account
          </StyledText>
        </View>

        <StyledTextInput
          placeholder="Name"
          onChangeText={(text) => setUsername(text)}
          width={270}
        />
        <StyledTextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          width={270}
        />
        <StyledTextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          width={270}
        />
        <BtnPrimary title="Sign Up" handleClick={registerUser} width={270} />
      </View>
    </Wrapper>
  );
};
export default RegisterScreen;
