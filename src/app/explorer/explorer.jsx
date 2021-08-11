import React from 'react'
import { useSelector } from 'react-redux'
import FileExplorer from './folder-explorer/fileExplorer.jsx'
// import TitleBar from '../title-bar/titleBar.jsx'
import TagExplorer from './tag-explorer/tagExplorer.jsx'

import './explorer.scss'

export default function MainContent() {
  const history = useSelector(state => state.history.list)
  const index = useSelector(state => state.history.index)

  let type = history[index].type

  if (history)
    return (
      <main id="l-main">
        {type === 'folder' && <FileExplorer></FileExplorer>}
        {type === 'tag' && <TagExplorer></TagExplorer>}
      </main>
    )
  else return <p>something went wrong</p>
}
