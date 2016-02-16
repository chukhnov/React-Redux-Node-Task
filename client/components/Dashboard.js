import React, {Component, PropTypes} from 'react'
import {store} from './../store/store'
import moment from 'moment'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

export  default class Dashboard extends Component {
    componentWillMount() {
        this.props.dataLoad();
        this.props.userList();
        console.log(this.props.spiner);

    }

    render() {
        let calendar = {};
        let orders = this.props.days;
        console.log(orders);
        let ordersMap = orders.reduceRight((c, el) =>
            ({...c, [moment(new Date(el.date)).format('l')]: el}), {});

        let begin = moment().startOf('week');
        let endOfWeek = moment().endOf('week').add(1, 'day');

        while (!endOfWeek.isSame(begin, 'day')) {
            calendar[begin.format('l')] = {
                status: false
            };
            begin.add(1, 'day')
        }

        Object.assign(calendar, ordersMap);

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
            }
        };


        return (<div style={styles.center}>
                <div>
                    <button onClick={(e) => {this.handleClick(e)}}>
                        Logout
                    </button>
                </div>
                <table className="table" style={styles.width}>
                        <tbody>
                            <tr>
                                {Object.keys(calendar).map((el, index) => (
                                    <td key={index} style={(JSON.stringify(calendar[el].status) == 'true') ? styles.activeStyle :
                                (JSON.stringify(calendar[el].status) == 'false') ? styles.unActiveStyle : null}>
                                        <div id={JSON.stringify(calendar[el].status)} onClick={(e) => {this.itemClick(e)}}
                                             value={{el}}>{el}</div>
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
        var bool = event.target.id;
        const momentDate = moment(new Date(event.target.value.el));
        var obj = {
            date: momentDate._d,
            status: undefined,
            user: localStorage.getItem('user')
        };

        if (bool == 'false') {
            obj.status = true;
            console.log(obj)
            this.props.dataUpdate(obj);
            this.props.userUpdate({
                date: momentDate.add(1, 'day')._d,
                user: localStorage.getItem('user')
            });
            this.props.dataLoad();
        }
        else if (bool == 'true') {
            obj.status = false;
            this.props.dataUpdate(obj);
            this.props.userDayDelete(obj);
            this.props.dataLoad();
        }
        this.props.spi(true);
        console.log(this.props.spiner);
    }


}

Dashboard.propTypes = {
    onLogoutClick: PropTypes.func.isRequired,
    dataLoad: PropTypes.func.isRequired,
    dataUpdate: PropTypes.func.isRequired,
    userUpdate: PropTypes.func.isRequired,
    userDayDelete: PropTypes.func.isRequired,
    spi: PropTypes.func.isRequired,
    userList: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {days: state.days, spiner: state.spiner, admin: state.admin, users: state.users}
}

export default connect(mapStateToProps, null, null, {
    pure: false
})(Dashboard)
//export default Dashboard
