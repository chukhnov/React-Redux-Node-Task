import  {
    REGISTER_FAILED, REGISTER_SUCCESSFULLY,
    LOGIN_FAILED, LOGIN_SUCCESSFULLY, USER_DATA, LOGOUT, SPINER, ADMIN, SAVE_USERS_LIST
} from './../constants/RegisterActionTypes'

const initialState = {
    userData: {
        username: undefined,
        id: null
    },
    isLoggedIn: false,
    error: null,
    days: [],
    spiner: false,
    admin: false,
    users: []
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case REGISTER_FAILED:
            return Object.assign(state, {
                error: action.error,
                isLoggedIn: false
            });
        case SPINER:
            return Object.assign(state, {
                spiner: action.response
            });
        case SAVE_USERS_LIST:
            return Object.assign(state, {
                users: action.response
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
        case ADMIN:
            return Object.assign(state, {
                admin: action.response
            });
        case USER_DATA:
            return Object.assign(state, {
                days: action.response,
                spiner: false
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