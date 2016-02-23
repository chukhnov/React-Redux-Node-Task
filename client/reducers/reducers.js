import moment from 'moment'
import  {
    REGISTER_FAILED, REGISTER_SUCCESSFULLY,
    LOGIN_FAILED, LOGIN_SUCCESSFULLY, USER_DATA,
    LOGOUT, SPINER, ADMIN, SAVE_USERS_LIST, USERS_SELECTED,
    FALSE_USERS, REMOVE_CURRENT_DAY, ADD_CURRENT_DAY,
    CREATE_CALENDAR, TRUE_CALENDAR_DAY, CREATE_CALENDAR_PLUS_WEEK,
    CREATE_CALENDAR_MINUS_WEEK
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
    currentDay: undefined,
    calendar: {},
    copyCalendar: undefined,
    startWeek: 7,
    minusWeek: 7
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
                key == localStorage.getItem('momentDate') ? newCalendar[key] = {status: true} :
                    key !== localStorage.getItem('momentDate') ? newCalendar[key] = {status: false} : null
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
        case CREATE_CALENDAR_PLUS_WEEK:

            let calendarPlus = {};
            let beginCalendarPlus = moment().startOf('week').add(state.startWeek, 'day');
            let endOfWeekCalendarPlus = moment().endOf('week').add(state.startWeek + 1, 'day');

            while (!endOfWeekCalendarPlus.isSame(beginCalendarPlus, 'day')) {
                calendarPlus[beginCalendarPlus.format('l')] = {
                    status: false
                };
                beginCalendarPlus.add(1, 'day')
            }
            let startDays = state.startWeek + 7;
            let minusDays = state.minusWeek - 7;
            return Object.assign(state, {
                calendar: calendarPlus,
                startWeek: startDays,
                minusWeek: minusDays
            });
        case CREATE_CALENDAR_MINUS_WEEK:

            let calendarMinus = {};
            let beginCalendarMinus = moment().startOf('week').subtract(state.minusWeek, 'day');
            let endOfWeekCalendarMinus = moment().endOf('week').subtract(state.minusWeek - 1 , 'day');

            while (!endOfWeekCalendarMinus.isSame(beginCalendarMinus, 'day')) {
                calendarMinus[beginCalendarMinus.format('l')] = {
                    status: false
                };
                beginCalendarMinus.add(1, 'day')
            }
            let startDaysMinus = state.startWeek - 7;
            let daysMinus = state.minusWeek + 7;
            return Object.assign(state, {
                calendar: calendarMinus,
                startWeek: startDaysMinus,
                minusWeek: daysMinus
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