import React, { createContext, useState } from "react";

export const UserContext = createContext();
export default function HandleContextProvider(props) {
  const [userName, setUserName] = useState("");
  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {props.children}
    </UserContext.Provider>
  );
}
