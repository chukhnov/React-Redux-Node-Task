import React, { Component, PropTypes } from 'react'
import { store } from './../store/store'

export default class RegisterUser extends Component {
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
                Register
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
        console.log(store.getState());

        fetch('/api/1/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(parseJSON)
            .then(function(data) {
                console.log(data)
            });
        function parseJSON(response) {
            return response.json()
        }

    }
}

RegisterUser.propTypes = {
    onRegisterClick: PropTypes.func.isRequired
};