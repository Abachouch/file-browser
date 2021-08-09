/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

import { MoodboardIcon, PenIcon, TagIcon } from '../../../helpers/svgs.jsx'
import { generateRandomColor } from '../../../helpers/Color'
import {
  getExtentionfromPath,
  getFileNameFromPath
} from '../../../helpers/pathHelper'
import { useDispatch } from 'react-redux'
import { open } from '../../../redux/newTagModalSlice.js'
const { ipcRenderer } = window.require('electron')

export default function FileContextmenu(props) {
  const [tags, setTags] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    ipcRenderer.invoke('getTagsOfFile', props.path).then(allTags => {
      if (allTags) setTags(allTags.tags)
      else setTags([])
    })
  }, [props.path])

  return (
    <div className="">
      <header className="contextmenu-header">
        <h3 className="contextmenu-title">{getFileNameFromPath(props.path)}</h3>
        <ul className="contextmenu-tags">
          {tags.length > 0 &&
            tags?.map(tag => {
              return (
                <li key={tag} className="contextmenu-tag">
                  <span
                    className="contextmenu-tag-circle"
                    style={{ borderColor: generateRandomColor(tag) }}
                  ></span>
                  <span className="contextmenu-tag-title">{tag}</span>
                </li>
              )
            })}
        </ul>
      </header>
      <ul className="contextmenu-list">
        {getExtentionfromPath(props.path) === 'svg' && (
          <li
            onClick={() => {
              ipcRenderer.invoke('copySvg', props.path)
            }}
            className="contextmenu-item"
          >
            <PenIcon className="contextmenu-item-icon"></PenIcon>
            <span className="contextmenu-item-title">Copy SVG Code</span>
          </li>
        )}

        <li
          className="contextmenu-item"
          onClick={() => {
            dispatch(open(props.path))
          }}
        >
          <TagIcon className="contextmenu-item-icon"></TagIcon>
          <span className="contextmenu-item-title">Add Tag</span>
        </li>
        <li className="contextmenu-item">
          <MoodboardIcon className="contextmenu-item-icon"></MoodboardIcon>
          <span className="contextmenu-item-title">Add To moodboard</span>
        </li>

        <li
          className="contextmenu-item"
          onClick={() => {
            ipcRenderer.send('openWithDefaultApp', props.path)
          }}
        >
          <TagIcon className="contextmenu-item-icon"></TagIcon>
          <span className="contextmenu-item-title">Open With Default App</span>
        </li>
      </ul>
    </div>
  )
}
