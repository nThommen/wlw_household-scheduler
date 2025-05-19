window.onload = () => {
    loadTasks();
    document.getElementById("addTask").onclick = addTask;
    emptyFields();
}

function createTaskElement(task) {
    const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");
                taskDiv.setAttribute("data-id", task.id);
                taskDiv.setAttribute("data-status", task.status);

                const taskContent = `
                    <h3>${task.name}</h3>
                    <p>${task.description}</p>
                    <p>Deadline: ${task.duedate}</p>
                    <p>Assignee: ${task.assignee}</p>
                    <p>Status: ${task.status}</p>
                `;
                taskDiv.innerHTML = taskContent;

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.onchange = () => {
                    checkboxClicked(task.id, task.status);
                }
                taskDiv.appendChild(checkbox);


                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => {
                    deleteTask(task.id);
                };

                taskDiv.appendChild(deleteButton);

                const tasksContainer = document.querySelector(".tasks");
                tasksContainer.appendChild(taskDiv);
}

function loadTasks () {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                createTaskElement(task);
            });
        })
}

function checkboxClicked(taskId, taskStatus) {
    alert("Checkbox clicked");
    const newStatus = taskStatus === "completed" ? "pending" : "completed";
    fetch(`/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: newStatus, status: newStatus })
    })
    .then(response => {
        if (response.ok) {
            console.log("Task status updated");
        } else {
            console.error("Error updating task status - response not ok");
            alert("Error: Something went wrong!");
        }
    })
    .catch(error => {
        console.error("Error updating task status:", error);
    });
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
        createTaskElement(task);
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