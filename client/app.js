window.onload = () => {
    document.getElementById("loadTasks").onclick = loadTasks;
    document.getElementById("addTask").onclick = addTask;
    document.getElementById("deleteTask").onclick = deleteTask;
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

function addTask() {
    if (!document.getElementById("newTaskName").value || !document.getElementById("newTaskDescription").value) {
        alert("Please fill in all fields.");
        return;
    }

    const taskName = document.getElementById("newTaskName").value;
    const taskDescription = document.getElementById("newTaskDescription").value;
    const taskStatus = "pending"; // Default status for new tasks

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

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const taskContent = `
            <h3>${task.name}</h3>
            <p>${task.description}</p>
            <input type="checkbox" ${task.status === "completed" ? "checked" : ""}> Completed
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskDiv.innerHTML = taskContent;



        const tasksContainer = document.querySelector(".tasks");
        tasksContainer.appendChild(taskDiv);



        document.getElementById("newTaskName").value = '';
        document.getElementById("newTaskDescription").value = '';
    })
    .catch(error => {
        console.error("Error adding task:", error);
    });
}

function deleteTask(taskId) {
    fetch(`/tasks/${taskId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log("Task deleted");
            loadTasks();
        } else {
            console.error("Error deleting task");
        }
    })
    .then(() => {
        const taskDiv = document.querySelector(`.task[data-id="${taskId}"]`);
        if (taskDiv) {
            taskDiv.remove();
        }
    })
    .catch(error => {
        console.error("Error deleting task:", error);
    });
}