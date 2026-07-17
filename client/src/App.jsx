import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MySummaries from './pages/MySummaries'
import ArticleDetail from './pages/ArticleDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import { SummariesProvider } from './context/SummariesContext'
import { AuthProvider } from './context/AuthContext'
import { API_URL } from './config'

function App() {
  useEffect(() => {
    fetch(`${API_URL}/api/health`).catch(() => {})
  }, [])

  return (
    <AuthProvider>
      <SummariesProvider>
        <BrowserRouter>
          <Navbar />
          <main>
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-summaries" element={<MySummaries />} />
                <Route path="/article" element={<ArticleDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </main>
        </BrowserRouter>
      </SummariesProvider>
    </AuthProvider>
  )
}

export default App
