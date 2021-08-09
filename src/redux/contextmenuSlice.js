import { createSlice } from '@reduxjs/toolkit'

export const contextmenuSlice = createSlice({
  name: 'contextmenu',
  initialState: {
    position: { left: 0, right: 0 },
    path: '',
    isOpen: false,
    type: ''
  },
  reducers: {
    show: (state, action) => {
      state.position = action.payload.position
      state.path = action.payload.path
      state.type = action.payload.type
      state.isOpen = true
    },
    hide: state => {
      state.isOpen = false
    }
  }
})

export const { show, hide } = contextmenuSlice.actions
export default contextmenuSlice.reducer
