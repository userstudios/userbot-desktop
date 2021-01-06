const default_mc_path = `C:\\Users\\${os.userInfo().username}\\AppData\\Roaming\\.minecraft`
const default_ub_path = `C:\\Users\\${os.userInfo().username}\\AppData\\Roaming\\.minecraft\\LabyMod\\addons-1.12\\UserBot.jar`
const secInstall = doc.querySelector('.sec-install')
const inputInstallPath = doc.querySelector('.input-install-path')
const btnInstall = doc.querySelector('.btn-install')
const secUpdate = doc.querySelector('.sec-update')
const btnUpdate = doc.querySelector('.btn-update')
const secUptodate = doc.querySelector('.sec-uptodate')

var config_data = fs.readFileSync(path.join(__dirname, 'data/config.json'));
var config_data = JSON.parse(config_data);

try {
  if (fs.existsSync(default_ub_path)) {
    alert("Already Installed.")
    inputInstallPath.value = "Already Installed."
    checkUpdate()
  } else {
    secInstall.style.display = "block"
    alert("Not Installed.")
    inputInstallPath.value = default_mc_path
    btnInstall.addEventListener('click', () => {
        var install_path = default_mc_path + `\\LabyMod\\addons-1.12\\UserBot.jar`
        console.log(install_path)
        downloadLatest(install_path)
        config_data.mc_path = default_mc_path
        console.log(config_data)
        fs.writeFileSync(path.join(__dirname, 'data/config.json'), JSON.stringify(config_data));
    })
  }
} catch(err) {
    console.log(err)
    alert("error")
}

async function downloadLatest(install_path) {
    const down_file = fs.createWriteStream(install_path);
        http.get(config_data.download_server, function(response) {
            response.pipe(down_file);
            alert("Download finished!")
            console.log('Download finished!')
        });
}