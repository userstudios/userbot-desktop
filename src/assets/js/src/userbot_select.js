const className = config_data.userbot_selection_class_name;
var userbotSelection = document.getElementById('userbot_selection');
var selected_userbot = null;
var latest_userbot_catalogue = null;

fetch(config_data.userbot_versions)
    .then(res => res.json())
    .then(body => {
        latest_userbot_catalogue = body;
        //<a style="color: var(--dark); cursor: pointer;" class="userbot_version">UserBot Hauptversion</a>
        printSelectionInHtml(body)
    }).catch(err => { userbot_selection.innerHTML = config_data.userbot_no_versions_connection + " " + err });

function printSelectionInHtml(json) {
    let className = config_data.userbot_selection_class_name;
    let divInhold = "";

    for (let i = 0; i < json.userbot_ids.length; i++) {
        divInhold += "<a style=\"color: var(--dark); cursor: pointer;\" class=\"" + className + "\" id=\"" + json.userbot_ids[i] + "\">" + json.userbot_display_names[i] + "</a>";
    }

    userbotSelection.innerHTML = divInhold;

    registerButtonClickEvents(className);
}

function registerButtonClickEvents(className) {
    let elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', selectUserBotOnClick);
    }
}

function selectUserBotOnClick() {
    let element_id = window.event.target.id;
    let elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].id != element_id) {
            elements[i].setAttribute('style', config_data.userbot_selected_style);

        } else {
            elements[i].setAttribute('style', config_data.userbot_unselected_style);
        }
    }
    let disPlayName = configGetDisPlayNameById(element_id);
    if (disPlayName != null) {
        alert("Du hast nun " + disPlayName + " ausgewählt.")
    } else {
        alert("Es ist ein Fehler aufgetreten. Bitte starte das Programm neu!")
    }

    selected_userbot = element_id;
}

function configGetDisPlayNameById(id) {
    for (let i = 0; i < latest_userbot_catalogue.userbot_ids.length; i++) {
        if (latest_userbot_catalogue.userbot_ids[i] == id) {
            return latest_userbot_catalogue.userbot_display_names[i];
        }
    }
    return null;
}