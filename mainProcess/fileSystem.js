const { ipcMain, app, shell, clipboard } = require('electron')
const { readdir, readFile } = require('fs/promises')
const { join } = require('path')
const childProcess = require('child_process')
const disksInfo = require('node-disk-info')

ipcMain.on('getHomePath', event => {
  event.returnValue = app.getPath('home')
})

ipcMain.handle('getDrives', async () => {
  return disksInfo.getDiskInfo()
})

ipcMain.handle('getFolders', (event, path) => {
  return new Promise(resolve => {
    readdir(path, { withFileTypes: true })
      .then(entries => {
        let folders = []
        entries.forEach(e => {
          if (e.isDirectory())
            folders.push({ name: e.name, path: join(path, e.name) })
        })
        resolve(folders)
      })
      .catch(err => console.error(err))
  })
})

ipcMain.handle('getFiles', async (event, path) => {
  return new Promise(resolve => {
    readdir(path, { withFileTypes: true })
      .then(entries => {
        let files = []
        entries.forEach(e => {
          if (e.isFile()) files.push(join(path, e.name))
        })
        resolve(files)
      })
      .catch(err => console.error(err))
  })
})

ipcMain.handle('readTextFile', async (event, path) => {
  return readFile(path, { encoding: 'utf-8' })
})

// clipboard
ipcMain.on('copySvg', (event, path) => {
  readFile(path, { encoding: 'utf-8' }).then(data => {
    if (data) {
      clipboard.writeText(data)
      event.returnValue = true
    } else {
      event.returnValue = false
    }
  })
})

ipcMain.on('copyText', (event, txt) => {
  clipboard.writeText(txt)
})

// external

ipcMain.on('openInExplorer', (event, path) => {
  shell.showItemInFolder(path)
})

ipcMain.on('openWithDefaultApp', (event, path) => {
  shell.openExternal(path)
})

ipcMain.on('openInCMD', (event, path) => {
  childProcess.exec('start cmd.exe /K cd /D ' + path)
})

ipcMain.on('runScript', (event, path, packageManager, script) => {
  let pms = packageManager == 'npm' ? '--prefix' : '--cwd'
  let comd = `start yarn ${pms} ${path} run ${script} `

  childProcess.exec(comd)
  event.returnValue = ''
})

//

ipcMain.handle('isProject', (event, path) => {
  new Promise((resolve, reject) => {
    readdir(path, { withFileTypes: true })
      .then(entries => {
        resolve(entries.find(file => file.name === 'package.json'))
      })
      .catch(err => {
        reject(err)
      })
  })
})

ipcMain.handle('getProjectInfo', (event, path) => {
  return new Promise(resolve => {
    readFile(join(path, 'package.json'), { encoding: 'utf-8' })
      .then(result => {
        if (!result) throw new Error('cant read File  : ' + path)
        try {
          let json = JSON.parse(result)
          console.log(json)
          resolve({
            name: json.name,
            description: json.description,
            scripts: json.scripts,
            version: json.version,
            author: json.author
          })
        } catch {
          throw new Error('cant parse JSON')
        }
      })
      .catch(() => {
        resolve(false)
      })
  })
})
