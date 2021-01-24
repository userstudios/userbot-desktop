const request = require('request');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const { create } = require('electron-log');
const { argv } = require('process');

if (require('electron-squirrel-startup')) {
    app.quit();
}

var updater;
async function checkForUpdateAndCreateWindow() {
    updater = new BrowserWindow({
        width: 200,
        height: 100,
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
    await updater.loadFile(path.join(__dirname, 'assets/updater/html/index.html'));
    updater.on('close', () => {
        createWindow();
        updater = null;
    });
    autoUpdater.checkForUpdatesAndNotify();
}
async function createWindow() {
    let mainAppWin = new BrowserWindow({
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
    mainAppWin.loadFile(path.join(__dirname, './assets/html/src/index.html'));
};

app.on('ready', checkForUpdateAndCreateWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

autoUpdater.on('checking-for-update', () => {
    updater.webContents.send("loading_status", "Checking for updates...");
    //TODO: notify user
})
autoUpdater.on('update-available', (info) => {
    updater.webContents.send("loading_status", "Found update...");
    //TODO: notify user
})
autoUpdater.on('update-not-available', (info) => {
    updater.webContents.send("loading_status", "No update avaible");
    updater.close();
})
autoUpdater.on('error', (err) => {
    updater.webContents.send("loading_status", err);
    //TODO: notify user, emit event to js file linked with the updater and retry in a couple of secounds
})
autoUpdater.on('download-progress', (progressObj) => {
    updater.webContents.send("loading_bar", progressObj.percent);
    //TODO: print progress on html
})
autoUpdater.on('update-downloaded', (info) => {
    updater.webContents.send("loading_status", info);
    autoUpdater.quitAndInstall(true, true);
});

ipcMain.on('log', (event, arg) => {
    console.log(arg);
});