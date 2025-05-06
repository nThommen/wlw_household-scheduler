window.onload = () => {
    document.getElementById("loadTasks").onclick = loadTasks;
    document.getElementById("addTask").onclick = addTask;
}

function loadTasks () {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            const list = document.getElementById("taskList");
            list.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.textContent = task.name + ": " + task.description + " - " + task.status;
                list.appendChild(li);
            });
        })
}

function addTask () {

    if (!document.getElementById("newTaskName").value || !document.getElementById("newTaskDescription").value) {
        alert("Please fill in all fields.");
        return;
    }

    const taskName = document.getElementById("newTaskName").value;
    const taskDescription = document.getElementById("newTaskDescription").value;
    const taskStatus = document.getElementById("newTaskStatus").value;



    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: taskName,
            description: taskDescription,
            status: taskStatus
        })
    })
    .then(response => response.json())
    .then(task => {
        console.log("Task added:", task);
        loadTasks(); // Reload tasks to show the new one
    })
    .catch(error => {
        console.error("Error adding task:", error);
    });

    document.getElementById("newTaskName").value = '';
    document.getElementById("newTaskDescription").value = '';

}