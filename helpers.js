import { recipesCopy } from "./script.js";
import { searchRecipe } from "./search/mainSearch.js";

function checkForMaliciousInput(inputArray) {
  //this pattern checks for the basic sql commands
  const pattern =
    /('|;|--|\b(OR|SELECT|INSERT|DELETE|UPDATE|CREATE|ALTER|DROP|EXEC|EXECUTE)\b)/i;

  for (const item of inputArray) {
    if (typeof item === "string" && pattern.test(item)) {
      return true;
    }
  }
  return false;
}

export function updateRecipeCountText(input) {
  const textElement = document.querySelector(".recipe-number");

  if (input === -1) {
    textElement.textContent = `${recipesCopy.length} recettes`;
  } else {
    // count the number of recipes where isHidden is false
    const visibleRecipes = [];
    for (let i = 0; i < recipesCopy.length; i++) {
      let recipe = recipesCopy[i];
      if (!recipe.isHidden) {
        visibleRecipes.push(recipe);
      }
    }
    const visibleRecipesCount = visibleRecipes.length;

    const newText =
      visibleRecipesCount === 1
        ? `1 recette`
        : `${visibleRecipesCount} recettes`;
    textElement.textContent = newText;
  }
}

function getMainSearchbarWords(inputElement) {
  const input = inputElement.value.toLowerCase();
  const inputWords = input.trim().split(" ");
  let filteredInputWords = [];
  for (let i = 0; i < inputWords.length; i++) {
    let inputToCheck = inputWords[i];
    if (inputToCheck.length > 0) {
      filteredInputWords.push(inputToCheck);
    } else {
      continue;
    }
  }
}

function getAllBadgeText() {
  const badges = document.querySelectorAll(".badge-text");
  let badgeText = [];
  for (let i = 0; i < badges.length; i++) {
    badgeText.push(badges[i].textContent);
  }
  return badgeText;
}

export function newSearch() {
  const searchbarElement = document.querySelector(".main-search-bar");
  const inputWords = getMainSearchbarWords(searchbarElement);
  const badgeWords = getAllBadgeText();
  const allSearchWords = [...inputWords, ...badgeWords];
  const isMalicious = checkForMaliciousInput(allSearchWords);

  if (isMalicious) {
    console.log("Malicious input attempt !");
    return;
  } else {
    if (inputWords.some((word) => word.length >= 3)) {
      searchRecipe(allSearchWords);
    } else {
      searchRecipe(badgeWords);
    }
  }
}
