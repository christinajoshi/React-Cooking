import React, { useContext } from "react";
import IngredientList from "./IngredientList";
import { RecipeContext } from "./App";

// below deconstructering in arguments field is a little messy
// export default function Recipe({name, cookTime, servings, instruction}) {
// so, move deconstructering down and creating const and setting equal to props
// don't forget to destructure id out
export default function Recipe(props) {
  const { handleRecipeDelete } = useContext(RecipeContext)
    const {
        id, 
        name,
        cookTime,
        servings,
        instruction,
        ingredients
    } = props
  return (
    <div className="recipe">
      <div className="recipe__header">
        <h3 className="recipe__title">{name}</h3>
        <div>
          <button className="btn btn--primary mr-1">Edit</button>
          <button 
              className='btn btn--danger'
              onClick={() => handleRecipeDelete(id)}
          >
                Delete
          </button>
        </div>
      </div>
      <div className="recipe__row">
          <span className="recipe__label">Cook Time:</span>
          <span className="recipe__value">{cookTime}</span>
      </div>
      <div className="recipe__row">
          <span className="recipe__label">Servings:</span>
          <span className="recipe__value">{servings}</span>
      </div>
      <div className="recipe__row">
          <span className="recipe__label">Instructions:</span>
          <div className="recipe__value recipe__instructions recipe__value--indented">{instruction}</div>
      </div>
      <div className="recipe__row">
          <span className="recipe__label">Ingredients:</span>
          <div className="recipe__value  recipe__value--indented">
              {/* IngredientList component */}
              <IngredientList ingredients = {ingredients} />
           </div>   
      </div>
    </div>
  );
}
