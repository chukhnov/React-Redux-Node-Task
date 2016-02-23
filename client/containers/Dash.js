import React, {Component, PropTypes} from 'react'
import {
    exit, dataLoad, dataUpdate, spinerOn, usersLoad,
    updateUser, userDeleteDay, createCalendar, createCalendarPlusWeek,
    createCalendarMinusWeek
} from './../actions/actions'
import Dashboard from './../components/Dashboard'
import {store} from './../store/store'


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
                    store.dispatch(dataUpdate(data))}

                    createCalendar={data =>
                    store.dispatch(createCalendar())}

                    createCalendarPlusWeek={data =>
                    store.dispatch(createCalendarPlusWeek())}

                    createCalendarMinusWeek={data =>
                    store.dispatch(createCalendarMinusWeek())}

                    spi={data =>
                    store.dispatch(spinerOn(data))}

                    userList={data =>
                    store.dispatch(usersLoad())}

                    userUpdate={data =>
                    store.dispatch(updateUser(data))}

                    userDayDelete={data =>
                    store.dispatch(userDeleteDay(data))}/>
            </div>
        )
    }
}

export default Dash