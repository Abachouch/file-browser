import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { hide } from '../../../redux/contextmenuSlice'
import { useDispatch } from 'react-redux'
import FileContextmenu from './file-context-menu.jsx'
import FolderContextmenu from './folder-contextmenu.jsx'
import propTypes from 'prop-types'

function Contextmenu({ position }) {
  let dispatch = useDispatch()
  let [verticalPos, setVerticalPos] = useState({ top: position.top })
  let [horizentalPos, setHorizentalPos] = useState({
    left: position.left
  })

  const path = useSelector(state => state.contextmenu.path)
  const type = useSelector(state => state.contextmenu.type)

  useEffect(() => {
    let contextmenuHeight =
      document.body.querySelector('.contextmenu').clientHeight
    let contextmenuWidth =
      document.body.querySelector('.contextmenu').clientWidth

    if (position.left > document.body.clientWidth - contextmenuWidth) {
      setHorizentalPos({ left: position.left - contextmenuWidth })
    } else {
      setHorizentalPos({ left: position.left })
    }

    if (position.top > document.body.clientHeight - contextmenuHeight) {
      setVerticalPos({ bottom: 16 })
    } else {
      setVerticalPos({ top: position.top })
    }

    document.addEventListener('click', () => {
      dispatch(hide())
    })
  }, [path, position])

  return (
    <div style={{ ...horizentalPos, ...verticalPos }} className="contextmenu">
      {type == 'folder' && <FolderContextmenu path={path} />}
      {type == 'file' && <FileContextmenu path={path} />}
    </div>
  )
}

Contextmenu.propTypes = {
  position: propTypes.objectOf(propTypes.number)
}

export default Contextmenu
