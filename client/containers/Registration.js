import React, { Component, PropTypes } from 'react'
import { addUser } from './../actions/actions'
import RegisterUser from './../components/RegisterUser'
import { store } from './../store/store'


class Reg extends Component {

    render() {
        return (
            <div>
                <RegisterUser
                    onRegisterClick={data =>
                    store.dispatch(addUser(data))}/>
            </div>
        )
    }
}

export default Reg
