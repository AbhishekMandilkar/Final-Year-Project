import styled from "styled-components";

const Button = styled.TouchableOpacity`
  padding: 15px;
  width: ${(props) =>
    props.width ? `${props.width}px` : props.fullWidth ? `100%` : `270px`};
  border-radius: ${(props) => (props.radius ? `${props.radius}px` : `20px`)};

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  background-color: ${(props) => `${props.theme.colors.primary}`};
`;

const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 15px;
  ${(props) => {
    if (props.family === "Poppins") {
      switch (props.weight) {
        case "bold":
          return `font-family:PopBold`;
        case "medium":
          return `font-family:PopMedium`;
        default:
          return `font-family:Pop`;
      }
    } else {
      switch (props.weight) {
        case "bold":
          return `font-family:LatoBold`;
        case "medium":
          return `font-family:LatoMedium`;
        default:
          return `font-family:Lato`;
      }
    }
  }};
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
