import { createContext, useEffect, useState } from "react";
import { customFetch } from "./customFetch";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user) {
      const getUser = async () => {
        setIsLoading(true);
        try {
          const { data } = await customFetch.get("api/v1/user");
          setUser(data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      getUser();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, searchQuery, setSearchQuery }}
    >
      {children}
    </UserContext.Provider>
  );
};
