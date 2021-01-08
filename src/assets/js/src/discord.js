const buttonJoinDiscord = document.getElementById('joinDiscordButton');
var config_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/config.json')));

// Register event handlers
window.onload = function() {
    buttonJoinDiscord.addEventListener('click', openDiscordHandler);
}

function openDiscordHandler() {
    open(config_data.discord_invite_link);
}