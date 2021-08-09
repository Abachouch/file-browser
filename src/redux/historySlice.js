import { createSlice } from '@reduxjs/toolkit'

const { ipcRenderer } = window.require('electron')
const { join } = window.require('path')
const homePath = ipcRenderer.sendSync('getHomePath')

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    list: [{ type: 'folder', link: homePath }],
    index: 0
  },
  reducers: {
    back: state => {
      if (state.index > 0) state.index--
    },
    forward: state => {
      if (state.index < state.list.length - 1) state.index++
    },
    push: (state, action) => {
      if (state.list[state.index].link !== action.payload.link) {
        let l = state.list
        l = l.slice(0, state.index + 1)
        l.push(action.payload)
        state.index++
        state.list = l
      }
    },
    pushPlace: (state, action) => {
      const link = join(homePath, action.payload)
      if (state.list[state.index].link !== link) {
        let l = state.list
        l = l.slice(0, state.index + 1)
        l.push({ type: 'folder', link: link })
        state.index++
        state.list = l
      }
    }
  }
})

export const { back, forward, push, pushPlace } = historySlice.actions
export default historySlice.reducer
