var newsLetter = document.getElementById('news_letter');

fetch(config_data.userbot_news)
    .then(res => res.text())
    .then(body => {
        news_letter.innerHTML = body;
    }).catch(err => { newsLetter.innerHTML = config_data.userbot_no_news_connection + "<p>" + err + "</p>" });