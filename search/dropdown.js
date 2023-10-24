import {
  searchRecipe,
  getMainSearchbarWords,
  getAllBadgeText,
} from "./mainSearch.js";

import {
  listOfAppliances,
  listOfIngredients,
  listOfUtencils,
  globalIngredients,
  globalAppliances,
  globalUtensils,
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
      filterDropdownItems(this, i);
    });
  }
}

function dropdownElementClicked(element) {
  addBadgeElement(element.textContent);
  handleBadgeChange();
  removeElementFromDropdown(element);
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

  // mainDropdownSearch(inputWords, word);

  cross.addEventListener("click", function () {
    removeBadgeElement(this);
    addElementBackToDropdown(this);
    handleBadgeChange();
  });
}

function removeElementFromDropdown(element) {
  element.style.display = "none";
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
  const badgeTextElements = document.querySelectorAll(".badge-text");
  let badgeText = [];
  for (let i = 0; i < badgeTextElements.length; i++) {
    const text = badgeTextElements[i].textContent.toLowerCase();
    badgeText.push(text);
  }
}

//this function is an eventListener
function addElementBackToDropdown(element) {
  const text = element.previousSibling.textContent;

  if (listOfIngredients.includes(text)) {
    findElementInDropdown(dropdownIngredientList, text);
  } else if (listOfAppliances.includes(text)) {
    findElementInDropdown(dropdownApplianceList, text);
  } else if (listOfUtencils.includes(text)) {
    findElementInDropdown(dropdownUtensilsList, text);
  } else {
    return;
  }
}

function findElementInDropdown(nodeListInHTML, text) {
  for (let i = 0; i < nodeListInHTML.length; i++) {
    if (nodeListInHTML[i].textContent === text) {
      nodeListInHTML[i].style.display = "block";
      return;
    }
  }
}

// this is basically to redo the searches on the cards
function handleBadgeChange() {
  const searchbarElement = document.querySelector(".main-search-bar");
  const inputWords = getMainSearchbarWords(searchbarElement);
  const badgeWords = getAllBadgeText();
  const allSearchWords = [...inputWords, ...badgeWords];
  searchRecipe(allSearchWords);
}

//dropdown search

function filterDropdownItems(inputElement, i) {
  let inputText = inputElement.value.toLowerCase();

  //find type of list (ingredient, appliance or utensil)
  let dropdownType = inputElement
    .closest(".dropdown")
    .getAttribute("data-type");

  //set filtered list to be the one corresponding to the dropdown
  let currentFilteredList;
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
