import styled from "styled-components";
import { TouchableOpacity } from "react-native";

export const StyledTextInput = styled.TextInput`
  background-color: red;
  padding: 5px;
  margin: 5px 0;
  padding-left: 10px;
  border-radius: 10px;
  background-color: #f1f2f6;
  width: 270px;
  height: 40px;
`;

export const StyledButtonPrimary = styled.TouchableOpacity`
  height: 40px;
  width: 270px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  background-color: #2b40ca;
`;

// export const customStyledComponent = StyleSheet.create({
//   styledTextInputs: {
//     borderRadius: 10,
//     padding: 5,
//     height: 40,
//     paddingLeft: 10,
//     marginTop: 5,
//     marginBottom: 5,
//     // backgroundColor: "#f1f2f6",
//     width: 270,
//   },
//   styledButton: {
//     height: 40,
//     width: 270,
//     borderRadius: 10,

//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 5,
//     marginBottom: 5,
//   },
// });
