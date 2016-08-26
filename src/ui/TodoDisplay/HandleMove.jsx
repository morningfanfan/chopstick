import ReactDOM from "react-dom";
import React from "react";
import {
    Motion,
    spring
} from "react-motion";
import _ from "lodash";



export var TodoElement = React.createClass({
    getInitialState: function() {
        return {
            indent: this.props.data.indent,
            offSetX: 0,
            offSetY: 0,
            offsetIndent: 0,
            clicked: false,
            init: true,
            move: false,
            disappear: false
        }
    },
    moveWithMouse: function() {
        var taskStyle = {
            backgroundColor: "#0e58c2",
        };
        var projectStyle = {
            backgroundColor: "#4ab7e9",
        };
        var staticStyle = {
            width: "200px",
            height: "50px",
            position: "absolute",
            boxShadow: this.state.clicked ? "0 0 20px rgb(132,131,131)" : null,
            top: this.props.mouse.mouseY,
            left: this.props.mouse.mouseX,
        };
        return this.state.disappear ? null :
            this.props.data.type == "task" ?
            _.extend(taskStyle, staticStyle) : _.extend(projectStyle, staticStyle);

    },
    inTheLine: function() {
        var taskStyle = {
            backgroundColor: "#0e58c2",
        };
        var projectStyle = {
            backgroundColor: "#4ab7e9",
        };
        var fillStyle = {
            backgroundColor: "gray",
        };
        var moveStyle = {
            width: "200px",
            height: "50px",
            position: "relative",
            left: this.state.indent //pageY
        };
        return this.state.move ?
            _.extend(fillStyle, moveStyle) :
            this.props.data.type == "task" ?
            _.extend(taskStyle, moveStyle) :
            _.extend(projectStyle, moveStyle);
    },
    handleClick: function() {
        this.setState({
            clicked: true,
            move: true
        })
    },
    componentDidUpdate: function() {
        if (this.props.up) {
            this.setState({
                clicked: this.props.up.clicked,
                move: this.props.up.move,
                init: this.props.up.init,
                disappear: this.props.up.disappear,
                toRender: true
            })
        }
        var n = {
            clicked: this.state.clicked,
            init: this.state.init
        }
        this.props.getChidrenState(n);
    },
    render: function() {
        return (<div>
        <div style={this.state.move?this.moveWithMouse():this.inTheLine()} onMouseDown={this.handleClick} >{this.props.data.name}</div>
        <div style={this.state.move?this.inTheLine():null}></div>
        </div>)
    }
});