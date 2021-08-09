import { configureStore } from '@reduxjs/toolkit'
import historyReducer from './historySlice.js'
import pinsReducer, { getPins } from './pinedSlice.js'
import projectsReducer, { getProjects } from './projectSlice.js'
import tagsReducer, { getTags } from './tagsSlice.js'
import contextmenuReducer from './contextmenuSlice'
import newTagModalReducer from './newTagModalSlice'
import audioPlayerReducer from './audio-player-slice'

const store = configureStore({
  reducer: {
    history: historyReducer,
    pins: pinsReducer,
    projects: projectsReducer,
    tags: tagsReducer,
    contextmenu: contextmenuReducer,
    newTagModal: newTagModalReducer,
    audioPlayer: audioPlayerReducer
  }
})

store.dispatch(getPins())
store.dispatch(getProjects())
store.dispatch(getTags())
export default store
