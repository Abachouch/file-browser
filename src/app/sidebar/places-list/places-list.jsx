import React from 'react'
import { useDispatch } from 'react-redux'
import {
  UserIcon,
  MusicIcon,
  VideoIcon,
  DocumentIcon,
  DesktopIcon,
  DownloadIcon,
  PicturesIcon
} from '../../../helpers/svgs.jsx'
import { pushPlace } from '../../../redux/historySlice.js'

export default function PlacesList() {
  const dispatch = useDispatch()

  return (
    <div className="placesbar">
      {/* user folder */}
      <button
        className="placesbar-item"
        onClick={() => {
          dispatch(pushPlace(''))
        }}
      >
        <UserIcon className="placesbar-item-icon"></UserIcon>
      </button>
      {/* imgaes */}
      <button
        className="placesbar-item"
        onClick={() => {
          dispatch(pushPlace('Pictures'))
        }}
      >
        <PicturesIcon className="placesbar-item-icon"></PicturesIcon>
      </button>
      {/* music */}
      <button
        className="placesbar-item"
        onClick={() => {
          dispatch(pushPlace('Music'))
        }}
      >
        <MusicIcon className="placesbar-item-icon"></MusicIcon>
      </button>
      <button
        className="placesbar-item"
        onClick={() => {
          dispatch(pushPlace('Videos'))
        }}
      >
        <VideoIcon className="placesbar-item-icon"></VideoIcon>
      </button>
      <button
        className="placesbar-item"
        onClick={() => {
          dispatch(pushPlace('Documents'))
        }}
      >
        <DocumentIcon className="placesbar-item-icon"></DocumentIcon>
      </button>
      <button
        className="placesbar-item"
        onClick={() => {
          dispatch(pushPlace('Desktop'))
        }}
      >
        <DesktopIcon className="placesbar-item-icon"></DesktopIcon>
      </button>
      <button
        className="placesbar-item"
        onClick={() => {
          dispatch(pushPlace('Downloads'))
        }}
      >
        <DownloadIcon className="placesbar-item-icon"></DownloadIcon>
      </button>
    </div>
  )
}
