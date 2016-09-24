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

var live = {
    icon: "face",
    words: "TO DO LIST",
    status: "live"
}

ReactDOM.render((<Container/>), document.getElementById("content"));
ReactDOM.render(<Form data={live}/>, document.getElementById("tasks"));
ReactDOM.render(<Add/>, document.getElementById("add"));