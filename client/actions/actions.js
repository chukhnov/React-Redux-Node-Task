import  {
    REGISTER_FAILED, REGISTER_SUCCESSFULLY,
    LOGIN_FAILED, LOGIN_SUCCESSFULLY, USER_DATA, LOGOUT
} from './../constants/RegisterActionTypes'
import {browserHistory} from 'react-router'


export function userData(response) {
    return dispatch => {
        dispatch({response, type: USER_DATA});
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
                if (data.username) {
                    localStorage.setItem('user', data._id);
                    console.log(data._id)
                    if (localStorage.getItem('user') == data._id) {
                        dispatch(loginSuccess(data.username));
                    }

                } else {
                    dispatch(loginError(error));
                    throw error;
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
                    dispatch(logout());
                    localStorage.setItem('user', 'String');

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
            }).catch(function (error) {
            console.log('request failed', error)
        })
}

export function dataUpdate(userData) {
    function parseJSON(res) {
        return res.json()
    }

    return dispatch =>
        fetch('/api/1/update', {
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
                if (data.ok) {
                    dispatch(userData(data.data));
                }
            }).catch(function (error) {
            console.log('request failed', error)
        })
}