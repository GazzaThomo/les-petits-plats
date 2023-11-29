import { recipes } from "./recipes.js";
import { reloadDropdownsOnMainSearch } from "./search/dropdown.js";
import * as Helpers from "./helpers.js";

export let globalIngredients, globalAppliances, globalUtensils;
export let recipesCopy = [...recipes];
export let listOfIngredients = getIngredients();
export let listOfAppliances = getAppareils();
export let listOfUtencils = getUstensiles();

function loadPageInitial() {
  addHiddenProperty();
  loadRecipeCards();
  loadIngredientsDropdownInitial(listOfIngredients);
  loadAppliancesDropdownInitial(listOfAppliances);
  loadUtensilsDropdownInitial(listOfUtencils);
  iconEventListeners();
}

function loadRecipeCards() {
  for (let i = 0; i < recipesCopy.length; i++) {
    recipesCopy[i].isHidden = false;
    const cardsContainer = document.querySelector(".recipe-cards-section");
    let card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-id", recipesCopy[i].id);

    const cardImage = document.createElement("img");
    cardImage.className = "card-img-top";
    cardImage.src = `./assets/images/plats/${recipesCopy[i].image}`;
    cardImage.alt = recipesCopy[i].name;

    const cardTime = document.createElement("p");
    cardTime.className = "card-time";
    cardTime.textContent = `${recipesCopy[i].time}min`;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = recipesCopy[i].name;

    const cardDescriptionTitle = document.createElement("p");
    cardDescriptionTitle.className = "card-subsection-title";
    cardDescriptionTitle.textContent = "Recette";

    const cardDescription = document.createElement("p");
    cardDescription.className = "card-text";
    cardDescription.textContent = recipesCopy[i].description;

    const cardIngredientsTitle = document.createElement("p");
    cardIngredientsTitle.className = "card-subsection-title";
    cardIngredientsTitle.textContent = "Ingredients";

    const cardIngredients = document.createElement("div");
    cardIngredients.className = "ingredients-section";

    const ingredients = recipesCopy[i].ingredients;

    for (let j = 0; j < ingredients.length; j++) {
      const ingredientSubgroup = document.createElement("div");
      ingredientSubgroup.className = "ingredient-subgroup";

      const ingredientName = document.createElement("p");
      ingredientName.textContent = ingredients[j].ingredient;
      ingredientName.className = "ingredient-name";
      ingredientSubgroup.appendChild(ingredientName);

      const ingredientQuantity = document.createElement("p");
      ingredientQuantity.textContent = `${ingredients[j].quantity ?? ""} ${
        ingredients[j].unit ?? ""
      }`;

      ingredientQuantity.className = "ingredient-quantity";

      ingredientSubgroup.appendChild(ingredientQuantity);

      cardIngredients.appendChild(ingredientSubgroup);
    }

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescriptionTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardIngredientsTitle);
    cardBody.appendChild(cardIngredients);
    card.appendChild(cardImage);
    card.appendChild(cardTime);
    card.appendChild(cardBody);

    cardsContainer.appendChild(card);
    Helpers.updateRecipeCountText(recipesCopy);
  }
}

export function getIngredients(input = []) {
  let allIngredients = [];
  let filteredIngredients;
  if (input === -1) input = [];

  //here we are looking at all the recipes, and chechking if they are hidden or not. If there aren't hidden, we add the ingredients to an array
  for (let i = 0; i < recipes.length; i++) {
    if (!recipes[i].isHidden) {
      let ingredients = recipes[i].ingredients;
      for (let j = 0; j < ingredients.length; j++) {
        let someIngredient = ingredients[j].ingredient.trim().toLowerCase();
        allIngredients.push(someIngredient);
      }
    }
  }

  allIngredients.sort();

  // this creates a unique set of all ingredients
  let setIngredients = Array.from(new Set(allIngredients));

  if (input.length > 0) {
    // transform the input to lowercase for comparison
    let inputLowerCase = [];
    for (let i = 0; i < input.length; i++) {
      inputLowerCase.push(input[i].toLowerCase());
    }

    // filter out ingredients that appear in the input
    filteredIngredients = [];
    for (let i = 0; i < setIngredients.length; i++) {
      if (!inputLowerCase.includes(setIngredients[i])) {
        filteredIngredients.push(setIngredients[i]);
      }
    }
  } else {
    filteredIngredients = setIngredients;
  }

  // Use this to make the first char of each word uppercase, makes it look nicer
  let uniqueIngredients = [];
  for (let i = 0; i < filteredIngredients.length; i++) {
    uniqueIngredients.push(
      filteredIngredients[i].charAt(0).toUpperCase() +
        filteredIngredients[i].slice(1)
    );
  }

  globalIngredients = uniqueIngredients;
  return uniqueIngredients;
}

export function getAppareils(input = []) {
  let allAppareils = [];
  let filteredAppliances;

  for (let i = 0; i < recipes.length; i++) {
    if (!recipes[i].isHidden) {
      let someAppliance = recipes[i].appliance.trim().toLowerCase();
      allAppareils.push(someAppliance);
    }
  }

  allAppareils.sort();
  let setAppareils = Array.from(new Set(allAppareils));

  if (input.length > 0) {
    let inputLowerCase = [];
    for (let i = 0; i < input.length; i++) {
      inputLowerCase.push(input[i].toLowerCase());
    }

    filteredAppliances = [];
    for (let i = 0; i < setAppareils.length; i++) {
      if (!inputLowerCase.includes(setAppareils[i])) {
        filteredAppliances.push(setAppareils[i]);
      }
    }
  } else {
    filteredAppliances = setAppareils;
  }

  let uniqueAppareils = [];
  for (let i = 0; i < filteredAppliances.length; i++) {
    uniqueAppareils.push(
      filteredAppliances[i].charAt(0).toUpperCase() +
        filteredAppliances[i].slice(1)
    );
  }

  globalAppliances = uniqueAppareils;
  return uniqueAppareils;
}

export function getUstensiles(input = []) {
  let allUstensiles = [];
  let filteredUtensils;

  for (let i = 0; i < recipes.length; i++) {
    if (!recipes[i].isHidden) {
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
        allUstensiles.push(recipes[i].ustensils[j].trim().toLowerCase());
      }
    }
  }

  allUstensiles.sort();

  let uniqueUstensilesSet = Array.from(new Set(allUstensiles));

  if (input.length > 0) {
    let inputLowerCase = [];
    for (let i = 0; i < input.length; i++) {
      inputLowerCase.push(input[i].toLowerCase());
    }

    filteredUtensils = [];
    for (let i = 0; i < uniqueUstensilesSet.length; i++) {
      if (!inputLowerCase.includes(uniqueUstensilesSet[i])) {
        filteredUtensils.push(uniqueUstensilesSet[i]);
      }
    }
  } else {
    filteredUtensils = uniqueUstensilesSet;
  }

  let uniqueUstensiles = [];
  for (let i = 0; i < filteredUtensils.length; i++) {
    uniqueUstensiles.push(
      filteredUtensils[i].charAt(0).toUpperCase() + filteredUtensils[i].slice(1)
    );
  }

  globalUtensils = uniqueUstensiles;
  return uniqueUstensiles;
}

function loadIngredientsDropdownInitial(listOfIngredients) {
  const dropdown = document.querySelector(".dropdown-menu-ingredients");

  for (let i = 0; i < listOfIngredients.length; i++) {
    const listItem = document.createElement("li");
    listItem.className = "list-ingredient dropdown-item";
    listItem.textContent = listOfIngredients[i];
    dropdown.appendChild(listItem);
  }
}

function loadAppliancesDropdownInitial(listOfAppliances) {
  const dropdown = document.querySelector(".dropdown-menu-appareils");

  for (let i = 0; i < listOfAppliances.length; i++) {
    const listItem = document.createElement("li");
    listItem.className = "list-appliance dropdown-item";
    listItem.textContent = listOfAppliances[i];
    dropdown.appendChild(listItem);
  }
}

function loadUtensilsDropdownInitial(listOfUtencils) {
  const dropdown = document.querySelector(".dropdown-menu-ustensils");

  for (let i = 0; i < listOfUtencils.length; i++) {
    const listItem = document.createElement("li");
    listItem.className = "list-utensil dropdown-item";
    listItem.textContent = listOfUtencils[i];
    dropdown.appendChild(listItem);
  }
}

function addHiddenProperty() {
  recipesCopy.forEach((recipe) => {
    recipe.isHidden = false;
  });
}

function iconEventListeners() {
  const crossMainSearchbar = document.getElementById("img-cross-searchbar");
  const allDropdownCross = document.querySelectorAll(".dropdown-cross img");

  crossMainSearchbar.addEventListener("click", function () {
    const input = document.querySelector(".search-input-area");
    input.value = "";
    Helpers.newSearch();
  });

  for (let i = 0; i < allDropdownCross.length; i++) {
    allDropdownCross[i].addEventListener("click", function (event) {
      //stop propagation neccessary to stop menus from closing when we wlick on the cross
      event.stopPropagation();
      const parentLi = allDropdownCross[i].closest("li");
      const inputInLi = parentLi.querySelector("input");
      inputInLi.value = "";
      reloadDropdownsOnMainSearch(-1);
    });
  }
}

loadPageInitial();
