import {
  getIngredients,
  getAppareils,
  getUstensiles,
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
  const newUtensilList = getUstensiles(input);

  if (input === -1) {
    for (let i = 0; i < dropdownIngredientList.length; i++) {
      dropdownIngredientList[i].style.display = "";
    }

    for (let i = 0; i < dropdownApplianceList.length; i++) {
      dropdownApplianceList[i].style.display = "";
    }

    for (let i = 0; i < dropdownUtensilList.length; i++) {
      dropdownUtensilList[i].style.display = "";
    }
    return;
  }

  for (let i = 0; i < dropdownIngredientList.length; i++) {
    const item = dropdownIngredientList[i];
    const value = item.textContent.toLowerCase();
    const isMatched = newIngredientList.some((word) =>
      value.includes(word.toLowerCase())
    );
    hideListItemsInDropdowns(isMatched, item);
  }

  for (let i = 0; i < dropdownApplianceList.length; i++) {
    const item = dropdownApplianceList[i];
    const value = item.textContent.toLowerCase();
    const isMatched = newApplianceList.some((word) =>
      value.includes(word.toLowerCase())
    );
    hideListItemsInDropdowns(isMatched, item);
  }

  for (let i = 0; i < dropdownUtensilList.length; i++) {
    const item = dropdownUtensilList[i];
    const value = item.textContent.toLowerCase();
    const isMatched = newUtensilList.some((word) =>
      value.includes(word.toLowerCase())
    );
    hideListItemsInDropdowns(isMatched, item);
  }
}

function hideListItemsInDropdowns(match, item) {
  if (!match) {
    item.style.display = "none";
  } else {
    item.style.display = "block";
  }
}
