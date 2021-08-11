import React from 'react'

import SideBar from './app/sidebar/sidebar.jsx'
import MainContent from './app/explorer/explorer.jsx'
import Contextmenu from './app/components/contextmenu/contextmenu.jsx'
import { useSelector } from 'react-redux'
import NewTag from './app/components/modals/newTag.jsx'

import AudioPlayer from './app/components/audio-player/audio-player.jsx'

function App() {
  const ContextMenuPosition = useSelector(state => state.contextmenu.position)

  const newTagModal = useSelector(state => state.newTagModal)
  const isContextMenuOpen = useSelector(state => state.contextmenu.isOpen)
  const audio = useSelector(state => state.audioPlayer.audio)

  return (
    <div id="l-app">
      <SideBar></SideBar>
      <MainContent> </MainContent>
      {isContextMenuOpen && <Contextmenu position={ContextMenuPosition} />}

      {newTagModal.isOpen && <NewTag path={newTagModal.path}></NewTag>}
      {audio != '' && <AudioPlayer path={audio} />}
    </div>
  )
}

export default App
