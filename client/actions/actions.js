import  {REGISTER_FAILED, REGISTER_SUCCESSFULLY} from './../constants/RegisterActionTypes'
import {browserHistory} from 'react-router'


export function loginError(error) {
    return {error, type: REGISTER_FAILED};
}

export function loginSuccess(response) {
    return dispatch => {
        dispatch({response, type: REGISTER_SUCCESSFULLY});
        console.log('REGISTER SUCCESSFULLY');
        browserHistory.push('/dashboard');
    };
}

export function register(userData) {
    function parseJSON(res) {
        return res.json()
    }

    return dispatch =>
        fetch('/api/1/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(parseJSON)
            .then(function (data) {
                if (data.username) {
                    console.log("Ok");
                    dispatch(loginSuccess(data));
                } else {
                    dispatch(loginError(error));
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
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(parseJSON)
            .then(function (data) {
                if (data.username) {
                    console.log("Ok");
                    dispatch(loginSuccess(data));
                } else {
                    dispatch(loginError(error));
                    throw error;
                }
            })
            .catch(error => {
                console.log('request failed', error);
            });
}
