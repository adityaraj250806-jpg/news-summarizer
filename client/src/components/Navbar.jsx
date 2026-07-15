import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()

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

        <div className="navbar__auth">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                Hi, {user.name.split(' ')[0]}
              </span>
              <button
                onClick={logout}
                className="btn btn-outline"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
