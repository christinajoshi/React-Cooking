import React from "react";
import Recipe from "./Recipe";

// 'RecipeList recipes' props is getting passed in from App \
export default function RecipeList( props ) {
  const {
    recipes,
    handleRecipeAdd,
    handleRecipeDelete
  } = props
  return (
    // loop through recipe array. map() calls a function once for each element in an array inside the JSX, but can do it outside like in IngredientsList
    // JSX expression must have one parent element => can only return one element (can all be in one div) OR inside of a fragment <> </>
    <div className="recipe-list">
      <div>
        {recipes.map(recipe => {
          // return a recipe. using spread operator takes all the key value pairs and put them as individual attribute on recipe
          // allows us to pass down all our properties as top level of the prop instead of  being nested inside the recipe itself
          return (
            <Recipe 
                        key={recipe.id} 
                        handleRecipeDelete = {handleRecipeDelete}
                        {...recipe} 
                    />      
          )
        })}
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <button 
            className="btn btn--primary" 
            onClick={handleRecipeAdd}
        >Add Recipe
        </button>
      </div>
    </div>
  );
}

// Warning: each child in a list should have a unique "key" prop. So, added a key.
// React uses keys to know what different parts of the array it needs
// to re-render. So, for example if recipe id: 1 changes, but recipe id: 2 does not change, it will only re-render the recipe with
// id: 1
// ANYTIME you return an array of results you need to make sure you add a key to each one of the values in the array that
// you are returning
