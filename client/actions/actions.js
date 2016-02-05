//import { MyAPI } from './../network/MyAPI.js'
import  { REGISTER_ATTEMPT, REGISTER_FAILED, REGISTER_SUCCESSFULLY } from './../constants/RegisterActionTypes'

//export function addUser(user) {
//    return dispatch => {
//        MyAPI.sendData(user)
//            .then(
//            data => dispatch({
//                type: REGISTER_ATTEMPT,
//                data
//            })
//        )
//    }
//}

export function loginError(error) {
    return { error, type: REGISTER_FAILED };
}

export function loginSuccess(response) {
    return dispatch => {
        dispatch({ response, type: REGISTER_SUCCESSFULLY });
    };
}

export function addUser(user) {
    return { user, type: REGISTER_ATTEMPT };
}

export function login(userData) {
    function parseJSON(response) {
        return response.json()
    }
    return dispatch =>
        fetch('/api/1/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(parseJSON)
            .then(function (data) {
                if (data.username) {
                    console.log("Ok");
                    dispatch(loginSuccess(response));
                } else {
                    //const error = new Error(response.statusText);
                    //error.response = response;
                    dispatch(loginError(error));
                    throw error;
                }
            })
            .catch(error => { console.log('request failed', error); });
}
