import React, { useContext } from 'react'
//import Ingredient from './Ingredient'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './App'

// remember in JSX must close every tag
export default function RecipeEdit( {recipe} ) {
    const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)
    // does all the shared functionality. takes a list of all the changes
    function handleChange(changes){
        // using deconstruction to create new object; taking everything from recipe and then adding everything from changes {the new recipe} . 
        // Again, never want to change props or state in react so, do not do: recipe.name = "New Name"
        handleRecipeChange(recipe.id, { ...recipe, ...changes })
    }

    function handleIngredientChange(id, ingredient){
        const newIngredients = [...recipe.ingredients]
        // finding ingredient with that current id and getting its index
        const index = newIngredients.findIndex(i => i.id === id)
        newIngredients[index] = ingredient
        handleChange({ ingredients: newIngredients  })
    }

    function handleIngredientAdd(){
        const newIngredient = {
            id: Date.now().toString(),
            name: '',
            amount: ''
        }
        // new ingredients object:  copy of the array of the ingredients (all of the current ingredients) and adding new ingredient to the end 
        handleChange({ ingredients: [...recipe.ingredients, newIngredient]})
    }

    function handleIngredientDelete(id){
        handleChange({ 
            ingredients: recipe.ingredients.filter(i =>i.id !== id )})
    }
    // TODO: change onInput to onChange and verify it still works
    return (
    <div className='recipe-edit'>
        <div className='recipe-edit__remove-button-container'>
            <button 
                className='btn recipe-edit__remove-button'
                onClick={() => handleRecipeSelect(undefined)} 
             >
                &times;
            </button>
        </div>
        <div className='recipe-edit__details-grid'>
            <label 
                htmlFor='name' 
                className='recipe-edit__label'>
                Name
            </label> 
            <input 
                type="text" 
                name="name" 
                value= {recipe.name} 
                onInput= { event => handleChange( { name: event.target.value } )}
                id="name"  
                className='recipe-edit__input' />
            <label 
                htmlFor='cookTime' 
                className='recipe-edit__label'>
                Cook Time
            </label> 
            <input 
                type="text" 
                name="cookTime" 
                value={recipe.cookTime}
                onInput= { event => handleChange( { cookTime: event.target.value } )}
                id="cookTime"  
                className='recipe-edit__input' />
            <label 
                htmlFor='servings' 
                className='recipe-edit__label'
            >
                Servings
            </label> 
            <input 
                type="number" 
                min="1" 
                name="servings" 
                value={recipe.servings}
                onInput= { event => handleChange( { servings: parseInt(event.target.value) || ' ' } )}
                id="servings"  
                className='recipe-edit__input'  />
            <label  
                htmlFor='instructions' 
                className='recipe-edit__label'>
                Instructions
            </label> 
            <textarea 
                name="instructions"  
                value= {recipe.instructions}    
                className='recipe-edit__input'
                onInput= { event => handleChange( { instructions: event.target.value } )}
                id="instructions" >
            </textarea>       
        </div>
        <br />
        <label className='recipe-edit__label'>Ingredients</label>  
        <div className='recipe-edit__ingredient-grid'>
            <div>Name</div> 
            <div>Amount</div>
            <div></div>
            {/* Ingredient Components. loop through all the recipe ingredients and for each one of the ingredients want to run code => return a RecipeIngredientEdit
                 and again for any array returned in React, need a unique key, so know not to re-render the entire array every single time and then pass in the ingredient */}
            {recipe.ingredients.map(ingredient =>(
                <RecipeIngredientEdit 
                    key={ingredient.id}
                    handleIngredientChange={handleIngredientChange}
                    handleIngredientDelete={handleIngredientDelete}
                    ingredient={ingredient}
                />
            ))}
        </div>
        <div className='recipe-edit__add-ingredient-btn-container'>
            <button 
                className='btn btn--primary'
                onClick={ () => handleIngredientAdd()}
            >
                Add Ingredient
            </button>
        </div>
    </div>
  )
}
