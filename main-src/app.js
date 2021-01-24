const request = require('request');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const { create } = require('electron-log');

if (require('electron-squirrel-startup')) {
    app.quit();
}

var updater;
async function checkForUpdateAndCreateWindow() {
    updater = new BrowserWindow({
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
    autoUpdater.checkForUpdatesAndNotify();
}

async function createWindow() {
    let win = new BrowserWindow({
        width: 500,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, './data/app.ico'),
        resizable: false,
        autoHideMenuBar: true
    });

    win.loadFile(path.join(__dirname, './assets/html/src/index.html'));
    win.webContents.openDevTools();
};

app.on('ready', checkForUpdateAndCreateWindow);

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

autoUpdater.on('checking-for-update', () => {
    console.log("checking for update")
        //TODO: notify user
})
autoUpdater.on('update-available', (info) => {
    console.log("update avaible: " + info)
        //TODO: notify user
})
autoUpdater.on('update-not-available', (info) => {
    console.log("update not avaible: " + info)
    createWindow();
    //TODO: close updater and start main program
})
autoUpdater.on('error', (err) => {
    console.log("update error: " + err)
        //TODO: notify user, emit event to js file linked with the updater and retry in a couple of secounds
})
autoUpdater.on('download-progress', (progressObj) => {
    console.log("download progress: " + progressObj)
        //TODO: print progress on html
})
autoUpdater.on('update-downloaded', (info) => {
    console.log("update downloaded: " + info)
    autoUpdater.quitAndInstall();
});