const { app, ipcMain } = require('electron')
const { join } = require('path')
const Datastore = require('nedb-promises')

const databasePath = join(app.getPath('appData'), 'ffinder', 'database')
const projectCollection = Datastore.create({
  filename: join(databasePath, 'projects.db'),
  timestampData: true
}) // {path}

ipcMain.handle('addProject', (event, path) => {
  return projectCollection.count({ path: path }).then((count) => {
    console.log('trying to add project : ' + path)
    if (count === 0) {
      return projectCollection.insert({ path: path })
    }
  })
})

ipcMain.handle('removeProject', (event, path) => {
  return projectCollection.count({ path: path }).then((count) => {
    console.log('trying to remove project : ' + path)
    if (count > 0) {
      return projectCollection.remove({ path: path }, { multi: true })
    }
  })
})

ipcMain.handle('getProjects', () => {
  return projectCollection.find({}, { path: 1 }).sort({ createdAt: 1 })
})

ipcMain.handle('isProjectSaved', (event, path) => {
  return new Promise((resolve, reject) => {
    projectCollection.count({ path: path }).then((c) => {
      resolve(c > 0)
    })
  })
})
