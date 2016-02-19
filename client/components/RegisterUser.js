import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import { Button, Input } from 'react-bootstrap';


export default class RegisterUser extends Component {


    render() {
        const styles = {
            wellStyles: {
                maxWidth: 400, margin: '0 auto 10px', textAlign: 'center'
            },
            texts: {
                fontSize: '20px'
            },
            textArea: {
                marginTop: '12px',
                height: '35px',
                textAlign: 'center'
            }
        };


        return (
            <form className="well" style={styles.wellStyles}>
                <span style={styles.texts}>Please Sign Up, or&nbsp;
                    <Link to="login">Log In</Link>
                </span>
                <div>
                    <input style={styles.textArea} type='text' ref='username' />
                </div>
                <div>
                    <input style={styles.textArea} type='text' ref='password' />
                </div>
                <div>
                    <br/>
                    <Button type="submit" bsStyle="primary" bsSize="small" onClick={(e) => this.handleClick(e)}>
                        Register
                    </Button>
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

    }
}

RegisterUser.propTypes = {
    onRegisterClick: PropTypes.func.isRequired
};