
async function checkUpdate() {
    fetch('https://download-userbot.netlify.app/latest_verion.json')
        .then(res => res.json())
        .then(json => {
            jarfile.fetchJarAtPath(config_data.mc_path + `\\LabyMod\\addons-1.12\\UserBot.jar`, function (err, jar) {
                local_ver = parseFloat(jar._manifest.main.UserBot_Version)
                console.log(local_ver)
                if (local_ver < json.latest_ver) {
                    console.log("Must Update")
                    secUpdate.style.display = "block"
                    btnUpdate.addEventListener('click', () => {
                        downloadLatest(config_data.mc_path + `\\LabyMod\\addons-1.12\\UserBot.jar`)
                        secUpdate.style.display = "none";
                        secUptodate.style.display = "block";
                    })
                } else {
                    console.log("Update not neddet")
                    secUptodate.style.display = "block";
                }
            })
        })
}