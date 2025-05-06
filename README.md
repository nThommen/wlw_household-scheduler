# Household Scheduler

Simple household schedule board to keep track of tasks, add them and mark them as complete.

### Funktionsweise

Die Applikation basiert auf einem Webinterface (Client) und einer python-Applikation, welche auf einem Raspberry Pi gehostet wird (Server). Im Folgenden werden die beiden Teile einzeln beleuchtet.

**Funktionsdiagramm mit Server- und Clientseite**

+--------------------+                     +----------------------+
|  Web Browser       |  <-- HTTP GET/POST  |  Raspberry Pi Server  |
|  (Client App)      |      requests       |  (Flask App)          |
|                    |  ---------------->  |                      |
|  - index.html      |                     |  - app.py             |
|  - app.js          |                     |  - tasks in memory    |
|  - styles.css      |                     |                      |
+--------------------+                     +----------------------+
        ^                                               
        |                                                
        |  Receives JSON responses                         
        +--------------------------------                

##### Client

Der Client ist eine Webseite auf welche innerhalb desselben LAN zugegriffen werden kann, mit welchem auch der Raspby verbunden ist. Die Webseite ist also lokal gehostet. Durch ausfüllen des Forms für einen neuen Task und anschliessendem bestätigen des Buttons "Add Task" kann ein neuer Task erstellt werden, der sofort gelistet wird.

##### Server

Der Server wird mittels Pyflask-App auf einem Raspby gehostet.

**GET-Endpoint:** Durch den GET-Endpoint get.tasks() werden die aufgelisteten Tasks aus dem JSON-File geholt.

**POST-Endpoint:** Der POST-Endpoint nimmt durch betätigen des Buttons "Add Task" die Strings aus den Feldern "Task Name" und "Task Description" entgegen und fügt diese als neuen Task dem JSON-File hinzu.
