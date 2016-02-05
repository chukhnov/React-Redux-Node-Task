import React, { Component } from 'react'
import { login } from './../actions/actions'
import RegisterUser from './../components/RegisterUser'
import { store } from './../store/store'


class Reg extends Component {

    render() {
        return (
            <div>
                <RegisterUser
                    onRegisterClick={data =>
                    store.dispatch(login(data))}/>
            </div>
        )
    }
}

export default Reg
