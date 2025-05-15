const commentTextArea = document.getElementById("comment-textarea");
const submitButton = document.getElementById("submit-comment");
const commentsSection = document.getElementById("comments-section");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

function loadComments() {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    savedComments.forEach(comment => {
        createCommentElement(comment.text, comment.userName, comment.likeCount, comment.dislikeCount, false);
    });

    if (currentUser && currentUser.role === "Administrator") {
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
            alert("Please log in to rate the comment.");
            return;
        }
        likeCount++;
        likeCounter.textContent = likeCount;
        updateCommentInStorage(text, userName, likeCount, dislikeCount);
    });

    dislikeBtn.addEventListener("click", function () {
        if (!currentUser) {
            alert("Please log in to rate the comment.");
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

    if (currentUser && currentUser.role === "Administrator") {
        const selectCommentCheckbox = document.createElement("input");
        selectCommentCheckbox.type = "checkbox";
        selectCommentCheckbox.classList.add("select-comment");

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "<i class='fas fa-trash-alt' style='font-size: 20px; color: red;'></i>";
        deleteBtn.style = "background: transparent; border: none;";
        deleteBtn.classList.add("delete-button");

        deleteBtn.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this comment?")) {
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

    if (currentUser && currentUser.role === "Administrator") {
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

submitButton.addEventListener("click", function () {
    if (!currentUser) {
        alert("Please log in to leave a comment.");
        return;
    }

    const commentText = commentTextArea.value.trim();
    if (commentText !== "") {
        if (commentText.length < 5) {
            alert("The comment must be at least 5 characters long!");
            return;
        }
        
        if (commentText.length > 1000) {
            alert("The comment cannot be longer than 1000 characters!");
            return;
        }

        createCommentElement(commentText, currentUser.name);
        commentTextArea.value = "";
        alert("Your comment has been posted.");
    }
    else {
        alert("The comment field cannot be empty!");
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
        alert("Please select at least one comment to delete.");
        return;
    }

    if (confirm(`Are you sure you want to delete ${selectedComments.length} comment(s)?`)) {
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
        deleteSelectedBtn.textContent = "Delete Selected";
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
