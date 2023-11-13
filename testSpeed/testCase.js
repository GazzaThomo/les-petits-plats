function changeIsHiddenProperty(words) {
  if (words.length !== 0) {
    recipesCopy.forEach((recipe) => {
      const wordsArePresent = words.every((word) => wordInRecipe(word, recipe));
      if (!wordsArePresent) {
        recipe.isHidden = true;
      } else {
        recipe.isHidden = false;
      }
    });
  } else {
    recipesCopy.forEach((recipe) => {
      recipe.isHidden = false;
    });
  }
}

function hideCards(input) {
  const recipeCardsSection = document.querySelector(".recipe-cards-section");
  const cards = document.querySelectorAll(".card");
  const noCorrespondanceElement = document.querySelector(
    ".no-correspondance-block"
  );
  const visibleRecipesCount = recipesCopy.filter(
    (recipe) => !recipe.isHidden
  ).length;

  recipeCardsSection.classList.add("hide");
  setTimeout(() => {
    if (input === -1) {
      cards.forEach((card) => {
        card.style.display = "";
      });
    } else {
      cards.forEach((card) => {
        const dataId = parseInt(card.getAttribute("data-id"), 10);

        // find the corresponding recipe in recipesCopy
        const correspondingRecipe = recipesCopy.find(
          (recipe) => recipe.id === dataId
        );

        // Check if the recipe was found and then check the isHidden property
        if (correspondingRecipe.isHidden) {
          card.style.display = "none";
        } else {
          card.style.display = "block";
        }
      });

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
  const newUtensilList = getUstentiles(input);

  dropdownIngredientList.forEach((item) => {
    const value = item.textContent;
    const isIncluded = newIngredientList.includes(value);
    hideListItemsInDropdowns(isIncluded, item);
  });

  dropdownApplianceList.forEach((item) => {
    const value = item.textContent;
    const isIncluded = newApplianceList.includes(value);
    hideListItemsInDropdowns(isIncluded, item);
  });

  dropdownUtensilList.forEach((item) => {
    const value = item.textContent;
    const isIncluded = newUtensilList.includes(value);
    hideListItemsInDropdowns(isIncluded, item);
  });
}

function getIngredients(input = []) {
  let allIngredients = [];
  let filteredIngredients;
  if (input === -1) input = [];

  recipesCopy.forEach((recipe) => {
    if (!recipe.isHidden) {
      let object = {};
      let ingredients = recipe.ingredients;
      let specificRecipeIngredients = [];
      object.id = recipe.id;
      ingredients.forEach((ingredient) => {
        let someIngredient = ingredient.ingredient.trim();
        allIngredients.push(someIngredient.toLowerCase());
        specificRecipeIngredients.push(someIngredient.toLowerCase());
      });
      object.ingredients = specificRecipeIngredients;
    }
  });

  allIngredients = allIngredients.sort();

  //this creates a unique set of all ingredients
  let setIngredients = [...new Set(allIngredients)];

  if (input.length > 0) {
    //transform the input to lowercase for comparison
    let inputLowerCase = input.map((item) => item.toLowerCase());

    //filter out ingredients that appear in the input. If input is empty array, this does nothing
    filteredIngredients = setIngredients.filter(
      (ingredient) => !inputLowerCase.includes(ingredient)
    );
  } else {
    filteredIngredients = setIngredients;
  }

  // Use this to make the first char of each word uppercase, makes it look nicer
  const uniqueIngredients = filteredIngredients.map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );

  globalIngredients = uniqueIngredients;
  return uniqueIngredients;
}

function getAppareils(input = []) {
  let allAppareils = [];
  let filteredAppliances;
  recipes.forEach((appareil) => {
    if (!appareil.isHidden) {
      let someAppliance = appareil.appliance.trim();
      allAppareils.push(someAppliance.toLowerCase());
    }
  });
  allAppareils.sort();
  let setAppareils = [...new Set(allAppareils)];

  if (input.length > 0) {
    let inputLowerCase = input.map((item) => item.toLowerCase());

    filteredAppliances = setAppareils.filter(
      (appliance) => !inputLowerCase.includes(appliance)
    );
  } else {
    filteredAppliances = setAppareils;
  }

  const uniqueAppareils = filteredAppliances.map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );
  globalAppliances = uniqueAppareils;

  return uniqueAppareils;
}

function getUstentiles(input = []) {
  let allUstentiles = [];
  let filteredUtensils;
  recipes.forEach((recipe) => {
    if (!recipe.isHidden) {
      allUstentiles.push(...recipe.ustensils);
    }
  });

  allUstentiles.sort();
  allUstentiles = allUstentiles.map((ustencile) =>
    ustencile.trim().toLowerCase()
  );

  let uniqueUstensilesSet = [...new Set(allUstentiles)];

  if (input.length > 0) {
    let inputLowerCase = input.map((item) => item.toLowerCase());

    filteredUtensils = uniqueUstensilesSet.filter(
      (utensil) => !inputLowerCase.includes(utensil)
    );
  } else {
    filteredUtensils = uniqueUstensilesSet;
  }
  const uniqueUstensiles = [...filteredUtensils].map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );
  globalUtensils = uniqueUstensiles;

  return uniqueUstensiles;
}
