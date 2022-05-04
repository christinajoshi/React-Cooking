import React from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'

// remember in JSX must close every tag
export default function RecipeEdit() {
  return (
    <div className='recipe-edit'>
        <div className='recipe-edit__remove-button-container'>
            <button className='btn recipe-edit__remove-button'>&times;</button>
        </div>
        <div className='recipe-edit__details-grid'>
            <label htmlFor='name' className='recipe-edit__label'>Name</label> 
            <input type="text" name="name" id="name"  className='recipe-edit__input' />
            <label htmlFor='cookTime' className='recipe-edit__label'>Cook Time</label> 
            <input type="text" name="cookTime" id="cookTime"   />
            <label htmlFor='servings' className='recipe-edit__label'>Servings</label> 
            <input type="number" min="1" name="servings" id="servings"  className='recipe-edit__input'  />
            <label htmlFor='instructions' className='recipe-edit__label'>Instructions</label> 
            <textarea name="instructions" id="instructions"  className='recipe-edit__input' />
        </div>
        <br />
        <label>Ingredients</label>  
        <div>
            <div>Name</div> 
            <div>Amount</div>
            <div></div>
            <RecipeIngredientEdit />
            <RecipeIngredientEdit />
            {/* Ingredient Components */}
        </div>
        <div>
            <button>Add Ingredient</button>
        </div>
    </div>
  )
}
