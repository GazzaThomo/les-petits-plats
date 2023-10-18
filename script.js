import { recipes } from "./recipes.js";

export let recipesCopy = [...recipes];
export let listOfIngredients = getIngredients();
export let listOfAppliances = getAppareils();
export let listOfUtencils = getUstentiles();
export let getTotalIngredients = createTotalIngredients();

function loadPageInitial() {
  addHiddenProperty();
  loadRecipeCards();
  loadIngredientsDropdownInitial(listOfIngredients);
  loadAppliancesDropdownInitial(listOfAppliances);
  loadUtensilsDropdownInitial(listOfUtencils);
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
}

// export function getIngredients(input) {
//   let allIngredients = [];
//   let totalIngredients = [];

//   recipes.forEach((recipe) => {
//     if (!recipe.isHidden) {
//       let object = {};
//       let ingredients = recipe.ingredients;
//       let specificRecipeIngredients = [];
//       object.id = recipe.id;
//       ingredients.forEach((ingredient) => {
//         let someIngredient = ingredient.ingredient.trim();
//         allIngredients.push(someIngredient.toLowerCase());
//         specificRecipeIngredients.push(someIngredient.toLowerCase());
//       });
//       object.ingredients = specificRecipeIngredients;
//       totalIngredients.push(object);
//     }
//   });

//   allIngredients = allIngredients.sort();
//   let setIngredients = [...new Set(allIngredients)];

//   //Use this to make the first char of each word uppercase, makes it look nicer
//   let uniqueIngredients = setIngredients.map(
//     (str) => str.charAt(0).toUpperCase() + str.slice(1)
//   );

//   return uniqueIngredients;
// }

export function getIngredients(input = []) {
  let allIngredients = [];
  let totalIngredients = [];

  recipes.forEach((recipe) => {
    if (!recipe.isHidden) {
      let object = {};
      let ingredients = recipe.ingredients;
      let specificRecipeIngredients = [];
      object.id = recipe.id;
      ingredients.forEach((ingredient) => {
        let someIngredient = ingredient.ingredient.trim();
        allIngredients.push(someIngredient.toLowerCase());
        specificRecipeIngredients.push(someIngredient.toLowerCase());
      });
      object.ingredients = specificRecipeIngredients;
      totalIngredients.push(object);
    }
  });

  allIngredients = allIngredients.sort();
  let setIngredients = [...new Set(allIngredients)];

  // Transform the input to lowercase for comparison
  let inputLowerCase = input.map((item) => item.toLowerCase());

  // Filter out ingredients that appear in the input
  let filteredIngredients = setIngredients.filter(
    (ingredient) => !inputLowerCase.includes(ingredient)
  );

  // Use this to make the first char of each word uppercase, makes it look nicer
  let uniqueIngredients = filteredIngredients.map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );

  return uniqueIngredients;
}

export function getAppareils() {
  let allAppareils = [];
  recipes.forEach((appareil) => {
    if (!appareil.isHidden) {
      let someAppliance = appareil.appliance.trim();
      allAppareils.push(someAppliance.toLowerCase());
    }
  });
  allAppareils.sort();
  let setAppareils = [...new Set(allAppareils)];

  let uniqueAppareils = setAppareils.map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );
  return uniqueAppareils;
}

export function getUstentiles() {
  let allUstentiles = [];
  recipes.forEach((recipe) => {
    if (!recipe.isHidden) {
      allUstentiles.push(...recipe.ustensils);
    }
  });

  allUstentiles = allUstentiles.map((ustencile) =>
    ustencile.trim().toLowerCase()
  );

  let uniqueUstensilesSet = new Set(allUstentiles);

  let uniqueUstensiles = [...uniqueUstensilesSet].map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );

  uniqueUstensiles.sort();
  return uniqueUstensiles;
}

function loadIngredientsDropdownInitial(listOfIngredients) {
  const dropdown = document.querySelector(".dropdown-menu-ingredients");

  listOfIngredients.forEach((ingredient) => {
    const listItem = document.createElement("li");
    listItem.className = "list-ingredient";
    listItem.textContent = ingredient;
    dropdown.appendChild(listItem);
  });
}

function loadAppliancesDropdownInitial(listOfAppliances) {
  const dropdown = document.querySelector(".dropdown-menu-appareils");

  listOfAppliances.forEach((appliance) => {
    const listItem = document.createElement("li");
    listItem.className = "list-appliance";
    listItem.textContent = appliance;
    dropdown.appendChild(listItem);
  });
}

function loadUtensilsDropdownInitial(listOfUtencils) {
  const dropdown = document.querySelector(".dropdown-menu-ustensils");

  listOfUtencils.forEach((utensil) => {
    const listItem = document.createElement("li");
    listItem.className = "list-utensil";
    listItem.textContent = utensil;
    dropdown.appendChild(listItem);
  });
}

function createTotalIngredients() {
  let totalIngredients = [];
  recipes.forEach((recipe) => {
    let object = {};
    let ingredients = recipe.ingredients;
    let specificRecipeIngredients = [];
    object.recipeId = recipe.id;
    ingredients.forEach((ingredient) => {
      let someIngredient = ingredient.ingredient.trim();
      specificRecipeIngredients.push(someIngredient.toLowerCase());
    });
    object.ingredients = specificRecipeIngredients;
    totalIngredients.push(object);
  });

  return totalIngredients;
}

function addHiddenProperty() {
  recipesCopy.forEach((recipe) => {
    recipe.isHidden = false;
  });
}

loadPageInitial();
