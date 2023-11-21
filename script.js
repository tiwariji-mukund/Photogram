//Complete this JS file to render the post on the screen with all the specified tags.
let postsData = [
  {
    id: 1,
    author: "John",
    content: "Hello, Instagram!",
    likes: 10,
    comments: ["Great post!", "Nice photo!"],
    image: "https://files.codingninjas.in/image2-28694.jpg",
  },
  {
    id: 2,
    author: "Jane",
    content: "This is a great post!",
    likes: 15,
    comments: [],
    image: "https://files.codingninjas.in/oip-28704.jpg",
  },
  {
    id: 3,
    author: "Alice",
    content: "Another post",
    likes: 8,
    comments: [],
    image: "https://files.codingninjas.in/th-2-28706.jpg",
  },
  {
    id: 4,
    author: "Bob",
    content: "Check out this photo!",
    likes: 20,
    comments: [],
    image: "https://files.codingninjas.in/image1-28708.jpg",
  },
];

const likedPosts = new Set();
function renderPosts() {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";

  postsData.forEach((post) => {
    const postsEle = document.createElement("div");
    postsEle.classList.add("post");

    const author = document.createElement("h3");
    author.textContent = post.author;

    const image = document.createElement("img");
    image.src = post.image;
    image.alt = "Post Image";

    const content = document.createElement("p");
    content.textContent = post.content;

    const likeBtn = document.createElement("button");
    likeBtn.textContent = "Like";
    likeBtn.classList.add("like-button");
    likeBtn.addEventListener("click", () => {
      if (!likedPosts.has(post.id)) {
        likePost(post.id);
        likedPosts.add(post.id);
        likeBtn.disabled = true;
        for (let ind of likedPosts) {
          const btn = document.querySelectorAll(".like-button")[ind - 1];
          btn.style.backgroundColor = "red";
        }
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
        addComment(post.id, commentBox.value);
        commentBox.value = "";
      },
      {
        once: true,
      }
    );

    const postFooterCont = document.createElement("div");
    postFooterCont.classList.add("post-footer");
    postFooterCont.textContent = `Likes: ${post.likes} Comments: ${post.comments.length}`;

    const commentCont = document.createElement("div");
    commentCont.classList.add("comments-container");
    commentCont.style.display = "none";
    post.comments.forEach((comment) => {
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
    });
    postsContainer.append(postsEle);
  });
}

// Function to handle post liking
function likePost(postId) {
  const post = postsData.find((post) => post.id === postId);
  if (post) {
    post.likes++;
    renderPosts();
  }
}

// Function to add comments
function addComment(postId, comment) {
  const post = postsData.find((post) => post.id === postId);
  if (post) {
    post.comments.push(comment);
    renderPosts();
  }
}

renderPosts();
