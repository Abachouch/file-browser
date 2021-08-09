const { ipcRenderer } = window.require('electron')
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { back, forward } from '../../redux/historySlice.js';
import Folder from '../../components/folder.jsx'

export default function FolderList() {
  const history = useSelector(state => state.history.list)
  const index = useSelector(state => state.history.index)

  const [folders, setFolders] = useState([])

  useEffect(() => {
    ipcRenderer
      .invoke('getFolders', history[index].link)
      .then(result => {
        setFolders(result)
      })
      .finally(() => {
        ipcRenderer.removeAllListeners('testFolders')
      })
  }, [history, index])

  if (folders.length > 0)
    return (
      <div className="sidebar-list">
        <h3 className="sidebar-heading">{history[index].link} </h3>
        {folders.map((folder, index) => {
          return <Folder icon="folder" path={folder.path} key={index} />
        })}
      </div>
    )
  else return ''
}
