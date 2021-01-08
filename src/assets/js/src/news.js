const newsLetter = document.getElementById('news_letter');
var config_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/config.json')));

fetch(config_data.userbot_news)
    .then(res => res.text())
    .then(body => {
        news_letter.innerHTML = body;
    })
    .catch(err => { newsLetter.innerHTML = config_data.userbot_no_news_connection });