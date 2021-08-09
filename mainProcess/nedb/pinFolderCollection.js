const { app, ipcMain } = require('electron')
const { join } = require('path')
const Datastore = require('nedb-promises')

const databasePath = join(app.getPath('appData'), 'ffinder', 'database')
const pinedCollection = Datastore.create({
  filename: join(databasePath, 'pined.db'),
  timestampData: true
}) // {path}

ipcMain.handle('pinFolder', (event, path) => {
  return pinedCollection.count({ path: path }).then((count) => {
    if (count === 0) {
      return pinedCollection.insert({ path: path })
    }
  })
})

ipcMain.handle('unPinFolder', (event, path) => {
  return pinedCollection.count({ path: path }).then((count) => {
    if (count > 0) {
      return pinedCollection.remove({ path: path }, { multi: true })
    }
  })
})

ipcMain.handle('getPinedFolders', () => {
  return pinedCollection.find({}, { path: 1 }).sort({ createdAt: 1 })
})

ipcMain.handle('isPined', (event, path) => {
  return new Promise((resolve, reject) => {
    pinedCollection.count({ path: path }).then((c) => {
      resolve(c > 0)
    })
  })
})
