import React, {Component, PropTypes} from 'react'

export  default class Item extends Component {

    handleCompleted () {

    }

    render () {
        return (
            <div>
                <h1>31</h1>
                <button onClick={this.handleCompleted}>completed</button>
            </div>)

    }

}

