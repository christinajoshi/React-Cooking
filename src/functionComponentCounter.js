/* creating function component to create counter. function components do not have state, have to use the useState hook
    how hooks save state: they rely on you calling the hooks (the useState calls) in the exact same order every single time (in every component render) and they rely on them being in the very top leve
    of your function.. you cannot put your hook inside an if statement, loops or functions... and that's how React keeps track of which state is which.
    hooks save your state globally
    functions do not have this.props, but does get props passed in
    when have simple props, can use object deconstruction to make props easier to read and instead of passing in props and referencing props.whatever
    you can just pass in {initialCount} and reference initialCount */

import React, { useState, useContext } from "react";
import { ThemeContext } from './App'

export default function CounterHooks({ initialCount }) {
  /* two ways: 
     1. state is returned as an array, so have to deconstruct it. the first value is the state and the second is a function to set that state
         useState parameter is the default state/first time it's called. And every other time it returns the current state
     2. can pass in just a number to useState instead of an object, which is what is happening below
     Note: can use multiple calls to useState to set multiple */
     console.log('Render function component')
  const [count, setCount] = useState(initialCount );
  const btnStyle = useContext(ThemeContext)
  return (
    <div>
      <button style ={btnStyle} onClick={() => setCount(prevCount => prevCount - 1 )}>-</button>
      <span>{count}</span>
      <button style ={btnStyle} onClick={() => setCount(prevCount => prevCount + 1 )}>+</button>
    </div>
  );
}

// without object deconstruction
/* export default function CounterHooks(props) {
    return (
        <div>
          <button>-</button>
          <span>{props.initialCount}</span>
          <button>+</button>
        </div>
      )
} */
