const default_mc_path = `C:\\Users\\${os.userInfo().username}\\AppData\\Roaming\\.minecraft`;
const default_ub_path = `C:\\Users\\${os.userInfo().username}\\AppData\\Roaming\\.minecraft\\LabyMod\\addons-1.12\\UserBot.jar`;
const inputInstallPath = document.getElementById('directorypath');
const contractCheckbox = document.getElementById('contract');
const installUpdateButton = document.getElementById('installUpdateButton');

var config_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/config.json')));


// Register events
window.onload = function() {
    installUpdateButton.addEventListener('click', helloWorldHandler);
};

function helloWorldHandler() {
    alert("Hello world");
}