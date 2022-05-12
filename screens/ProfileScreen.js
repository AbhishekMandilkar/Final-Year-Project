import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import StyledText from "../common/Text.styled";
import Wrapper from "../common/Wrapper.styled";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { ThemeContext } from "styled-components";
import { auth, db } from "../utils/firebase/config.js";
import { Icon, ListItem } from "react-native-elements";
import HeaderBackButton from "../common/HeaderBackButton";
const ProfileScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const theme = useContext(ThemeContext);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <Wrapper
      style={{ alignItems: "center", paddingHorizontal: windowWidth / 25 }}
    >
      <View
        style={{
          flexDirection: "row",
          width: windowWidth,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <HeaderBackButton />
      </View>
      <View
        style={{
          backgroundColor: theme.colors.gray,
          borderRadius: 20,
          // flex: 1,
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 15,
          // height: windowHeight / 7,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <StyledText family="Poppins" weight="bold" style={{ fontSize: 24 }}>
            {user?.name}
          </StyledText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <StyledText style={{ fontSize: 18, paddingRight: 5 }}>
              {user?.email}
            </StyledText>
            <FontAwesome name="edit" size={18} color="red" />
          </View>
        </View>
        <View>
          <FontAwesome name="user-circle" size={64} color="darkgray" />
        </View>
      </View>
      <View
        style={{
          // backgroundColor: ,
          borderColor: theme.colors.gray,
          borderWidth: 2,
          marginVertical: 10,
          width: "100%",
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}
      >
        <MenuOption title="Purchase History" icon={"payments"} />
        <MenuOption
          title={"Logout"}
          icon={"exit-to-app"}
          handleClick={() => auth.signOut()}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          padding: 20,
          alignItems: "center",
        }}
      >
        <StyledText style={{ color: theme.colors.gray, fontSize: 12 }}>
          Virtual-Tour-Guide
        </StyledText>
        <StyledText style={{ color: theme.colors.gray, fontSize: 12 }}>
          @2022
        </StyledText>
      </View>
    </Wrapper>
  );
};

export default ProfileScreen;

function MenuOption({ title, icon, handleClick }) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={{ flexDirection: "row" }}
      onPress={() => handleClick()}
    >
      <MaterialIcons name={icon} size={24} color={theme.colors.primary} />
      <StyledText
        family="Poppins"
        style={{ fontSize: 16, marginLeft: 10, color: "black" }}
      >
        {title}
      </StyledText>
    </TouchableOpacity>
  );
}
