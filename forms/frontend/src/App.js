import React, { Component } from 'react';
import QuizPanel from "./containers/QuizPanel/QuizPanel";
import classes from "./App.css"


class App extends Component {
  render () {
    return (
      <div className={classes.quesOuter}>
       <QuizPanel/>
      </div>
    );
  }
}

export default App;
