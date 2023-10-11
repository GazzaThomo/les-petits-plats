1. Create duplicate of recipes array (recipesCopy), add isHidden parameter on each as false for start

2. Create empty array for all the words

3.1. On a main search :
3.1.1. get all words as now, go through the recipesCopy, change the isHidden to true for all that don't correspond
3.1.2. go through recipesCopy again, get ingredients, appliances, utensils, ids, for all the isHidden = false left over
3.1.3. loop through the cards to hide all those that don't have an ID.
3.1.4. loop through the dropdowns to same effect

3.2 On a dropdown search :
3.2.1. same as 3.1 but only with one word
3.2.2. create badges
3.2.3. create inside list (dropdowns - see figma)

4. on main search deletion, update array in step 2, and rerun steps 3, same as if badge deletion
