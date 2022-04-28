import React, { useState } from "react";
import Counter from "./classComponentCounter";
import CounterHooks from "./functionComponentCounter";

/* Context is primarily used when some data needs to be accessible by *many* components at different nesting levels without having to pass props
    down manually. Use sparingly because it makes component reuse more difficult.
    Contexts have a provider and a consumer. Provider is allowing us to pass out a value and the consumer is just consuming that value.
    To use wrap all code want access to into the context.
 */   
export const ThemeContext = React.createContext()

// no longer need import statement? import React from 'react'
// rendering all the application code inside of root
// function can only return one thing. if want to return more, use JSX fragments <> ... </>
function App() {
  console.log('Render App')
  const [theme, setTheme] = useState('pink')
  return (
    // every class component has a property called this.props which contains everything you pass in through the attributes
    // setting props on this component. can use this.props to render it. everything in {} is JavaScript
    // Provider must have attribute called value and an object
    <ThemeContext.Provider value = {{ backgroundColor: theme }}>
        Counter using class component
        <Counter initialCount={0} />
        Counter using function component
        <CounterHooks initialCount={0} />
        <button onClick = {() => setTheme(prevTheme => {
          // anything before ? is true/false statement. If true, blue. If false, pink.
          return prevTheme === 'pink' ? '#C0FFF4': 'pink' 
         })}>Change color of buttons</button>
      </ThemeContext.Provider>
  );
}

export default App;
