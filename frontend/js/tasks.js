function saveTask() {
    let title = document.getElementById("taskTitle").value.trim();
    let desc = document.getElementById("taskDesc").value.trim();

    if (!title || !desc) {
        alert("Please fill all fields");
        return;
    }

    fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
            title,
            description: desc,
            status: "Pending"
        })
    })
    .then(res => res.json())
    .then(() => {
        closeModal(); 
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDesc").value = "";
        window.onload();
        showTasks();
        
    });
}

function deleteTask(index) {
    fetch(`http://localhost:5000/tasks/${tasks[index].id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(() => {
        tasks.splice(index, 1);
        renderTasks();
    });
}

function editTask(index) {
    let newTitle = prompt("Edit title:", tasks[index].title);
    let newDesc = prompt("Edit description:", tasks[index].desc);

    if (!newTitle || !newDesc) return;

    fetch(`http://localhost:5000/tasks/${tasks[index].id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
            title: newTitle,
            description: newDesc
        })
    })
    .then(res => res.json())
    .then(updatedTask => {
        tasks[index].title = updatedTask.title;
        tasks[index].desc = updatedTask.description;
        renderTasks();
    });
}

function toggleStatus(index) {
    let newStatus = tasks[index].status === "Pending" ? "Completed" : "Pending";

    fetch(`http://localhost:5000/tasks/${tasks[index].id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(updatedTask => {
        tasks[index].status = updatedTask.status;
        renderTasks();
    });
}