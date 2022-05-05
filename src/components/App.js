import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import "../css/App.css";
import RecipeEdit from "./RecipeEdit";
// Router Native is for mobile
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "../pageComponents/AboutPage";
import AboutPageLink from "./AboutPageLink";

// setting up context
export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {
  const [selectedRecipeID, setSelectedRecipeID] = useState();
  /* creating state with recipes list (the current state) and setRecipes function (to update the state)
      the first time useState is called setting sampleRecipes (hardcoded) to recipes and the setRecipes function is used to update the recipes every other time useState is called */

  const [recipes, setRecipes] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON == null) {
      return sampleRecipes;
    } else {
      return JSON.parse(recipeJSON);
    }
  });

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeID
  );
  console.log(selectedRecipe);

  /* useEffect allows us to do a side effect. every time app re-renders this component following is called. what do every time re-render component  
      when you want to actually call this function is determined in second parameter of useEffect. do this by passing in an array which is all the different
      dependencies you want to depend on. 
      if want useEffect to run only as soon as application loads, pass it an empty array. 
      when this array of value changes (any of them) is when the component will re-update itself 
      anytime recipes changes*/
  /* local storage can only support strings, so set to string version of recipes. don't forget to check Application tab and Local Storage to make sure working   */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  // object to hold all functions. since names are the same, can just list once instead of handleRecipeAdd: handleRecipeAdd
  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  function handleRecipeSelect(id) {
    setSelectedRecipeID(id);
  }

  // TODO: object. security vulnerabilities with the library uuid, so using date for now. nano id might work too import { nanoid } from 'nanoid' nanoid()
  function handleRecipeAdd() {
    const newRecipe = {
      id: Date.now().toString(),
      name: " ",
      servings: undefined,
      cookTime: "",
      instructions: "",
      ingredients: [{ id: Date.now().toString(), amount: "", name: "" }],
    };

    // use the spread operator to get the current recipes array (get all of the recipes in it)  and add newRecipe to the very end of that array
    setRecipes([...recipes, newRecipe]);
    setRecipes([...recipes, newRecipe]);
    setSelectedRecipeID(newRecipe.id);
    sampleRecipes = [...recipes, newRecipe];
  }

  // updates the state. takes the id of the recipe that we want to change and the new recipe want to replace it with
  function handleRecipeChange(id, recipe) {
    // creating duplicate of array because react does not allow you to change state. will mutate this array and then set the old state to this new array
    const newRecipes = [...recipes];
    // whichever recipe has the id that was passed in, get the index of it
    const index = newRecipes.findIndex((r) => r.id === id);
    // find recipe with that index and set it to the new recipe that we passed in
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  // get all of the recipes that do not have that id and set those recipes
  function handleRecipeDelete(id) {
    if (selectedRecipeID != null && selectedRecipeID === id) {
      setSelectedRecipeID(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
    sampleRecipes = recipes;
  }

  return (
    /* Wrapping everything returning inside of the context. .Provider because providing value created (the object with the functions in it)
        if we have a selected recipe && do this: passing recipe down to RecipeEdit. If true, will evaluate everything after the &&. If selectedRecipe is undefined, 
        won't execute. This is same thing as doing a ternary: {selectedRecipe ? <RecipeEdit> : null}
        And creating a RecipeList component. Its props called recipes is passed to the component  */
    /* Browser Router aliased as router is used to define multipe routes in an app; allows us to have navigation without the page refreshing. Router
        can have only one child. If want share a link, can only to the starting page  */

    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <RecipeContext.Provider value={recipeContextValue}>
                <RecipeList recipes={recipes} />
                {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
              </RecipeContext.Provider>
            </>
          }
        ></Route>

        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <AboutPageLink />
    </BrowserRouter>
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
