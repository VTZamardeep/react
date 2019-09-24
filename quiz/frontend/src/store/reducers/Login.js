import { LOGIN, LOGOUT } from "../actions/actionTypes";

const initialState = {
    userName: null,
    token: null
};

const Login = (oldState, action) => {
    return {
        ...oldState,
        userName: action.userName,
        token: action.token
    }
}

const Logout = (oldState, action) => {
    return {
        ...oldState,
        userName: null,
        token: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: return Login(state, action);
        case LOGOUT: return Logout(state, action);
        default: return state;

    }
}

export default reducer;