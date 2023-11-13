import { reloadDropdownsOnMainSearch } from "./dropdown.js";
import { recipesCopy } from "../script.js";
import * as Helpers from "../helpers.js";

//main search function
export function searchRecipe(arrayOfStrings) {
  if (arrayOfStrings.length > 0) {
    changeIsHiddenProperty(arrayOfStrings);
    hideCards();
    reloadDropdownsOnMainSearch(arrayOfStrings);
    Helpers.updateRecipeCountText();
  } else {
    changeIsHiddenProperty([]);
    hideCards(-1);
    reloadDropdownsOnMainSearch(-1);
    Helpers.updateRecipeCountText(-1);
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

  let visibleRecipesCount = 0;
  for (let i = 0; i < recipesCopy.length; i++) {
    if (!recipesCopy[i].isHidden) {
      visibleRecipesCount++;
    }
  }

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

        if (correspondingRecipe.isHidden) {
          card.style.display = "none";
        } else {
          card.style.display = "block";
        }
      }
      if (visibleRecipesCount === 0) {
        noCorrespondanceElement.classList.add("show");
      } else {
        noCorrespondanceElement.classList.remove("show");
      }
    }
    recipeCardsSection.classList.remove("hide");
  }, 500);
}
