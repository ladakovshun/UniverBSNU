document.addEventListener("DOMContentLoaded", function () {
    const commentTextArea = document.getElementById("comment-textarea");
    const submitButton = document.getElementById("submit-comment");
    const commentsSection = document.getElementById("comments-section");
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    function loadComments() {
        const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
        savedComments.forEach(comment => {
            createCommentElement(comment.text, comment.userName, comment.likeCount, comment.dislikeCount, false);
        });

        if (currentUser && currentUser.role === "Адміністратор") {
            moveDeleteSelectedButton();
        }
    }

    function saveCommentsToLocalStorage(comments) {
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    function createCommentElement(text, userName, likeCount = 0, dislikeCount = 0, saveToLocalStorage = true) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");

        const avatarDiv = document.createElement("div");
        avatarDiv.classList.add("avatar");

        const textContainer = document.createElement("div");
        textContainer.classList.add("comment-text-container");

        const userNameElement = document.createElement("p");
        userNameElement.classList.add("comment-user");
        userNameElement.textContent = userName;

        const commentText = document.createElement("p");
        commentText.classList.add("comment-text");
        commentText.textContent = text;

        textContainer.appendChild(userNameElement);
        textContainer.appendChild(commentText);

        const likeDislikeDiv = document.createElement("div");
        likeDislikeDiv.classList.add("like-dislike");

        const likeBtn = document.createElement("button");
        likeBtn.style = "background: transparent; border: none;";
        likeBtn.innerHTML = "<i class='fas fa-thumbs-up' style='font-size: 22px;'></i>";
        likeBtn.classList.add("like-button");

        const likeCounter = document.createElement("span");
        likeCounter.textContent = likeCount;

        const dislikeBtn = document.createElement("button");
        dislikeBtn.style = "background: transparent; border: none;";
        dislikeBtn.innerHTML = "<i class='fas fa-thumbs-down' style='font-size: 22px;'></i>";
        dislikeBtn.classList.add("dislike-button");

        const dislikeCounter = document.createElement("span");
        dislikeCounter.textContent = dislikeCount;

        likeBtn.addEventListener("click", function () {
            if (!currentUser) {
                alert("Будь ласка, увійдіть до системи, щоб оцінити коментар.");
                return;
            }
            likeCount++;
            likeCounter.textContent = likeCount;
            updateCommentInStorage(text, userName, likeCount, dislikeCount);
        });

        dislikeBtn.addEventListener("click", function () {
            if (!currentUser) {
                alert("Будь ласка, увійдіть до системи, щоб оцінити коментар.");
                return;
            }
            dislikeCount++;
            dislikeCounter.textContent = dislikeCount;
            updateCommentInStorage(text, userName, likeCount, dislikeCount);
        });

        likeDislikeDiv.appendChild(likeBtn);
        likeDislikeDiv.appendChild(likeCounter);
        likeDislikeDiv.appendChild(dislikeBtn);
        likeDislikeDiv.appendChild(dislikeCounter);

        if (currentUser && currentUser.role === "Адміністратор") {
            const selectCommentCheckbox = document.createElement("input");
            selectCommentCheckbox.type = "checkbox";
            selectCommentCheckbox.classList.add("select-comment");

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "<i class='fas fa-trash-alt' style='font-size: 20px; color: red;'></i>";
            deleteBtn.style = "background: transparent; border: none;";
            deleteBtn.classList.add("delete-button");

            deleteBtn.addEventListener("click", function () {
                if (confirm("Ви дійсно хочете видалити цей коментар?")) {
                    deleteComment(text, userName);
                    commentDiv.remove();
                }
            });

            likeDislikeDiv.appendChild(selectCommentCheckbox);
            likeDislikeDiv.appendChild(deleteBtn);
        }

        commentDiv.appendChild(avatarDiv);
        commentDiv.appendChild(textContainer);
        commentDiv.appendChild(likeDislikeDiv);
        commentsSection.appendChild(commentDiv);

        if (saveToLocalStorage) {
            saveNewComment(text, userName, likeCount, dislikeCount);
        }

        if (currentUser && currentUser.role === "Адміністратор") {
            moveDeleteSelectedButton();
        }
    }

    function saveNewComment(text, userName, likeCount, dislikeCount) {
        let savedComments = JSON.parse(localStorage.getItem("comments")) || [];
        savedComments.push({ text, userName, likeCount, dislikeCount });
        saveCommentsToLocalStorage(savedComments);
    }

    function updateCommentInStorage(text, userName, likeCount, dislikeCount) {
        let savedComments = JSON.parse(localStorage.getItem("comments")) || [];
        let updatedComments = savedComments.map(comment =>
            comment.text === text && comment.userName === userName
                ? { ...comment, likeCount, dislikeCount }
                : comment
        );
        saveCommentsToLocalStorage(updatedComments);
    }

    // Додаємо лічильник символів під textarea
    const charCounter = document.createElement("p");
    charCounter.id = "char-counter";
    charCounter.style = "font-size: 14px; color: black; margin-top: 5px;";
    charCounter.textContent = "Символів: 0/1000";
    commentTextArea.parentNode.insertBefore(charCounter, submitButton);

    // Оновлення лічильника в реальному часі
    commentTextArea.addEventListener("input", function () {
        const textLength = commentTextArea.value.length;
        charCounter.textContent = `Символів: ${textLength}/1000`;

        // Якщо перевищено ліміт, змінюємо колір на червоний
        if (((textLength > 0) && (textLength < 5)) || (textLength > 1000)) {
            charCounter.style.color = "red";
        } else {
            charCounter.style.color = "black";
        }
    });

    submitButton.addEventListener("click", function () {
        if (!currentUser) {
            alert("Будь ласка, увійдіть до системи, щоб залишити коментар.");
            return;
        }

        const commentText = commentTextArea.value.trim();
        if (commentText !== "") {
            if (commentText.length < 5) {
                alert("Коментар має містити не менше 5 символів!");
                return;
            }
            
            if (commentText.length > 1000) {
                alert("Коментар не може містити більше 1000 символів!");
                return;
            }

            charCounter.textContent = "Символів: 0/1000";
            charCounter.style.color = "black";

            createCommentElement(commentText, currentUser.name);
            commentTextArea.value = "";
            alert("Ваш коментар опубліковано");
        }
        else {
            alert("Поле коментаря не може бути порожнім!");
            return;
        }
    });

    function deleteComment(text, userName) {
        let savedComments = JSON.parse(localStorage.getItem("comments")) || [];
        let updatedComments = savedComments.filter(comment => !(comment.text === text && comment.userName === userName));
        saveCommentsToLocalStorage(updatedComments);
    }

    function deleteSelectedComments() {
        const selectedComments = document.querySelectorAll(".select-comment:checked");
        if (selectedComments.length === 0) {
            alert("Оберіть хоча б 1 коментар для видалення.");
            return;
        }

        if (confirm(`Ви дійсно хочете видалити коментарі: ${selectedComments.length}?`)) {
            let savedComments = JSON.parse(localStorage.getItem("comments")) || [];
            selectedComments.forEach(checkbox => {
                const commentDiv = checkbox.closest(".comment");
                const commentText = commentDiv.querySelector(".comment-text").textContent;
                const userName = commentDiv.querySelector(".comment-user").textContent;
                savedComments = savedComments.filter(comment => !(comment.text === commentText && comment.userName === userName));
                commentDiv.remove();
            });
            saveCommentsToLocalStorage(savedComments);
        }
    }

    let deleteSelectedBtn;
    function moveDeleteSelectedButton() {
        if (!deleteSelectedBtn) {
            deleteSelectedBtn = document.createElement("button");
            deleteSelectedBtn.textContent = "Видалити вибрані";
            deleteSelectedBtn.style = `
                display: block;
                margin: 20px auto;
                background-color: #d9534f;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            `;
    
            deleteSelectedBtn.addEventListener("mouseover", function () {
                deleteSelectedBtn.style.backgroundColor = "#c9302c";
            });
    
            deleteSelectedBtn.addEventListener("mouseout", function () {
                deleteSelectedBtn.style.backgroundColor = "#d9534f";
            });
    
            deleteSelectedBtn.addEventListener("click", deleteSelectedComments);
        }
    
        if (!commentsSection.contains(deleteSelectedBtn)) {
            commentsSection.appendChild(deleteSelectedBtn);
        } else {
            commentsSection.appendChild(deleteSelectedBtn);
        }
    }

    loadComments();
});