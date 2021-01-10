var downloadPath = document.getElementById('directorypath');

// Register events
downloadPath.addEventListener('click', directoryPathOnClickHandler)

function directoryPathOnClickHandler() {
    fileDialog({ accept: '/*' })
        .then(files => console.log(files));
}