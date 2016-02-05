import React from 'react'
import { render } from 'react-dom'
import Log from './containers/Login'
import Reg from './containers/Registration'
import Router from 'react-router';
import { browserHistory, Link, Route, IndexRoute } from 'react-router';


let Gapp = React.createClass({
    render() {
        return (
            <div className="nav">
                <Link to="login">Login</Link>
                <Link to="register">Register</Link>
                {this.props.children}
            </div>
        );
    }
});


render((
    <Router history={browserHistory}>
        <Route path="/" component={Gapp}>
            <IndexRoute component={Log} />
            <Route path="login" component={Log} />
            <Route path="register" component={Reg} />
        </Route>
    </Router>
), document.getElementById('application'));

