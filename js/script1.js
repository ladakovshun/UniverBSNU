document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");

    if (!themeToggle) {
        console.error("Перемикач теми не знайдено!");
        return;
    }

    const isDarkMode = localStorage.getItem("darkMode") === "enabled";

    if (isDarkMode) {
        document.body.classList.add("dark-theme");
        themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", function () {
        if (themeToggle.checked) {
            document.body.classList.add("dark-theme");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark-theme");
            localStorage.setItem("darkMode", "disabled");
        }
    });
});
