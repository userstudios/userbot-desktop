const path = require('path');
const { BrowserWindow } = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;
var updateStatus = document.getElementById('update_status');

ipcRenderer.on('loading_bar', (event, arg) => {
    log(arg);
    changePercentileOfBar(arg)
});

ipcRenderer.on('loading_status', (event, arg) => {
    log(arg);
    updateStatus.innerHTML = arg;
});

function changePercentileOfBar(percent) {
    document.documentElement.style.setProperty('--percentile', percent)
}

function log(msg) {
    ipcRenderer.send('log', msg);
}