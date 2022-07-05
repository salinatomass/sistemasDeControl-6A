const API = "https://rickandmortyapi.com/api/character";

const $charactersContainer = document.getElementById("characters");
const $modal = document.getElementById("modal");

const getData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const loadCharacters = async () => {
  const charactersList = await getData(API);

  const characters = [];
  charactersList.results.forEach((item) => {
    const character = document.createElement("article");
    character.classList.add("character");
    character.innerHTML = `
            <figure class="character-image">
                <img src="${item.image}" data-id="${item.id}" />
            </figure>
            <p class="character-name">${item.name}</p>
        `;

    characters.push(character);
  });

  $charactersContainer.append(...characters);
};

const loadSingleCharacter = async (id) => {
  const character = await getData(`${API}/${id}`);

  $modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-character">
        <img class="modal-image" src="${character.image}" />
        <h2 class="modal-name">${character.name}</h2>
      </div>
      <div class="modal-description">
        <p>Episodes: <span>${character.episode?.length}<span></p>
        <p>Status: <span>${character.status}<span></p>
        <p>Species: <span>${character.species}<span></p>
        <p>Gender: <span>${character.gender}<span></p>
        <p>Origin: <span>${character.origin?.name}<span></p>
        <p>Last location: <span>${character.location?.name}<span></p>
      </div>
    </div>
  `;

  $modal.classList.add("active");
};

function modalListener(e) {
  const tagName = e.target.tagName;
  console.log(e.target.id);

  if (tagName === "IMG") {
    const id = e.target.dataset?.id;
    loadSingleCharacter(id);
  }

  if (e.target.id === "modal") $modal.classList.remove("active");
}

loadCharacters();
document.body.addEventListener("click", modalListener);
