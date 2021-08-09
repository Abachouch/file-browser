const { app, ipcMain } = require('electron')
const { join } = require('path')
const Datastore = require('nedb-promises')

const databasePath = join(app.getPath('appData'), 'ffinder', 'database')
const tagedFilesCollection = Datastore.create(join(databasePath, 'teged.db')) // {path , tag}

ipcMain.handle('tagFile', async (event, path, tags) => {
  tagedFilesCollection.count({ path: path }).then(count => {
    if (count === 0) {
      return tagedFilesCollection.insert({ path: path, tags: tags })
    } else {
      return tagedFilesCollection
        .update(
          { path: path },
          { path: path, tags: tags },
          { multi: true, upsert: true }
        )
        .then(() => {
          return tagedFilesCollection.load()
        })
    }
  })
})

ipcMain.handle('getAllTags', () => {
  return tagedFilesCollection.find({}, { tags: 1, _id: 0 }).then(data => {
    return new Promise(resolve => {
      let ar = []
      data.forEach(e => {
        ar = [...ar, ...e.tags]
      })
      let filtred = [...new Set(ar)]
      resolve(filtred)
    })
  })
})

ipcMain.handle('getTagsOfFile', (event, path) => {
  return tagedFilesCollection.findOne({ path: path.trim() })
})

ipcMain.handle('getFilesOfTag', (event, tag) => {
  console.log('searchin for tag : ' + tag)
  return tagedFilesCollection.find({ tags: tag })
})
