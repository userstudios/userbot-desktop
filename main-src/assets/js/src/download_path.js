const { dialog, BrowserWindow } = require('electron').remote;
var downloadPath = document.getElementById('directorypath');

downloadPath.setAttribute('value', getConfigDownloadPath());

// Register events
downloadPath.addEventListener('click', directoryPathOnClickHandler)

function directoryPathOnClickHandler() {
    dialog.showOpenDialog(createNewWindow(), {
        properties: ['openDirectory']
    }).then(data => {
        if (data.filePaths.length > 0) {
            downloadPath.setAttribute('value', data.filePaths[0]);
            config_data.download_path = data.filePaths[0];
            fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(config_data, null, 4));
        } else {
            alert("Dateienpfad konnte nicht ausgewählt werden.");
            config_data.download_path = config_data.default_download_path;
            fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(config_data, null, 4));
            downloadPath.setAttribute('value', getConfigDownloadPath());
        }
    });
}

function createNewWindow() {
    return new BrowserWindow({
        width: 1000,
        height: 1000,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'app.ico'),
        resizable: false
    });
}