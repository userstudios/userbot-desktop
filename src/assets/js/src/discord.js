var buttonJoinDiscord = document.getElementById('joinDiscordButton');

// Register event handlers
window.onload = function() {
    buttonJoinDiscord.addEventListener('click', openDiscordHandler);
}

function openDiscordHandler() {
    window.open(config_data.discord_invite_link, 'UserBot Discord', "nodeIntegration=no, width=1000, height=700");
}