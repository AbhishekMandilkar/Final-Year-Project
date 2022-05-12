import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import LottieView from "lottie-react-native";
import { Button, Icon, Image } from "react-native-elements";
import styled, { ThemeContext } from "styled-components";
import BtnPrimary from "../common/BtnPrimary";
import HeaderBackButton from "../common/HeaderBackButton";
import StyledText from "../common/Text.styled";
import Wrapper from "../common/Wrapper.styled";
import { SliderBox } from "react-native-image-slider-box";
import { auth, db } from "../utils/firebase/config";

const HotelInfoScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const theme = useContext(ThemeContext);
  const data = route.params.data;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const authUserId = auth?.currentUser?.uid;
  const handleBookingUpdateInfo = () => {
    setIsLoading(true);
    //push user data to firestore
    let docRef = db.collection("trips").doc(authUserId);
    return docRef
      .update({
        hotelName: data.name,
        hotelLocation: { lat: data.lat, lng: data.lng },
      })
      .then(() => {
        console.log("Document successfully updated!");
        setSuccess(true);
        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        }, 2500);
      })
      .catch((err) => console.log(err));
    // db.collection("trips")
    //   .doc(authUserId) //usiing auth users uniq id as document id in firestore
    //   .add({
    //     hotelName: data.name,
    //     hotelLocation: { lat: data.lat, lng: data.lng },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setIsLoading(false);
    //     setModalVisible(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              width: windowWidth / 1.1,

              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            {success ? (
              <>
                <LottieView
                  source={require("../assets/animations/success.json")}
                  autoPlay
                  loop
                  speed={0.8}
                  style={{
                    width: 200,
                    height: 200,

                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  resizeMode="cover"
                />
                <StyledText
                  family="Poppins"
                  weight="medium"
                  style={{
                    fontSize: 24,
                    color: "#000",
                    textAlign: "center",
                    marginTop: windowHeight / 50,
                  }}
                >
                  {`${data.name} has been booked!`}
                </StyledText>
              </>
            ) : (
              <>
                <Image
                  source={{ uri: data?.image[0] }}
                  style={{ height: 100, width: 100, borderRadius: 50 }}
                />
                <StyledText
                  family="Poppins"
                  weight="medium"
                  style={{
                    fontSize: 24,
                    color: "#000",
                    textAlign: "center",
                    marginTop: windowHeight / 50,
                  }}
                >
                  {`Are you Sure you want to book ${data.name}?`}
                </StyledText>
                <StyledText
                  family="Poppins"
                  weight="medium"
                  style={{
                    fontSize: 18,
                    color: "rgba(0,0,0,0.5)",
                    marginTop: windowHeight / 50,
                  }}
                >
                  {`Cost :${data?.cost}₹/Night`}
                </StyledText>
                <View
                  style={{
                    width: "100%",
                    marginTop: windowHeight / 30,
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onPress={() => {
                      navigation.navigate("Checkout", {
                        amount: data?.cost,
                        hotelName: data?.name,
                      });
                      setModalVisible(!modalVisible);
                    }}
                    loading={isLoading}
                    title={
                      <StyledText
                        family="Poppins"
                        weight="bold"
                        style={{
                          color: "#fff",
                          flexDirection: "row",
                          alignItems: "center",
                          fontSize: 18,
                        }}
                      >
                        Book
                      </StyledText>
                    }
                    type="solid"
                    buttonStyle={{
                      backgroundColor: theme.colors.primary,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                    }}
                    containerStyle={{
                      borderRadius: 10,
                      margin: 5,
                      alignSelf: "stretch",
                    }}
                  />
                  <Button
                    onPress={() => {
                      setIsLoading(false);
                      setModalVisible(!modalVisible);
                    }}
                    title={
                      <StyledText
                        family="Poppins"
                        weight="bold"
                        style={{
                          color: theme.colors.primary,
                          flexDirection: "row",
                          alignItems: "center",
                          fontSize: 16,
                        }}
                      >
                        Cancel
                      </StyledText>
                    }
                    type="solid"
                    containerStyle={{
                      borderRadius: 10,
                      margin: 5,
                    }}
                    buttonStyle={{
                      backgroundColor: "#fff",
                    }}
                    titleStyle={{
                      color: theme.colors.primary,
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      <Wrapper>
        <View
          style={{
            height: windowHeight / 30,
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
            position: "relative",
          }}
        >
          <View
            style={{
              position: "absolute",
              left: 0,
              // paddingTop: 15,
            }}
          >
            <HeaderBackButton />
          </View>
        </View>
        <View>
          <SliderBox
            sliderBoxHeight={windowHeight / 2}
            parentWidth={windowWidth}
            images={data?.image}
            dotColor={theme.colors.primary}
            inactiveDotColor="#90A4AE"
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 15,
              marginHorizontal: 10,
              padding: 0,
              margin: 0,
            }}
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10,
            }}
            ImageComponentStyle={{
              borderRadius: 20,
              width: "97%",
              marginTop: 10,
            }}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            paddingHorizontal: 16,
            paddingTop: 20,
          }}
        >
          <StyledText
            family="Poppins"
            weight="bold"
            style={{ fontSize: 36, textAlign: "center" }}
          >
            {data.name}
          </StyledText>
          <StyledText
            family="Poppins"
            weight="medium"
            style={{ fontSize: 18, color: "rgba(0,0,0,0.5)" }}
          >
            {`Cost :${data?.cost}₹/Night`}
          </StyledText>

          <View
            style={{
              width: "100%",
              position: "absolute",
              bottom: 0,
              paddingTop: windowHeight / 30,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onPress={() => setModalVisible(true)}
              title={
                <StyledText
                  family="Poppins"
                  weight="bold"
                  style={{
                    color: "#fff",
                    flexDirection: "row",
                    alignItems: "center",
                    fontSize: 18,
                  }}
                >
                  Book
                </StyledText>
              }
              buttonStyle={{
                borderWidth: 0,
                borderColor: "transparent",
                borderRadius: 10,
                backgroundColor: theme.colors.primary,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              containerStyle={{
                width: "100%",

                marginHorizontal: 50,
                marginVertical: 10,
              }}
              icon={{
                name: "arrow-right",
                type: "font-awesome",
                size: 15,
                color: "white",
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
            />
          </View>
        </View>
      </Wrapper>
    </>
  );
};

export default HotelInfoScreen;

const HotelImage = styled.Image`
  width: 95%;
  height: 55%;
  border-radius: 20px;
`;
const Category = styled.TouchableOpacity`
  background-color: ${(props) => `${props.theme.colors.primary}`};
  border-radius: 20px;
  padding: 5px 8px;
  margin-left: 5px;
`;

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
});
