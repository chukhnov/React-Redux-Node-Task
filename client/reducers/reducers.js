import  {REGISTER_FAILED, REGISTER_SUCCESSFULLY,
    LOGIN_FAILED, LOGIN_SUCCESSFULLY,USER_DATA, LOGOUT} from './../constants/RegisterActionTypes'

const initialState = {
    userData: {
        username: undefined,
        admin: false,
        id: null
    },
    isLoggedIn: false,
    error: null,
    days: []
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case REGISTER_FAILED:
            return Object.assign(state, {
                error: action.error,
                isLoggedIn: false
            });
        case REGISTER_SUCCESSFULLY:
            return Object.assign(state, {
                userData: {
                    username: action.response
                },
                error: null,
                isLoggedIn: true
            });
        case LOGIN_FAILED:
            return Object.assign(state, {
                error: action.error,
                isLoggedIn: false
            });
        case LOGIN_SUCCESSFULLY:
            return Object.assign(state, {
                userData: {
                    username: action.response
                },
                error: null,
                isLoggedIn: true
            });
        case USER_DATA:
            return Object.assign(state, {
                    days: action.response
            });
        case LOGOUT:
            return Object.assign(state, {
                error: null,
                isLoggedIn: false
            });
            break;
        default:
            return state;
    }
}