const default_mc_path = `C:\\Users\\${os.userInfo().username}\\AppData\\Roaming\\.minecraft`
const default_ub_path = `C:\\Users\\${os.userInfo().username}\\AppData\\Roaming\\.minecraft\\LabyMod\\addons-1.12\\UserBot.jar`
const inputInstallPath = document.querySelector('.input-install-path')
const btnInstall = document.querySelector('.btn-install')
const btnUpdate = document.querySelector('.btn-update')
const secUptodate = document.querySelector('.sec-uptodate')

var config_data = fs.readFileSync(path.join(__dirname, 'data/config.json'));
var config_data = JSON.parse(config_data);

secUpdate.style.display = "block";

btnInstall.addEventListener('click', () => {

});

async function downloadLatest(install_path) {
    const down_file = fs.createWriteStream(install_path);
    http.get(config_data.download_server, function(response) {
        response.pipe(down_file);
        alert("Download finished!")
        console.log('Download finished!')
    });
}