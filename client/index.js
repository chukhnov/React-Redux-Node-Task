import React from 'react'
import { render } from 'react-dom'
import Log from './containers/Login'
import Reg from './containers/Registration'
import Dash from './containers/Dashboard'
import { Router, Link, Route, IndexRoute, browserHistory } from 'react-router';


let Gapp = React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});


render((
    <Router history={browserHistory} >
        <Route path="/" component={Gapp}>
            <IndexRoute component={Log} />
            <Route path="login" component={Log} />
            <Route path="register" component={Reg} />
            <Route path="dashboard" component={Dash} />
        </Route>
    </Router>
), document.getElementById('application'));

