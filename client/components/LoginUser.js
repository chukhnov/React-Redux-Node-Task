import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {browserHistory} from 'react-router'
import {Button} from 'react-bootstrap'


export default class LoginUser extends Component {

    componentWillMount() {
        localStorage.getItem('user') !== 'null' ? browserHistory.push('/dashboard') : null;
        localStorage.getItem('admin') == 'true' ? browserHistory.push('/admin') : null
    }

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
                <span style={styles.texts}>Please Log In, or&nbsp;
                    <Link to="register">Sign Up</Link>
                </span>
                <div>
                    <input style={styles.textArea} type='text' ref='username' defaultValue="admin"/>
                </div>
                <div>
                    <input style={styles.textArea} type='password' ref='password' defaultValue="admin"/>
                </div>
                <div>
                    <br/>
                    <Button type="submit" bsStyle="primary" bsSize="small" onClick={(e) => this.handleClick(e)}>
                        Login
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
        this.props.onLoginClick(obj);
        username.value = '';
        password.value = '';

    }
}

LoginUser.propTypes = {
    onLoginClick: PropTypes.func.isRequired
};