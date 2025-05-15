
const modal = document.getElementById("loginModal");

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header-main");
    const main = document.querySelector("main");

    function updateMainPadding() {
        const headerHeight = header.offsetHeight;
        main.style.paddingTop = headerHeight + "px";
    }

    updateMainPadding();
    window.addEventListener("resize", updateMainPadding);
});

/*
document.addEventListener("DOMContentLoaded", function () {
    let btn = document.querySelector(".login-btn");
    let closeBtn = document.querySelector(".close");

    //btn.addEventListener("click", function () {
    //    modal.style.display = "block";
    //})

    btn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let btn = document.querySelector(".login-btn");
    let closeBtn = document.querySelector(".close");

    btn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});

// Перевірка форми перед відправкою
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let login = document.getElementById("login");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let role = document.getElementById("role");

    let loginError = document.getElementById("loginError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let roleError = document.getElementById("roleError");

    let isValid = true;

    // Перевірка логіна
    if (login.value.trim().length < 3) {
        loginError.textContent = "Логін повинен містити щонайменше 3 символи.";
        loginError.style.display = "block";
        isValid = false;
    } else {
        loginError.style.display = "none";
    }

    // Перевірка email
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Введіть правильну адресу електронної пошти.";
        emailError.style.display = "block";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // Перевірка пароля
    if (password.value.trim().length < 6) {
        passwordError.textContent = "Пароль повинен містити щонайменше 6 символів.";
        passwordError.style.display = "block";
        isValid = false;
    } else {
        passwordError.style.display = "none";
    }

    // Перевірка ролі
    if (role.value === "") {
        roleError.textContent = "Оберіть вашу роль.";
        roleError.style.display = "block";
        isValid = false;
    } else {
        roleError.style.display = "none";
    }

    // Якщо форма пройшла валідацію
    if (isValid) {
        alert("Успішний вхід!");
        modal.style.display = "none";

        login.value = "";
        email.value = "";
        password.value = "";
        role.selectedIndex = 0;
    }

    const buttonLog = document.getElementById("buttonlog");
    const profileLink = document.getElementById("profileLink");

    // Імітація авторизації (змінна може зберігатися у localStorage або в куках)
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    function updateUI() {
        if (isAuthenticated) {
            buttonLog.style.display = "none";
            profileLink.style.display = "inline-block";
        } else {
            buttonLog.style.display = "inline-block";
            profileLink.style.display = "none";
        }
    }

    buttonLog.addEventListener("click", function () {
        // Імітація успішної авторизації (запам'ятовуємо стан)
        localStorage.setItem("isAuthenticated", "true");
        updateUI();
    });

    updateUI();
});
*/




document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("loginModal");
    const btn = document.querySelector(".login-btn");
    const closeBtn = document.querySelector(".close");
    const form = document.getElementById("loginForm");

    const login = document.getElementById("login");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const role = document.getElementById("role");

    const loginError = document.getElementById("loginError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const roleError = document.getElementById("roleError");

    function clearErrors() {
        loginError.style.display = "none";
        emailError.style.display = "none";
        passwordError.style.display = "none";
        roleError.style.display = "none";
    }

    function resetForm() {
        login.value = "";
        email.value = "";
        password.value = "";
        role.selectedIndex = 0;
    }

    btn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();

        let isValid = true;

        if (login.value.trim().length < 3) {
            loginError.textContent = "Логін повинен містити щонайменше 3 символи.";
            loginError.style.display = "block";
            isValid = false;
        }

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            emailError.textContent = "Введіть правильну адресу електронної пошти.";
            emailError.style.display = "block";
            isValid = false;
        }

        if (password.value.trim().length < 6) {
            passwordError.textContent = "Пароль повинен містити щонайменше 6 символів.";
            passwordError.style.display = "block";
            isValid = false;
        }

        if (role.value === "") {
            roleError.textContent = "Оберіть вашу роль.";
            roleError.style.display = "block";
            isValid = false;
        }

        if (isValid) {
            modal.style.display = "none";
            resetForm();
        }
    });

    let counterElement = document.getElementById("visitCounter");

    // Отримуємо поточне значення лічильника з localStorage
    let visitCount = localStorage.getItem("pageVisits");

    // Якщо значення відсутнє, встановлюємо 0
    if (visitCount === null) {
        visitCount = 0;
    } else {
        visitCount = parseInt(visitCount);
    }

    visitCount++;

    // Оновлюємо значення в localStorage
    localStorage.setItem("pageVisits", visitCount);

    // Відображаємо кількість відвідувань на сторінці
    if (counterElement) {
        counterElement.textContent = `Відвідування: ${visitCount}`;
    }
});
