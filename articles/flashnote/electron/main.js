const { app, BrowserWindow } = require('electron')


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 600,
    minHeight: 350,
    fullscreen: false,
    center: true,
    resizable: true,
    movable: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false
    }
  })

  // and load the index.html of the app.
  win.loadURL('https://flashnote.netlify.app/app')
}


app.on('ready', createWindow)