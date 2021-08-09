import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { BurgerIcon, ReturnIcon, ForwardIcon } from '../../helpers/svgs.jsx'
import DrivesList from './drives-list/drives-list.jsx'
import PinedList from './pined-list/pined-list.jsx'
import FolderList from './folders-list/folders-list.jsx'
import TagsList from './tags-list/tags-list.jsx'
import PlacesList from './places-list/places-list.jsx'
import ProjectsList from './projects-list/projects-list.jsx'

import { Menu } from '../components/menu.jsx'
import { forward, back } from '../../redux/historySlice.js'

export default function SideBar() {
  let [panel, setPanel] = React.useState('explorer')
  let [isShowMenu, setIsShowMenu] = React.useState(false)
  const history = useSelector(state => state.history.list)
  const index = useSelector(state => state.history.index)
  const dispatch = useDispatch()

  return (
    <aside id="l-sidebar">
      <header className="sidebar-header">
        <button
          className="sidebar-header-icon sidebar-header-menu"
          onClick={() => {
            setIsShowMenu(!isShowMenu)
          }}
        >
          <BurgerIcon />
        </button>
        {isShowMenu && <Menu></Menu>}

        <div className="sidebar-header-navigation">
          <button
            className={
              `sidebar-header-icon sidebar-header-navigation ` +
              (index > 0 ? ' enabled ' : ' disabled ')
            }
            onClick={() => {
              dispatch(back())
            }}
          >
            <ReturnIcon />
          </button>
          <button
            className={
              ` sidebar-header-icon sidebar-header-navigation ` +
              (history.length - 1 != index ? ' enabled ' : ' disabled ')
            }
            onClick={() => {
              dispatch(forward())
            }}
          >
            <ForwardIcon />
          </button>
        </div>

        <button className="sidebar-header-button">Moodboard</button>
        <div className="sidebar-toggle">
          <button
            onClick={() => {
              setPanel('explorer')
            }}
            className={
              'sidebar-toggle-button ' + (panel === 'explorer' ? 'active' : '')
            }
          >
            Explorer
          </button>
          <button
            onClick={() => {
              setPanel('tags')
            }}
            className={
              'sidebar-toggle-button ' + (panel === 'tags' ? 'active' : '')
            }
          >
            Tags
          </button>
        </div>
      </header>

      <div className="sidebar-lists" id="sidebarContent">
        {panel == 'explorer' && (
          <>
            <FolderList></FolderList>
            <DrivesList></DrivesList>
            <PinedList></PinedList>
            <ProjectsList></ProjectsList>
          </>
        )}

        {panel == 'tags' && <TagsList></TagsList>}
      </div>

      {panel == 'explorer' && <PlacesList />}
    </aside>
  )
}
