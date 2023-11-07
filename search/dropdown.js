import {
  searchRecipe,
  getMainSearchbarWords,
  getAllBadgeText,
} from "./mainSearch.js";

import {
  globalIngredients,
  globalAppliances,
  globalUtensils,
  checkForMaliciousInput,
} from "../script.js";

const dropdownIngredientList = document.querySelectorAll(".list-ingredient");
const dropdownApplianceList = document.querySelectorAll(".list-appliance");
const dropdownUtensilsList = document.querySelectorAll(".list-utensil");

const dropdownInputBoxElements = document.querySelectorAll(
  ".dropdown-search-input"
);

function initiateClickedDropdownElements() {
  for (let i = 0; i < dropdownIngredientList.length; i++) {
    dropdownIngredientList[i].addEventListener("click", function () {
      dropdownElementClicked(this);
    });
  }

  for (let i = 0; i < dropdownApplianceList.length; i++) {
    dropdownApplianceList[i].addEventListener("click", function () {
      dropdownElementClicked(this);
    });
  }

  for (let i = 0; i < dropdownUtensilsList.length; i++) {
    dropdownUtensilsList[i].addEventListener("click", function () {
      dropdownElementClicked(this);
    });
  }

  for (let i = 0; i < dropdownInputBoxElements.length; i++) {
    dropdownInputBoxElements[i].addEventListener("input", function () {
      filterDropdownItems(this);
    });
  }
}

function dropdownElementClicked(element) {
  addBadgeElement(element.textContent);
  handleBadgeChange();
  clearDropdownInputField(element);
}

function addBadgeElement(word) {
  const badgeSection = document.querySelector(".badge-section");
  let badge = document.createElement("span");
  badge.className = "badge";

  let text = document.createElement("p");
  text.className = "badge-text";
  text.textContent = word;

  let cross = document.createElement("img");
  cross.src = "./assets/images/icons/cross.svg";
  cross.className = "badge-exit";
  cross.alt = "croix";
  badge.appendChild(text);
  badge.appendChild(cross);
  badgeSection.appendChild(badge);

  cross.addEventListener("click", function () {
    removeBadgeElement(this);
    handleBadgeChange();
  });
}

function clearDropdownInputField(element) {
  let closestSearchElement = element
    .closest(".dropdown")
    .querySelector(".dropdown-search-input");
  closestSearchElement.value = "";
}

initiateClickedDropdownElements();

//************ REMOVING BADGES SECTION **************//
//this function is initialised at every badge creation
//this function is an eventListener
function removeBadgeElement(element) {
  element.parentNode.remove();
}

// this is basically to redo the searches on the cards
function handleBadgeChange() {
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
    // searchRecipe(inputWords,badgeWords)
  }
}

//dropdown search
export function filterDropdownItems(inputElement) {
  const isMalicious = checkForMaliciousInput(inputElement.value);
  if (isMalicious) {
    console.log("Possible malicious entry detected!");
    return;
  } else {
    let inputText;
    let currentFilteredList;
    inputText = inputElement.value.toLowerCase();

    //find type of list (ingredient, appliance or utensil)
    let dropdownType = inputElement
      .closest(".dropdown")
      .getAttribute("data-type");

    //set filtered list to be the one corresponding to the dropdown
    switch (dropdownType) {
      case "drop-ingredients":
        currentFilteredList = globalIngredients;
        break;
      case "drop-appareils":
        currentFilteredList = globalAppliances;
        break;
      case "drop-ustensiles":
        currentFilteredList = globalUtensils;
        break;
      default:
        currentFilteredList = [];
    }

    //find all dropdown items within the same dropdown as the input element
    let dropdownItems = inputElement
      .closest(".dropdown")
      .querySelectorAll(".dropdown-item");

    dropdownItems.forEach((item) => {
      //if a word is in the inputbox, check that each item(from dropdown list) contains the word, plus that the item is in the filtered list(global list)
      if (
        inputText &&
        item.textContent.toLowerCase().includes(inputText) &&
        currentFilteredList.includes(item.textContent)
      ) {
        item.style.display = "";
      }
      //this is for no word. Just check that the item is in the filtered list
      else if (!inputText && currentFilteredList.includes(item.textContent)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  }
}
