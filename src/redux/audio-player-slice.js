import { createSlice } from '@reduxjs/toolkit'

export const audioPlayerSlice = createSlice({
  name: 'tags',
  initialState: {
    audio: ''
  },
  reducers: {
    setAudio: (state, action) => {
      state.audio = action.payload
    }
  }
})

export const { setAudio } = audioPlayerSlice.actions
export default audioPlayerSlice.reducer
