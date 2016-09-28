import ReactDOM from "react-dom";
import React from "react";
import {
    Container
} from "./createTask/createTask";
import {
    Form
} from "./TodoDisplay/setIndent";
import {
    Add
} from "./TodoDisplay/add";
import {
    DeleteForm
} from "./TodoDisplay/deletedDisplay";

export var Whole = React.createClass({
    getInitialState: function() {
        return {
            up: 0
        }
    },
    mouseUp: function() {
        this.setState({
            up: this.state.up + 1
        })
    },
    render: function() {
        return <div onMouseUp={this.mouseUp}>
        <Add/>
                    <Container/>
                    <Form up={this.state.up}/>
                    <DeleteForm/>
                    </div>
    }
})

ReactDOM.render(<Whole/>, document.getElementById("content"));