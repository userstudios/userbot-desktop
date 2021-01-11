const { dialog, BrowserWindow } = require('electron').remote;
var downloadPath = document.getElementById('directorypath');

downloadPath.setAttribute('value', config_data.download_path);

// Register events
downloadPath.addEventListener('click', directoryPathOnClickHandler)

let main_window;

function directoryPathOnClickHandler() {
    dialog.showOpenDialog(createNewWindow(), {
        properties: ['openDirectory']
    }).then(data => {
        downloadPath.setAttribute('value', data.filePaths);
        config_data.download_path = data.filePaths;
        fs.writeFileSync(path.join(__dirname + "data/config.json"), JSON.stringify(config_data));
    });
}

function createNewWindow() {
    console.log(path.join(__dirname, 'app.ico'));
    return new BrowserWindow({
        width: 1000,
        height: 1000,
        show: false,
        webPreferences: {
            nodeIntegration: true
        },
        icon: "http://api.userbot.userstudios.org/app.ico",
        resizable: false
    });
}