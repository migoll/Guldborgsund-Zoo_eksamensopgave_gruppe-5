const url = "https://guldborgsundzoo.nathaliawd.com/wp-json/wp/v2/posts";
const containerEl = document.querySelector('.animal-display');

fetch(url)
.then (res => res.json())
.then (posts =>{
  displayPosts(posts);
})
.catch (err => {console.log("Fejl:", err)})

function animalDisplay(data){
  data.forEach(post => {
    const animalContainer = document.createElement('div');
    const animalTitle = document.createElement('h3');
    const animalImage = document.createElement('img');

    animalTitle.textContent = post.title.rendered;
    

    const htmlContent = post.content.rendered;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const imgElement = doc.querySelector('img');
    const imageUrl = imgElement ? imgElement.getAttribute('src') : '';

    animalImage.src = imageUrl;


    animalContainer.append(animalTitle, animalImage);

    animalContainer.addEventListener('click', () => {
      window.location.href = `details.html?id=${post.id}`;
    });

    containerEl.append(animalContainer);
  })
}



// const url = "https://guldborgsundzoo.nathaliawd.com/wp-json/wp/v2/posts";

// fetch(url)
// .then (res => res.json())
// .then (posts =>{
//   displayPosts(posts);
// })
// .catch (err => {console.log("Fejl:", err)})

// export function renderAnimal(data, containerEl){
//   containerEl.innerHTML = "";

//   data.forEach((data) => {
    
//     const animalEl = document.createElement("a");
//     const titleEl = document.createElement("h3");

//     animalEl.href = "/enkelt-dyr.html?id=" + data.id;

//   })
// }