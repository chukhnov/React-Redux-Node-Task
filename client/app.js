import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'


const Register = React.createClass({
    getInitialState: function () {
        return {
            username: " ",
            password: " "
        };
    },
    nameChange: function (event) {
        this.setState({username: event.target.value});
    },
    passChange: function (event) {
        this.setState({password: event.target.value});
    },

    render() {
        return (
            <form>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" onChange={this.nameChange}/><br/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={this.passChange}/>
                </div>
                <div>
                    <input type="submit" onClick={this._onChange} value="Submit"/>
                </div>
            </form>
        )
    },
    _onChange: function (event) {
        event.preventDefault();
        var target = this.state.username;
        var target1 = this.state.password;
        console.log(target, target1);
        var xhr = new XMLHttpRequest();
        var url = "http://127.0.0.1";
        xhr.open("POST", url, true);
        xhr.send(target);
        xhr.onload = function () {
            var post = xhr.responseText;
                console.log(post)
        };
        xhr.onerror = function () {
            console.log("Error")
        }

    }
});


render((
    <Router history={browserHistory}>
        <Route path="/" component={Register}>
            <Route path="register" component={Register} />
        </Route>
    </Router>
), document.getElementById("application"));
