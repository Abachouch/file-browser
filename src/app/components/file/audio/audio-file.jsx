import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setAudio } from '../../../../redux/audio-player-slice'
import './audio-file.scss'
import { getFileNameFromPath } from '../../../../helpers/pathHelper'

function AudioFile({ path }) {
  const dispatch = useDispatch()

  return (
    <div
      className="file audio"
      onClick={() => {
        dispatch(setAudio(path))
        console.log('clicking')
      }}
    >
      <div className="audio-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
          <g transform="translate(-3 -3)">
            <path
              d="M13.5,27V7.5l18-3V24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <path
              d="M13.5,27A4.5,4.5,0,1,1,9,22.5,4.5,4.5,0,0,1,13.5,27Z"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <path
              d="M31.5,24A4.5,4.5,0,1,1,27,19.5,4.5,4.5,0,0,1,31.5,24Z"
              fill="none"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </g>
        </svg>
      </div>
      <h3 className="audio-title">{getFileNameFromPath(path)}</h3>
    </div>
  )
}

AudioFile.propTypes = {
  path: propTypes.string
}

export default AudioFile
