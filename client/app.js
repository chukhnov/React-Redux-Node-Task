import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from './auth'

const App = React.createClass({
    getInitialState() {
        return {
            loggedIn: auth.loggedIn()
        }
    },

    updateAuth(loggedIn) {
        this.setState({
            loggedIn: loggedIn
        })
    },

    componentWillMount() {
        auth.onChange = this.updateAuth
        auth.login()
    },

    render() {
        return (
            <div>
                        {this.state.loggedIn ? (
                            <Link to="/logout">Log out</Link>
                        ) : (
                            <Link to="/login">Sign in</Link>
                        )}
                <br />
                        {!this.state.loggedIn ? (
                            <Link to="/register">Register</Link>
                        ) : null}

                {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
            </div>
        )
    }
})

const Dashboard = React.createClass({
    render() {
        const token = auth.getToken()

        return (
            <div>
                <h1>Dashboard</h1>
                <p>You made it!</p>
                <p>{token}</p>
            </div>
        )
    }
})

const Login = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            error: false
        }
    },

    handleSubmit(event) {
        event.preventDefault()

        const user = this.refs.user.value
        const pass = this.refs.pass.value

        auth.login(user, pass, (loggedIn) => {
            if (!loggedIn)
                return this.setState({ error: true })

            const { location } = this.props

            if (location.state && location.state.nextPathname) {
                this.context.router.replace(location.state.nextPathname)
            } else {
                this.context.router.replace('/')
            }
        })
    },

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label><input ref="user" placeholder="username" defaultValue="user" /></label>
                <label><input ref="pass" placeholder="password" /></label><br />
                <button type="submit">login</button>
                {this.state.error && (
                    <p>Bad login information</p>
                )}
            </form>
        )
    }
})

const Register = React.createClass({
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label><input ref="user" placeholder="username" defaultValue="user" /></label>
                <label><input ref="pass" placeholder="password" /></label><br />
                <button type="submit">login</button>
            </form>
        )
    }
})

const Logout = React.createClass({
    componentDidMount() {
        auth.logout()
    },

    render() {
        return <p>You are now logged out</p>
    }
})

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="login" component={Login} />
            <Route path="logout" component={Logout} />
            <Route path="register" component={Register} />
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
        </Route>
    </Router>
), document.getElementById("application"));
