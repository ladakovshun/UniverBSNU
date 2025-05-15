document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('see-more');
    const container = document.querySelector('.blogdate');

    button.addEventListener('click', () => {
        const posts = container.querySelectorAll('.newblog');

        posts.forEach(post => {
            const clone = post.cloneNode(true);
            container.insertBefore(clone, container.firstChild);
        });
    });
});
