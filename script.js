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

  const cardTime = document.createElement("p");
  cardTime.className = "card-time";
  cardTime.textContent = `${recipe.time}min`;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = recipe.name;

  const cardDescriptionTitle = document.createElement("p");
  cardDescriptionTitle.className = "card-subsection-title";
  cardDescriptionTitle.textContent = "Recette";

  const cardDescription = document.createElement("p");
  cardDescription.className = "card-text";
  cardDescription.textContent = recipe.description;

  const cardIngredientsTitle = document.createElement("p");
  cardIngredientsTitle.className = "card-subsection-title";
  cardIngredientsTitle.textContent = "Ingredients";

  const cardIngredients = document.createElement("div");
  cardIngredients.className = "ingredients-section";

  const ingredients = recipe.ingredients;

  ingredients.forEach((ingredient) => {
    const ingredientSubgroup = document.createElement("div");
    ingredientSubgroup.className = "ingredient-subgroup";

    const ingredientName = document.createElement("p");
    ingredientName.textContent = ingredient.ingredient;
    ingredientName.className = "ingredient-name";
    ingredientSubgroup.appendChild(ingredientName);

    const ingredientQuantity = document.createElement("p");
    ingredientQuantity.textContent = `${ingredient.quantity} ${ingredient.unit}`;
    ingredientQuantity.className = "ingredient-quantity";

    ingredientSubgroup.appendChild(ingredientQuantity);

    cardIngredients.appendChild(ingredientSubgroup);
  });

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDescriptionTitle);
  cardBody.appendChild(cardDescription);
  cardBody.appendChild(cardIngredientsTitle);
  cardBody.appendChild(cardIngredients);
  card.appendChild(cardImage);
  card.appendChild(cardTime);
  card.appendChild(cardBody);

  cardsContainer.appendChild(card);
});
