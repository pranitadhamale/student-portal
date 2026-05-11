function showRegister() {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("registerForm").classList.add("active");
    document.body.classList.add("hide-left");
}

function showLogin() {
    document.getElementById("registerForm").classList.remove("active");
    document.getElementById("resetForm").classList.remove("active");
    document.getElementById("loginForm").classList.add("active");
    document.body.classList.remove("hide-left");
}

function showReset() {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("registerForm").classList.remove("active");
    document.getElementById("resetForm").classList.add("active");
    document.body.classList.add("hide-left");
}

function loginUser() {
    let email = document.getElementById("loginEmail").value.trim();
    let pass = document.getElementById("loginPass").value.trim();

    fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password: pass })
    })
    .then(res => res.json())
    .then(user => {
        if (user.message && !user.token) {
            alert(user.message);
            return;
        }

        localStorage.setItem("currentUser", user.user.email);
        localStorage.setItem("userName", user.user.name);
        localStorage.setItem("token", user.token);

        currentUser = user.user.email;

        document.querySelector(".right").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";

        document.querySelector(".main h2").innerText =
            `Welcome, ${user.user.name} 👋`;

        showTasks();
        window.onload();
    });
}

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userName");
    localStorage.removeItem("currentPage");
    location.reload();
}

function registerUser(event) {
    if (event) event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value.trim();
    let confirm = document.getElementById("confirmPassword").value.trim();

    if (!name || !email || !pass || !confirm) {
        alert("Please fill all fields");
        return;
    }

    if (pass !== confirm) {
        alert("Passwords do not match");
        return;
    }

    fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, email, password: pass })
    })
    .then(res => res.json())
    .then(() => {
        alert("Registration successful");
        showLogin();
    });
}