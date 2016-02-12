import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {browserHistory} from 'react-router'


export default class LoginUser extends Component {

    render() {
        const center = {
            textAlign: 'center'
        };
        return (
            <form style={center}>
                <div>
                    <label>Username:</label>
                    <input type='text' ref='username' defaultValue="333"/>
                    <br/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type='text' ref='password' defaultValue="333"/>
                    <br/>
                </div>
                <div>
                    <button onClick={(e) => this.handleClick(e)} >
                        Login
                    </button>
                </div>
                <Link to="register">Register</Link>
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
        this.props.onLoginClick(obj);
        username.value = '';
        password.value = '';

    }
}

LoginUser.propTypes = {
    onLoginClick: PropTypes.func.isRequired
};