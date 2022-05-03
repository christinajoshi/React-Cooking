import React from 'react'

export default function Ingredient({ name, amount }) {
  return (
      // empty fragment <>  </> , could have also thrown it in a div
    <>
      <span className='ingredient'>{amount}</span>
      <span className='ingredient'>{name}</span>
    </>
  )
}
