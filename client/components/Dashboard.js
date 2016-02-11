import React, {Component, PropTypes} from 'react'
import {store} from './../store/store'
import moment from 'moment'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import Item from './Item'

export  default class Dashboard extends Component {
    componentWillMount() {
        this.props.dataLoad();

    }

    render() {
        let calendar = {};
        let orders = this.props.days; // Тот что с сервера приходит {date, status, user}
        console.log(orders);
        let ordersMap = orders.reduceRight((c, el) =>
            ({...c, [moment(el.date).format('l')]: el}), {});

        let begin = moment().startOf('week');
        let endOfWeek = moment().endOf('week').add(1, 'day');

        while (!endOfWeek.isSame(begin, 'day')) {
            calendar[begin.format('l')] = {
                status: false
            };

            begin.add(1, 'day')
        }

        return (<div>
                <div>
                    <h1>Hello!</h1>
                    <Item/>
                    {isNaN(localStorage.getItem('user')) ? <h1>Logged In</h1> : browserHistory.push('/login')}
                    <button onClick={(e) => {this.handleClick(e)}}>
                        Logout
                    </button>
                </div>

                <table className="table">
                    <tbody>
                        <tr>
                            {Object.keys(calendar).map(el => (
                                <td>
                                    <div onClick={(e) => {this.itemClick(e)}} value={{el}}>{el}</div>
                                    <hr/>
                                    <div>{JSON.stringify(calendar[el])}</div>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        )

    }

    handleClick(e) {
        e.preventDefault();
        this.props.onLogoutClick();

    }

    itemClick(event) {
        const momentDate = moment(new Date(event.target.value.el));
        const obj = {
            date : momentDate._d +1,
            status: undefined,
            user: localStorage.getItem('user')
        };
        if (!event.currentTarget.style.backgroundColor ||
            event.currentTarget.style.backgroundColor == 'white') {
            event.currentTarget.style.backgroundColor = 'grey';
            obj.status = true
        }
        else {
            event.currentTarget.style.backgroundColor = 'white';
            obj.status = false
        }
        console.log(event.target.value.el);
        //console.log(momentDate._d);
        this.props.dataUpdate(obj)
    }


}

Dashboard.propTypes = {
    onLogoutClick: PropTypes.func.isRequired,
    dataLoad: PropTypes.func.isRequired,
    dataUpdate: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {days: state.days}
}

export default connect(mapStateToProps, null, null, {
    pure: false
})(Dashboard)
//export default Dashboard
