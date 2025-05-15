/**
 * @file Voting system script for event preferences, allowing authenticated students to vote once.
 * The script updates and stores votes in LocalStorage and visualizes results using a bar chart.
 * 
 * Dependencies: Chart.js
 */
document.addEventListener("DOMContentLoaded", () => {
    const voteButtons = document.querySelectorAll(".vote-btn");

    /**
     * User authentication details.
     * Only authenticated students can vote.
     * @type {Object}
     * @property {boolean} isAuthenticated - Indicates if the user is logged in.
     * @property {string} role - The role of the user (should be "Студент" to vote).
     */
    // Авторизація користувача
    const user = {
        isAuthenticated: true,
        role: "Студент"
    };

    /**
     * Retrieves voting data from LocalStorage or initializes default values.
     * @type {Object}
     * @property {number} science - Votes for the Science Forum.
     * @property {number} sports - Votes for the Sports Festival.
     * @property {number} culture - Votes for the Cultural Evening.
     */
    // Отримання голосів з LocalStorage
    let votes = JSON.parse(localStorage.getItem("votes_events")) || {
        science: 0,
        sports: 0,
        culture: 0
    };

    /**
     * Updates the vote chart visualization.
     * If an existing chart instance exists, it is destroyed before creating a new one.
     */
    // Оновлення діаграми
    function updateChart() {
        const ctx = document.getElementById("voteChart").getContext("2d");

        if (window.voteChartInstance) {
            window.voteChartInstance.destroy();
        }

        window.voteChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Науковий форум", "Спортивний фестиваль", "Культурний вечір"],
                datasets: [{
                    label: "Кількість голосів",
                    data: [votes.science, votes.sports, votes.culture],
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

    /**
     * Handles the voting process when a user clicks a vote button.
     * Ensures the user is authenticated and hasn't voted before.
     */
    // Голосування
    voteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            if (!user.isAuthenticated || user.role !== "студент") {
                alert("Голосувати можуть лише авторизовані студенти!");
                return;
            }

            if (localStorage.getItem("hasVoted_events")) {
                alert("Ви вже голосували!");
                return;
            }

            const eventChoice = event.target.dataset.event;
            votes[eventChoice]++;
            localStorage.setItem("votes_events", JSON.stringify(votes));
            localStorage.setItem("hasVoted_events", "true");

            updateChart();
        });
    });

    // Завантаження діаграми при відкритті сторінки
    updateChart();
});
