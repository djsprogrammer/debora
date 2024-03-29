const { app, BrowserWindow } = require('electron')
const path = require('path')

const isDev = require('electron-is-dev')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, '../icon.ico'),
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
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