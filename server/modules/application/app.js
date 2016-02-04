//import React from 'react'
//import {render} from 'react-dom'
//import {browserHistory, Router, Route, Link} from 'react-router'
//
//
//
//const Register = React.createClass({
//    getInitialState: function () {
//        return {
//            username: " ",
//            password: " ",
//            showResults: false
//        };
//    },
//    onFieldChanged: function (event) {
//        this.setState({[event.target.name]: event.target.value});
//    },
//
//    render() {
//        return (
//            <form >
//                <div>
//                    <label>Username:</label>
//                    <input type="text" name="username" onChange={this.onFieldChanged}/>
//                    <br/>
//                </div>
//                <div>
//                    <label>Password:</label>
//                    <input type="password" name="password" onChange={this.onFieldChanged}/>
//                </div>
//                <div>
//                    <button type="button" onClick={this._onChange} value="1">Login</button>
//                    <button type="button" onClick={this._onChange} value="2">Register</button>
//                    { this.state.showResults ? <Dashboard /> : null }
//                </div>
//            </form>
//
//        )
//    },
//    _onChange: function (event) {
//        var url = " ";
//        if(event.target.value == 1){
//            url = '/api/1/login'
//        }else if(event.target.value == 2){
//            url = '/api/1/register'
//        }
//        fetch(url, {
//            method: 'post',
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify({
//                username: this.state.username,
//                password: this.state.password
//            })
//        })
//    }
//});
//const Dashboard = React.createClass({
//    render() {
//        return (
//            <div>
//                <h1>Dashboard</h1>
//                <p>You made it!</p>
//            </div>
//        )
//    }
//});
//
//
//render((
//    <Router history={browserHistory}>
//        <Route path="/" component={Register}>
//            <Route path="/register" component={Register}/>
//            <Route path="/dashboard" component={Dashboard}/>
//        </Route>
//    </Router>
//), document.getElementById("application"));
