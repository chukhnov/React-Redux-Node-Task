import React, {Component, PropTypes} from 'react'
import {store} from './../store/store'
import moment from 'moment'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

export  default class Dashboard extends Component {
    componentWillMount() {
        this.props.dataLoad();
        this.props.createCalendar();

    }

    render() {

        let orders = this.props.days;
        let calendar = this.props.calendar;
        let ordersMap = orders.reduceRight((c, el) =>
            ({...c, [moment(new Date(el.date)).format('l')]: el}), {});


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
        const momentDate = event.target.value.el;
        var obj = {
            date: momentDate,
            status: undefined,
            user: localStorage.getItem('user')
        };

        if (bool == 'false') {
            obj.status = true;
            this.props.dataUpdate(obj);
            this.props.userUpdate(obj);
            this.props.dataLoad();
        }
        else if (bool == 'true') {
            obj.status = false;
            this.props.dataUpdate(obj);
            this.props.userDayDelete(obj);
            this.props.dataLoad();
        }
        this.props.spi(true);
    }


}

Dashboard.propTypes = {
    onLogoutClick: PropTypes.func.isRequired,
    dataLoad: PropTypes.func.isRequired,
    dataUpdate: PropTypes.func.isRequired,
    userUpdate: PropTypes.func.isRequired,
    createCalendar: PropTypes.func.isRequired,
    userDayDelete: PropTypes.func.isRequired,
    spi: PropTypes.func.isRequired,
    userList: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        days: state.days,
        spiner: state.spiner,
        calendar: state.calendar
    }
}

export default connect(mapStateToProps, null, null, {
    pure: false
})(Dashboard)
//export default Dashboard
