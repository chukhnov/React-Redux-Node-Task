import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'


export default class RegisterUser extends Component {
    render() {
        const center = {
        textAlign: 'center'
    };
        return (
            <form style={center}>
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
                    <button onClick={(e) => this.handleClick(e)}>
                        Register
                    </button>
                </div>
                <Link to="login">Login</Link>
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

    }
}

RegisterUser.propTypes = {
    onRegisterClick: PropTypes.func.isRequired
};