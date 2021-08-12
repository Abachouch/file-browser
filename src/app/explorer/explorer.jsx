import React from 'react'
import { useSelector } from 'react-redux'
import FileExplorer from './folder-explorer/file-explorer.jsx'
// import TitleBar from '../title-bar/titleBar.jsx'
import TagExplorer from './tag-explorer/tag-explorer.jsx'

import './explorer.scss'

export default function MainContent() {
  const history = useSelector(state => state.history.list)
  const index = useSelector(state => state.history.index)

  let type = history[index].type

  if (history)
    return (
      <main id="explorer">
        {type === 'folder' && <FileExplorer></FileExplorer>}
        {type === 'tag' && <TagExplorer></TagExplorer>}
      </main>
    )
  else return <p>something went wrong</p>
}
