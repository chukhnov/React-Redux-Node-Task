import React, { Component, PropTypes } from 'react'
import { exit, dataLoad, dataUpdate, usersLoad, selectedUsers } from './../actions/actions'
import AdminPanel from './../components/AdminPanel'
import { store } from './../store/store'


class Admin extends Component {
    render() {
        return (
            <div>
                <AdminPanel
                    onLogoutClick={data =>
                    store.dispatch(exit())}

                    dataLoad={data =>
                    store.dispatch(dataLoad())}

                    dataUpdate={data =>
                    store.dispatch(dataUpdate(data))}

                    userList={data =>
                    store.dispatch(usersLoad())}

                    usersSelected={data =>
                    store.dispatch(selectedUsers(data))}/>
            </div>
        )
    }
}

export default Admin