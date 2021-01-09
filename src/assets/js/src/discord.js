var buttonJoinDiscord = document.getElementById('joinDiscordButton');

// Register event handlers
window.onload = function() {
    buttonJoinDiscord.addEventListener('click', openDiscordHandler);
}

function openDiscordHandler() {
    open(config_data.discord_invite_link);
}