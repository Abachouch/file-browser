/* eslint-disable react/prop-types */
const { ipcRenderer } = window.require('electron')
import React, { useEffect, useState } from 'react'

export default function TextFile(props) {
  const [text, setText] = useState('')

  console.log('getting text')
  useEffect(() => {
    ipcRenderer.invoke('readTextFile', props.path).then(txt => {
      setText(txt)
    })
  }, [props])

  return (
    <div className="file text">
      <h3 className="file-title">{props.path}</h3>
      <code> {text}</code>
    </div>
  )
}
