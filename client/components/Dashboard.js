import React, {Component, PropTypes} from 'react'
import {store} from './../store/store'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'


export  default class Dashboard extends Component {
    render() {
        return(<div>
            <h1>Hello! {this.props.userData}</h1>
                {this.props.isLoggedIn ? <h1>Logged In</h1> : browserHistory.push('/login')}
                <button onClick={(e) => {this.handleClick(e)}} >
                    Logout
                </button>
            </div>
        )
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onLogoutClick();

    }
}

Dashboard.propTypes = {
    onLogoutClick: PropTypes.func.isRequired
};
function mapStateToProps(state) {
    return { userData: state.userData.username, isLoggedIn: state.isLoggedIn }
}

export default connect(mapStateToProps)(Dashboard)
