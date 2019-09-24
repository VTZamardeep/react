import React, { Component } from "react";
import classes from "./ShowResponse.css";
import Aux from "../../hoc/Aux/Aux";

class ShowResponse extends Component {
    render() {
        console.log(this.props.response);
        let answers = Object.keys(this.props.response.answer).map(value => {
            console.log("hello");
            return <p key={this.props.response.id}>     {value}:   {this.props.response.answer[value]}</p>
        });
        return (
            <Aux>
                <div className={classes.Card}>
                    <label>{this.props.response.id}</label>:<p>{this.props.response.question}</p>

                </div>
                <div className={classes.CardAns}>
                    {answers}
                </div>
            </Aux>


        )
    }
}

export default ShowResponse;