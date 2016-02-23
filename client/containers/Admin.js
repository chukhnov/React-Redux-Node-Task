import React, { Component, PropTypes } from 'react'
import { exit, dataUpdate, usersLoad,
    selectedUsers, updateUser,
    userDeleteDay, falseUsers,
    removeCurrentDay, addCurrentDay,
    createCalendar, trueCalendarDay, createCalendarPlusWeek,
    createCalendarMinusWeek } from './../actions/actions'
import AdminPanel from './../components/AdminPanel'
import { store } from './../store/store'


class Admin extends Component {
    render() {
        return (
            <div>
                <AdminPanel
                    onLogoutClick={data =>
                    store.dispatch(exit())}

                    createCalendar={data =>
                    store.dispatch(createCalendar())}

                    createCalendarPlusWeek={data =>
                    store.dispatch(createCalendarPlusWeek())}

                    createCalendarMinusWeek={data =>
                    store.dispatch(createCalendarMinusWeek())}

                    trueCalendarDay={data =>
                    store.dispatch(trueCalendarDay())}

                    removeCurrentDay={data =>
                    store.dispatch(removeCurrentDay(data))}

                    addCurrentDay={data =>
                    store.dispatch(addCurrentDay(data))}

                    falseUsers={data =>
                    store.dispatch(falseUsers())}

                    userDayDelete={data =>
                    store.dispatch(userDeleteDay(data))}

                    dataUpdate={data =>
                    store.dispatch(dataUpdate(data))}

                    userUpdate={data =>
                    store.dispatch(updateUser(data))}

                    userList={data =>
                    store.dispatch(usersLoad())}

                    usersSelected={data =>
                    store.dispatch(selectedUsers(data))}/>
            </div>
        )
    }
}

export default Admin