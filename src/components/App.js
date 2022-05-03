import React, { useState } from "react";
import RecipeList from './RecipeList'
import '../css/App.css'

function App() {
  // creating state with recipes list (the current state) and setRecipes function (to update the state)
  // the first time useState is called setting sampleRecipes (hardcoded) to recipes and the setRecipes function is used to update the recipes every other time useState is called
  const [ recipes, setRecipes ] = useState (sampleRecipes)

  /* create two functions to add recipe and delete recipe. the add and delete button that are causing the state to change are not in this component that 
      holds the state, so need to use props in order to pass down these functions which will be called in some other child component  to take care of 
      handling the actual delete and add. Doing this using the RecipeList. it is taking the handleRecipeAdd and handleRecipeDelete and passing it into
      RecipeList
 */
  // create new Recipe
  function handleRecipeAdd(){
    // TODO: object. security vulnerabilities with the library uuid, so using date for now. nano id might work too import { nanoid } from 'nanoid' nanoid()
    const newRecipe = {
      id: Date.now().toString(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instructions',
      ingredients: [
        { id: Date.now().toString(),  amount: '1 Tbsp', name: 'Name' }
      ]
    }
    // the update method
    // use the spread operator to get the current recipes array (get all of the recipes in it)  and add newRecipe to the very end of that array
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id){
     // get all of the recipes that do not have that id and set those recipes
     setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    // recipes is the props that we're passing in to the RecipeList
    // Creating a RecipeList component. Its props called recipes is passed to the RecipeList.js component
    // passing references to functions and will be calling it in its child (RecipeList)
    <RecipeList 
       recipes={recipes} 
       handleRecipeAdd = {handleRecipeAdd}
       handleRecipeDelete = {handleRecipeDelete}
    />
  )
}



const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instruction: '1. Put salt on chicken\n2. Bake chicken',
    // array of objects
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbsp'
      }
    ]    
  },
  {
    id: 2,
    name: 'Plain Fish',
    servings: 3,
    cookTime: '25',
    instruction: '1. Put salt on fish\n2. Bake fish',
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbsp'
      }
    ]        
  }
]

export default App;
