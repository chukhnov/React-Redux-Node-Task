import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

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