import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const HeaderBackButton = ({ navigateTo }) => {
  const navigation = useNavigation();

  return (
    // <View style={{  }}
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        marginLeft: 15,
        alignContent: "center",
        backgroundColor: "#f1f2f6",
        borderRadius: 100,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => navigation.replace(navigateTo)}
    >
      <AntDesign name="left" size={20} color="black" />
    </TouchableOpacity>
    // </View>
  );
};

export default HeaderBackButton;
