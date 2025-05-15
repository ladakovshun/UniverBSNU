/*
document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        window.location.href = "register.html"; // Якщо немає такого користувача, повертаємось до реєстрації
    }

    document.getElementById("profile-name").textContent = currentUser?.name;
    document.getElementById("profile-role").textContent = `Роль: ${user.role}`;
    document.getElementById("profile-email").textContent = `Email: ${user.email}`;

    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html"; // Повернення на головну після виходу
    });
});

*/


/*
document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log(currentUser);


    if (currentUser && currentUser.name) {
        // Встановлюємо ім'я користувача у поле "Логін"
        const firstNameField = document.getElementById("firstName");
        firstNameField.value = currentUser.name;
    }


    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html"; // Повернення на головну після виходу
    });
});
*/



document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && currentUser.name) {
        // Встановлюємо ім'я користувача у елемент <h2>
        const userNameElement = document.getElementById("userName");
        userNameElement.textContent = currentUser.name;
    }

    const logoutBtn = document.getElementById("logout-btn");

    logoutBtn.addEventListener("click", function () {
        // Видаляємо дані про авторизацію з localStorage
        localStorage.removeItem("currentUser");

        // Переходимо на головну сторінку
        window.location.href = "../index.html";
    });
});