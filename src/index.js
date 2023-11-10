const body = document.querySelector("body"),
    sidebar = body.querySelector("div.sidebar"),
    sidebarToggle = sidebar.querySelector("div.toggle");

sidebarToggle.addEventListener("click", toggleSidebar);

function toggleSidebar() {
    sidebar.classList.toggle("opened");
}