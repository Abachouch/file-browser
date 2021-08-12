const { ipcRenderer } = window.require('electron')
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getFileTypeFromPath } from '../../../helpers/pathHelper.js'
import FileComponent from '../../components/file/file.jsx'
import ExplorerHeader from './explorer-header/explorer-header.jsx'
import './file-explorer.scss'

export default function FileExplorer() {
  const history = useSelector(state => state.history.list)
  const index = useSelector(state => state.history.index)
  let link = history[index].link
  const [files, setFiles] = useState([])
  const allFiles = useRef()

  useEffect(() => {
    ipcRenderer
      .invoke('getFiles', link)
      .then(result => {
        setFiles(result)
        allFiles.current = result
      })
      .finally(() => {
        ipcRenderer.removeAllListeners('getFiles')
      })
  }, [history, index])

  return (
    <>
      <ExplorerHeader
        onFilter={filter => {
          if (filter == 'all') {
            setFiles(allFiles.current)
            return
          }
          let filterd = allFiles.current.filter(
            file => getFileTypeFromPath(file) == filter
          )
          setFiles(filterd)

          console.log(filter)
        }}
      />
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
    </>
  )
}
