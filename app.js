
const input = document.querySelector("#input");
const grid = document.querySelector(".grid");
const search = document.querySelector(".search")

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    loadImg();
  }
});

function loadImg() {
  removeImg();

  const API = "YQ4e9-4-YG1FKsvvUbZW3Ry-yZf0FKxDbyThv2RlmYM";
  const url =
    "https://api.unsplash.com/search/photos/?query=" +
    input.value +
    "&per_page=100&client_id=" +
    API;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert(response.status);
      }
    })
    .then((data) => {
      const imageNodes = [];
      const link = [];
      for (i = 0; i < data.results.length; i++) {
        imageNodes[i] = document.createElement("div");
        imageNodes[i].className = "img";
        imageNodes[i].style.backgroundImage =
          "url(" + data.results[i].urls.small + ")";
        
        link[i] = data.results[i].links.download
        imageNodes[i].id = link[i];


        imageNodes[i].addEventListener("dblclick", function() {
          window.open(this.id, "_blank");
        });
        grid.appendChild(imageNodes[i]);
      }
    });
}

function removeImg() {
  grid.innerHTML = "";
}

search.addEventListener("click", () => {
  loadImg();
})
