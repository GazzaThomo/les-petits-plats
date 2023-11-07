import {
  getIngredients,
  getAppareils,
  getUstentiles,
  checkForMaliciousInput,
} from "../script.js";

import {
  searchRecipe,
  getMainSearchbarWords,
  getAllBadgeText,
} from "./mainSearch.js";

const searchbarElement = document.querySelector(".main-search-bar");
searchbarElement.addEventListener("input", handleInputChangeMainSearchbar);

function handleInputChangeMainSearchbar(e) {
  const inputWords = getMainSearchbarWords(e.target);
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
    // searchRecipe(inputWords,badgeWords)
  }
}

export function reloadDropdownsOnMainSearch(input) {
  const dropdownIngredientList = document.querySelectorAll(".list-ingredient");
  const dropdownApplianceList = document.querySelectorAll(".list-appliance");
  const dropdownUtensilList = document.querySelectorAll(".list-utensil");

  const newIngredientList = getIngredients(input);
  const newApplianceList = getAppareils(input);
  const newUtensilList = getUstentiles(input);

  if (input === -1) {
    dropdownIngredientList.forEach((item) => {
      item.style.display = "";
    });

    dropdownApplianceList.forEach((item) => {
      item.style.display = "";
    });

    dropdownUtensilList.forEach((item) => {
      item.style.display = "";
    });
    return;
  }

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
