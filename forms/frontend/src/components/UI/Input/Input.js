import React, { Component } from 'react';

import classes from './Input.css';

/**this class responsible for creating dynamic form elements with all the configs and default values
 * it supports select list,textfield with both number and simple time ,radio,checkbox with functionality of select and unselect
 */
class Input extends Component {

    render() {
        let inputElement = null;
        const inputClasses = [classes.InputElement];
        if (this.props.invalid && this.props.shouldValidate && this.props.touched) {
            inputClasses.push(classes.Invalid);
        }
    
        switch (this.props.elementType) {
            case ('text'):
                inputElement = <input
                    className={inputClasses.join(' ')}
                    {...this.props.elementConfig}
                    value={this.props.answer[this.props.elementConfig.name] !== "null" ? this.props.answer[this.props.elementConfig.name] : ""}
                    onChange={(event) => this.props.change(event)} />
                break;
            case ('textarea'):
                inputElement = <textarea
                    className={inputClasses.join(' ')}
                    {...this.props.elementConfig}
                    value={this.props.answer[this.props.elementConfig.name] !== "null" ? this.props.answer[this.props.elementConfig.name] : ""}
                    onChange={(event) => this.props.change(event)}  />
                break;
            case ('select'):
                inputElement = (
                    <select
                        className={inputClasses.join(' ')}
                        value={this.props.value}
                        onChange={this.props.changed}>
                        {this.props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                );
                break;
            case ('radio'):
                inputElement = (
                    <div>
                        {Object.keys(this.props.elementConfig).map(config => {
                            return <div key={this.props.elementConfig[config].value}>
                                <input type="radio"
                                    {...this.props.elementConfig[config]}
                                    onChange={(event) => this.props.change(event)}
                                    checked={this.props.answer[this.props.elementConfig[config].name] === this.props.elementConfig[config].value ? true : false}
                                />{config} <br />
                            </div>
                        })}
                    </div>
                );
                break;
            case ('checkbox'):
                inputElement = (
                    <div>
                        {Object.keys(this.props.elementConfig).map(config => {
                            let checkboxValue=this.props.elementConfig[config].value;
                            //looping through to get the value from array to make decision whether checkbox was selected or not
                            function check(answer){
                                return  answer===checkboxValue
                            }
                            return <div key={config}>
                                <input type="checkbox"
                                    {...this.props.elementConfig[config]}
                                    checked={this.props.answer[this.props.elementConfig[config].name].find(check) ? true : false}
                                    onChange={(event) => this.props.change(event,this.props.elementType)}
                                />{config} <br />
                            </div>
                        })}
                    </div>
                );
                break;
            default:
                inputElement = <input type={this.props.elementType}
                    className={inputClasses.join(' ')}
                    {...this.props.elementConfig}
                    value={this.props.answer[this.props.elementConfig.name] !== "null" ? this.props.answer[this.props.elementConfig.name] : ""}
                    onChange={(event) => this.props.change(event)} />
        }
        return (
            <div className={classes.Input}>
                <label className={classes.Label}>{this.props.label}</label>
                {inputElement}
            </div>
        );

    }

};

export default Input;