//Complete this JS file to render the post1 on the screen with all the specified tags.
let post1 = {
  id: 1,
  author: "John",
  content: "My first Post!",
  likes: 10,
  comments: ["Great post!", "Nice photo!"],
  image: "https://files.codingninjas.in/image2-28694.jpg",
};

const likedPosts = new Set();
function renderPosts() {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";

  const postsEle = document.createElement("div");
  postsEle.classList.add("post");

  const author = document.createElement("h3");
  author.textContent = post1.author;

  const image = document.createElement("img");
  image.src = post1.image;
  image.alt = "Post Image";

  const content = document.createElement("p");
  content.textContent = post1.content;

  const likeBtn = document.createElement("button");
  likeBtn.textContent = "Like";
  likeBtn.classList.add("like-button");
  likeBtn.addEventListener("click", () => {
    if (!likedPosts.has(post1.id)) {
      likePost();
      likedPosts.add(post1.id);
      likeBtn.disabled = true;
    }
  });

  const commentBox = document.createElement("input");
  commentBox.placeholder = "Write a Comment...";

  const commentBtn = document.createElement("button");
  commentBtn.textContent = "Comment";
  commentBtn.classList.add("comment-button");
  commentBtn.addEventListener(
    "click",
    () => {
      addComment(commentBox.value);
      commentBox.value = "";
    },
    {
      once: true,
    }
  );

  const postFooterCont = document.createElement("div");
  postFooterCont.classList.add("post-footer");
  postFooterCont.textContent = `Likes: ${post1.likes} Comments: ${post1.comments.length}`;

  const commentCont = document.createElement("div");
  commentCont.classList.add("comments-container");
  commentCont.style.display = "none";
  post1.comments.forEach((comment) => {
    const text = document.createElement("p");
    text.textContent = comment;
    commentCont.appendChild(text);
  });

  postsEle.appendChild(author);
  postsEle.appendChild(image);
  postsEle.appendChild(content);
  postsEle.appendChild(likeBtn);
  postsEle.appendChild(commentBox);
  postsEle.appendChild(commentBtn);
  postsEle.appendChild(postFooterCont);
  postsEle.appendChild(commentCont);

  postFooterCont.addEventListener("click", () => {
    if (commentCont.style.display === "none") {
      commentCont.style.display = "block";
    } else {
      commentCont.style.display = "none";
    }
    console.log(commentCont.style.display);
  });
  postsContainer.append(postsEle);
}

// Function to handle post liking
function likePost() {
  post1.likes++;
  renderPosts();
  const button = document.querySelector(".like-button");
  button.style.backgroundColor = "red";
}

// Function to add comments
function addComment(comment) {
  post1.comments.push(comment);
  renderPosts();
}

renderPosts();
