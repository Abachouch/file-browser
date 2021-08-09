import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const { ipcRenderer } = window.require('electron')

export const getTags = createAsyncThunk('getTags', async () => {
  return ipcRenderer.invoke('getAllTags')
})

export const tagSlice = createSlice({
  name: 'tags',
  initialState: {
    value: []
  },
  extraReducers: {
    [getTags.fulfilled]: (state, action) => {
      state.value = action.payload
    }
  },
  reducers: {
    push: (state, action) => {
      state.value.tagList.push(action.payload)
    },
    update: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { push, update } = tagSlice.actions
export default tagSlice.reducer
