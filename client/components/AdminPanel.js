import React, {Component, PropTypes} from 'react'
import {store} from './../store/store'
import {connect} from 'react-redux'
import moment from 'moment'
import {browserHistory} from 'react-router'

export  default class AdminPanel extends Component {

    componentWillMount() {
        localStorage.getItem('admin') == 'false' ? browserHistory.push('/login') :
            localStorage.getItem('admin') == 'true' ? null : null;
        this.props.userList();

    }

    render() {
        let users = this.props.users;
        let selectedUsers = this.props.selected;
        let trueUsers = this.props.usersTrue;

        Object.keys(users).map((i) => (
            users[i].selected = false
        ));

        Object.keys(selectedUsers).map((i) => (
            selectedUsers[i].selected = true
        ));
        let arr = [];
        let store = {};
        Object.keys(trueUsers).map((key, index) => (
            !trueUsers[key].selected && !trueUsers[key].admin ?
                arr.push(trueUsers[key].username) : null
        ));

        for (var i = 0; i < arr.length; i++) {
            var key = arr[i];
            store[key] = true;
        }
        console.log(Object.keys(store));

        let calend = {};
        let begin = moment().startOf('week');
        let endOfWeek = moment().endOf('week').add(1, 'day');

        while (!endOfWeek.isSame(begin, 'day')) {
            calend[begin.format('l')] = {
                status: false
            };
            begin.add(1, 'day')
        }

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
                width: '43%',
                float: 'left',
                marginLeft: '5%'
            },
            right: {
                width: '43%',
                float: 'right',
                marginRight: '10%'
            }
        };

        return (
            <div style={styles.center}>
                <div>
                    <button onClick={(e) => {this.handleClick(e)}}>
                        Logout
                    </button>
                </div>
                <table className="table" style={styles.width}>
                    <tbody>
                        <tr>
                            {Object.keys(calend).map((el, index) => (
                                <td key={index} style={(JSON.stringify(calend[el].status) == 'true') ? styles.activeStyle :
                                (JSON.stringify(calend[el].status) == 'false') ? styles.unActiveStyle : null}>
                                    <div id={JSON.stringify(calend[el].status)} onClick={(e) => {this.itemClick(e)}}
                                         value={{el}}>{el}</div>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <div style={styles.left}>
                    {Object.keys(selectedUsers).map((key, index) => (
                        <p key={index} style={styles}>
                            <a >{selectedUsers[key].username}</a>
                        </p>))}
                </div>
                <div style={styles.right}>
                    {Object.keys(store).map((key, index) => (
                        <p key={index} style={styles}>
                            <input type="checkbox"
                                   onChange={this.onChange} value={key}/>
                            <a>{key}</a>
                        </p>))}
                </div>
            </div>
        )

    }

    handleClick(e) {
        e.preventDefault();
        this.props.onLogoutClick();

    }

    onChange(event) {
        console.log(event.target.value);
    }

    itemClick(event) {

        const momentDate = event.target.value.el;
        this.props.usersSelected(momentDate);
    }

}

AdminPanel.propTypes = {
    onLogoutClick: PropTypes.func.isRequired,
    usersSelected: PropTypes.func.isRequired

};

function mapStateToProps(state) {
    return {users: state.users, selected: state.usersSelected, usersTrue: state.usersTrue}
}

export default connect(mapStateToProps, null, null, {
    pure: false
})(AdminPanel)