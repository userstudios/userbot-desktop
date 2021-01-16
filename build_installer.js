const { MSICreator } = require('electron-wix-msi');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './UBDesktop-win32-x64');
const OUT_DIR = path.resolve(__dirname, './windows_installer');
const ICON_DIR = path.resolve(__dirname, './userbot_logo.icon');

const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,
    exe: 'UBDesktop',
    name: 'UBDesktop-Installer',
    manufacturer: 'userstudios',
    version: '1.0.0',
    appIconPath: ICON_DIR,
    ui: {
        chooseDirectory: true
    },
});

msiCreator.create().then(function() {
    msiCreator.compile();
});