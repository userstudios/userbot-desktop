const request = require('request');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = async() => {
    let updater = new BrowserWindow({
        width: 200,
        height: 200,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        frame: false,
        icon: path.join(__dirname, 'data/app.ico'),
        resizable: false,
        autoHideMenuBar: true
    });
    updater.loadFile(path.join(__dirname, 'assets/updater/html/index.html'));
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});