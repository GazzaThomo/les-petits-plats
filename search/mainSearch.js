import { reloadDropdownsOnMainSearch } from "./searchbar.js";
import { recipesCopy, updateRecipeCountText } from "../script.js";

//main search function
export function searchRecipe(arrayOfStrings) {
  console.log(arrayOfStrings);
  // arrayOfStrings.some((word) => word.length >= 3)
  if (arrayOfStrings.length > 0) {
    changeIsHiddenProperty(arrayOfStrings);
    hideCards();
    reloadDropdownsOnMainSearch(arrayOfStrings);
    updateRecipeCountText();
  } else {
    changeIsHiddenProperty([]);
    hideCards(-1);
    reloadDropdownsOnMainSearch(-1);
    updateRecipeCountText(-1);
  }
}

function changeIsHiddenProperty(words) {
  if (words.length !== 0) {
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
  } else {
    recipesCopy.forEach((recipe) => {
      recipe.isHidden = false;
    });
  }
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
  const recipeCardsSection = document.querySelector(".recipe-cards-section");
  const cards = document.querySelectorAll(".card");
  const noCorrespondanceElement = document.querySelector(
    ".no-correspondance-block"
  );
  const visibleRecipesCount = recipesCopy.filter(
    (recipe) => !recipe.isHidden
  ).length;

  recipeCardsSection.classList.add("hide");
  setTimeout(() => {
    if (input === -1) {
      cards.forEach((card) => {
        card.style.display = "";
      });
    } else {
      cards.forEach((card) => {
        const dataId = parseInt(card.getAttribute("data-id"), 10);

        // find the corresponding recipe in recipesCopy
        const correspondingRecipe = recipesCopy.find(
          (recipe) => recipe.id === dataId
        );

        // Check if the recipe was found and then check the isHidden property
        if (correspondingRecipe.isHidden) {
          card.style.display = "none";
        } else {
          card.style.display = "block";
        }
      });

      if (visibleRecipesCount === 0) {
        noCorrespondanceElement.classList.add("show");
      } else {
        noCorrespondanceElement.classList.remove("show");
      }
    }
    recipeCardsSection.classList.remove("hide");
  }, 500);
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
  badges.forEach((badge) => {
    badgeText.push(badge.textContent);
  });

  return badgeText;
}
