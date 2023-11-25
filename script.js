import { recipes } from "./recipes.js";
import { reloadDropdownsOnMainSearch } from "./search/dropdown.js";
import * as Helpers from "./helpers.js";

export let globalIngredients, globalAppliances, globalUtensils;
export let recipesCopy = [...recipes];
export let listOfIngredients = getIngredients();
export let listOfAppliances = getAppareils();
export let listOfUtencils = getUstentiles();

function loadPageInitial() {
  addHiddenProperty();
  loadRecipeCards();
  loadIngredientsDropdownInitial(listOfIngredients);
  loadAppliancesDropdownInitial(listOfAppliances);
  loadUtensilsDropdownInitial(listOfUtencils);
  iconEventListeners();
}

function loadRecipeCards() {
  recipesCopy.forEach((recipe) => {
    recipe.isHidden = false;
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
      ingredientQuantity.textContent = `${ingredient.quantity ?? ""} ${
        ingredient.unit ?? ""
      }`;
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
  Helpers.updateRecipeCountText(recipesCopy);
}

export function getIngredients(input = []) {
  let allIngredients = [];
  let filteredIngredients;
  if (input === -1) input = [];

  recipesCopy.forEach((recipe) => {
    if (!recipe.isHidden) {
      // let object = {};
      let ingredients = recipe.ingredients;
      // let specificRecipeIngredients = [];
      // object.id = recipe.id;
      ingredients.forEach((ingredient) => {
        let someIngredient = ingredient.ingredient.trim();
        allIngredients.push(someIngredient.toLowerCase());
        // specificRecipeIngredients.push(someIngredient.toLowerCase());
      });
      // object.ingredients = specificRecipeIngredients;
    }
  });

  allIngredients = allIngredients.sort();

  //this creates a unique set of all ingredients, then spreads it into an array
  let setIngredients = [...new Set(allIngredients)];

  if (input.length > 0) {
    //transform the input to lowercase for comparison
    let inputLowerCase = input.map((item) => item.toLowerCase());

    //filter out ingredients that appear in the input. If input is empty array, this does nothing
    filteredIngredients = setIngredients.filter(
      (ingredient) => !inputLowerCase.includes(ingredient)
    );
  } else {
    filteredIngredients = setIngredients;
  }

  // Use this to make the first char of each word uppercase, makes it look nicer
  const uniqueIngredients = filteredIngredients.map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );

  globalIngredients = uniqueIngredients;
  return uniqueIngredients;
}

export function getAppareils(input = []) {
  let allAppareils = [];
  let filteredAppliances;
  recipes.forEach((appareil) => {
    if (!appareil.isHidden) {
      let someAppliance = appareil.appliance.trim();
      allAppareils.push(someAppliance.toLowerCase());
    }
  });
  allAppareils.sort();
  let setAppareils = [...new Set(allAppareils)];

  if (input.length > 0) {
    let inputLowerCase = input.map((item) => item.toLowerCase());

    filteredAppliances = setAppareils.filter(
      (appliance) => !inputLowerCase.includes(appliance)
    );
  } else {
    filteredAppliances = setAppareils;
  }

  const uniqueAppareils = filteredAppliances.map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );
  globalAppliances = uniqueAppareils;

  return uniqueAppareils;
}

export function getUstentiles(input = []) {
  let allUstentiles = [];
  let filteredUtensils;
  recipes.forEach((recipe) => {
    if (!recipe.isHidden) {
      //spread aarray, otherwise you get array of arrays
      allUstentiles.push(...recipe.ustensils);
    }
  });

  allUstentiles.sort();
  allUstentiles = allUstentiles.map((ustencile) =>
    ustencile.trim().toLowerCase()
  );

  let uniqueUstensilesSet = [...new Set(allUstentiles)];

  if (input.length > 0) {
    let inputLowerCase = input.map((item) => item.toLowerCase());

    filteredUtensils = uniqueUstensilesSet.filter(
      (utensil) => !inputLowerCase.includes(utensil)
    );
  } else {
    filteredUtensils = uniqueUstensilesSet;
  }
  const uniqueUstensiles = [...filteredUtensils].map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );
  globalUtensils = uniqueUstensiles;

  return uniqueUstensiles;
}

function loadIngredientsDropdownInitial(listOfIngredients) {
  const dropdown = document.querySelector(".dropdown-menu-ingredients");

  listOfIngredients.forEach((ingredient) => {
    const listItem = document.createElement("li");
    listItem.className = "list-ingredient dropdown-item";
    listItem.textContent = ingredient;
    dropdown.appendChild(listItem);
  });
}

function loadAppliancesDropdownInitial(listOfAppliances) {
  const dropdown = document.querySelector(".dropdown-menu-appareils");

  listOfAppliances.forEach((appliance) => {
    const listItem = document.createElement("li");
    listItem.className = "list-appliance dropdown-item";
    listItem.textContent = appliance;
    dropdown.appendChild(listItem);
  });
}

function loadUtensilsDropdownInitial(listOfUtencils) {
  const dropdown = document.querySelector(".dropdown-menu-ustensils");

  listOfUtencils.forEach((utensil) => {
    const listItem = document.createElement("li");
    listItem.className = "list-utensil dropdown-item";
    listItem.textContent = utensil;
    dropdown.appendChild(listItem);
  });
}

function addHiddenProperty() {
  recipesCopy.forEach((recipe) => {
    recipe.isHidden = false;
  });
}

//this initializes the event listeners for the crosses in the searchbar and the dropdowns
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
      event.stopPropagation();
      const parentLi = allDropdownCross[i].closest("li");
      const inputInLi = parentLi.querySelector("input");
      inputInLi.value = "";
      reloadDropdownsOnMainSearch(-1);
    });
  }
}

loadPageInitial();
