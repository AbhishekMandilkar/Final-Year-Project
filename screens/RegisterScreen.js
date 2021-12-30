import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { auth, db } from "../utils/firebase/config.js";
import HeaderBackButton from "../common/HeaderBackButton";
import StyledTextInput from "../common/TextInput.styled.js";
import Wrapper from "../common/Wrapper.styled.js";
import StyledText from "../common/Text.styled.js";
import BtnPrimary from "../common/BtnPrimary.js";
import { UserContext } from "../contexts/userContext.js";

const RegisterScreen = ({ navigation }) => {
  //states
  const { userName, setUserName } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
        console.log("Sucess");
        auth.currentUser.updateProfile({ displayName: name });
      })
      .then(() => {
        console.log("after name update");
        console.log(auth.currentUser);
      })
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
          onChangeText={(text) => {
            setName(text);
          }}
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
