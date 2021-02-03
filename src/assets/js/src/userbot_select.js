const userBotVersionClassName = config_data.userbot_selection_class_name;
var userbotSelection = document.getElementById('userbot_selection');
var userbotAuswahlHeader = document.getElementById('auswahl_header');
var userbotVerzeichnisHeader = document.getElementById('verzeichnis_pfad_header');
var userbotVerzeichnisEingabe = document.getElementById('verzeichnis_pfad_eingabe');
var selected_userbot_id = null;
var latest_userbot_catalogue = null;

fetch(config_data.userbot_versions)
    .then(res => res.json())
    .then(body => {
        latest_userbot_catalogue = body;
        //<a style="color: var(--dark); cursor: pointer;" class="userbot_version">UserBot Hauptversion</a>
        printSelectionInHtml();
    }).catch(err => { userbot_selection.innerHTML = config_data.userbot_no_versions_connection + " " + err });

function printSelectionInHtml() {
    let divInhold = "";

    for (let i = 0; i < latest_userbot_catalogue.userbot_ids.length; i++) {
        divInhold += "<a style=\"color: var(--dark); cursor: pointer;\" class=\"" + userBotVersionClassName + "\" id=\"" + latest_userbot_catalogue.userbot_ids[i] + "\">" + latest_userbot_catalogue.userbot_display_names[i] + "</a>";
    }

    userbotSelection.innerHTML = divInhold;

    registerButtonClickEvents(userBotVersionClassName);
}

function registerButtonClickEvents(userBotVersionClassName) {
    let elements = document.getElementsByClassName(userBotVersionClassName);
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', selectUserBotOnClick);
    }
}

function selectUserBotOnClick() {
    let element_id = window.event.target.id;
    let elements = document.getElementsByClassName(userBotVersionClassName);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].id == element_id) {
            if (element_id == selected_userbot_id) {
                elements[i].setAttribute('style', config_data.userbot_unselected_style);
                selected_userbot_id = null;
            } else {
                elements[i].setAttribute('style', config_data.userbot_selected_style);
                selected_userbot_id = element_id;
            }
        } else {
            elements[i].setAttribute('style', config_data.userbot_unselected_style);
        }
    }
    printInformationInHtml();
}

function printInformationInHtml() {
    if (selected_userbot_id != null) {
        userbotAuswahlHeader.innerHTML = configGetAuswahlHeaderById(selected_userbot_id);
        userbotVerzeichnisHeader.innerHTML = configGetVerzeichNisHeaderById(selected_userbot_id);
        userbotVerzeichnisEingabe.innerHTML = configGetVerzeichNisEingabeById(selected_userbot_id);
    } else {
        userbotAuswahlHeader.innerHTML = config_data.auswahl_header;
        userbotVerzeichnisHeader.innerHTML = config_data.verzeichnis_pfad_header;
        userbotVerzeichnisEingabe.innerHTML = config_data.verzeichnis_pfad_eingabe;
    }
}

function configGetVerzeichNisHeaderById(id) {
    for (let i = 0; i < latest_userbot_catalogue.userbot_ids.length; i++) {
        if (latest_userbot_catalogue.userbot_ids[i] == id) {
            return latest_userbot_catalogue.userbot_verzeichnis_header[i];
        }
    }
    return null;
}

function configGetAuswahlHeaderById(id) {
    for (let i = 0; i < latest_userbot_catalogue.userbot_ids.length; i++) {
        if (latest_userbot_catalogue.userbot_ids[i] == id) {
            return latest_userbot_catalogue.userbot_auswahl_header[i];
        }
    }
    return null;
}

function configGetVerzeichNisEingabeById(id) {
    for (let i = 0; i < latest_userbot_catalogue.userbot_ids.length; i++) {
        if (latest_userbot_catalogue.userbot_ids[i] == id) {
            return latest_userbot_catalogue.userbot_verzeichnis_eingabe[i];
        }
    }
    return null;
}

function configGetDisPlayNameById(id) {
    for (let i = 0; i < latest_userbot_catalogue.userbot_ids.length; i++) {
        if (latest_userbot_catalogue.userbot_ids[i] == id) {
            return latest_userbot_catalogue.userbot_display_names[i];
        }
    }
    return null;
}

function configGetFileEnding(id) {
    for (let i = 0; i < latest_userbot_catalogue.userbot_ids.length; i++) {
        if (latest_userbot_catalogue.userbot_ids[i] == id) {
            return latest_userbot_catalogue.userbot_file_endings[i];
        }
    }
    return null;
}

function configGetManiFestIdById(id) {
    for (let i = 0; i < latest_userbot_catalogue.userbot_ids.length; i++) {
        if (latest_userbot_catalogue.userbot_ids[i] == id) {
            return latest_userbot_catalogue.userbot_jar_manifest_attributes[i];
        }
    }
    return null;
}

function configGetDownLoadUrlById(id) {
    for (let i = 0; i < latest_userbot_catalogue.userbot_ids.length; i++) {
        if (latest_userbot_catalogue.userbot_ids[i] == id) {
            return latest_userbot_catalogue.userbot_download_links[i];
        }
    }
    return null;
}

function configGetVersionById(id) {
    for (let i = 0; i < latest_userbot_catalogue.userbot_ids.length; i++) {
        if (latest_userbot_catalogue.userbot_ids[i] == id) {
            return latest_userbot_catalogue.userbot_versions[i];
        }
    }
    return null;
}