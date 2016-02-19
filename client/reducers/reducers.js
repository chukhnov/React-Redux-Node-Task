import moment from 'moment'
import  {
    REGISTER_FAILED, REGISTER_SUCCESSFULLY,
    LOGIN_FAILED, LOGIN_SUCCESSFULLY, USER_DATA,
    LOGOUT, SPINER, ADMIN, SAVE_USERS_LIST, USERS_SELECTED,
    FALSE_USERS, REMOVE_CURRENT_DAY, ADD_CURRENT_DAY,
    CREATE_CALENDAR, TRUE_CALENDAR_DAY} from './../constants/RegisterActionTypes'

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
    currentDay: undefined,
    calendar: {}
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case REGISTER_FAILED:
            return Object.assign(state, {
                error: action.error,
                isLoggedIn: false
            });
        case TRUE_CALENDAR_DAY:
            let newCalendar = {};
            Object.assign(newCalendar, state.calendar);
            Object.keys(newCalendar).map((key) => (
            key == state.currentDay ? newCalendar[key] = {status: true } : null
            ));
            return Object.assign(state, {
                calendar: newCalendar
            });
        case CREATE_CALENDAR:
            let calendar = {};
            let begin = moment().startOf('week');
            let endOfWeek = moment().endOf('week').add(1, 'day');

            while (!endOfWeek.isSame(begin, 'day')) {
                calendar[begin.format('l')] = {
                    status: false
                };
                begin.add(1, 'day')
            }
            return Object.assign(state, {
                calendar: calendar
            });
        case REMOVE_CURRENT_DAY:
            let removeUser = {};
            Object.keys(state.usersTrue).map((key) => (
               state.usersTrue[key]._id == action.response.user ? removeUser[key] = state.usersTrue[key] : null
            ));
            Object.keys(removeUser).map((i) => (
                removeUser[i].selected = false
            ));
            let newTrueUsers = Object.assign({}, removeUser, state.usersTrue);
            return Object.assign(state, {
                usersTrue: newTrueUsers
            });
        case ADD_CURRENT_DAY:
            let addUser = {};
            Object.keys(state.usersTrue).map((key) => (
               state.usersTrue[key]._id == action.response.user ? addUser[key] = state.usersTrue[key] : null
            ));
            Object.keys(addUser).map((i) => (
                addUser[i].selected = true
            ));
            let newNewTrueUsers = Object.assign({}, addUser, state.usersTrue);
            return Object.assign(state, {
                usersTrue: newNewTrueUsers
            });
        case FALSE_USERS:
            let falseUsers = {};
            Object.keys(state.users).map((key) => (
                falseUsers[key] = state.users[key]
            ));
            Object.keys(falseUsers).map((i) => (
                falseUsers[i].selected = false
            ));
            return Object.assign(state, {
                users: falseUsers
            });
        case SPINER:
            return Object.assign(state, {
                spiner: action.response
            });
        case USERS_SELECTED:
            let arr = {};
            Object.keys(state.users).map((key) => (
                Object.keys(state.users[key].days).map((i) => (
                    state.users[key].days[i] == action.response ? arr[key] = state.users[key] : null
                ))
            ));
            Object.keys(arr).map((i) => (
                arr[i].selected = true
            ));

            let trueUsers = Object.assign({}, arr, state.users);
            return Object.assign(state, {
                usersTrue: trueUsers,
                currentDay: action.response
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