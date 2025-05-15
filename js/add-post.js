document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('hashchange', showPostIfHashPresent);
    showPostIfHashPresent(); // виклик при першому завантаженні

    function showPostIfHashPresent() {
        if (location.hash && location.hash.startsWith('#userpost-')) {
            const postData = localStorage.getItem(location.hash.substring(1));
            if (postData) {
                const { title, body, img, date } = JSON.parse(postData);
                document.body.innerHTML = `
                    <main style="padding: 30px 200px; text-align: center; align-items: center;">
                        <h2 style="word-wrap: break-word;">${(title)}</h2>
                        <img src="${img}" alt="Зображення" style="max-width: 700px; border-radius: 10px; margin-top: 20px;">
                        <p style="margin-top: 20px; font-size: 18px; text-align: justify; word-wrap: break-word; overflow-wrap: break-word; max-width: 1250px; line-height: 1.5;">${escapeHtml(body).replace(/\n/g, '<br>')}</p>
                        <br>
                        <p style="margin-top: 10px; font-style: italic; text-align: left;">${date}</p>
                        <br><a href="faculties.html" style="font-size: 18px;"><b>← Повернутись до новин</b></a>
                    </main>
                `;
            }
        }
    }

    function escapeHtml(text) {
        return text.replace(/[&<>"']/g, function (m) {
            return ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            })[m];
        });
    }    

    const openBtn = document.querySelector('.add-news-card');
    const modal = document.getElementById('post-editor');
    const closeBtn = document.getElementById('close-editor');
    const publishBtn = document.getElementById('publish-post');

    const titleInput = document.getElementById('post-title');
    const bodyInput = document.getElementById('post-body');
    const imageInput = document.getElementById('post-image');
    const linkInput = document.getElementById('post-link');

    const cardsContainer = document.querySelector('.cards');

    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        document.querySelector('#crop-container').style.display = 'none';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let cropper;
    let thumbnailDataURL = '';
    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        /*
        reader.onload = () => {
            document.getElementById('image-to-crop').src = reader.result;
            document.getElementById('crop-container').style.display = 'block';

            if (cropper) cropper.destroy(); // якщо вже існує
            cropper = new Cropper(document.getElementById('image-to-crop'), {
                aspectRatio: 16 / 9,
                viewMode: 1,
            });
        };
        */
        reader.onload = () => {
            const imageToCrop = document.getElementById('image-to-crop');
            const cropContainer = document.getElementById('crop-container');
            const cropButton = document.getElementById('crop-button');
        
            imageToCrop.src = reader.result;
            cropContainer.style.display = 'flex';
            cropButton.style.display = 'inline-block';
        
            if (cropper) cropper.destroy();
            cropper = new Cropper(imageToCrop, {
                aspectRatio: 16 / 9,
                viewMode: 1,
            });
        };        
        reader.readAsDataURL(file);
    });

    document.getElementById('crop-container').style = `
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 600px;

        margin: 0 auto;
        overflow: hidden;
        padding: 10px;

        box-sizing: border-box;

        /*
        width: 100%;
        max-width: 90vw;
        max-height: 40vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        overflow: hidden;
        padding: 10px;
        box-sizing: border-box;

        position: relative;*/
    `;

    document.getElementById('image-to-crop').style = `
        max-height: 100%;
        max-width: 100%;
        
        object-fit: contain;
        display: block;
        
        /*margin: auto;

        width: auto;
        height: auto;
        object-fit: contain;
        display: block;*/
    `;

    publishBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();
        const image = imageInput.files[0];
        const link = linkInput.value.trim();

        if (!title || !body) {
            alert('Заповніть усі поля!');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const uniqueId = `userpost-${Date.now()}`;
            const newCard = document.createElement('div');
            newCard.classList.add('blog-card');

            newCard.innerHTML = `
                <div class="blogcss">
                    <div class="blog-image">
                        <img src="${thumbnailDataURL || reader.result}" alt="User post image">
                    </div>
                </div>
                <p class="blog-category">${currentUser?.name || 'Користувач'}</p>
                <h2 class="blog-title" style="word-wrap: break-word; padding: 0px 10px; 
                    max-width: 100%; overflow: hidden; text-overflow: ellipsis;
                ">${truncateTitle(title)}</h2>
                <br>
                <div class="blog-meta">
                    <!--<a href="#${uniqueId}">
                        <img src="../img/go-to.png" alt="Go to">
                    </a>-->
                    
                    <a href="faculties.html#${uniqueId}" title="Переглянути пост" target="_blank" rel="noopener noreferrer">
                        <img src="../img/view.png" alt="Переглянути пост">
                    </a>

                    <!--<a href="${link}" target="_blank" rel="noopener noreferrer" title="Перейти за посиланням">
                        <img src="../img/go-to.png" alt="Зовнішнє посилання">
                    </a>-->

                    ${link ? `
                        <a href="${link}" target="_blank" rel="noopener noreferrer" title="Перейти за посиланням">
                            <img src="../img/go-to.png" alt="Зовнішнє посилання">
                        </a>` : ''}

                </div>
            `;

            cardsContainer.prepend(newCard);
            
            const now = new Date();
            const formattedDate = `Опубліковано ${now.getDate().toString().padStart(2, '0')}.${(now.getMonth()+1).toString().padStart(2, '0')}.${now.getFullYear()} о ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            // Зберегти повний контент у localStorage
            localStorage.setItem(uniqueId, JSON.stringify({
                title,
                body,
                img: reader.result,
                thumbnail: thumbnailDataURL || reader.result,
                date: formattedDate,
                link,
                author: currentUser?.name || 'Користувач',
                timestamp: Date.now()
            }));

            modal.style.display = 'none';
            titleInput.value = '';
            bodyInput.value = '';
            imageInput.value = '';
            linkInput.value = '';
        };

        if (image) {
            reader.readAsDataURL(image);
        } else {
            alert('Додайте зображення!');
        }
    });

    /*
    function truncateTitle(title) {
        if (title.length <= 55) {
            return title;
        }
        let truncated = title.substring(0, 55);
        const lastSpaceIndex = truncated.lastIndexOf(' ');
        if (lastSpaceIndex > 0) {
            truncated = truncated.substring(0, lastSpaceIndex); // Обрізаємо на останньому пробілі
        }
        return truncated + '...';
    }
        */

    function truncateTitle(title) {
        const maxLength = 55;
        if (title.length <= maxLength) return title;
    
        let truncated = title.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        if (lastSpace > 0) {
            truncated = truncated.substring(0, lastSpace);
        }
    
        return truncated + '...';
    }    

    document.getElementById('crop-button').addEventListener('click', () => {
        if (!cropper) return;
    
        const croppedCanvas = cropper.getCroppedCanvas({
            width: 400,
            height: 200,
        });
    
        thumbnailDataURL = croppedCanvas.toDataURL("image/jpeg", 0.7); // зберігається для використання при публікації
        document.getElementById('crop-container').style.display = 'none';
    });



    /*
    // Відображення окремої "сторінки поста"
    if (location.hash && location.hash.startsWith('#userpost-')) {
        const postData = localStorage.getItem(location.hash.substring(1));
        if (postData) {
            const { title, body, img, date } = JSON.parse(postData);
            document.body.innerHTML = `
                <main style="padding: 40px;">
                    <h1>${title}</h1>
                    <img src="${img}" alt="Зображення" style="max-width: 400px; border-radius: 10px; margin-top: 20px;">
                    <p style="margin-top: 20px; font-size: 18px;">${body}</p>
                    <p style="margin-top: 10px; font-style: italic;">Дата: ${date}</p>
                    <br><a href="../index.html">← Назад до новин</a>
                </main>
            `;
        }
    }
        */
});
