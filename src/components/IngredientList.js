import React from "react";
import Ingredient from "./Ingredient";

// this is going to take a list of ingredients
export default function IngredientList({ ingredients }) {
  // each of the ingredients has a key and using spread operator to pass down all the different props for each ingredient
  const ingredientElements = ingredients.map((ingredient) => {
    return <Ingredient key={ingredient.id} {...ingredient} />;
  });
  return (
    <div className="ingredient-grid">
        {/*  take ingredientElements which is the list of ingredients. just broke it outside of the jsx*/}
        {ingredientElements}
    </div>
  );
}
