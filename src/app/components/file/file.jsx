import React from 'react'
import { useDispatch } from 'react-redux'
import { show as showContextmenu } from '../../../redux/contextmenuSlice'
import TextFile from './fileText.jsx'
import propTypes from 'prop-types'
import AudioFile from './audio-file.jsx'
const { ipcRenderer } = window.require('electron')

function file(path, type) {
  switch (type) {
    case 'image':
      return (
        <div
          onClick={() => {
            // window.open(`preview/preview.html?${path}`, 'preview', path, true)
            ipcRenderer.send('openPreview', path)
          }}
          className="file image"
        >
          <img src={path} alt={path} />
        </div>
      )
    case 'audio':
      return <AudioFile path={path} />
    case 'video':
      return (
        <div className="file video">
          <video src={path} alt={path} controls>
            <source src={path} />
          </video>
        </div>
      )
    case 'text':
      return <TextFile path={path} />
  }
}

function FileComponent({ path, type }) {
  const dispatch = useDispatch()

  return (
    <div
      onContextMenu={event => {
        dispatch(
          showContextmenu({
            position: {
              top: event.pageY,
              left: event.pageX
            },
            path: path,
            isActive: true,
            type: 'file'
          })
        )
      }}
      className="file-wraper"
    >
      {file(path, type)}
    </div>
  )
}

FileComponent.propTypes = {
  path: propTypes.string,
  type: propTypes.string
}

export default FileComponent
