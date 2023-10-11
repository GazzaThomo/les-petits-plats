import { recipes } from "../recipes.js";

const searchbarElement = document.querySelector(".main-search-bar");
searchbarElement.addEventListener("input", search);

function search(e) {
  let input = e.target.value.toLowerCase();
  let inputWords = input
    .trim()
    .split(" ")
    .filter((word) => word.length > 0);
  let ids;
  if (inputWords.some((word) => word.length >= 3)) {
    ids = getResultIds(inputWords);
    hideCards(ids);
    reloadDropdowns(ids);
  } else {
    hideCards(-1);
    reloadDropdowns(-1);
  }
}

// Check if a word is present in the specified fields of a recipe
function wordInRecipe(word, recipe) {
  const isInRecipeName = recipe.name.toLowerCase().includes(word.toLowerCase());

  const isInIngredientList = recipe.ingredients.some((ingredient) =>
    ingredient.ingredient.toLowerCase().includes(word.toLowerCase())
  );
  const isInAppliance = recipe.appliance
    .toLowerCase()
    .includes(word.toLowerCase());

  const isInUtensilList = recipe.ustensils.some((utensil) =>
    utensil.toLowerCase().includes(word.toLowerCase())
  );

  if (
    !isInRecipeName &&
    !isInIngredientList &&
    !isInAppliance &&
    !isInUtensilList
  ) {
    return false;
  }

  return true;
}

function getResultIds(words) {
  // search all recipes that contain the words were looking for
  const correspondingRecipes = recipes.filter((recipe) => {
    return words.every((word) => wordInRecipe(word, recipe));
  });

  //get the ids from those recipes (use map and not foreach becuase were creating a new array)
  const ids = correspondingRecipes.map((recipe) => recipe.id);
  return ids;
}

function hideCards(ids) {
  const recipeCards = document.querySelectorAll(".card");
  const noCorrespondanceElement = document.querySelector(
    ".no-correspondance-message"
  );
  if (ids === -1) {
    recipeCards.forEach((card) => {
      card.style.display = "block"; // Show matching cards
    });
  } else if (ids.length > 0) {
    noCorrespondanceElement.style.display = "none";
    recipeCards.forEach((card) => {
      const recipeId = parseInt(card.getAttribute("data-id"), "10");
      if (ids.includes(recipeId)) {
        card.style.display = "block"; // Show matching cards
      } else {
        card.style.display = "none"; // Hide non-matching cards
      }
    });
  } else {
    noCorrespondanceElement.style.display = "block";
    recipeCards.forEach((card) => {
      card.style.display = "none";
    });
  }
}

function extractIngredientsForDropdowns(ids) {
  let ingredientsSet = new Set();
  recipes.forEach((recipe) => {
    if (ids.includes(recipe.id)) {
      recipe.ingredients.forEach((ingredient) => {
        ingredientsSet.add(ingredient.ingredient.toLowerCase());
      });
    }
  });
  return Array.from(ingredientsSet);
}

function extractAppliancesForDropdowns(ids) {
  let appliancesSet = new Set();
  recipes.forEach((recipe) => {
    if (ids.includes(recipe.id)) {
      appliancesSet.add(recipe.appliance.toLowerCase());
    }
  });
  return Array.from(appliancesSet);
}

function extractUtensilsForDropdowns(ids) {
  let utensilsSet = new Set();
  recipes.forEach((recipe) => {
    if (ids.includes(recipe.id)) {
      recipe.ustensils.forEach((utensil) => {
        utensilsSet.add(utensil);
      });
    }
  });
  return Array.from(utensilsSet);
}

function reloadDropdowns(ids) {
  console.log(ids.length);
  if (ids.length > 0) {
    let newIngredients = extractIngredientsForDropdowns(ids);
    let newAppliances = extractAppliancesForDropdowns(ids);
    let newUtensils = extractUtensilsForDropdowns(ids);

    updateDropdown(".list-ingredient", newIngredients);
    updateDropdown(".list-appliance", newAppliances);
    updateDropdown(".list-utensil", newUtensils);
  } else {
    console.log("test");
    resetDropdowns(".list-ingredient");
    resetDropdowns(".list-appliance");
    resetDropdowns(".list-utensils");
  }
}

function updateDropdown(selector, newList) {
  const elements = document.querySelectorAll(selector);
  for (let i = 0; i < elements.length; i++) {
    let value = elements[i].textContent.toLowerCase();
    if (newList.includes(value)) {
      elements[i].style.display = "block";
    } else {
      elements[i].style.display = "none";
    }
  }
}

function resetDropdowns(selector) {
  const elements = document.querySelectorAll(selector);
  for (let i = 0; i < elements.length; i++) {
    console.log(elements[i].value);
    elements[i].style.display = "block";
  }
}
