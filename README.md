# Household Scheduler

Simple household schedule board to keep track of tasks, add them and mark them as complete.

### Funktionsweise

Die Applikation basiert auf einem Webinterface (Client) und einer python-Applikation, welche auf einem Raspberry Pi gehostet wird (Server). Im Folgenden werden die beiden Teile einzeln beleuchtet.

**Funktionsdiagramm mit Server- und Clientseite**

<img width="413" alt="Funktionsdiagramm_wlwProjekt_ver1 0" src="https://github.com/user-attachments/assets/123d14a1-ac6d-4913-8d13-f0c7589a1039" />

![wlw_household_scheduler drawio](https://github.com/user-attachments/assets/609b13ca-db45-41ca-89b2-6863b4f4a444)


##### Client

Der Client ist eine Webseite auf welche innerhalb desselben LAN zugegriffen werden kann, mit welchem auch der Raspby verbunden ist. Die Webseite ist also lokal gehostet. Durch ausfüllen des Forms für einen neuen Task und anschliessendem bestätigen des Buttons "Add Task" kann ein neuer Task erstellt werden, der sofort gelistet wird.

##### Server

Der Server wird mittels Pyflask-App auf einem Raspby gehostet.

**GET-Endpoint:** Durch den GET-Endpoint get.tasks() werden die aufgelisteten Tasks aus dem JSON-File geholt und app.js als Liste übergeben.

**POST-Endpoint:** Der POST-Endpoint nimmt durch betätigen des Buttons "Add Task" die Strings aus den Feldern "Task Name" und "Task Description" entgegen und fügt diese als neuen Task dem JSON-File hinzu.
