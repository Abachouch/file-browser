import React from 'react'
import propTypes from 'prop-types'

function PlayIcon({ className, onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      viewBox="0 0 9.778 12"
    >
      <path
        id="Icon_feather-play"
        data-name="Icon feather-play"
        d="M7.5,4.5l7.778,5L7.5,14.5Z"
        transform="translate(-6.5 -3.5)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

PlayIcon.propTypes = {
  className: propTypes.string,
  onClick: propTypes.func
}

export default PlayIcon
