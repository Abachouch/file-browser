const { ipcRenderer } = window.require('electron')
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getFileTypeFromPath } from '../../../helpers/pathHelper.js'
import FileComponent from '../../components/file/file.jsx'

function TagExplorer() {
  const history = useSelector(state => state.history.list)
  const index = useSelector(state => state.history.index)
  let link = history[index].link

  const [files, setFiles] = useState([])

  useEffect(() => {
    ipcRenderer
      .invoke('getFilesOfTag', link)
      .then(result => {
        console.log(result)
        setFiles(result)
      })
      .finally(() => {
        ipcRenderer.removeAllListeners('getFilesOfTag')
      })
  }, [history, index])

  return (
    <main id="l-content" className=" tagexplorer">
      <h1>{link}</h1>
      <div className="files">
        {files.map((file, index) => {
          return (
            <FileComponent
              type={getFileTypeFromPath(file.path)}
              key={index}
              path={file.path}
            ></FileComponent>
          )
        })}
      </div>
    </main>
  )
}

export default TagExplorer
