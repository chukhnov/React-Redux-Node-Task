import React from 'react'
import { render } from 'react-dom'
import Log from './containers/Login'
import Reg from './containers/Registration'
import Dash from './containers/Dash'
import { Router, Route, IndexRoute, browserHistory} from 'react-router/lib';
import {store} from './store/store'
import { Provider } from 'react-redux';


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
    <Provider store={store}>
    <Router history={browserHistory} >
        <Route path="/" component={Gapp}>
            <IndexRoute component={Log} />
            <Route path="login" component={Log} />
            <Route path="register" component={Reg} />
            <Route path="dashboard" component={Dash} />
        </Route>
    </Router>
        </Provider>
), document.getElementById('application'));

