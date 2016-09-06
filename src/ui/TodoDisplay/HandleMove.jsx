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
        console.log("click down")
        this.setState({
            move: true,
            init: true
        })
    },
    componentWillUpdate: function(nextprops, nextstate) {
        if (nextstate.move !== this.state.move) {
            if (nextstate.move)
                console.log(this.props.data.id + "'s move changes into true")
            if (!nextstate.move)
                console.log(this.props.data.id + "'s move changes into false")
        }
        if (nextstate.move && !this.state.move) {
            this.props.changeFatherMoveState(this.props.data.id)
        }
    },
    componentWillReceiveProps: function(nextprops) {
        if (nextprops.data.move !== this.state.move) {
            if (nextprops.data.move)
                console.log(this.props.data.id + "'s move will change into true")
            if (!nextprops.data.move)
                console.log(this.props.data.id + "'s move will change into false")
                //console.log(this.props.data.id + ":" + this.props.data.move)
            this.setState({
                move: nextprops.data.move
            })
        }
    },
    render: function() {
        if (this.props.data.id == 1 && !this.state.move)
            console.log("no1 small div state is false")
        if (this.props.data.id == 1) {
            console.log("render once")
            console.log("state's move:" +
                this.state.move)
            console.log("props's move:" +
                this.props.data.move)
        }
        return (<li>
        <div onMouseDown={this.mouseDown} style={this.state.move?this.moveWithMouse():this.inTheLine()}>{this.props.data.name}</div>
        <div style={this.state.move?this.inTheLine():null}></div>
        </li>)
    }
});