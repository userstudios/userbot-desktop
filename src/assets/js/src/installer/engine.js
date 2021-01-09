var inputInstallPath = document.getElementById('directorypath');
var contractCheckbox = document.getElementById('contract');
var installUpdateButton = document.getElementById('installUpdateButton');

// Register events
window.onload = function() {
    installUpdateButton.addEventListener('click', checkUserBotIsInstalled);
};

function checkUserBotIsInstalled() {
    try {
        if (!fs.existsSync(getConfigDownloadPath())) {
            throw new Error("Path does not exist");
        }
        getAllJarFiles(getConfigDownloadPath()).then(files => {

        }).catch(err => {
            alert("Verzeichnis konnte nicht geöffnet werden: " + err.message);
        });
    } catch (err) {
        alert("Verzeichnis konnte nicht geöffnet werden: " + err.message);
    }
}

function getAllJarFiles(path) {
    return new Promise((resolve, reject) => {
        glob(path + '/*.jar', {}, (err, files) => {
            if (!err) resolve(files)
            else reject(err)
        })
    });
}

function getConfigDownloadPath() {
    let user = os.userInfo().username;
    return config_data.download_path.replace("${USER}", user);
}

function checkUpdatables() {

}

function fetchUpdatabled() {

}