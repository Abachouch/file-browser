import { ipcRenderer } from 'electron'
import './preview.scss'
import propTypes from 'prop-types'

import React from 'react'
import ReactDom from 'react-dom'

function PreviewComponent(props) {
  return (
    <div className="preview-wraper">
      <img className="preview-img" src={props.path}></img>
    </div>
  )
}
PreviewComponent.propTypes = {
  path: propTypes.string
}

console.log('kzhfohh')
ipcRenderer.on('onsendData', (event, arg) => {
  ReactDom.render(
    <PreviewComponent path={arg} />,
    document.getElementById('appPreview')
  )
})
