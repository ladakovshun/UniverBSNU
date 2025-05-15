document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const cards1 = document.querySelectorAll('.blog-card');
    const cards2 = document.querySelectorAll('.newblog');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Функція для перевірки чи вміст збігається з пошуковим терміном
        const matchesSearch = (text) => text?.toLowerCase().includes(searchTerm);

        // Обробка карток з класом .blog-card
        cards1.forEach(card => {
            const title = card.querySelector('.blog-title')?.textContent || '';
            const category = card.querySelector('.blog-category')?.textContent || '';
            const author = card.querySelector('.blog-meta p')?.textContent || '';

            const isVisible = matchesSearch(title) || matchesSearch(category) || matchesSearch(author);
            card.style.display = isVisible ? '' : 'none';
        });

        // Обробка карток з класом .newblog
        cards2.forEach(card => {
            const facult = card.querySelector('.namefacult')?.textContent || '';
            const heading = card.querySelector('h3')?.textContent || '';
            const name = card.querySelector('.name-date p')?.textContent || '';

            const isVisible = matchesSearch(facult) || matchesSearch(heading) || matchesSearch(name);
            card.style.display = isVisible ? '' : 'none';
        });
    });
});