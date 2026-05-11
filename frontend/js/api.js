let currentUser = localStorage.getItem("currentUser") || 1;
let tasks = [];
let currentPage = Number(localStorage.getItem("currentPage")) || 1;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;