const open = require('open');
const fs = require('fs');
const buttonJoinDiscord = document.getElementById('joinDiscordButton');
var config_data = fs.readFileSync(path.join(__dirname, 'data/config.json'));

// Register event handlers
window.onload = function() {
    buttonJoinDiscord.addEventListener('click', openDiscordHandler);
}

function openDiscordHandler() {
    let discordLink = config_data.discord_invite_link;
    open(discordLink);
}