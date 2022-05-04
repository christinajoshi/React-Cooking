import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import "../css/App.css";
import RecipeEdit from "./RecipeEdit";

// setting up context
export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {

  const[selectedRecipeID, setSelectedRecipeID]  = useState()  
  // creating state with recipes list (the current state) and setRecipes function (to update the state)
  // the first time useState is called setting sampleRecipes (hardcoded) to recipes and the setRecipes function is used to update the recipes every other time useState is called
  const [recipes, setRecipes] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON == null) {
      return sampleRecipes;
    } else {
      return JSON.parse(recipeJSON);
    }
  });

  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeID)
  console.log(selectedRecipe)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  // object to hold all functions
  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  };

  function handleRecipeSelect(id){
    setSelectedRecipeID(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: Date.now().toString(),
      name: ' ',
      servings: undefined,
      cookTime: "",
      instructions: "",
      ingredients: [
        { id: Date.now().toString(), amount: "", name: "" },
      ],
    };
    setRecipes([...recipes, newRecipe]);
    setSelectedRecipeID(newRecipe.id)
    sampleRecipes = [...recipes, newRecipe];
  }

  // updates the state. takes the id of the recipe that we want to change and the new recipe want to replace it with
  function handleRecipeChange(id, recipe){
    // creating duplicate of array because react does not allow you to change state. will mutate this array and then set the old state to this new array 
    const newRecipes = [...recipes]
    // whichever recipe has the id that was passed in, get the index of it
    const index = newRecipes.findIndex(r => r.id === id)
    // find recipe with that index and set it to the new recipe that we passed in 
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeID != null && selectedRecipeID === id){
      setSelectedRecipeID(undefined)
    }
    // get all of the recipes that do not have that id and set those recipes
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
    sampleRecipes = recipes;
  }

  return (
    // Wrapping everything returning inside of the context. .Provider because providing value created (the object with the two functions in it)
    // if we have a selected recipe && do this: passing recipe down to RecipeEdit. If true, will evaluate everything after the &&. If selectedRecipe is undefined, won't execute
    // this is same thing as doing a ternary: {selectedRecipe ? <RecipeEdit> : null}
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

let sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45",
    instructions: "1. Put salt on chicken\n2. Bake chicken",
    // array of objects
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbsp",
      },
    ],
  },
  {
    id: 2,
    name: "Fish",
    servings: 3,
    cookTime: "25",
    instructions: "1. Put salt on fish\n2. Bake fish",
    ingredients: [
      {
        id: 1,
        name: "Fish",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbsp",
      },
    ],
  },
];

export default App;
