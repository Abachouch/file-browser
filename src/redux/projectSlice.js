import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const { ipcRenderer } = window.require('electron')

export const getProjects = createAsyncThunk('getProjects', async () => {
  return ipcRenderer.invoke('getProjects')
})

export const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    list: []
  },
  extraReducers: {
    [getProjects.fulfilled]: (state, action) => {
      state.list = action.payload
    }
  },
  reducers: {
    remove: (state, action) => {
      state.list.splice(
        state.list.findIndex(e => e.path === action.payload),
        1
      )
    },
    push: (state, action) => {
      state.list.push({ path: action.payload })
    }
  }
})

export const { remove, push } = projectSlice.actions
export default projectSlice.reducer
