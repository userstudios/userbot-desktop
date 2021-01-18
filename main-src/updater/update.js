const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const { pipeline } = require('stream');
const { promisify } = require('util');
const streamPipeline = promisify(pipeline);
const extract = require('extract-zip');
const trash = require('trash');
let downloadPath = path.join(__dirname, "../", "../");
let mainSrcPath = path.join(__dirname, "../", "../", "main-src");

async function update() {
    let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/config.json')));
    let res = await fetch('https://api.github.com/repos/0xtcb/userbot-desktop/releases');
	let json = await res.json();
    if (json[0].tag_name != config.api_github_0xtcb_releases) {
        let downloadRes = await fetch(json[0].assets[0].browser_download_url);
        let folderName = json[0].assets[0].name;
        if (!downloadRes.ok) throw new Error(`unexpected response ${downloadRes.statusText}`);
        await streamPipeline(downloadRes.body, fs.createWriteStream(path.join(downloadPath, folderName)));
        if (fs.existsSync(mainSrcPath)) {
            await trash(mainSrcPath);
        }
        await extract(path.join(downloadPath, folderName), { dir: path.join(downloadPath) });
        await trash(path.join(downloadPath, folderName));
    } else {

    }
}

module.exports.update = update;