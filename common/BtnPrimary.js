import styled from "styled-components";

const Button = styled.TouchableOpacity`
  padding: 15px;
  width: ${(props) =>
    props.width ? `${props.width}px` : props.fullWidth ? `100%` : `270px`};
  border-radius: ${(props) => (props.radius ? `${props.radius}px` : `20px`)};

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 2px;
  background-color: ${(props) => `${props.theme.colors.primary}`};
`;

const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 15px;
  font-family: Pop;
`;

import React from "react";

function BtnPrimary({ title, handleClick, width, radius, font, fullWidth }) {
  return (
    <Button
      onPress={handleClick}
      width={width}
      radius={radius}
      fullwidth={fullWidth}
    >
      <ButtonTitle family={font}>{title}</ButtonTitle>
    </Button>
  );
}

export default BtnPrimary;
