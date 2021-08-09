import React, { useEffect, useState } from 'react'
import {
  LightIcon,
  AboutIcon,
  SettingIcon,
  MoonIcon,
  StarIcon
} from '../../helpers/svgs.jsx'

export function Menu() {
  const [theme, setTheme] = useState()

  useEffect(() => {
    setTheme(window.localStorage.getItem('theme') || 'white')
  }, [])

  return (
    <div className="menu">
      <header className="menu-header">
        <h3 className="menu-heading">Theme</h3>

        <div className="menu-toggle">
          <button
            onClick={() => {
              window.localStorage.setItem('theme', 'light')
              document.body.className = 'light'
              setTheme('light')
            }}
            className={
              theme === 'light'
                ? 'menu-toggle-button active'
                : 'menu-toggle-button '
            }
          >
            <LightIcon className="menu-toggle-button-icon" />
            <span className="menu-toggle-button-title">Light</span>
          </button>

          <button
            onClick={() => {
              window.localStorage.setItem('theme', 'dark')
              document.body.className = 'dark'
              setTheme('dark')
            }}
            className={
              theme === 'dark'
                ? 'menu-toggle-button active'
                : 'menu-toggle-button '
            }
          >
            <MoonIcon className="menu-toggle-button-icon" />
            <span className="menu-toggle-button-title">Dark</span>
          </button>

          <button
            onClick={() => {
              window.localStorage.setItem('theme', 'blue')
              document.body.className = 'blue'
              setTheme('blue')
            }}
            className={
              theme === 'blue'
                ? 'menu-toggle-button active'
                : 'menu-toggle-button '
            }
          >
            <StarIcon className="menu-toggle-button-icon" />
            <span className="menu-toggle-button-title">Blue</span>
          </button>
        </div>
      </header>

      <div className="menu-list">
        <button className="menu-item">
          <AboutIcon className="menu-item-icon" />
          <span className="menu-item-title">About</span>
        </button>

        <button className="menu-item">
          <SettingIcon className="menu-item-icon" />
          <span className="menu-item-title">Setting</span>
        </button>
      </div>
    </div>
  )
}
