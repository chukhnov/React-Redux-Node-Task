import React, { Component, PropTypes } from 'react'
import { store } from './../store/store'

export default class LoginUser extends Component {
    render() {
        return (
            <form >
                <div>
                    <label>Username:</label>
                    <input type='text' ref='username'/>
                    <br/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type='text' ref='password'/>
                    <br/>
                </div>
                <div>
                    <button onClick={(e) => this.handleClick(e)} >
                        Login
                    </button>
                </div>
            </form>
        )
    }

    handleClick(e) {
        e.preventDefault();
        const username = this.refs.username;
        const password = this.refs.password;
        const dataUsername = username.value.trim();
        const dataPassword = password.value.trim();
        const obj = {
            username: dataUsername,
            password: dataPassword
        };
        this.props.onRegisterClick(obj);
        username.value = '';
        password.value = '';
        fetch('/api/1/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(parseJSON)
            .then(function(data) {
                console.log('request succeeded with JSON response', data)
            }).catch(function(error) {
            console.log('request failed', error)
        });
        function parseJSON(response) {
            return response.json()
        }
        console.log(store.getState())

    }
}

LoginUser.propTypes = {
    onRegisterClick: PropTypes.func.isRequired
};