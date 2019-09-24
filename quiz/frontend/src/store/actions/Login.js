import * as actionType from "./actionTypes";
import Axios from "../../axios-orders";

export const login = (username, token) => {
    return {
        type: actionType.LOGIN,
        userName: username,
        token: token
    }
}
export const logout = () => {
    return {
        type: actionType.LOGOUT,
    }
}

export const getToken = (username, password) => {
    console.log(username);
    return dispatch => {
        Axios.get("/login")
            .then(res => {
                dispatch(login(username, res.data.token));
            })
    }
}