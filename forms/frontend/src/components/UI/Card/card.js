import React ,{Component } from "react";
import classes from "./card.css"

class Card extends Component{
    render(){
        return (
            <div className={classes.CardAns}>{this.props.children}</div>
        )
    }
}

export default Card;