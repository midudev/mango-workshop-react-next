import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ isLogged: false })

  const login = () => {
    // llamar a una API que ha hecho Xavier Ribera
    // porque no va a tocar frontend ni con un puntero laser
    setUser({ isLogged: true })
  }

  const logout = () => {
    setUser({ isLogged: false })
  }

  return <UserContext.Provider value={{ ...user, login, logout }}>
    {children}
  </UserContext.Provider>
}