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
    changeIsHiddenProperty([]);
    hideCards(-1);
    reloadDropdownsOnMainSearch(-1);
    updateRecipeCountText(-1);
  }
}

function changeIsHiddenProperty(words) {
  if (words.length !== 0) {
    for (let i = 0; i < recipesCopy.length; i++) {
      const recipe = recipesCopy[i];
      const wordsArePresent = words.every((word) => wordInRecipe(word, recipe));

      if (!wordsArePresent) {
        // console.log(recipe.name + " is hidden");
        recipe.isHidden = true;
      } else {
        // console.log(recipe.name + " is NOT hidden");
        recipe.isHidden = false;
      }
    }
  } else {
    for (let i = 0; i < recipesCopy.length; i++) {
      recipesCopy[i].isHidden = false;
    }
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
    ".no-correspondance-message"
  );

  recipeCardsSection.classList.add("hide");
  setTimeout(() => {
    if (input === -1) {
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "";
      }
    } else {
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        const dataId = parseInt(card.getAttribute("data-id"), 10);

        // find the corresponding recipe in recipesCopy
        const correspondingRecipe = recipesCopy.find(
          (recipe) => recipe.id === dataId
        );

        // Check if the recipe was found and then check the isHidden property
        if (correspondingRecipe) {
          if (correspondingRecipe.isHidden) {
            card.style.display = "none";
          } else {
            card.style.display = "block";
          }
        } else {
          noCorrespondanceElement.style.display = "block";
        }
      }
    }
    recipeCardsSection.classList.remove("hide");
  }, 500);
}

// helper functions for the other js files
export function getMainSearchbarWords(inputElement) {
  const input = inputElement.value.toLowerCase();
  const words = input.trim().split(" ");
  const inputWords = [];

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 0) {
      inputWords.push(words[i]);
    }
  }

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
