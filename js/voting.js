document.addEventListener("DOMContentLoaded", () => {
    const voteButtons = document.querySelectorAll(".vote-btn");

    // Авторизований користувач
    const user = {
        isAuthenticated: true,
        role: "студент"
    };

    // Завантаження голосів із LocalStorage
    let votes = JSON.parse(localStorage.getItem("votes")) || {
        sadova: 0,
        holovatenko: 0
    };

    // Функція для оновлення діаграми
    function updateChart() {
        const ctx = document.getElementById("voteChart").getContext("2d");

        if (window.voteChartInstance) {
            window.voteChartInstance.destroy();
        }

        window.voteChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Анна Садова", "Головатенко Владислав"],
                datasets: [{
                    label: "Кількість голосів",
                    data: [votes.sadova, votes.holovatenko],
                    backgroundColor: ["#007bff", "#ff4500"]
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

            const candidate = event.target.dataset.candidate;

            if (localStorage.getItem("hasVoted")) {
                alert("Ви вже голосували!");
                return;
            }

            votes[candidate]++;
            localStorage.setItem("votes", JSON.stringify(votes));
            localStorage.setItem("hasVoted", "true");

            updateChart();
        });
    });

    // Завантаження діаграми при завантаженні сторінки
    updateChart();
});
