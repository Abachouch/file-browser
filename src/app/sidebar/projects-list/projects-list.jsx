import React from 'react'
import { useSelector } from 'react-redux'
import Folder from '../../components/folder.jsx'

export default function ProjectsList() {
  const projects = useSelector(state => state.projects.list)

  if (projects.length > 0)
    return (
      <div className="sidebar-list">
        <h3 className="sidebar-heading">Projects</h3>
        {projects.map((project, index) => {
          return <Folder key={index} path={project.path} icon="project" />
        })}
      </div>
    )
  else return '<p> no project saved</p>'
}
