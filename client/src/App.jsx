import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MySummaries from './pages/MySummaries'
import ArticleDetail from './pages/ArticleDetail'
import { SummariesProvider } from './context/SummariesContext'

function App() {
  return (
    <SummariesProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-summaries" element={<MySummaries />} />
              <Route path="/article" element={<ArticleDetail />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </SummariesProvider>
  )
}

export default App
