import React, { Component } from 'react'
import { register } from './../actions/actions'
import RegisterUser from './../components/RegisterUser'
import { store } from './../store/store'


class Reg extends Component {

    render() {
        return (
            <div>
                <RegisterUser
                    onRegisterClick={data =>
                    store.dispatch(register(data))}/>
            </div>
        )
    }
}

export default Reg
