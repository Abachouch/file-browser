import React, { useState } from 'react'
import propTypes from 'prop-types'
import './explorer-header.scss'

function ExplorerHeader({ onFilter }) {
  const filters = ['all', 'audio', 'video', 'text', 'image']
  const [activeFilter, setActiveFilter] = useState('all')

  return (
    <header className="explorer-header">
      {filters.map(f => {
        return (
          <button
            key={f}
            onClick={() => {
              onFilter(f), setActiveFilter(f)
            }}
            className={
              'explorer-header-filter ' + (activeFilter == f ? 'active' : '')
            }
          >
            {f}
          </button>
        )
      })}
    </header>
  )
}

ExplorerHeader.propTypes = {
  onFilter: propTypes.func
}

export default ExplorerHeader
