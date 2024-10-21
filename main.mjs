import path from 'path';
import * as url from 'node:url';
import { app, BrowserWindow, ipcMain } from 'electron';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function createWindow(opt = {}) {
    let options = Object.assign(
        {
            backgroundColor: '#FFF',
            webviewTag: false,
            webSecurity: true,
            webPreferences: {
                contextIsolation: true,
                disableBlinkFeatures: 'Auxclick',
                preload: `${__dirname}/preload.mjs`, // Load preload script
                sandbox: false
            }
        }, opt)

    let mainWindow = new BrowserWindow(options)

    let ourl = url.format(
        {
            pathname: `index.html`,
            protocol: 'file:',
            slashes: true
        })

    mainWindow.loadURL(ourl)

    mainWindow.on('maximize', function () {
        mainWindow.webContents.send('window-event', 'maximize')
    });

    mainWindow.on('unmaximize', function () {
        mainWindow.webContents.send('window-event', 'unmaximize')
    });

    mainWindow.on('resize', function () {
        mainWindow.webContents.send('window-event', 'resize')
    });

    return mainWindow
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})