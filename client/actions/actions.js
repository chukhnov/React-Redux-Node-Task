import  {
    REGISTER_FAILED, REGISTER_SUCCESSFULLY,
    LOGIN_FAILED, LOGIN_SUCCESSFULLY, USER_DATA,
    LOGOUT, SPINER, ADMIN, SAVE_USERS_LIST,
    USERS_SELECTED, FALSE_USERS,
    REMOVE_CURRENT_DAY, ADD_CURRENT_DAY,
    CREATE_CALENDAR, TRUE_CALENDAR_DAY, CREATE_CALENDAR_PLUS_WEEK,
    CREATE_CALENDAR_MINUS_WEEK
} from './../constants/RegisterActionTypes'
import {browserHistory} from 'react-router'


export function userData(response) {
    return dispatch => {
        dispatch({response, type: USER_DATA});
    };
}

export function createCalendar() {
    return dispatch => {
        dispatch({type: CREATE_CALENDAR});
    };
}

export function createCalendarPlusWeek() {
    return dispatch => {
        dispatch({type: CREATE_CALENDAR_PLUS_WEEK});
    };
}

export function createCalendarMinusWeek() {
    return dispatch => {
        dispatch({type: CREATE_CALENDAR_MINUS_WEEK});
    };
}

export function falseUsers() {
    return dispatch => {
        dispatch({type: FALSE_USERS});
    };
}

export function removeCurrentDay(response) {
    return dispatch => {
        dispatch({response, type: REMOVE_CURRENT_DAY});
    };
}

export function addCurrentDay(response) {
    return dispatch => {
        dispatch({response, type: ADD_CURRENT_DAY});
    };
}

export function trueCalendarDay(response) {
    return dispatch => {
        dispatch({response, type: TRUE_CALENDAR_DAY});
    };
}

export function selectedUsers(response) {
    return dispatch => {
        dispatch({response, type: USERS_SELECTED});
    };
}

export function saveUsersList(response) {
    return dispatch => {
        dispatch({response, type: SAVE_USERS_LIST});
    };
}

export function spinerOn(response) {
    return dispatch => {
        dispatch({response, type: SPINER});
    };
}

export function loginError(error) {
    return {error, type: LOGIN_FAILED};
}

export function loginSuccess(response) {
    return dispatch => {
        dispatch({response, type: LOGIN_SUCCESSFULLY});
        console.log('LOGIN SUCCESSFULLY');
        browserHistory.push('/dashboard');
    };
}

export function adminLogin(response) {
    return dispatch => {
        dispatch({response, type: ADMIN});
        console.log('LOGIN SUCCESSFULLY');
        browserHistory.push('/admin');
    };
}

export function registerError(error) {
    return {error, type: REGISTER_FAILED};
}

export function registerSuccess(response) {
    return dispatch => {
        dispatch({response, type: REGISTER_SUCCESSFULLY});
        console.log('REGISTER SUCCESSFULLY');
        browserHistory.push('/login');
    };
}

export function logout() {
    return dispatch => {
        dispatch({type: LOGOUT});
        console.log('SUCCESSFUL LOGOUT');
        browserHistory.push('/');
    };
}




export function register(userData) {
    function parseJSON(res) {
        return res.json()
    }
    return dispatch =>
        fetch('/api/1/register', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(parseJSON)
            .then(function (data) {
                if (data.username) {
                    dispatch(registerSuccess(data.username));
                } else {
                    dispatch(registerError(error));
                    throw error;
                }
            })
            .catch(error => {
                console.log('request failed', error);
            });
}



export function login(userData) {
    function parseJSON(res) {
        return res.json()
    }
    return dispatch =>
        fetch('/api/1/login', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(parseJSON)
            .then(function (data) {
                if (data.admin) {
                    localStorage.setItem('user', data._id);
                    localStorage.setItem('admin', data.admin);
                    dispatch(adminLogin(data.admin));
                }
                else {
                    if (data.username) {
                        localStorage.setItem('user', data._id);
                        if (localStorage.getItem('user') == data._id) {
                            dispatch(loginSuccess(data.username));
                        }
                    } else
                    {
                        dispatch(loginError(error));
                        throw error;
                    }
                }
            })
            .catch(error => {
                console.log('request failed', error);
            });
}


export function exit() {
    function parseJSON(response) {
        return response.json()
    }

    return dispatch =>
        fetch('/api/1/logout', {
            method: "GET",
            credentials: 'same-origin'
        })
            .then(parseJSON)
            .then(function (data) {
                if (data.ok) {
                    localStorage.setItem('admin', false);
                    localStorage.setItem('user', null);
                    dispatch(logout());

                }
            }).catch(function (error) {
            console.log('request failed', error)
        })
}


export function dataLoad() {
    function parseJSON(response) {
        return response.json()
    }

    return dispatch =>
        fetch('/api/1/orders', {
            method: "GET",
            credentials: 'same-origin'
        })
            .then(parseJSON)
            .then(function (data) {
                if (data.ok) {
                    dispatch(userData(data.data));
                }
                else {
                    browserHistory.push('/login')
                }
            }).catch(function (error) {
            console.log('request failed', error)
        })
}


export function dataUpdate(userData) {
    return dispatch =>
        fetch('/api/1/update', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
}


export function updateUser(userData) {
    return dispatch =>
        fetch('/api/1/updateUser', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
}


export function userDeleteDay(userData) {
    return dispatch =>
        fetch('/api/1/deleteDay', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
}


export function usersLoad() {
    function parseJSON(response) {
        return response.json()
    }

    return dispatch =>
        fetch('/api/1/usersList', {
            method: "GET",
            credentials: 'same-origin'
        })
            .then(parseJSON)
            .then(function (data) {
                dispatch(saveUsersList(data));
            }).catch(function (error) {
            console.log('request failed', error)
        })
}