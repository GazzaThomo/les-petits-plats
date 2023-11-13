import * as Helpers from "../helpers.js";

const searchbarElement = document.querySelector(".main-search-bar");
searchbarElement.addEventListener("input", handleInputChangeMainSearchbar);

function handleInputChangeMainSearchbar() {
  Helpers.newSearch();
}
