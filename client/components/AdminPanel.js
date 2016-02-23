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

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        let selectedUsers = this.props.usersTrue;
        let calend = this.props.calendar;
        const styles = {
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
            leftBut: {
                position: 'absolute',
                left: '20%'
            },
            rightBut: {
                position: 'absolute',
                left: '70%'
            },
            all: {
                width: '115px',
                height: '35px',
                fontSize: '25px'
            },
            wellStyles: {
                maxWidth: 400,
                margin: '0 auto 10px',
                textAlign: 'center'
            }
        };

        return (
            <div style={styles.center}>
                <div>
                    <br></br>
                    <Button bsSize="large" bsStyle="default" onClick={(e) => {this.onLogoutClick(e)}}>
                        Logout
                    </Button>
                </div>
                <Button style={styles.leftBut} bsSize="xsmall" bsStyle="warning" onClick={(e) => {this.minusWeek(e)}}>
                    Previous week
                </Button>
                <Button style={styles.rightBut} bsSize="xsmall" bsStyle="primary" onClick={(e) => {this.plusWeek(e)}}>
                    Next week
                </Button>
                <table className="table" style={styles.width}>
                    <tbody className="well" style={styles.wellStyles}>
                        <tr>
                            {Object.keys(calend).map((el, index) => (
                                <td key={index}>
                                    <Button bsSize="xsmall" className={JSON.stringify(calend[el].status) == "true" ?
                                     'active' : JSON.stringify(calend[el].status) == "false" ? null : null}>
                                        <div className={JSON.stringify(el)} style={styles.all}
                                             onClick={(e) => {this.itemClick(e)}}>{el}</div>
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

    plusWeek(e) {
        e.preventDefault();
        this.props.createCalendarPlusWeek();

    }

    minusWeek(e) {
        e.preventDefault();
        this.props.createCalendarMinusWeek();

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
        let res = event.target.className;
        let momentDate = res.substring(1, res.length - 1);
        localStorage.setItem('momentDate', momentDate);
        this.props.usersSelected(momentDate);
        this.props.userList();
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
    createCalendarPlusWeek: PropTypes.func.isRequired,
    createCalendarMinusWeek: PropTypes.func.isRequired,
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