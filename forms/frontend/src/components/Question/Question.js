import React ,{Component}from "react";
import classes from "./Question.css" 
class Question extends Component{
    render(){
        return(
            <div className={classes.Card}>
                 <p classes={classes.QuizPanelTopText}>{this.props.question}</p>
            </div>
           
        )
    }
}

export default Question;