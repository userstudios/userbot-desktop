# Release

### Installation Windows
Um die Applikation zu installieren, können sie einfach über die Releases `UBDesktop-Setup-x.x.x.exe` herunterladen und ausführen.

### Installation Linux
In Planung

### Installation Mac
Aufgrund fehlender MacOS Kontributoren nicht möglich. \
Mac-Programme kann man leider nur auf Mac-Betriebssystemen bauen. 

# Kontribution

### Vorarbeit
Um an diesem Projekt mitkontibutieren zu können müssen sie vorerst einige vorarbeiten vornehmen. \
Zuerst installieren sie sich Node.js um bei der Entwicklung auf die Laufzeitumgebung zugreifen zu können. \
Dies können sie über https://nodejs.org/de/download/ herunterladen und installieren. \
Zunächst müssen sie das Programm Git über die Webseite https://git-scm.com/ herunterladen und ebenfalls installieren.

### Installation
Um das Projekt ausführen zu können müssen sie über die Kommandozeile diese Repository klonen. \
Dies können sie in einem beliebigen Verzeichnis mit `git clone https://github.com/0xtcb/userbot-desktop` durchführen.

### Info
Um die Update-Sequenz zu überspringen müssen sie zuerst in dem app.js, welches sich im `src` Ordner befindet, eine Zeile Programm manipulieren. \
Hierzu suchen sie die Variable `start_dev` und schreiben sie wie unten beschrieben um. 
```c 
var start_dev = false;
```
🠋
```c 
var start_dev = true;
```

### Starten
Sollten sie die Repository geklont haben, können sie über das Befehl `npm run start` das Projekt starten. \
Hierbei ist zu achten, dass sie sich mit der Konsole in dem Verzeichnis befinden.

### Commits
Sie können über moderne Git-Applikationen wie GitHub Desktop sich an diesem Projekt beteiligen, indem sie Pull requests abschicken. \
Diese werden überprüft und möglicherweise akzeptiert.

© 2021 UserStudios.  All rights reserved.
