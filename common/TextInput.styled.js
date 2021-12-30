import styled from "styled-components";

const StyledTextInput = styled.TextInput`
  background-color: red;
  padding: 10px;
  margin: 8px 0;
  padding-left: 10px;
  border-radius: 20px;
  background-color: #f1f2f6;
  width: ${(props) => (props.width ? `${props.width}px` : `250px`)};

  font-size: 15px;
  font-family: "Lato";
`;

export default StyledTextInput;
