const path = require('path');
const { BrowserWindow } = require('electron').remote;
let win = new BrowserWindow({
    width: 500,
    height: 800,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false
    },
    icon: path.join(__dirname, '../../../data/app.ico'),
    resizable: false,
    autoHideMenuBar: true
});

win.loadFile(path.join(__dirname, '../../../assets/html/src/index.html'));
win.webContents.openDevTools();
window.close();