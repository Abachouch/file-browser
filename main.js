const { app, ipcMain, BrowserWindow } = require('electron');
// const disksInfo = require('node-disk-info') ;
// import { BrowserWindow} from 'electron';

let win;

function createWindow() {
    win = new BrowserWindow({

        minWidth: 800,
        minHeight: 600,
        autoHideMenuBar: true,
        backgroundColor: '#232325',
        frame: false,

        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    win.maximize();
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
}).then(() => {
    win.loadFile('build/index.html');
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


ipcMain.handle('testTags', () => {
    return new Promise((resolve, reject) => {
        resolve(['tag1', 'tag2', 'tag3'])
    })
})


// Windows Fram actions
// require('./main_process/titleBar')
require('./mainProcess/fileSystem');
require('./mainProcess/nedb/pinFolderCollection');
require('./mainProcess/nedb/projectCollection');
require('./mainProcess/nedb/tagCollection');
// require ('./../database/db')