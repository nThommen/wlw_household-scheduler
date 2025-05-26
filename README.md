# Household Scheduler

Simple household schedule board to keep track of tasks, add them and mark them as complete.

### Funktionsweise

Die Applikation basiert auf einem Webinterface (Client) und einer python-Applikation, welche auf einem Raspberry Pi gehostet wird (Server). Im Folgenden werden die beiden Teile einzeln beleuchtet.

**Funktionsdiagramm mit Server- und Clientseite**


![wlw_household_scheduler drawio](https://github.com/user-attachments/assets/ee3cef2b-b762-4313-b55a-f84b8be9b62e)


##### Server

Der Server wird mittels Pyflask-App auf einem Raspby gehostet.

**GET-Endpoint:** Durch den GET-Endpoint get.tasks() werden die aufgelisteten Tasks aus dem JSON-File geholt und app.js als Liste übergeben.

**PUT-Endpoint:** Der PUT-Endpoint dient dazu, ein Task serverseitig gezielt zu updaten. Dadurch lässt sich etwa der Status eines Tasks tracken, welcher duch setzen des Häckchens in der "Completed"-Checkbox geändert werden kann. 

**POST-Endpoint:** Der POST-Endpoint nimmt durch betätigen des Buttons "Add Task" die Strings aus den Feldern "Task Name", "Task Description", "Due Date" und "Asignee" entgegen und fügt diese als neuen Task dem JSON-File hinzu.

**DELETE-Endpoint:** Der DELETE-Endpoint nimmt die id des Tasks entgegen, bei welcher der Delet-Button geklickt wurde. Daraufhin durchsucht er in der Liste der Tasks denjenigen mit jener id. Sollte er keinen finden, returned der Endpoint und dem User wird eine Fehlermeldung angezeigt. Wird die id gefunden, so wird der Task entfernt und die Taskliste gespeichert.

##### Client

Der Client ist eine Webseite auf welche innerhalb desselben LAN zugegriffen werden kann, mit welchem auch der Raspby verbunden ist. Die Webseite ist also lokal gehostet. Durch ausfüllen des Forms für einen neuen Task und anschliessendem bestätigen des Buttons "Add Task" kann ein neuer Task erstellt werden, der sofort gelistet wird.

**Screenshot des Client**

<img width="553" alt="screenshot_client" src="https://github.com/user-attachments/assets/204df59b-c2cf-4f5c-b56b-8a1f63056bb7" />



Wichtigstes Interface auf Clientseite ist die Datei app.js, welche für die Kommunikation mit der Serverseite und dynamischen Elemente der Seite verantwortlich ist. Beim Laden der Webseite werden nacheinander die im tasks.json abgelegten Tasks über app.py (serverseitig) geholt, dem Button für das Hinzufügen neuer Tasks seine Funktion zugewiesen und die Eingabefelder geleert. Danach kann über das klicken des Buttons "Add Task" ein neues Task zur Website hinzugefügt werden und durch klicken von "Delete Task" des jeweiligen Tasks dieses entfernt werden. Tasks können nicht namens- oder beschreibungslos sein.

Die Datei index.html bildet die Benutzeroberfläche ab. Grob lässt sich diese unterteilen in:

- Titel mit kurzer Beschreibung.
- Formular zum Hinzufügen eines neuen Tasks.
- Bereich in welchem die Tasks dargestellt werden können.

Dabei ist das Formular zum grössten Teil direkt in der html-Datei umgesetzt. Der Bereich für die Tasks besteht nur aus zwei verschachtelten divs, welche als Container für das flexbox-Layout dienen und einer Überschrift.

In der Datei styles.css ist sehr einfach die Basis für das flexbox-Layout umgesetzt und ein Design für die children des Containers.

### Inbetriebnahme

Um den die App in Betrieb zu nehmen eignet sich z.B. ein Raspberry Pi als Host. Für einen ersten Test kann aber auch ein normaler PC als Host verwendet werden.

##### Ablauf:

1. Mittels *git clone https://github.com/nThommen/wlw_household-scheduler.git* das Repository auf die lokale Maschine klonen.
2. Per Konsole in das Verzeichnis wechseln und danach ins Unterverzeichnis "server" -> *cd your_path/wlw_household-scheduler* , *cd server*
3. Virtuelles Python-Environment einrichten und aktivieren -> *python3 -m venv venv* , *source venv/bin/activate*
4. Dependencies installieren -> *pip install -r requirements.txt*
5. Server starten -> *python app.py*
