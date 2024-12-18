import { useContext } from "react"
import { UserContext } from "../contexts/user-context"

export const useUser = () => {
  const user = useContext(UserContext)

  if (user == null) {
    throw new Error('useUser must be used within a UserContextProvider')
  }

  return user
}