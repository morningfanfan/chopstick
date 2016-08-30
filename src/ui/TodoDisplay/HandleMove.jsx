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
            move: false,
            init: false
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
            boxShadow: "0 0 20px rgb(132,131,131)",
            top: this.props.itState.mouseY,
            left: this.props.itState.mouseX,
            WebkitUserSelect: 'none'
        };
        return this.props.data.type == "task" ?
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
            left: this.props.data.indent,
            WebkitUserSelect: 'none'
        };
        if (this.props.data.id == 3 && this.state.seeIndent) {
            console.log("indent:" + this.props.data.indent)
            this.setState({
                seeIndent: false
            })
        }
        return this.state.move ?
            _.extend(fillStyle, moveStyle) :
            this.props.data.type == "task" ?
            _.extend(taskStyle, moveStyle) :
            _.extend(projectStyle, moveStyle);
    },
    mouseDown: function() {
        this.setState({
            move: true,
            init: true
        })
    },
    componentWillUpdate: function(nextprops, nextstate) {
        if (nextstate.move) {
            this.distanceCount(this.props.data, nextstate.init)
            this.props.changeFatherMoveState()
        }
    },
    componentWillReceiveProps: function(nextprops) {
        if (this.state.move && nextprops.itState.move == false) {
            this.setState({
                move: false
            })
        }
        if (nextprops.data.indent !== this.props.data.indent) {
            this.setState({
                seeIndent: true
            })
        }
    },
    distanceCount: function(it, init) {
        if (init) {
            this.setState({
                initPositionX: this.props.itState.mouseX,
                initPositionY: this.props.itState.mouseY,
                init: false
            })
            var Y = this.props.itState.mouseY - this.state.initPositionY;
            var X = this.props.itState.mouseX - this.state.initPositionX;
            this.props.sortToDoList(it, X, Y)
        }
    },
    render: function() {
        return (<div onMouseDown={this.mouseDown}>
        <div style={this.state.move?this.moveWithMouse():this.inTheLine()}>{this.props.data.name}</div>
        <div style={this.state.move?this.inTheLine():null}></div>
        </div>)
    }
});