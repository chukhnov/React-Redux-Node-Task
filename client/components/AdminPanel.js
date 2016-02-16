import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

export  default class AdminPanel extends Component {

    componentWillMount() {
        this.props.userList();

    }

    render() {
        const styles = {
            width: '25%'
        };
        let users = this.props.users;
        console.log(this.props.users)
        return (
            <div>
                {Object.keys(users).map((key, index) => (
                    <p key={index} style={styles}>
                        <a id={users[key]._id} name={users[key].username} onClick={(e) => {this.itemClick(e)}}>{users[key].username}</a>
                    </p>))}
            </div>
        )

    }

    itemClick(event) {
        console.log(event.target.id);
        console.log(event.target.name);
        //const momentDate = moment(new Date(event.target.value.el));
        //var obj = {
        //    date: momentDate._d,
        //    status: undefined,
        //    user: localStorage.getItem('user')
        //};
        //
        //if (bool == 'false') {
        //    obj.status = true;
        //    this.props.dataUpdate(obj);
        //    this.props.dataLoad();
        //}
        //else if (bool == 'true') {
        //    obj.status = false;
        //    this.props.dataUpdate(obj);
        //    this.props.dataLoad();
        //}
        //this.props.spi(true);
        //console.log(this.props.spiner)
    }

}

function mapStateToProps(state) {
    return {users: state.users}
}

export default connect(mapStateToProps, null, null, {
    pure: false
})(AdminPanel)