import { use } from 'react'
import { UserContext } from '../contexts/user'

export const useUser = () => {
  const context = use(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}