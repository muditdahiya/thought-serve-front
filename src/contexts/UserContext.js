import { createContext } from "react";

export const UserContext = createContext({
  username: String,
  setUsername: () => {},
  isLoggedIn: Boolean,
  setIsLoggedIn: () => {},
});
