import React, { Component, PropTypes } from 'react'
import { addUser } from './../actions/actions'
import AddUser from './../components/RegisterUser'
import { store } from './../store/store'

class App extends Component {

    render() {
        return (
            <div>
                <AddUser
                    onRegisterClick={data =>
                    store.dispatch(addUser(data))}/>
            </div>
        )
    }
}

export default App