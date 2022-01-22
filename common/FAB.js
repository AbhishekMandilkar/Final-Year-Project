import styled from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";
const StyledFAB = styled.TouchableOpacity`
  ${(props) => props.NewTripScreen && `background-color: #1FCBE3;`}
  border-radius: 100;
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

import React from "react";

function FAB({ NewTripScreen, setGetStarted }) {
  return (
    <StyledFAB
      NewTripScreen={NewTripScreen}
      onPress={() => setGetStarted(true)}
    >
      <MaterialIcons name="navigate-next" size={48} color="black" />
    </StyledFAB>
  );
}

export default FAB;
