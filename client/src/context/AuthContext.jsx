import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('news_dashboard_token') || null)

  useEffect(() => {
    if (token) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('news_dashboard_user'))
        setUser(storedUser)
      } catch (e) {
        setUser(null)
      }
    }
  }, [token])

  const login = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    localStorage.setItem('news_dashboard_token', authToken)
    localStorage.setItem('news_dashboard_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('news_dashboard_token')
    localStorage.removeItem('news_dashboard_user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
