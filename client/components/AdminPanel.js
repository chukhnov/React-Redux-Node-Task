import React, {Component, PropTypes} from 'react'
import {store} from './../store/store'
import {connect} from 'react-redux'
import moment from 'moment'
import {browserHistory} from 'react-router'
import {Button} from 'react-bootstrap';

export  default class AdminPanel extends Component {

    componentWillMount() {
        localStorage.getItem('admin') == 'false' ? browserHistory.push('/login') :
            localStorage.getItem('admin') == 'true' ? null : null;
        this.props.userList();
        this.props.createCalendar();


    }

    render() {

        let selectedUsers = this.props.usersTrue;
        let calend = this.props.calendar;

        const styles = {
            activeStyle: {
                background: 'grey'
            },
            unActiveStyle: {
                background: 'white'
            },
            center: {
                textAlign: 'center'
            },
            width: {
                width: '85%',
                margin: '5%'
            },
            left: {
                position: 'absolute',
                left: '30%'
            },
            right: {
                position: 'absolute',
                left: '60%'
            },
            all: {
                width: '115px',
                height: '35px',
                fontSize: '25px'
            }
        };

        return (
            <div style={styles.center}>
                <div>
                    <br></br>
                    <Button bsSize="small" bsStyle="primary" onClick={(e) => {this.onLogoutClick(e)}}>
                        Logout
                    </Button>
                </div>
                <table className="table" style={styles.width}>
                    <tbody>
                        <tr>
                            {Object.keys(calend).map((el, index) => (
                                <td key={index}>
                                    <Button bsSize="xsmall" className={JSON.stringify(calend[el].status) == "true" ?
                                     'active' : JSON.stringify(calend[el].status) == "false" ? null : null} >
                                        <div style={styles.all} onClick={(e) => {this.itemClick(e)}}
                                             value={{el}}>{el}</div>
                                    </Button>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <div style={styles.left}>
                    {Object.keys(selectedUsers).map((key, index) => (
                        selectedUsers[key].selected ?
                            <p key={index} style={styles}>
                                <Button bsSize="xsmall" bsStyle="danger" value={selectedUsers[key]._id}
                                        onClick={(e) => {this.deleteCurrentDay(e)}}>
                                    Delete current day
                                </Button>&nbsp;&nbsp;
                                {selectedUsers[key].selected ? <span>{selectedUsers[key].username} </span> : null }
                            </p> : null  ))}
                </div>
                <div style={styles.right}>
                    {Object.keys(selectedUsers).map((key, index) => (
                        !selectedUsers[key].selected && !selectedUsers[key].admin ?
                            <p key={index} style={styles}>
                                <Button bsSize="xsmall" bsStyle="success" value={selectedUsers[key]._id}
                                        onClick={(e) => {this.addCurrentDay(e)}}>
                                    Add current day
                                </Button>&nbsp;&nbsp;
                                <span>{selectedUsers[key].username} </span>
                            </p> : null  ))}
                </div>
            </div>
        )

    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.onLogoutClick();
    }

    addCurrentDay(event) {
        var obj = {
            date: this.props.currentDay,
            status: true,
            user: event.target.value
        };
        this.props.dataUpdate(obj);
        this.props.userUpdate(obj);
        this.props.addCurrentDay(obj);
        this.props.userList();


    }

    deleteCurrentDay(event) {
        var obj = {
            date: this.props.currentDay,
            status: false,
            user: event.target.value
        };

        this.props.dataUpdate(obj);
        this.props.userDayDelete(obj);
        this.props.removeCurrentDay(obj);
        this.props.userList();


    }

    itemClick(event) {
        this.props.falseUsers();
        const momentDate = event.target.value.el;
        localStorage.setItem('momentDate', momentDate);
        this.props.usersSelected(momentDate);
        this.props.userList();
        this.props.createCalendar();
        this.props.trueCalendarDay();
    }

}

AdminPanel.propTypes = {
    dataUpdate: PropTypes.func.isRequired,
    userUpdate: PropTypes.func.isRequired,
    createCalendar: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    usersSelected: PropTypes.func.isRequired,
    userDayDelete: PropTypes.func.isRequired,
    userList: PropTypes.func.isRequired,
    falseUsers: PropTypes.func.isRequired,
    removeCurrentDay: PropTypes.func.isRequired,
    addCurrentDay: PropTypes.func.isRequired,
    trueCalendarDay: PropTypes.func.isRequired

};

function mapStateToProps(state) {
    return {
        users: state.users,
        selected: state.usersSelected,
        usersTrue: state.usersTrue,
        currentDay: state.currentDay,
        calendar: state.calendar
    }
}

export default connect(mapStateToProps, null, null, {
    pure: false
})(AdminPanel)