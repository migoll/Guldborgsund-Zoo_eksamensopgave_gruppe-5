const baseURL = "https://guldborgsundzoo.nathaliawd.com/wp-json/wp/v2/";

const postContainerEl = document.querySelector(".postContainer");

const dyrOversigtContainerEl = document.querySelector(
  ".dyr-oversigt-container"
);

const params = new URLSearchParams(window.location.search);
const dyrId = params.get("id");

function fetchContent() {
  return fetch("https://guldborgsundzoo.nathaliawd.com/wp-json/wp/v2/posts/", {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log("fejl", err));
}

function renderVoresDyr() {
  return fetch(baseURL + "posts/", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((posts) => {
      // Loop gennem hvert indlæg og tilføj indholdet til DOM'en
      posts.forEach((post) => {
        const postTitle = post.title.rendered;
        const postContent = post.content.rendered;
        const postImage = post.acf.hero_billede_af_dyret; // Brug hele objektet
        const postImageURL = postImage.url;
        const postId = post.id; // Få fat i postens ID

        // Opret et nyt DOM-element til at indeholde indlægget
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        // Tilføj titel, billede og indhold til det nye element
        postElement.innerHTML = `
          <h2>${postTitle}</h2>
          <a href="posts/${postId}">
            <img src="${postImageURL}" alt="Billede af ${postTitle}"/>
          </a>
          <div>${postContent}</div>
        `;

        // Tilføj det nye element til dyrOversigtContainerEl
        dyrOversigtContainerEl.appendChild(postElement);
      });
    })
    .catch((err) => console.error("fejl", err));
}

// Kald fetchContent-funktionen for at hente og vise indholdet
renderVoresDyr();

// Billede carousel

document.addEventListener("DOMContentLoaded", () => {
  const imagesContainer = document.querySelector(".carousel-images");
  const images = document.querySelectorAll(".carousel-image");
  let currentIndex = 0;

  function showImage(index) {
    const offset = -index * 100;
    imagesContainer.style.transform = `translateX(${offset}%)`;
  }

  document.querySelector(".prev-button").addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    showImage(currentIndex);
  });

  document.querySelector(".next-button").addEventListener("click", () => {
    currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    showImage(currentIndex);
  });

  showImage(currentIndex);
});
