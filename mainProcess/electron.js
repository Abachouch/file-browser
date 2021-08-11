const { app, ipcMain, BrowserWindow } = require('electron')
// const disksInfo = require('node-disk-info')
// import { BrowserWindow} from 'electron'

const AudioMetadata = require('music-metadata')

let win

function createWindow() {
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    backgroundColor: '#232325',
    frame: true,
    darkTheme: true,

    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.maximize()
  win.webContents.setWindowOpenHandler(info => {
    if (info.frameName === 'preview') {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          frame: true,
          fullscreenable: false,
          backgroundColor: 'blue',
          title: info.features,
          webPreferences: {
            devTools: true,
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false
          }
        }
      }
    }
    return { action: 'deny' }
  })
}

// function createPreview(info) {
//   console.log('window is created')

// }

ipcMain.on('openPreview', (event, arg) => {
  const preview = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    backgroundColor: '#232325',
    frame: true,
    title: arg,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })

  preview.loadFile('build/preview/preview.html')
  preview.show()
  preview.webContents.on('did-finish-load', function () {
    preview.webContents.send('onsendData', arg)
    preview.webContents.setZoomFactor(1)
  })
})

app
  .whenReady()
  .then(() => {
    createWindow()
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })
  .then(() => {
    win.loadFile('build/index.html')
  })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('testTags', () => {
  return new Promise(resolve => {
    resolve(['tag1', 'tag2', 'tag3'])
  })
})

// Windows Fram actions
// require('./main_process/titleBar')
require('./fileSystem')
require('./nedb/pinFolderCollection')
require('./nedb/projectCollection')
require('./nedb/tagCollection')
// require ('./../database/db')

ipcMain.handle('getAudioMetadata', (event, args) => {
  console.log(args)
  return AudioMetadata.parseFile(
    'C:\\Users\\youss\\Anys ft ouenza - B4T (Cloud26).mp3'
  )
})

ipcMain.on('isMinimized', event => {
  event.returnValue = win.isMinimized()
})
