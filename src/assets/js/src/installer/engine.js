var inputInstallPath = document.getElementById('directorypath');
var contractCheckbox = document.getElementById('contract');
var installUpdateButton = document.getElementById('installUpdateButton');

// Register events
installUpdateButton.addEventListener('click', installUpdateClickedHandler);

function installUpdateClickedHandler() {
    if (selected_userbot_id != null) {
        checkUserBotIsInstalled();
    } else {
        alert("Bitte wähle das UserBot aus, das installiert oder updated werden soll.");
    }
}

async function checkUserBotIsInstalled() {
    try {
        if (!fs.existsSync(getConfigDownloadPath())) {
            throw new Error("Path does not exist");
        }
        getAllJarFiles(getConfigDownloadPath()).then(async(files) => {
            let array = [];
            for (let i = 0; i < files.length; i++) {
                let jar = await fetchJar(files[i]);
                if (jar._manifest.main[configGetManiFestIdById(selected_userbot_id)] != null) {
                    array.push(files[i]);
                }
            }
            let downLoadPath = getConfigDownloadPath();
            if (array.length == 0) {
                installJarToPath(downLoadPath);
            } else if (array.length == 1) {
                let jar = await fetchJar(array[0]);
                if (jar._manifest.main[configGetManiFestIdById(selected_userbot_id)] != configGetVersionById(selected_userbot_id)) {
                    deleteFiles(array);
                    installJarToPath(downLoadPath);
                }
            } else if (array.length > 1) {
                deleteFiles(array);
                installJarToPath(downLoadPath);
            }
        }).catch(err => {
            alert("Verzeichnis konnte nicht geöffnet werden: " + err.message);
        });
    } catch (err) {
        alert("Verzeichnis konnte nicht geöffnet werden: " + err.message);
    }
}

async function fetchJar(path) {
    return new Promise((resolve, reject) => {
        jarfile.fetchJarAtPath(path, function(err, jar) {
            if (err) {
                reject(err);
            } else {
                resolve(jar);
            }
        });
    });
}

function getAllJarFiles(path) {
    return new Promise((resolve, reject) => {
        glob(path + '/*.jar', {}, (err, files) => {
            if (!err) {
                resolve(files);
            } else {
                reject(err);
            }
        })
    });
}

function getConfigDownloadPath() {
    let user = os.userInfo().username;
    return config_data.download_path.replace("${USER}", user);
}

function deleteFiles(files) {
    for (let i = 0; i < files.length; i++) {
        console.log("removing " + files[i])
        fs.unlinkSync(files[i]);
    }
}

function installJarToPath(path) {}

const download = (url, path, resolve, reject) => {
    request.head(url, (err, res, body) => {
        if (err) {
            reject(err);
        } else {
            request(url)
                .pipe(fs.createWriteStream(path))
                .on('close', () => {
                    resolve(res);
                });
        }
    });
}