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


ReactDOM.render((<Container/>), document.getElementById("content"));
ReactDOM.render(<Form/>, document.getElementById("tasks"));
ReactDOM.render(<Add/>, document.getElementById("add"));
ReactDOM.render(<DeleteForm/>, document.getElementById("deleteTask"));