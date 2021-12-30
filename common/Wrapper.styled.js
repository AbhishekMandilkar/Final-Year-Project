import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
  padding-top: ${(props) => (props.homeScreen ? `0px` : `24px`)};
  background-color: white;
  flex: 1;
`;

export default Wrapper;
