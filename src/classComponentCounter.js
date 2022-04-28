// creating class component to create counter
import React from "react"
import { ThemeContext } from "./App";

// this goes into App.js, then from App to index.js, then from index.js to index.html
class Counter extends React.Component{
    // overriding constructor to set state
    constructor(props){
        super(props); // don't forget semicolon
        // set state variable to a JavaScript object
        this.state = {
            // setting property count to intial value passed in by App.js
            count: props.initialCount
        }
    }

    render() {
        console.log("Render class component")
        return (
            <ThemeContext.Consumer>
                {btnStyle => (
                    <div>
                        <button style={btnStyle} onClick={() => this.changeCount(-1)}>-</button>
                        {/* in order to render JavaScript code in JSX, put in curly braces, like this comment */} 
                        {/*<span>{this.props.initialCount}</span>*/}
                        <span>{this.state.count}</span>
                        <button style={btnStyle} onClick={() => this.changeCount(1)}>+</button>
                    </div>   
                )}
                         
            </ThemeContext.Consumer>
            
          )
    }

    changeCount(amount){
        // setState is asynchronous. use previous state
        this.setState(prevState => {
            return { count: prevState.count + amount }
        })
    }
}
export default Counter 