document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.querySelector(".login-btn");
    const closeBtn = document.querySelector(".close");

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Перевіряємо, чи є авторизований користувач
    function checkAuth() {
        const authContainer = document.querySelector(".buttonlog");
        if (currentUser) {
            authContainer.innerHTML = `
                <a href="./header-menu/profile.html"><button class="profile-btn">${currentUser.name}</button></a>
                <button class="logout-btn">Вийти</button>
            `;
            document.querySelector(".logout-btn").addEventListener("click", logout);
        }
    }

    // Функція виходу
    function logout() {
        localStorage.removeItem("currentUser");
        location.reload(); // Перезавантаження сторінки
    }

    // Обробка входу
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let login = document.getElementById("login").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let role = document.getElementById("role").value;

        let loginError = document.getElementById("loginError");
        let emailError = document.getElementById("emailError");
        let passwordError = document.getElementById("passwordError");
        let roleError = document.getElementById("roleError");

        let isValid = true;

        // Очищення попередніх повідомлень про помилки
        loginError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        roleError.textContent = "";

        // Перевірка логіна
        if (login.length < 3) {
            loginError.textContent = "Логін повинен містити щонайменше 3 символи.";
            isValid = false;
        }

        // Перевірка email
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.textContent = "Введіть правильну адресу електронної пошти.";
            isValid = false;
        }

        // Перевірка пароля
        if (password.length < 6) {
            passwordError.textContent = "Пароль повинен містити щонайменше 6 символів.";
            isValid = false;
        }

        // Перевірка ролі
        if (!role) {
            roleError.textContent = "Оберіть вашу роль.";
            isValid = false;
        }

        // Якщо є помилки, не виконуємо авторизацію
        if (!isValid) {
            return;
        }

        let user = {
            name: login,
            email: email,
            role: role
        };

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Вхід успішний!");
        window.location.href = "./index.html";
    });

    // Закриття модального вікна входу
    closeBtn.addEventListener("click", function () {
        loginModal.style.display = "none";
    });

    // Відкриття вікна входу
    loginBtn.addEventListener("click", function () {
        loginModal.style.display = "block";
    });

    // Перевірка статусу авторизації
    checkAuth();
    /**
 * This is a function to log in a user.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {boolean} - Returns true if login is successful, otherwise false.
 */
function login(username, password) {
    // Simple login logic (for demonstration)
    if (username === 'admin' && password === 'password123') {
        return true;
    } else {
        return false;
    }
}

});
