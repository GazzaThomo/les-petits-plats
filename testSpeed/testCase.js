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

function hideCards(input) {
  const recipeCardsSection = document.querySelector(".recipe-cards-section");
  const cards = document.querySelectorAll(".card");
  const noCorrespondanceElement = document.querySelector(
    ".no-correspondance-block"
  );

  let visibleRecipesCount = 0;
  for (let i = 0; i < recipesCopy.length; i++) {
    if (!recipesCopy[i].isHidden) {
      visibleRecipesCount++;
    }
  }
  console.log(visibleRecipesCount);

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

function reloadDropdownsOnMainSearch(input) {
  const dropdownIngredientList = document.querySelectorAll(".list-ingredient");
  const dropdownApplianceList = document.querySelectorAll(".list-appliance");
  const dropdownUtensilList = document.querySelectorAll(".list-utensil");

  const newIngredientList = getIngredients(input);
  const newApplianceList = getAppareils(input);
  const newUtensilList = getUstensiles(input);

  for (let i = 0; i < dropdownIngredientList.length; i++) {
    const item = dropdownIngredientList[i];
    const value = item.textContent;
    const isIncluded = newIngredientList.includes(value);
    hideListItemsInDropdowns(isIncluded, item);
  }

  for (let i = 0; i < dropdownApplianceList.length; i++) {
    const item = dropdownApplianceList[i];
    const value = item.textContent;
    const isIncluded = newApplianceList.includes(value);
    hideListItemsInDropdowns(isIncluded, item);
  }

  for (let i = 0; i < dropdownUtensilList.length; i++) {
    const item = dropdownUtensilList[i];
    const value = item.textContent;
    const isIncluded = newUtensilList.includes(value);
    hideListItemsInDropdowns(isIncluded, item);
  }
}

function getIngredients(input = []) {
  let allIngredients = [];
  let filteredIngredients;
  if (input === -1) input = [];

  for (let i = 0; i < recipes.length; i++) {
    if (!recipes[i].isHidden) {
      let object = {};
      let ingredients = recipes[i].ingredients;
      let specificRecipeIngredients = [];
      object.id = recipes[i].id;
      for (let j = 0; j < ingredients.length; j++) {
        let someIngredient = ingredients[j].ingredient.trim().toLowerCase();
        allIngredients.push(someIngredient);
        specificRecipeIngredients.push(someIngredient);
      }
      object.ingredients = specificRecipeIngredients;
    }
  }

  allIngredients.sort();

  // this creates a unique set of all ingredients
  let setIngredients = Array.from(new Set(allIngredients));

  if (input.length > 0) {
    // transform the input to lowercase for comparison
    let inputLowerCase = [];
    for (let i = 0; i < input.length; i++) {
      inputLowerCase.push(input[i].toLowerCase());
    }

    // filter out ingredients that appear in the input
    filteredIngredients = [];
    for (let i = 0; i < setIngredients.length; i++) {
      if (!inputLowerCase.includes(setIngredients[i])) {
        filteredIngredients.push(setIngredients[i]);
      }
    }
  } else {
    filteredIngredients = setIngredients;
  }

  // Use this to make the first char of each word uppercase, makes it look nicer
  let uniqueIngredients = [];
  for (let i = 0; i < filteredIngredients.length; i++) {
    uniqueIngredients.push(
      filteredIngredients[i].charAt(0).toUpperCase() +
        filteredIngredients[i].slice(1)
    );
  }

  globalIngredients = uniqueIngredients;
  return uniqueIngredients;
}

function getAppareils(input = []) {
  let allAppareils = [];
  let filteredAppliances;

  for (let i = 0; i < recipes.length; i++) {
    if (!recipes[i].isHidden) {
      let someAppliance = recipes[i].appliance.trim().toLowerCase();
      allAppareils.push(someAppliance);
    }
  }

  allAppareils.sort();
  let setAppareils = Array.from(new Set(allAppareils));

  if (input.length > 0) {
    let inputLowerCase = [];
    for (let i = 0; i < input.length; i++) {
      inputLowerCase.push(input[i].toLowerCase());
    }

    filteredAppliances = [];
    for (let i = 0; i < setAppareils.length; i++) {
      if (!inputLowerCase.includes(setAppareils[i])) {
        filteredAppliances.push(setAppareils[i]);
      }
    }
  } else {
    filteredAppliances = setAppareils;
  }

  let uniqueAppareils = [];
  for (let i = 0; i < filteredAppliances.length; i++) {
    uniqueAppareils.push(
      filteredAppliances[i].charAt(0).toUpperCase() +
        filteredAppliances[i].slice(1)
    );
  }

  globalAppliances = uniqueAppareils;
  return uniqueAppareils;
}

function getUstensiles(input = []) {
  let allUstensiles = [];
  let filteredUtensils;

  for (let i = 0; i < recipes.length; i++) {
    if (!recipes[i].isHidden) {
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
        allUstensiles.push(recipes[i].ustensils[j].trim().toLowerCase());
      }
    }
  }

  allUstensiles.sort();

  let uniqueUstensilesSet = Array.from(new Set(allUstensiles));

  if (input.length > 0) {
    let inputLowerCase = [];
    for (let i = 0; i < input.length; i++) {
      inputLowerCase.push(input[i].toLowerCase());
    }

    filteredUtensils = [];
    for (let i = 0; i < uniqueUstensilesSet.length; i++) {
      if (!inputLowerCase.includes(uniqueUstensilesSet[i])) {
        filteredUtensils.push(uniqueUstensilesSet[i]);
      }
    }
  } else {
    filteredUtensils = uniqueUstensilesSet;
  }

  let uniqueUstensiles = [];
  for (let i = 0; i < filteredUtensils.length; i++) {
    uniqueUstensiles.push(
      filteredUtensils[i].charAt(0).toUpperCase() + filteredUtensils[i].slice(1)
    );
  }

  globalUtensils = uniqueUstensiles;
  return uniqueUstensiles;
}
