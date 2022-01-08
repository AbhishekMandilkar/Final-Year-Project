import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import styled, { ThemeContext } from "styled-components";
import StyledText from "../common/Text.styled";
import { db } from "../utils/firebase/config";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const SpotsRecommCard = () => {
  const [isLoading, handleLoading] = useState(true);
  const [data, setData] = useState([]);
  const theme = useContext(ThemeContext);
  useEffect(() => {
    db.collection("spots").onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
      handleLoading(false);
    });
  }, []);
  console.log(data);
  return (
    <Container>
      {isLoading ? (
        <>
          <View
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieView
              autoPlay
              loop
              speed={0.8}
              style={{
                width: 72,
                height: 72,
              }}
              source={require("../assets/animations/card-loading.json")}
            />
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
            }}
          >
            <StyledText
              family="Poppins"
              weight="bold"
              style={{ color: theme.colors.darkMintGreen, fontSize: 18 }}
            >
              Spot Recommendations
            </StyledText>
          </View>
          <ScrollView style={{ marginHorizontal: 16 }}>
            {data.map((data, index) => (
              <SpotListItem key={index} spotInfo={data} />
            ))}
          </ScrollView>
        </>
      )}
    </Container>
  );
};

export default SpotsRecommCard;
const Container = styled.View`
  margin: 10px 0;
  padding: 15px;
  background-color: ${(props) => props.theme.colors.mintGreen};
  height: 30%;
  border-radius: 20px;
`;

const SpotListItem = ({ spotInfo }) => {
  let navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SpotDetails", { spotInfo })}
      style={{
        marginVertical: 4,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {spotInfo.Image ? (
        <Image
          source={{
            uri: "https://" + spotInfo.Image,
          }}
          style={{ height: 40, width: 40, borderRadius: 50 }}
        />
      ) : (
        <MaterialCommunityIcons
          name="map-marker-radius"
          size={40}
          color="#16413B"
        />
      )}

      <StyledText
        family="Poppins"
        style={{ color: "#16413B", fontSize: 14, marginLeft: 10 }}
      >
        {spotInfo?.Name}
      </StyledText>
      <Ionicons
        style={{ position: "absolute", right: 0 }}
        name="ios-arrow-forward-circle"
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};
export { SpotListItem };
