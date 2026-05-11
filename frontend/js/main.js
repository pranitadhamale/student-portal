const totalCountEl = document.getElementById("totalCount");
const completedCountEl = document.getElementById("completedCount");
const pendingCountEl = document.getElementById("pendingCount");
window.onload = function () {
    loadComponent("sidebarComponent", "components/sidebar.html");
    loadComponent("navbarComponent", "components/navbar.html");
    loadComponent("modalComponent", "components/modal.html");

    const token = localStorage.getItem("token");

    if (!token) {
        document.querySelector(".right").style.display = "flex";
        document.getElementById("dashboard").style.display = "none";
        return;
    }

    document.querySelector(".right").style.display = "none";
    document.getElementById("dashboard").style.display = "flex";

    loadAdminDashboard();
    fetchTasks();
};
function fetchTasks() {
    const token = localStorage.getItem("token");

    showLoader();
    hideError();

    fetch(`http://localhost:5000/tasks?page=${currentPage}&limit=5`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => {
        hideLoader();

        tasks = data.tasks.map(task => ({
            id: task._id,
            title: task.title,
            desc: task.description,
            status: task.status
        }));

        renderTasks();

        totalCountEl.innerText =
            data.totalTasks || tasks.length;

        completedCountEl.innerText =
            data.completedCount || tasks.filter(t => t.status === "Completed").length;

        pendingCountEl.innerText =
            data.pendingCount || tasks.filter(t => t.status === "Pending").length;
    })
    .catch(err => {
        hideLoader();
        showError("Failed to load tasks");
        console.log(err);
    });
}

function nextPage() {
    currentPage++;
    localStorage.setItem("currentPage", currentPage);
    fetchTasks();
    showTasks();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        localStorage.setItem("currentPage", currentPage);
        fetchTasks();
        showTasks();
    }
}
async function loadAdminDashboard() {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/admin/dashboard", {
        headers: {
            Authorization: "Bearer " + token
        }
    });

    const data = await res.json();

    document.getElementById("userCount").innerText = data.totalUsers;
    document.getElementById("totalCount").innerText = data.totalTasks;
    document.getElementById("completedCount").innerText = data.completedTasks;
    document.getElementById("pendingCount").innerText = data.pendingTasks;
}