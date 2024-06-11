const baseURL = "https://guldborgsundzoo.nathaliawd.com/wp-json/wp/v2/";

// render andre dyr til .andre-dyr
document.addEventListener("DOMContentLoaded", () => {
  const andreDyrSection = document.querySelector(".andre-dyr");

  function fetchAndreDyr() {
    return fetch(`${baseURL}posts?per_page=3`)
      .then((res) => res.json())
      .catch((err) => console.error("Error fetching additional animals:", err));
  }

  function renderAndreDyr(posts) {
    for (const post of posts) {
      const title = post.title.rendered;
      const imageUrl = post.acf.hero_billede_af_dyret.url;
      const postHTML = `
        <div class="animal-post">
          <img src="${imageUrl}" alt="${title}" />
          <h2>${title}</h2>
        </div>
      `;
      andreDyrSection.insertAdjacentHTML("beforeend", postHTML);
    }
  }

  fetchAndreDyr()
    .then((posts) => {
      renderAndreDyr(posts);
    })
    .catch((err) => console.error("Error rendering additional animals:", err));
});
