import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

const ElementConfig = {
    username: {
        type: 'text',
        placeholder: 'Your Name',
        name: "username"
    },
    password: {
        type: 'text',
        placeholder: 'Your password',
        name: "password"
    }
}

class Login extends Component {
    state = {
        username: null,
        password: null
    }

    submitHandler = () => {
        this.props.login(this.state.username,this.state.password);
        this.props.history.push('/quiz');
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h4>USERNAME</h4>
                <Input key="username" value={this.state.username} elementConfig={ElementConfig.username} changed={(event) => this.changeHandler(event)} />
                <h4>PASSWORD</h4>
                <Input key="password" value={this.state.password} elementConfig={ElementConfig.password} changed={(event) => this.changeHandler(event)} />
                <Button btnType="Success" clicked={() => this.submitHandler()}>LOGIN</Button>
                <Button btnType="Success" clicked={() => this.props.logout()}>LOGOUT</Button>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.login.userName,
        token: state.login.token
    }
}

const mapsDispatchToprops = dispatch => {
    return {
        login: (username,password) => dispatch(actions.getToken(username,password)),
        logout: () => dispatch(actions.logout()),
    }
}
export default connect(mapStateToProps, mapsDispatchToprops)(Login);