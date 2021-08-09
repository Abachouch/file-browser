const { ipcRenderer } = window.require('electron')
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getFileTypeFromPath } from '../../../helpers/pathHelper.js'
import FileComponent from '../../components/file/file.jsx'

export default function FileExplorer() {
  const history = useSelector(state => state.history.list)
  const index = useSelector(state => state.history.index)
  let link = history[index].link

  const [files, setFiles] = useState([])

  useEffect(() => {
    ipcRenderer
      .invoke('getFiles', link)
      .then(result => {
        setFiles(result)
      })
      .finally(() => {
        ipcRenderer.removeAllListeners('getFiles')
      })
  }, [history, index])

  return (
    <div id="l-content" className=" fileexplorer">
      <div className="files">
        {files.map((file, index) => {
          const type = getFileTypeFromPath(file)
          if (type !== 'unknown')
            return (
              <FileComponent
                key={index}
                path={file}
                type={type}
              ></FileComponent>
            )
        })}
      </div>
    </div>
  )
}
