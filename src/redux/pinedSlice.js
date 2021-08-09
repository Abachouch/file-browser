import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const { ipcRenderer } = window.require('electron')

export const getPins = createAsyncThunk('getPins', async () => {
  return ipcRenderer.invoke('getPinedFolders')
})

export const pinsSlice = createSlice({
  name: 'pins',
  initialState: {
    list: []
  },
  extraReducers: {
    [getPins.fulfilled]: (state, action) => {
      state.list = action.payload
    }
  },
  reducers: {
    unpin: (state, action) => {
      console.log(action.payload)
      state.list.splice(
        state.list.findIndex(e => action.payload === e.path),
        1
      )
    },
    pin: (state, action) => {
      console.log(action.payload)

      state.list.push({ path: action.payload })
    }
  }
})

export const { pin, unpin } = pinsSlice.actions
export default pinsSlice.reducer
