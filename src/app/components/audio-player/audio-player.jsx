import React, { useEffect, useState, useRef } from 'react'
import propTypes from 'prop-types'
import { CloseIcon } from '../../../helpers/svgs.jsx'

import './audio-player.scss'
import PlayIcon from '../../../icons/icon-play.jsx'
import VolumeIcon from '../../../icons/icon-volum.jsx'
import PauseIcon from '../../../icons/icon-pause.jsx'
import picard from '../../../../statics/picard.jpg'
import { useDispatch } from 'react-redux'
import { setAudio } from '../../../redux/audio-player-slice.js'

const { ipcRenderer } = window.require('electron/renderer')

function AudioPlayer({ path }) {
  // const [meta, setMeta] = useState({})

  const [picture, setPicture] = useState({
    format: '',
    data: []
  })
  const [isPlaying, setIsPlaying] = useState(false)

  const [duration, setDuration] = useState(0)
  const [time, setTime] = useState(0)
  const [volume, setVolume] = useState(0)
  const [isVolum, setIsVolum] = useState()
  const dispatch = useDispatch()
  const audioTrackRef = useRef(new Audio())

  useEffect(() => {
    audioTrackRef.current.src = path
    setTime(0)
    setIsPlaying(false)
    setIsVolum(false)
    audioTrackRef.current.pause()
    console.log('path change')
    ipcRenderer.invoke('getAudioMetadata', 'somedata').then(e => {
      console.log('invoking ipcrenderr')
      const buf = Buffer.from(e.common.picture[0].data, 'base64')
      if (buf)
        setPicture({
          format: e.common.picture[0].format,
          data: buf.toString('base64')
        })
      else {
        setPicture({
          format: '',
          data: ''
        })
      }

      audioTrackRef.current.addEventListener('loadeddata', () => {
        setDuration(audioTrackRef.current.duration)
        setVolume(audioTrackRef.current.volume)
        console.log('data loaded')
        //
        audioTrackRef.current.addEventListener('timeupdate', () => {
          setTime(audioTrackRef.current.currentTime)
        })
      })
      //
    })

    return function cleanup() {
      audioTrackRef.current.pause()
      ipcRenderer.removeListener('getAudioMetadata', () => {})
    }
  }, [path])

  const formatTime = (
    seconds,
    h = Math.floor(seconds / 3600),
    m = Math.floor((seconds % 3600) / 60),
    s = Math.floor(seconds % 60)
  ) => [h, m > 9 ? m : '0' + m, s > 9 ? s : '0' + s].filter(s => s).join(':')

  return (
    <div className="audioplayer">
      <img
        className="audioplayer-picard"
        src={`data:${picture.format};base64,${picture.data}`}
        onLoadStart={e => {
          e.target.src = picard
        }}
        onError={e => {
          e.target.src = picard
        }}
      />
      <div className="audioplayer-info">
        <div className="audioplayer-title">{path}</div>
        <div className="audioplayer-controls">
          {!isPlaying && (
            <PlayIcon
              className="audioplayer-icon"
              onClick={() => {
                setIsPlaying(true)
                audioTrackRef.current.play()
              }}
            />
          )}

          {isPlaying && (
            <PauseIcon
              className="audioplayer-icon"
              onClick={() => {
                setIsPlaying(false)
                audioTrackRef.current.pause()
              }}
            />
          )}
          <div className="audioplayer-volume-wraper">
            <VolumeIcon
              className="audioplayer-icon"
              onClick={() => {
                setIsVolum(!isVolum)
              }}
            />

            {isVolum && (
              <input
                type="range"
                className="audioplayer-volume"
                max="1"
                step="0.01"
                value={volume}
                onChange={e => {
                  audioTrackRef.current.volume = volume
                  setVolume(e.target.value)
                }}
              />
            )}
          </div>

          <span className="audioplayer-time">
            {formatTime(time) + '/' + formatTime(duration)}
          </span>
        </div>

        <input
          className="audioplayer-track"
          type="range"
          value={time}
          min="0"
          step="1"
          max={duration}
          onChange={event => {
            setTime(event.target.value)
            audioTrackRef.current.currentTime = event.target.value
          }}
        />
      </div>
      <CloseIcon
        className="audioplayer-close"
        onClick={() => {
          dispatch(setAudio(''))
        }}
      />
    </div>
  )
}
AudioPlayer.propTypes = {
  path: propTypes.string
}

export default AudioPlayer
