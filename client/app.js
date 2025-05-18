window.onload = () => {
    loadTasks();
    document.getElementById("addTask").onclick = addTask;
    emptyFields();
}

function loadTasks () {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");
                taskDiv.setAttribute("data-id", task.id);
                taskDiv.setAttribute("data-status", task.status);

                const taskContent = `
                    <h3>${task.name}</h3>
                    <p>${task.description}</p>
                    <p>Deadline: ${task.duedate}</p>
                    <p>Assignee: ${task.assignee}</p>
                    <input type="checkbox" ${task.status === "completed" ? "checked" : ""}> Completed
                `;
                taskDiv.innerHTML = taskContent;

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => {
                    deleteTask(task.id);
                };

                taskDiv.appendChild(deleteButton);

                const tasksContainer = document.querySelector(".tasks");
                tasksContainer.appendChild(taskDiv);
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
    const taskDueDate = document.getElementById("newTaskDueDate").value;
    const taskAssignee = document.getElementById("newTaskAssignee").value;
    const taskStatus = "pending";

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: taskName,
            description: taskDescription,
            duedate: taskDueDate,
            assignee: taskAssignee,
            status: taskStatus
        })
    })
    .then(response => response.json())
    .then(task => {
        console.log("Task added:", task);

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.setAttribute("data-id", task.id);
        taskDiv.setAttribute("data-duedate", task.duedate);
        taskDiv.setAttribute("data-assignee", task.assignee);
        taskDiv.setAttribute("data-status", task.status);

        const taskContent = `
            <h3>${task.name}</h3>
            <p>${task.description}</p>
            <p>Deadline: ${task.duedate}</p>
            <p>Assignee: ${task.assignee}</p>
            <input type="checkbox" ${task.status === "completed" ? "checked" : ""}> Completed
        `;
        taskDiv.innerHTML = taskContent;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-id", task.id);
        deleteButton.onclick = () => {
            deleteTask(task.id);
        };

        taskDiv.appendChild(deleteButton);

        const tasksContainer = document.querySelector(".tasks");
        tasksContainer.appendChild(taskDiv);

    })
    .then(() => {
        emptyFields();
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
        } else {
            console.error("Error deleting task - response not ok");
            alert("Error: Something went wrong!");
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

function emptyFields() {
    document.getElementById("newTaskName").value = "";
    document.getElementById("newTaskDescription").value = "";
    document.getElementById("newTaskDueDate").value = "";
    document.getElementById("newTaskAssignee").value = "";
}