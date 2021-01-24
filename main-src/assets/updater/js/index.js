const path = require('path');
const { BrowserWindow } = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;
var updateStatus = document.getElementById('update_status');
var loader = document.getElementsByClassName('loader');
var loading_1 = document.getElementsByClassName('loading_1');

log(loader);

ipcRenderer.on('loading_bar', (event, arg) => {
    log(arg);
    changePercentileOfBar(arg[0])
});

ipcRenderer.on('loading_status', (event, arg) => {
    log(arg);
    updateStatus.innerHTML = arg;
});

function changePercentileOfBar(percent) {
    for (let i = 0; i < loader.length; i++) {

    }
    for (let i = 0; i < loading_1.length; i++) {

    }
}

function log(msg) {
    ipcRenderer.send('log', msg);
}