import { View, Text, Touchable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Wrapper from "../common/Wrapper.styled";
import StyledText from "../common/Text.styled";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { db } from "../utils/firebase/config";
import { Image } from "react-native";
import shortenText from "../helper/clipText";
import StyledTextInput from "../common/TextInput.styled";
import { AntDesign } from "@expo/vector-icons";
const SpotRecommScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [prevData, setPrevData] = useState([]);
  useEffect(() => {
    db.collection("spots").onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
      setPrevData(snapshot.docs.map((doc) => doc.data()));
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    let data = prevData.filter((data) =>
      data.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setData(data);
  }, [search]);
  return (
    <Wrapper style={{ paddingHorizontal: 20 }}>
      <View>
        <StyledText family="Poppins" weight="medium" style={{ fontSize: 24 }}>
          Spots
        </StyledText>
      </View>
      <View style={{ marginVertical: 10 }}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "#e6e6e6",
            borderRadius: 20,
          }}
        >
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            onChangeText={(text) => setSearch(text)}
            placeholder="Search here..."
            style={{ marginLeft: 10, flex: 1 }}
          />
        </View>
      </View>
      {isLoading ? (
        <>
          <View style={{ flex: 1, marginTop: 250 }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </>
      ) : (
        <>
          <ScrollView>
            {data.map((spotInfo) => (
              <TouchableOpacity
                key={spotInfo.name}
                onPress={() => navigation.navigate("SpotDetails", { spotInfo })}
                style={{ flexDirection: "row" }}
              >
                <Image
                  source={{ uri: spotInfo.image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                />
                <View style={{ padding: 10 }}>
                  <StyledText
                    family="Poppins"
                    weight="Bold"
                    style={{ fontSize: 18 }}
                  >
                    {spotInfo.name}
                  </StyledText>
                  <StyledText
                    family="Poppins"
                    weight="medium"
                    style={{ fontSize: 14, opacity: 0.5 }}
                  >
                    {shortenText(spotInfo.description, 110)}
                  </StyledText>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </Wrapper>
  );
};

export default SpotRecommScreen;
