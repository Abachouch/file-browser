import React from 'react'
import propTypes from 'prop-types'

function VolumeIcon({ className, onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      viewBox="0 0 16.143 12.828"
    >
      <g transform="translate(-2 -5.981)">
        <path
          d="M9.365,7.5,5.829,10.329H3v4.243H5.829L9.365,17.4Z"
          transform="translate(0 -0.055)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M25.806,7.395a7.072,7.072,0,0,1,0,10m-2.5-7.5a3.536,3.536,0,0,1,0,5"
          transform="translate(-10.734)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  )
}

VolumeIcon.propTypes = {
  className: propTypes.string,
  onClick: propTypes.func
}

export default VolumeIcon
