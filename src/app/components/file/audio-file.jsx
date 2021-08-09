import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setAudio } from '../../../redux/audio-player-slice'
import './audio-file.scss'

function AudioFile({ path }) {
  const dispatch = useDispatch()

  return (
    <div
      onClick={() => {
        dispatch(setAudio(path))
        console.log('clicking')
      }}
    >
      <h3 className="audio-title">{path}</h3>
    </div>
  )
}

AudioFile.propTypes = {
  path: propTypes.string
}

export default AudioFile
