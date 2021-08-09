import { createSlice } from '@reduxjs/toolkit'

export const newTagModalSlice = createSlice({
  name: 'newTag',
  initialState: {
    isOpen: false,
    path: ''
  },
  reducers: {
    close: state => {
      state.isOpen = false
      state.path = ''
    },
    open: (state, action) => {
      state.isOpen = true
      state.path = action.payload
    }
  }
})

export const { open, close } = newTagModalSlice.actions
export default newTagModalSlice.reducer
