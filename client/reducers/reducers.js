import  {
    REGISTER_FAILED, REGISTER_SUCCESSFULLY,
    LOGIN_FAILED, LOGIN_SUCCESSFULLY, USER_DATA,
    LOGOUT, SPINER, ADMIN, SAVE_USERS_LIST, USERS_SELECTED
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
    users: [],
    usersSelected: [],
    usersTrue: [],
    adminActiveDay: false
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
        case USERS_SELECTED:
            let arr = [];
            Object.keys(state.users).map((key) => (
                Object.keys(state.users[key].days).map((i) => (
                    state.users[key].days[i] == action.response ? arr.push(state.users[key]) : null
                ))
            ));
            let trueUsers = Object.assign({}, arr, state.users);
            return Object.assign(state, {
                usersSelected: arr,
                usersTrue: trueUsers,
                adminActiveDay: true
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