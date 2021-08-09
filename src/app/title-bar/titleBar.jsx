import React from 'react'
import { useSelector } from 'react-redux'
import { CloseIcon } from '../../helpers/svgs.jsx'
import './titlebar.scss'

export default function TitleBar() {
  const list = useSelector(state => state.history.list)
  const index = useSelector(state => state.history.index)

  return (
    <header id="l-titlebar">
      <h1 className="titlebar-title"> {list[index].link} - file browser </h1>

      <div className="titlebar-controls">
        <button className="titlebar-controls-button">-</button>
        <button className="titlebar-controls-button">-</button>
        <button className="titlebar-controls-button"></button>
        <button
          onClick={() => {
            window.close()
          }}
          className="titlebar-controls-button titlebar-controls-button_close"
        >
          <CloseIcon className="titlebar-controls-icon" />
        </button>
      </div>
    </header>
  )
}
