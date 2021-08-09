import React, { useState, useEffect } from 'react'
import {
  TagIcon,
  HexagonIcon,
  LinkIcon,
  TerminalIcon,
  ExplorerIcon
} from '../../../helpers/svgs.jsx'
import { useDispatch } from 'react-redux'
import { pin, unpin } from '../../../redux/pinedSlice'
import {
  push as pushProject,
  remove as remouveProject
} from '../../../redux/projectSlice'

import propTypes from 'prop-types'

const { ipcRenderer } = window.require('electron')
function FolderContextmenu(props) {
  let dispatch = useDispatch()
  let [info, setInfo] = useState()
  let [isPined, setPined] = useState()
  let [isProjectSaved, setProjectSave] = useState()

  useEffect(() => {
    ipcRenderer
      .invoke('getProjectInfo', props.path)
      .then(res => {
        console.log(res)
        setInfo(res)
      })
      .then(() => {
        ipcRenderer.removeAllListeners('getProjectInfo')
      })

    ipcRenderer.invoke('isPined', props.path).then(res => {
      setPined(res)
    })
    ipcRenderer.invoke('isProjectSaved', props.path).then(res => {
      setProjectSave(res)
    })
  }, [props.path])

  return (
    <div>
      {info && (
        <>
          <header className="contextmenu-header">
            <h3 className="contextmenu-title">{info.name}</h3>
            <h3 className="contextmenu-version">{info.version}</h3>
            <p className="contextmenu-description">{info.description}</p>
            {info.author && (
              <p className="contextmenu-description">
                {' '}
                created by : {info.author}
              </p>
            )}
          </header>
        </>
      )}

      <ul className="contextmenu-list">
        <li
          onClick={() => {
            if (isPined) {
              ipcRenderer.invoke('unPinFolder', props.path).then(() => {
                dispatch(unpin(props.path))
              })
            } else {
              ipcRenderer.invoke('pinFolder', props.path).then(() => {
                dispatch(pin(props.path))
              })
            }
          }}
          className="contextmenu-item"
        >
          <TagIcon className="contextmenu-item-icon"></TagIcon>
          <span className="contextmenu-item-title">
            {isPined ? 'Unpin Folder' : 'Pin Folder'}
          </span>
        </li>
        {info && (
          <li
            onClick={() => {
              if (isProjectSaved) {
                ipcRenderer.invoke('removeProject', props.path).then(() => {
                  dispatch(remouveProject(props.path))
                })
              } else {
                ipcRenderer.invoke('addProject', props.path).then(() => {
                  dispatch(pushProject(props.path))
                })
              }
            }}
            className="contextmenu-item"
          >
            <HexagonIcon className="contextmenu-item-icon"></HexagonIcon>
            <span className="contextmenu-item-title">
              {isProjectSaved
                ? 'remouve from saved project'
                : ' Save as Node project'}
            </span>
          </li>
        )}
        <li
          onClick={() => {
            if (props.path) ipcRenderer.send('copyText', props.path)
          }}
          className="contextmenu-item"
        >
          <LinkIcon className="contextmenu-item-icon"></LinkIcon>
          <span className="contextmenu-item-title">Copy frolder path</span>
        </li>
        <li
          onClick={() => {
            if (props.path) ipcRenderer.send('openInCMD', props.path)
          }}
          className="contextmenu-item"
        >
          <TerminalIcon className="contextmenu-item-icon"></TerminalIcon>
          <span className="contextmenu-item-title">Open in Terminal</span>
        </li>
        <li
          onClick={() => {
            if (props.path) ipcRenderer.send('openInExplorer', props.path)
          }}
          className="contextmenu-item"
        >
          <ExplorerIcon className="contextmenu-item-icon"></ExplorerIcon>
          <span className="contextmenu-item-title">Open in File Explorer</span>
        </li>
      </ul>

      {
        // only projects
        info?.scripts && (
          <ul className="contextmenu-list">
            {Object.keys(info.scripts).map(key => {
              return (
                <li
                  onClick={() => {
                    // open this in terminal info.scripts[key]
                    ipcRenderer.sendSync('runScript', props.path, 'yarn', key)
                  }}
                  key={key}
                  className="contextmenu-item"
                >
                  <TerminalIcon className="contextmenu-item-icon"></TerminalIcon>
                  <span className="contextmenu-item-title">{key}</span>
                </li>
              )
            })}
          </ul>
        )
      }
    </div>
  )
}

FolderContextmenu.propTypes = {
  path: propTypes.string
}

export default FolderContextmenu
