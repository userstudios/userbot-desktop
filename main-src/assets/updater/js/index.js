const path = require('path');
const { BrowserWindow } = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;
var updateStatus = document.getElementById('update_status');
var loader = document.getElementsByClassName('loader');
var loading_1 = document.getElementsByClassName('loading_1');
console.log(loader.style)
ipcRenderer.on('loading_bar', (event, arg) => {
    changePercentileOfBar(arg[0])
});

ipcRenderer.on('loading_status', (event, arg) => {
    updateStatus.innerHTML = arg[0];
});

function changePercentileOfBar(percent) {
    for (let i = 0; i < loader.length; i++) {

    }
    for (let i = 0; i < loading_1.length; i++) {

    }
}