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
            offsetY: 0,
            noteVisible: false
        }
    },
    moveWithMouse: function() {
        var taskStyle = {
            backgroundColor: "#adc9f2",
        };
        var projectStyle = {
            backgroundColor: "#8cd2f2",
        };
        var staticStyle = {
            width: "500px",
            height: "80px",
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
            backgroundColor: "#adc9f2",
        };
        var projectStyle = {
            backgroundColor: "#8cd2f2",
        };
        var fillStyle = {
            backgroundColor: "gray",
        };
        var moveStyle = {
            width: "500px",
            height: "80px",
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
        if (nextstate.move && !this.state.move) {
            this.props.changeFatherMoveState(this.props.data.id)
        }
    },
    componentWillReceiveProps: function(nextprops) {
        if (nextprops.data.move !== this.state.move) {
            this.setState({
                move: nextprops.data.move
            })
        }
    },
    imgSrc: function() {
        switch (this.props.data.priority) {
            case 1:
                return "./statics/img/low.png"
            case 2:
                return "./statics/img/middle.png"
            case 3:
                return "./statics/img/high.png"
        }
    },
    mouseOver: function() {
        this.setState({
            noteVisible: true
        })
    },
    render: function() {
        var nameStyle = {
            float: "left",
            fontFamily: "cursive",
            width: "420px",
            color: "#312c2c",
            borderBottom: "1px solid #2c2c2c",
            marginTop: "12px",
            paddingBottom: "5px",
            fontSize: "23px"
        }
        var imgStyle = {
            width: "19px",
            height: "19px",
            float: "left",
            WebkitUserSelect: "none"
        }
        var tagStyle = {
            float: "left",
            fontFamily: "Arial",
            color: "#312c2c",
            marginTop: "5px"
        }
        var timeStyle = {
            color: "gray",
            float: "right",
            fontFamily: "Arial",
            fontStyle: "italic",
            marginTop: "5px"
        }
        var moveInstructionStyle = {
            width: "40px",
            height: "40px",
            backgroundColor: "#acbad7"
        }
        var noteStyle = {
            visibility: this.state.noteVisible
        }
        return (<div>
        <input style={{float:"left"}}type="checkbox"/>
        <img style={imgStyle} src={this.imgSrc()}></img>
        <div style={this.state.move?this.moveWithMouse():this.inTheLine()} onMouseOver={this.mouseOver}>
        <div style={{float:"left"}}>
        <div style={{height:"50px"}}><div style={nameStyle}>{this.props.data.name}</div>
        </div>
        <div style={tagStyle}>TAGS</div>
        <div style={timeStyle}>{this.props.data.startTime + "-" + this.props.data.endTime}</div></div>
        <div style={{float:"left"}}><div style={moveInstructionStyle} onMouseDown={this.mouseDown}></div>
        <div style={moveInstructionStyle} id="addtask"></div></div>
        <div style={noteStyle}>{this.props.data.note}</div>
        </div>
        <div style={this.state.move?this.inTheLine():null}></div> 
        </div>)
    }
});