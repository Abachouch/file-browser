const { ipcRenderer } = window.require('electron')
import React, { useEffect, useState } from 'react'

import Folder from '../../components/folder.jsx'

export default function DrivesList() {
  const [disks, setDisks] = useState([])

  useEffect(() => {
    ipcRenderer
      .invoke('getDisk')
      .then(result => {
        setDisks(result)
      })
      .finally(() => {
        ipcRenderer.removeAllListeners('testDrives')
      })
  }, [])

  if (disks.length > 0)
    return (
      <div className="sidebar-list">
        <h3 className="sidebar-heading">Drives</h3>
        {disks.map((disk, index) => {
          return (
            <Folder
              key={index}
              path={disk._mounted + '//'}
              icon="drive"
              capacity={disk._capacity}
              total={disk._blocks}
            />
          )
        })}
      </div>
    )
  else return ''
}

// function capacityToString(capacity) {
//   return capacity + ' GB'
// }
