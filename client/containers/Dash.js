import React, { Component, PropTypes } from 'react'
import { exit } from './../actions/actions'
import Dashboard from './../components/Dashboard'
import { store } from './../store/store'


class Dash extends Component {
    render() {
        return (
            <div>
                <Dashboard
                    onLogoutClick={data =>
                    store.dispatch(exit())}/>
            </div>
        )
    }
}

export default Dash