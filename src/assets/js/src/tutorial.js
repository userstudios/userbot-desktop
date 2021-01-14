var tutorialLetter = document.getElementById('tutorial_letter');

fetch(config_data.userbot_tutorial)
    .then(res => res.text())
    .then(body => {
        tutorialLetter.innerHTML = body;
    }).catch(err => { tutorialLetter.innerHTML = config_data.userbot_no_news_connection + "<p>" + err + "</p>" });