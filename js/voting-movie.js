document.addEventListener("DOMContentLoaded", () => {
    const voteButtons = document.querySelectorAll(".vote-btn");

    // Авторизація користувача
    const user = {
        isAuthenticated: true,
        role: "Студент"
    };

    // Отримання голосів з LocalStorage
    let votes = JSON.parse(localStorage.getItem("votes_movie")) || {
        interstellar: 0,
        green_book: 0,
        joker: 0
    };

    // Оновлення діаграми
    function updateChart() {
        const ctx = document.getElementById("voteChart").getContext("2d");

        if (window.voteChartInstance) {
            window.voteChartInstance.destroy();
        }

        window.voteChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Інтерстеллар", "Зелена книга", "Джокер"],
                datasets: [{
                    label: "Кількість голосів",
                    data: [votes.interstellar, votes.green_book, votes.joker],
                    backgroundColor: ["#007bff", "#ff4500", "#28a745"]
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Голосування
    voteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            if (!user.isAuthenticated || user.role !== "студент") {
                alert("Голосувати можуть лише авторизовані студенти!");
                return;
            }

            if (localStorage.getItem("hasVoted_movie")) {
                alert("Ви вже голосували!");
                return;
            }

            const movieChoice = event.target.dataset.movie;
            votes[movieChoice]++;
            localStorage.setItem("votes_movie", JSON.stringify(votes));
            localStorage.setItem("hasVoted_movie", "true");

            updateChart();
        });
    });

    // Завантаження діаграми при відкритті сторінки
    updateChart();
});
