
function renderTasks(filter = "All") {
    document.getElementById("pageNo").innerText = `Page ${currentPage}`;
    const taskBody = document.getElementById("taskBody");
    taskBody.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "Pending") {
        filteredTasks = tasks.filter(t => t.status === "Pending");
    } else if (filter === "Completed") {
        filteredTasks = tasks.filter(t => t.status === "Completed");
    }

    if (filteredTasks.length === 0) {
        taskBody.innerHTML = `<tr><td colspan="4">No tasks available</td></tr>`;
        return;
    }

    filteredTasks.forEach((task, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><strong>${task.title}</strong></td>
            <td>${task.desc}</td>
            <td class="${task.status === "Completed" ? "status-completed" : "status-pending"}">
                ${task.status}
            </td>
            <td>
                <button class="action-btn edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="action-btn complete-btn" onclick="toggleStatus(${index})">
                        ${task.status === "Pending" ? "Complete" : "Pending"}
                </button>
                <button class="action-btn delete-btn" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;

        taskBody.appendChild(row);
    });

    document.getElementById("totalCount").innerText = tasks.length;
    document.getElementById("completedCount").innerText =
        tasks.filter(t => t.status === "Completed").length;
    document.getElementById("pendingCount").innerText =
        tasks.filter(t => t.status === "Pending").length;
}

function openModal() {
    document.getElementById("taskModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("taskModal").style.display = "none";
}

function showDashboard() {
    document.getElementById("dashboardSection").style.display = "block";
    document.getElementById("taskSection").style.display = "none";
}

function showTasks() {
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("taskSection").style.display = "block";
}

function searchTask() {
    let keyword = document.getElementById("searchInput").value.toLowerCase();
    tasks = tasks.filter(task =>
        task.title.toLowerCase().includes(keyword)
    );
    renderTasks();
}

function sortLatest() {
    tasks.reverse();
    renderTasks();
}
async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return;

    const res = await fetch(file);
    const data = await res.text();
    element.innerHTML = data;
}
function showLoader() {
    document.getElementById("loader").style.display = "block";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

function showError(message) {
    const errorBox = document.getElementById("errorBox");
    errorBox.style.display = "block";
    errorBox.innerText = message;
}

function hideError() {
    document.getElementById("errorBox").style.display = "none";
}