import React, { Component, PropTypes } from 'react'
import { addUser } from './../actions/actions'
import LoginUser from './../components/LoginUser'
import { store } from './../store/store'


class App extends Component {

    render() {
        return (
            <div>
                <LoginUser
                    onRegisterClick={data =>
                    store.dispatch(addUser(data))}/>
            </div>
        )
    }
}

export default App