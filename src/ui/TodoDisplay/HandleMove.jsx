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
            init: false,
            offsetY: 0
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
            WebkitUserSelect: 'none',
            zIndex: "1000",
            opacity: "0.5"
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
        if (nextstate.move && nextstate.move !== this.state.move) {
            this.props.changeFatherMoveState()
            this.init(nextstate.init)

        }
    },
    componentWillReceiveProps: function(nextprops) {
        if (this.state.move && nextprops.itState.move == false) {
            this.setState({
                move: false
            })
        }
        if (this.props.itState.count !== nextprops.itState.count) {
            console.log("ya!")
            this.setState({
                offsetY: nextprops.itState.offsetY
            })
        }
    },
    componentDidUpdate: function(prevprops) {
        this.distanceCount(this.props.data, prevprops)
    },
    init: function(init) {
        if (init) {
            this.setState({
                initPositionX: this.props.itState.mouseX,
                initPositionY: this.props.itState.mouseY,
                init: false
            })
        }
    },
    distanceCount: function(it, prevprops) {
        if (this.state.initPositionX && prevprops.itState.mouseX !== this.props.itState.mouseX && this.state.move) {
            var Y = this.props.itState.mouseY - this.state.initPositionY + this.state.offsetY;
            var X = this.props.itState.mouseX - this.state.initPositionX;
            this.props.sortToDoList(it, X, Y)
        }
    },
    render: function() {
        if (this.state.move == true)
            console.log(this.props.data.id)
        return (<div>
        <div onMouseDown={this.mouseDown} style={this.state.move?this.moveWithMouse():this.inTheLine()}>{this.props.data.name}</div>
        <div style={this.state.move?this.inTheLine():null}></div>
        </div>)
    }
});