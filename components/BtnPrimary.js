import styled from "styled-components";

const Button = styled.TouchableOpacity`
  padding: 15px;
  width: ${(props) => (props.width ? `${props.width}px` : `270px`)};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  background-color: ${(props) => `${props.theme.colors.primary}`};
`;

const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 15px;
  font-family: "Lato";
`;

import React from "react";

function BtnPrimary({ title, handleClick, width }) {
  return (
    <Button onPress={handleClick} width={width}>
      <ButtonTitle>{title}</ButtonTitle>
    </Button>
  );
}

export default BtnPrimary;
