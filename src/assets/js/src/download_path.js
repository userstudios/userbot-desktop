var downloadPath = document.getElementById('directorypath');

window.onload = function() {
    downloadPath.addEventListener('click', directoryPathOnClickHandler)
}

function directoryPathOnClickHandler() {
    fileDialog({ accept: '/*' })
        .then(files => console.log(files))
}