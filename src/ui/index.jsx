import ReactDOM from "react-dom";
import React from "react";
import {
    Container
} from "./createTask/createTask";
import {
    Motion,
    spring
} from "react-motion";

ReactDOM.render((<Container/>), document.getElementById("content"));