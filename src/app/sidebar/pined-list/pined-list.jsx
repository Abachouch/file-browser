import React from 'react'

import { useSelector } from 'react-redux'
import Folder from '../../components/folder.jsx'

export default function PinedList() {
  const pins = useSelector(state => state.pins.list)

  if (pins.length > 0)
    return (
      <div className="sidebar-list">
        <h3 className="sidebar-heading">Pined Folders</h3>
        {pins.map((pin, index) => {
          return <Folder key={index} path={pin.path} icon="folder" />
        })}
      </div>
    )
  else return ''
}
