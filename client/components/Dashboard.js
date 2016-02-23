import React, {Component, PropTypes} from 'react'
import {store} from './../store/store'
import moment from 'moment'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {Button} from 'react-bootstrap';


export  default class Dashboard extends Component {
    componentWillMount() {
        localStorage.getItem('user') == 'null' ? browserHistory.push('/login') : this.props.dataLoad();
        this.props.createCalendar();


    }

    render() {

        let orders = this.props.days;
        let calendar = this.props.calendar;

        let ordersMap = orders.reduceRight((c, el) =>
            ({...c, [moment(new Date(el.date)).format('l')]: el}), {});


        let calendarNew = Object.assign({}, calendar, ordersMap);
        let newCalendar= {};
        Object.keys(calendar).map((i) => (
            Object.keys(calendarNew).map((key) => (
                i == key ? newCalendar[key] = calendarNew[key] : null
            ))
        ));

        const styles = {
            center: {
                textAlign: 'center'
            },
            width: {
                width: '85%',
                margin: '5%'
            },
            all: {
                width: '115px',
                height: '35px',
                fontSize: '25px'
            },
            left: {
                position: 'absolute',
                left: '20%'
            },
            right: {
                position: 'absolute',
                left: '70%'
            },
            wellStyles: {
                maxWidth: 400,
                margin: '0 auto 10px',
                textAlign: 'center'
            }
        };


        return (<div style={styles.center}>
                <div>
                    <br></br>
                    <Button bsSize="large" bsStyle="default" onClick={(e) => {this.handleClick(e)}}>
                        Logout
                    </Button>
                </div>
                <table className="table" style={styles.width}>
                    <tbody className="well" style={styles.wellStyles}>
                        <tr>
                            {Object.keys(newCalendar).map((el, index) => (
                                <td key={index}>
                                    <Button bsSize="xsmall" bsStyle={JSON.stringify(newCalendar[el].status) == "true" ?
                                     "success" : JSON.stringify(newCalendar[el].status) == "false" ? null : null}>
                                        <div className={JSON.stringify(el)} id={JSON.stringify(newCalendar[el].status)} style={styles.all}
                                             onClick={(e) => {this.itemClick(e)}}>{el}</div>
                                    </Button>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <Button style={styles.left} bsSize="xsmall" bsStyle="danger" onClick={(e) => {this.minusWeek(e)}}>
                   Previous week
                </Button>
                <Button style={styles.right} bsSize="xsmall" bsStyle="primary" onClick={(e) => {this.plusWeek(e)}}>
                    Next week
                </Button>
            </div>
        )

    }

    handleClick(e) {
        e.preventDefault();
        this.props.onLogoutClick();

    }

    plusWeek(e) {
        e.preventDefault();
        this.props.createCalendarPlusWeek();

    }
    minusWeek(e) {
        e.preventDefault();
        this.props.createCalendarMinusWeek();

    }

    itemClick(event) {
        let bool = event.target.id;
        let res = event.target.className;
        let momentDate = res.substring(1, res.length - 1);
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
    createCalendarPlusWeek: PropTypes.func.isRequired,
    createCalendarMinusWeek: PropTypes.func.isRequired,
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
