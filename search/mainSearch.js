import { reloadDropdownsOnMainSearch } from "./searchbar.js";
import { recipesCopy, updateRecipeCountText } from "../script.js";

//main search function
export function searchRecipe(arrayOfStrings) {
  if (arrayOfStrings.some((word) => word.length >= 3)) {
    changeIsHiddenProperty(arrayOfStrings);
    hideCards();
    reloadDropdownsOnMainSearch(arrayOfStrings);
    updateRecipeCountText();
  } else {
    hideCards(-1);
    reloadDropdownsOnMainSearch(-1);
    updateRecipeCountText(-1);
  }
}

function changeIsHiddenProperty(words) {
  recipesCopy.forEach((recipe) => {
    const wordsArePresent = words.every((word) => wordInRecipe(word, recipe));
    if (!wordsArePresent) {
      // console.log(recipe.name + " is hidden");
      recipe.isHidden = true;
    } else {
      // console.log(recipe.name + " is NOT hidden");

      recipe.isHidden = false;
    }
  });
}

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

function hideCards(input) {
  const cards = document.querySelectorAll(".card");
  const noCorrespondanceElement = document.querySelector(
    ".no-correspondance-message"
  );

  if (input === -1) {
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.display = "block";
    }
  } else {
    for (let i = 0; i < cards.length; i++) {
      const dataId = parseInt(cards[i].getAttribute("data-id"), 10);

      // find the corresponding recipe in recipesCopy
      const correspondingRecipe = recipesCopy.find(
        (recipe) => recipe.id === dataId
      );

      // Check if the recipe was found and then check the isHidden property
      if (correspondingRecipe) {
        if (correspondingRecipe.isHidden) {
          cards[i].style.display = "none";
        } else {
          cards[i].style.display = "block";
        }
      } else {
        noCorrespondanceElement.style.display = "block";
      }
    }
  }
}

// helper functions for the other js files
export function getMainSearchbarWords(inputElement) {
  const input = inputElement.value.toLowerCase();
  const inputWords = input
    .trim()
    .split(" ")
    .filter((word) => word.length > 0);

  return inputWords;
}

export function getAllBadgeText() {
  const badges = document.querySelectorAll(".badge-text");
  let badgeText = [];
  for (let i = 0; i < badges.length; i++) {
    badgeText.push(badges[i].textContent);
  }

  return badgeText;
}
