import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)

  const login = () => {
    setIsLogged(true)
  }

  const logout = () => {
    setIsLogged(false)
  }

  return <UserContext value={{ isLogged, login, logout }}>
    {children}
  </UserContext>;
}