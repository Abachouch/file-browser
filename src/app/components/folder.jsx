/* eslint-disable react/prop-types */
import React from 'react'
import { getFileNameFromPath } from '../../helpers/pathHelper'
import { useDispatch } from 'react-redux'
import { show } from '../../redux/contextmenuSlice'
import { FolderIcon, DriveIcon, HexagonIcon } from '../../helpers/svgs.jsx'
import { push } from '../../redux/historySlice'

export default function Folder(props) {
  const dispatch = useDispatch()
  return (
    <button
      onClick={() => {
        dispatch(push({ type: 'folder', link: props.path }))
      }}
      onContextMenu={event => {
        dispatch(
          show({
            position: { top: event.pageY, left: event.pageX },
            path: props.path,
            isActive: true,
            type: 'folder'
          })
        )
      }}
      className="sidebar-item"
    >
      {props.icon == 'folder' && <FolderIcon className="sidebar-item-icon" />}
      {props.icon == 'drive' && <DriveIcon className="sidebar-item-icon" />}
      {props.icon == 'project' && <HexagonIcon className="sidebar-item-icon" />}
      <span className="sidebar-item-title">
        {getFileNameFromPath(props.path)}
      </span>
      {props.capacity && (
        <span className="sidebar-item-badge">
          {props.capacity + ' of ' + BitsToGB(props.total) + 'GB'}
        </span>
      )}
    </button>
  )
}

function BitsToGB(bits) {
  return Math.floor(bits / Math.pow(1024, 3))
}
