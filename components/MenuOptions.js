import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import StyledText from "./Text.styled";
import { useNavigation } from "@react-navigation/core";

const MenuOptions = () => {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: "#eee",
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <MenuItem
        name="New Trip"
        goTo="NewTrip"
        icon={<FontAwesome5 name="umbrella-beach" size={24} color="gray" />}
      />
      <MenuItem
        name="Hotels"
        goTo="HotelSelection"
        icon={<MaterialIcons name="hotel" size={24} color="gray" />}
      />
      <MenuItem />
      <MenuItem />
    </View>
  );
};

function MenuItem({ name, icon, goTo }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: 80,
        height: 80,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red",
      }}
      onPress={() => navigation.navigate(goTo)}
    >
      {icon}
      <StyledText style={{ paddingTop: 10, color: "darkgray" }}>
        {name}
      </StyledText>
    </TouchableOpacity>
  );
}

export default MenuOptions;
