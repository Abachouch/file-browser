/* eslint-disable react/prop-types */
const { ipcRenderer } = window.require('electron')
import React, { useEffect, useState } from 'react'
import { getFileNameFromPath } from '../../../../helpers/pathHelper'
import './text-file.scss'

export default function TextFile(props) {
  const [text, setText] = useState('')

  useEffect(() => {
    ipcRenderer.invoke('readTextFile', props.path).then(txt => {
      setText(txt)
    })
  }, [props])

  return (
    <div className="file text">
      <h3 className="file-title">{getFileNameFromPath(props.path)}</h3>
      <code> {text}</code>
    </div>
  )
}
