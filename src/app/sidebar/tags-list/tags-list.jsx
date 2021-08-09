import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { generateRandomColor } from '../../../helpers/Color.js'
import { push } from '../../../redux/historySlice.js'

export default function TagsList() {
  const tags = useSelector(state => state.tags.value)
  const dispatch = useDispatch()

  return (
    <div className="sidebar-list">
      <h3 className="sidebar-heading">My Tags</h3>
      {tags.map((tag, index) => {
        return (
          <button
            onClick={() => {
              dispatch(push({ type: 'tag', link: tag }))
            }}
            key={index}
            className="sidebar-item sidebar-tag"
          >
            <span
              style={{ borderColor: generateRandomColor(tag) }}
              className="sidebar-item-circle"
            ></span>
            <span className="sidebar-item-title">{tag}</span>
          </button>
        )
      })}
    </div>
  )
}
