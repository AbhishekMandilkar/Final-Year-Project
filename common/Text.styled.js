import styled from "styled-components";

const StyledText = styled.Text`
  ${(props) =>
    function (props) {
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
export default StyledText;
