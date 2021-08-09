import React, { useEffect, useState } from 'react'
import { generateRandomColor } from '../../../helpers/Color'
import { CloseIcon } from '../../../helpers/svgs.jsx'
import { useDispatch } from 'react-redux'
import { close } from '../../../redux/newTagModalSlice'
import { update } from '../../../redux/tagsSlice'
import propTypes from 'prop-types'

const { ipcRenderer } = window.require('electron')
function NewTag(props) {
  const [tags, setTags] = useState([])
  const [tagSegustions, settagSegustions] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    ipcRenderer.invoke('getTagsOfFile', props.path).then(fileTags => {
      if (fileTags) setTags(fileTags.tags)
    })

    ipcRenderer.invoke('getAllTags').then(all => {
      if (all) settagSegustions(all)
    })
  }, [])

  return (
    <div
      className="modal-dim"
      onClick={event => {
        if (event.target?.className === 'modal-dim') dispatch(close())
      }}
    >
      <div className="modal">
        <h1 className="modal-header">Add Tag</h1>
        <div
          className="tagsbox"
          onClick={() => {
            document.body.querySelector('.tagsbox-input')?.focus()
          }}
        >
          {tags.map(e => (
            <div key={e} className="tag tagsbox-tag ">
              <span
                className="tag-circle"
                style={{ borderColor: generateRandomColor(e) }}
              ></span>
              <span className="tag-name">{e}</span>
              <CloseIcon
                className="tag-delete"
                onClick={() => {
                  const index = tags.findIndex(el => el === e)
                  tags.splice(index, 1)
                  setTags([...tags])
                }}
              />
            </div>
          ))}

          <input
            className="tagsbox-input"
            placeholder="new Tag"
            list="tagsSegustions"
            onKeyUp={event => {
              if (
                event.key === 'Enter' &&
                !tags.includes(event.target.value) &&
                event.target.value.trim() !== ''
              ) {
                setTags([...tags, event.target.value])
                event.target.value = ''
              }
            }}
          />
          <datalist id="tagsSegustions">
            {tagSegustions.map(e => {
              return <option key={e} value={e}></option>
            })}
          </datalist>
        </div>
        <footer className="modal-footer">
          <button
            className="button button_secondary"
            onClick={() => {
              dispatch(close())
            }}
          >
            Cancel
          </button>
          <button
            className="button button_primary"
            onClick={() => {
              ipcRenderer
                .invoke('tagFile', props.path, tags)
                .then(() => {
                  return ipcRenderer.invoke('getAllTags')
                })
                .then(e => {
                  dispatch(update(e))
                })
                .then(() => {
                  dispatch(close())
                })
            }}
          >
            Save
          </button>
        </footer>
      </div>
    </div>
  )
}

NewTag.propTypes = {
  path: propTypes.string
}

export default NewTag
