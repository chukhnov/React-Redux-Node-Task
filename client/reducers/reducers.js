import  {REGISTER_FAILED, REGISTER_SUCCESSFULLY,LOGIN_FAILED, LOGIN_SUCCESSFULLY, LOGOUT} from './../constants/RegisterActionTypes'

const initialState = {
    userData: {
        username: undefined,
        admin: false,
        days: []
    },
    isLoggedIn: false,
    error: null
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