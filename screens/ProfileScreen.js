import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import StyledText from "../common/Text.styled";
import Wrapper from "../common/Wrapper.styled";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { ThemeContext } from "styled-components";
import { auth, db } from "../utils/firebase/config.js";
const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const theme = useContext(ThemeContext);
  return (
    <Wrapper>
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View>
            <FontAwesome name="user-circle" size={128} color="black" />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            paddingTop: 40,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.gray,
              paddingHorizontal: 10,
              marginVertical: 5,

              borderRadius: 10,
            }}
          >
            <StyledText family="Poppins" style={{ fontSize: 22 }}>
              {user?.name}
            </StyledText>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.gray,
              paddingHorizontal: 10,

              borderRadius: 10,
            }}
          >
            <TouchableOpacity onPress={() => auth.signOut()}>
              <StyledText family="Poppins" style={{ fontSize: 22 }}>
                {user?.email}
              </StyledText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

export default ProfileScreen;
