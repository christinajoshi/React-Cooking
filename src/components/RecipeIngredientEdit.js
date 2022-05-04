import React from 'react'

export default function RecipeIngredientEdit( props ) {
  const {
    ingredient,
    handleIngredientChange,
    handleIngredientDelete
  } = props

function handleChange(changes){
  handleIngredientChange(ingredient.id, { ...ingredient, ...changes })
}

  return (
    <>
      <input 
          type="text" 
          onInput= {(e) => handleChange( { name: e.target.value } )}
          value={ingredient.name}
          className='recipe-edit__input'
      />
      <input 
          type="text" 
          onInput= {(e) => handleChange( { amount: e.target.value } )}
          value={ingredient.amount}
          className='recipe-edit__input'
      />
      <button 
          className='btn btn--danger'
          onClick={() => handleIngredientDelete(ingredient.id)}
      >
        &times;
      </button>
    </>
  )
}
