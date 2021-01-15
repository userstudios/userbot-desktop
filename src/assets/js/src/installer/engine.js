const { watchFile } = require("fs");

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
        installUpdateButton.disabled = true;
        installUpdateButton.innerHTML = config_data.userbot_install_update_inhold_button_loading;
        if (!fs.existsSync(getConfigDownloadPath())) {
            throw new Error("Path does not exist");
        }
        if (!contractCheckbox.checked) {
            resetInstallUpdateLoading();
            alert("Du musst unserem AGB und Datenschutz erklärung zustimmmen um unsere Produkte benutzen zu können.");
            return;
        }
        let files = await getAllJarFiles(getConfigDownloadPath());
        let array = await getJarsWithListedAddonSignature(files);

        if (array.length == 0) {
            await installJarToPath();
            await resetInstallUpdateLoading();
            alert("Installation abgeschlossen.");
        } else if (array.length == 1) {
            if (await selectedAddonVersionNotCurrent(array[0])) {
                await moveFilesToTrashBin(array);
                await installJarToPath();
                await resetInstallUpdateLoading();
                alert("Update abgeschlossen.");
            } else {
                await resetInstallUpdateLoading();
                alert("Version ist bereits auf dem neusten Stand.");
            }
        } else if (array.length > 1) {
            await moveFilesToTrashBin(array);
            await installJarToPath();
            await resetInstallUpdateLoading();
            alert("Update abgeschlossen.");
        } else {
            await resetInstallUpdateLoading();
            throw new Error("Array length is lower than 0");
        }
    } catch (err) {
        await resetInstallUpdateLoading();
        alert("Ein Fehler ist aufgetreten.");
        console.log(err)
    }
}

async function resetInstallUpdateLoading() {
    return new Promise((resolve, reject) => {
        installUpdateButton.innerHTML = config_data.userbot_install_update_inhold_button_default;
        installUpdateButton.disabled = false;
        setTimeout(() => {
            resolve();
        }, 100);
    });
}

async function selectedAddonVersionNotCurrent(addonFile) {
    let jar = await fetchJar(addonFile);
    if (jar._manifest.main[configGetManiFestIdById(selected_userbot_id)] != configGetVersionById(selected_userbot_id)) {

        return true;
    }
    return false;
}

async function getJarsWithListedAddonSignature(files) {
    let array = [];
    for (let i = 0; i < files.length; i++) {
        try {
            let jar = await fetchJar(files[i]);
            if (jar._manifest.main[configGetManiFestIdById(selected_userbot_id)] != null) {
                array.push(files[i]);
            }
        } catch (err) {}
    }
    return array;
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

async function getAllJarFiles(path) {
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

async function moveFilesToTrashBin(files) {
    for (let i = 0; i < files.length; i++) {
        console.log("Moving file to trash bin " + files[i])
        try {
            await trash(files[i]);
        } catch (err) {
            alert("Ein fehler ist beim installieren aufgetreten. Löschung des alten Versions ist fehlgeschlagen.");
            console.log("Failed.");
            return false;
        }
        return true;
    }
}

async function installJarToPath() {
    let arrayNames = configGetDisPlayNameById(selected_userbot_id);
    let arrayDownloadUrls = configGetDownLoadUrlById(selected_userbot_id);
    let fileEndings = configGetFileEnding(selected_userbot_id);
    let downloadPath = getConfigDownloadPath();
    try {
        await download(downloadPath, arrayNames, fileEndings, arrayDownloadUrls);
    } catch (err) {
        throw new Error("Could not download the file.");
        console.log(err);
    }
}

async function download(path, name, fileEnding, url) {
    let pathAndName = path + "\\" + name + fileEnding;
    return new Promise((resolve, reject) => {
        request.head(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                request(url)
                    .pipe(fs.createWriteStream(pathAndName))
                    .on('close', () => {
                        resolve(res);
                    });
            }
        });
    });
}