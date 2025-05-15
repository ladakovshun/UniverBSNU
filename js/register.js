document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let login = document.getElementById("login").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let role = document.getElementById("role").value;
    let profileImage = document.getElementById("profileImage").files[0];

    let isValid = true;

    // Валідація полів
    if (name.length < 3) isValid = false;
    if (login.length < 3) isValid = false;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) isValid = false;
    if (password.length < 6 || password !== confirmPassword) isValid = false;
    if (role === "") isValid = false;

    if (!isValid) {
        alert("Будь ласка, заповніть усі поля правильно!");
        return;
    }

    let user = {
        name: name,
        login: login,
        email: email,
        role: role,
        profileImage: ""
    };

    if (profileImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            user.profileImage = e.target.result;
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "user-profile.html"; // Перехід на профіль
        };
        reader.readAsDataURL(profileImage);
    } else {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "user-profile.html"; // Перехід на профіль
    }
});
