document.addEventListener("DOMContentLoaded", () => {
    const voteButtons = document.querySelectorAll(".vote-btn");

    // Перевірка авторизації
    const user = {
        isAuthenticated: true, // Має бути змінним
        role: "студент"
    };

    // Завантаження голосів з LocalStorage
    let votes = JSON.parse(localStorage.getItem("votes_union")) || {
        bohdantsev: 0,
        kutuzaki: 0,
        sadova: 0
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
                labels: ["Богданцев Сергій", "Катерина Кутузакі", "Садова Анна"],
                datasets: [{
                    label: "Кількість голосів",
                    data: [votes.bohdantsev, votes.kutuzaki, votes.sadova],
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

            if (localStorage.getItem("hasVoted_union")) {
                alert("Ви вже голосували!");
                return;
            }

            const candidate = event.target.dataset.candidate;
            votes[candidate]++;
            localStorage.setItem("votes_union", JSON.stringify(votes));
            localStorage.setItem("hasVoted_union", "true");

            updateChart();
        });
    });

    // Завантаження діаграми при відкритті сторінки
    updateChart();
    /**
 * This function allows a user to vote in a union election.
 * @param {string} userId - The ID of the user voting.
 * @param {string} vote - The vote the user is casting (e.g., "yes" or "no").
 * @returns {string} - A message confirming the vote.
 */
function voteInUnionElection(userId, vote) {
    if (vote === 'yes' || vote === 'no') {
        return `Vote from user ${userId} recorded: ${vote}`;
    } else {
        return 'Invalid vote. Please vote "yes" or "no".';
    }
}

});
