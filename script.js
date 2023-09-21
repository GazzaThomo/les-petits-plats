import { recipes } from "./recipes.js";

recipes.forEach((recipe) => {
  const cardsContainer = document.querySelector(".recipe-cards-section");
  let card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-id", recipe.id);

  const cardImage = document.createElement("img");
  cardImage.className = "card-img-top";
  cardImage.src = `./assets/images/plats/${recipe.image}`;
  cardImage.alt = recipe.name;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = recipe.name;

  const cardDescription = document.createElement("p");
  cardDescription.className = "card-text";
  cardDescription.textContent = recipe.description;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDescription);
  card.appendChild(cardImage);
  card.appendChild(cardBody);

  cardsContainer.appendChild(card);
});
