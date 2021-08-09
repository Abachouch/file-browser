import React from 'react'
import propTypes from 'prop-types'

function PauseIcon({ className, onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      viewBox="0 0 21 27"
    >
      <g transform="translate(-7.5 -4.5)">
        <path
          d="M9,6h6V30H9Z"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M21,6h6V30H21Z"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </g>
    </svg>
  )
}

PauseIcon.propTypes = {
  className: propTypes.string,
  onClick: propTypes.func
}

export default PauseIcon
