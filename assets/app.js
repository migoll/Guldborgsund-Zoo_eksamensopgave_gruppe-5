const url = "https://guldborgsundzoo.nathaliawd.com/wp-json/wp/v2/posts";

fetch(url)
.then (res => res.json())
.then (posts =>{
  displayPosts(posts);
})
.catch (err => {console.log("Fejl:", err)})

export function renderAnimal(data, containerEl){
  containerEl.innerHTML = "";

  data.forEach((data) => {
    
    const animalEl = document.createElement("a");
    const titleEl = document.createElement("h3");

    animalEl.href = "/enkelt-dyr.html?id=" + data.id;

  })
}