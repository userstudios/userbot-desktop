# Release

### Installation Windows
Um die Applikation zu installieren, können sie einfach über die Releases unsere Setup-Executable `UBDesktop-Setup-x.x.x.exe` herunterladen und ausführen.

### Installation Linux
In Planung

### Installation Mac
Aufgrund fehlender MacOS Kontributoren nicht möglich. \
Mac-Programme kann man leider nur auf Mac-Betriebssystemen bauen. 

# Kontribution

### Vorarbeit
Um an diesem Projekt mitkontibutieren zu können müssen sie vorerst einige vorarbeiten vornehmen. \
Zuerst installieren sie sich Node.js um bei der Entwicklung auf die Laufzeitumgebung zugreifen zu können. \
Dies können sie über https://nodejs.org/de/download/ herunterladen. \
Zunächst müssen sie das Programm Git installiert haben. Dies können sie über das Link https://git-scm.com/ herunterladen.

### Installation
Um das Projekt ausführen zu können müssen sie über die Kommandozeile diese Repository klonen. \
Dies können sie in einem beliebigen Verzeichnis mit `git clone https://github.com/0xtcb/userbot-desktop` durchführen. \
Um die fehlenden Module herunterzuladen, gibt ihr das Befehl `npm install` ein.

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
Sie können sich über moderne Git-Applikationen wie GitHub Desktop an diesem Projekt beteiligen, indem sie Pull requests abschicken. \
Diese werden überprüft und möglicherweise übernommen.

© 2021 UserStudios/0xtcb.  All rights reserved.
