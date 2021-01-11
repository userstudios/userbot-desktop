const userBotVersionClassName = config_data.userbot_selection_class_name;
var userbotSelection = document.getElementById('userbot_selection');
var selected_userbot_id = null;
var latest_userbot_catalogue = null;

fetch(config_data.userbot_versions)
    .then(res => res.json())
    .then(body => {
        latest_userbot_catalogue = body;
        //<a style="color: var(--dark); cursor: pointer;" class="userbot_version">UserBot Hauptversion</a>
        printSelectionInHtml(body)
    }).catch(err => { userbot_selection.innerHTML = config_data.userbot_no_versions_connection + " " + err });

function printSelectionInHtml(json) {
    let divInhold = "";

    for (let i = 0; i < json.userbot_ids.length; i++) {
        divInhold += "<a style=\"color: var(--dark); cursor: pointer;\" class=\"" + userBotVersionClassName + "\" id=\"" + json.userbot_ids[i] + "\">" + json.userbot_display_names[i] + "</a>";
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
}

function configGetDisPlayNameById(id) {
    for (let i = 0; i < latest_userbot_catalogue.userbot_ids.length; i++) {
        if (latest_userbot_catalogue.userbot_ids[i] == id) {
            return latest_userbot_catalogue.userbot_display_names[i];
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
            return latest_userbot_catalogue.userbot_display_names[i];
        }
    }
    return null;
}