import React from 'react'
import { useSelector } from 'react-redux'
// import FolderContextmenu from '../components/contextmenu/FolderContextmenu.jsx';
import FileExplorer from './folder-explorer/fileExplorer.jsx'
import TitleBar from '../title-bar/titleBar.jsx'
import TagExplorer from './tag-explorer/tagExplorer.jsx'

export default function MainContent() {
  const history = useSelector(state => state.history.list)
  const index = useSelector(state => state.history.index)

  let type = history[index].type

  if (history)
    return (
      <main id="l-main">
        <TitleBar></TitleBar>
        {type === 'folder' && <FileExplorer></FileExplorer>}
        {type === 'tag' && <TagExplorer></TagExplorer>}
      </main>
    )
  else return <p>somme thing went wrong</p>
}
