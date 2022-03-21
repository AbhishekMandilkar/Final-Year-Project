import React, { useContext, useEffect, useRef, useState } from "react";
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
import { Icon } from "react-native-elements";
import shortenText from "../helper/clipText";
const SpotsRecommCard = () => {
  const [isLoading, handleLoading] = useState(true);
  const [data, setData] = useState([]);

  const theme = useContext(ThemeContext);
  const scrollViewRef = useRef();
  useEffect(() => {
    db.collection("spots").onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
      handleLoading(false);
    });
  }, []);
  useEffect(() => {
    if (data && data.length > 0) {
      scrollViewRef.current.scrollTo({ x: 50, y: 0, animated: true });
      // scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [scrollViewRef]);

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
              Some Spots you may like...
            </StyledText>
          </View>
          <ScrollView ref={scrollViewRef} horizontal style={{ height: "21%" }}>
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
  /* background-color: ${(props) => props.theme.colors.mintGreen}; */
  /* height: %; */
  border-radius: 20px;
`;

const SpotListItem = ({ spotInfo }) => {
  let navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SpotDetails", { spotInfo })}
      style={{
        marginVertical: 10,
        marginHorizontal: 5,
        width: 80,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
      }}
    >
      {spotInfo.image ? (
        <Image
          source={{
            uri: spotInfo.image,
          }}
          style={{ height: 65, width: 65, borderRadius: 50 }}
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
        style={{
          paddingTop: 10,
          color: "#16413B",
          fontSize: 12,
          // marginLeft: 10,
          textAlign: "center",
        }}
      >
        {shortenText(spotInfo?.name, 15)}
      </StyledText>
    </TouchableOpacity>
  );
};
export { SpotListItem };
