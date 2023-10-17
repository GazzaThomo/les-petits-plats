import { recipes } from "../recipes.js";
import {
  recipesCopy,
  getIngredients,
  getAppareils,
  getUstentiles,
} from "../script.js";

export let inputWords = [];
const searchbarElement = document.querySelector(".main-search-bar");
searchbarElement.addEventListener("input", mainSearch);

function mainSearch(e) {
  let input = e.target.value.toLowerCase();
  inputWords = input
    .trim()
    .split(" ")
    .filter((word) => word.length > 0);

  console.log(inputWords);

  if (inputWords.some((word) => word.length >= 3)) {
    changeIsHiddenProperty(inputWords);
    hideCards();
    reloadDropdownsOnMainSearch(inputWords);
  } else {
    hideCards(-1);
    reloadDropdownsOnMainSearch(-1);
  }
}

function changeIsHiddenProperty(words) {
  recipesCopy.forEach((recipe) => {
    const wordsArePresent = words.every((word) => wordInRecipe(word, recipe));
    if (!wordsArePresent) {
      recipe.isHidden = true;
    } else {
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

function reloadDropdownsOnMainSearch(input) {
  const dropdownIngredientList = document.querySelectorAll(".list-ingredient");
  const dropdownApplianceList = document.querySelectorAll(".list-appliance");
  const dropdownUtensilList = document.querySelectorAll(".list-utensil");

  if (input === -1) {
    dropdownIngredientList.forEach((item) => {
      item.style.display = "block";
    });

    dropdownApplianceList.forEach((item) => {
      item.style.display = "block";
    });

    dropdownUtensilList.forEach((item) => {
      item.style.display = "block";
    });
    return;
  }

  const newIngredientList = getIngredients();
  const newApplianceList = getAppareils();
  const newUtensilList = getUstentiles();

  dropdownIngredientList.forEach((item) => {
    const value = item.textContent.toLowerCase();

    // inputWords.some will go over the array, taking each word, then we wheck to see if that word is included in value
    const isMatched = newIngredientList.some((word) =>
      value.includes(word.toLowerCase())
    );
    hideListItemsInDropdowns(isMatched, item);
  });

  dropdownApplianceList.forEach((item) => {
    const value = item.textContent.toLowerCase();
    const isMatched = newApplianceList.some((word) =>
      value.includes(word.toLowerCase())
    );
    hideListItemsInDropdowns(isMatched, item);
  });

  dropdownUtensilList.forEach((item) => {
    const value = item.textContent.toLowerCase();
    const isMatched = newUtensilList.some((word) =>
      value.includes(word.toLowerCase())
    );
    hideListItemsInDropdowns(isMatched, item);
  });
}

function hideListItemsInDropdowns(match, item) {
  if (!match) {
    item.style.display = "none";
  } else {
    item.style.display = "block";
  }
}
