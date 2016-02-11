import React, { Component, PropTypes } from 'react'
import { exit, dataLoad, dataUpdate } from './../actions/actions'
import Dashboard from './../components/Dashboard'
import { store } from './../store/store'


class Dash extends Component {
    render() {
        return (
            <div>
                <Dashboard
                    onLogoutClick={data =>
                    store.dispatch(exit())}
                    dataLoad={data =>
                    store.dispatch(dataLoad())}
                    dataUpdate={data =>
                    store.dispatch(dataUpdate(data))}/>
            </div>
        )
    }
}

export default Dash