import { createContext, useEffect, useState } from "react";
import { customFetch } from "./utils";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      customFetch.get("api/v1/auth/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
