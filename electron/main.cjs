const {app, BrowserWindow} = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1350,
        height: 900,
        minWidth: 1350,
        minHeight: 900,
        webPreferences: {
            nodeIntegration: true
        }
    });

    /*win.loadURL('http://localhost:6969/')*/

    win.loadFile(path.join(app.getAppPath(),'dist/index.html'))
    win.setMenuBarVisibility(false)
}


app.whenReady().then(()=>{
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
