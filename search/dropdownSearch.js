const dropdownIngredientList = document.querySelectorAll(".list-ingredient");
const dropdownApplianceList = document.querySelectorAll(".list-appliance");
const dropdownUtensilsList = document.querySelectorAll(".list-utensil");
const dropdownSearchElements = document.querySelectorAll(
  ".dropdown-search-input"
);

import {
  listOfAppliances,
  listOfIngredients,
  listOfUtencils,
} from "../script.js";

import { inputWords } from "./mainSearch.js";

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

  for (let i = 0; i < dropdownSearchElements.length; i++) {
    dropdownSearchElements[i].addEventListener("input", function () {
      searchDropdowns(this);
    });
  }
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

  mainDropdownSearch(inputWords, word);

  cross.addEventListener("click", function () {
    removeBadgeElement(this);
    addElementBackToDropdown(this);
  });
}

function removeElementFromDropdown(element) {
  element.style.display = "none";
}

function dropdownElementClicked(element) {
  addBadgeElement(element.textContent);
  removeElementFromDropdown(element);
  // updateCards(element)
}

initiateClickedDropdownElements();

//************ REMOVING BADGES SECTION **************//
//this function is initialised at every badge creation
function removeBadgeElement(element) {
  element.parentNode.remove();
  const badgeTextElements = document.querySelectorAll(".badge-text");
  let badgeText = [];
  for (let i = 0; i < badgeTextElements.length; i++) {
    const text = badgeTextElements[i].textContent.toLowerCase();
    badgeText.push(text);
  }
  searchElementsOnBadgeRemoval(inputWords, badgeText);
}

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

//SEARCH ELEMENT INSIDE DROPDOWNS
function mainDropdownSearch(word) {
  //search on only non hidden elements
}

function searchElementsOnBadgeRemoval(inputWords, badgeText) {
  //search on all elements in the database
}
