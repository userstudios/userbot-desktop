const inputInstallPath = document.getElementById('directorypath');
const contractCheckbox = document.getElementById('contract');
const installUpdateButton = document.getElementById('installUpdateButton');
var config_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/config.json')));

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
            console.log(files.length)
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