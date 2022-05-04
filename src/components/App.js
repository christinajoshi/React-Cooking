import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import "../css/App.css";
import RecipeEdit from "./RecipeEdit";

// setting up context
export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
const [recipes, setRecipes] = useState(sampleRecipes)

// this useEffect will be for the load. want to load recipes in from local storage. only want to run this once when application starts, so empty array
useEffect(() => {
  const recipeJSON =  localStorage.getItem(LOCAL_STORAGE_KEY)
  if (recipeJSON != null){
    setRecipes(JSON.parse(recipeJSON))
  } 
}, [ ]
)

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
}, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: Date.now().toString(),
      name: "New",
      servings: 1,
      cookTime: "1:00",
      instructions: "Instructions",
      ingredients: [
        { id: Date.now().toString(), amount: "1 Tbsp", name: "Name" }
      ]
    }
    setRecipes([...recipes, newRecipe])
    sampleRecipes = [...recipes, newRecipe]
  }

  function handleRecipeDelete(id) {
    // get all of the recipes that do not have that id and set those recipes
    setRecipes(recipes.filter(recipe => recipe.id !== id))
    sampleRecipes = recipes
  }

  return (
    // Wrapping everything returning inside of the context. .Provider because providing value created (the object with the two functions in it)
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      <RecipeEdit/>
    </RecipeContext.Provider>
  )
}

let sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45",
    instruction: "1. Put salt on chicken\n2. Bake chicken",
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
      }
    ]
  },
  {
    id: 2,
    name: "Plain Fish",
    servings: 3,
    cookTime: "25",
    instruction: "1. Put salt on fish\n2. Bake fish",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbsp",
      }
    ]
  }
]

export default App;
