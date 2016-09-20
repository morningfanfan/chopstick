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
            backgroundColor: "#fefffe",
        };
        var projectStyle = {
            backgroundColor: "#fefffe",
        };
        var staticStyle = {
            width: "560px",
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
            backgroundColor: "#fefffe",
        };
        var projectStyle = {
            backgroundColor: "#fefffe",
        };
        var fillStyle = {
            backgroundColor: "gray",
        };
        var moveStyle = {
            width: "560px",
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
    createTag: function() {
        var why = this.props.data.tag.map(function(elem, idx) {
            var tagWidth = {
                width: 10 + elem.length * 10 + "px"
            }
            return <div key={idx} style={_.extend(tagWidth,tagStyle)}>{elem}
            </div>
        })
        return why
    },
    mouseOver: function() {
        this.setState({
            noteVisible: true
        })
    },
    render: function() {
        var noteStyle = {
            visibility: this.state.noteVisible
        }
        return (<div>
        <input style={{float:"left"}}type="checkbox"/>
        <div style={this.state.move?this.moveWithMouse():this.inTheLine()} onMouseOver={this.mouseOver}>
        <div style={{float:"left",width:"500px"}}>
        <div style={{height:"50px"}}><div style={nameStyle}>
        <div style={{float:"left"}}>{this.props.data.name}</div>
        <img style={imgStyle} src={this.imgSrc()}></img>
        </div>
        </div>
        <div>{this.createTag()}</div>
        <div style={timeStyle}>{this.props.data.startTime + "-" + this.props.data.endTime}</div></div>
        <div style={{float:"left"}}><div style={moveInstructionStyle} onMouseDown={this.mouseDown}></div>
        <div style={moveInstructionStyle} id="addtask"></div></div>
        <div style={noteStyle}>{this.props.data.note}</div>
        </div> <
            div style = {
                this.state.move ? this.inTheLine() : null
            } > < /div>  < /
            div > )
    }
});

var nameStyle = {
    float: "left",
    fontFamily: "cursive",
    width: "500px",
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
    WebkitUserSelect: "none",
    margin: "7px 0 0 10px"
}
var timeStyle = {
    color: "gray",
    float: "right",
    fontFamily: "Arial",
    fontStyle: "italic",
    margin: "5px 5px 0 0"
}
var moveInstructionStyle = {
    width: "40px",
    height: "40px",
    backgroundColor: "#acbad7"
}
var tagStyle = {
    height: "20px",
    lineHeight: "15px",
    backgroundColor: "#e1fdbc",
    borderRadius: "10px",
    float: "left",
    textAlign: "center",
    textIndent: "0",
    marginTop: "5px",
    color: "#72c964"
};