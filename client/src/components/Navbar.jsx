import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    if (!trimmed) return

    navigate('/', { state: { searchQuery: trimmed } })
    setSearchQuery('')
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__logo" aria-label="NewsBoard Home">
          <span className="navbar__logo-icon">News</span>
          <span className="navbar__logo-text">NewsBoard</span>
        </NavLink>

        <div className="navbar__links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'navbar__link active' : 'navbar__link'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/my-summaries"
            className={({ isActive }) =>
              isActive ? 'navbar__link active' : 'navbar__link'
            }
          >
            My Summaries
          </NavLink>
        </div>

        <form className="navbar__search" onSubmit={handleSearch} role="search">
          <input
            id="navbar-search-input"
            type="search"
            className="navbar__search-input"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search articles"
          />
          <button
            id="navbar-search-btn"
            type="submit"
            className="navbar__search-btn"
            aria-label="Submit search"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
