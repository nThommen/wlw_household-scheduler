window.onload = () => {
    document.getElementById("loadTasks").onclick = () => {
        fetch('/tasks')
            .then(response => response.json())
            .then(tasks => {
                const list = document.getElementById("taskList");
                list.innerHTML = '';
                tasks.forEach(tasks => {
                    const li = document.createElement("li");
                    li.textContent = tasks.name + ": " + tasks.description + " - " + tasks.status;
                    list.appendChild(li);
                });
            }
            )
    }


}