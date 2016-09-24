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
            noteVisible: false,
            deletelineDefault: this.props.status == "live" ? 0 : 700,
            deleteline: this.props.status == "live" ? false : true
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
            width: "563px",
            height: "80px",
            position: "absolute",
            boxShadow: "0 0 20px rgb(132,131,131)",
            top: this.props.itState.mouseY - 220 + "px", //40+100+80=top(moveInstructionBottomStyle's heigt+setIndent'relative value)
            left: this.props.itState.mouseX - 763 + "px", //740=563+200(div's width+setIndent'relative value)
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
            width: "563px",
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
    componentDidUpdate: function() {
        var checkbox = document.getElementById(this.props.data.id);
        var deletelineWidth = document.getElementById("deleteline").style.width;
        if (this.props.status == "live") {
            if (checkbox.checked) {
                this.setState({
                    deleteline: true
                })
            }
            if (deletelineWidth == 700) {
                //fangruhuancun
            }
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
        if (!this.state.move) {
            this.setState({
                noteVisible: true
            })
        }
    },
    mouseOut: function() {
        if (!this.state.move) {
            this.setState({
                noteVisible: false
            })
        }
    },
    mouseClick: function() {
        this.props.callbackParent(this.props.data.index)
    },

    render: function() {
        var noteStyle = {
            visibility: this.state.noteVisible ? "visible" : "hidden",
            position: "absolute",
            left: "563px",
            width: "100px",
            height: "70px",
            backgroundColor: "blue"
        }
        var leftBorderStyle = {
            float: "left",
            width: "500px",
            borderLeft: this.props.data.type == "task" ? "3px solid rgb(172, 186, 215)" : "3px solid rgb(178, 172, 172)",
            paddingLeft: "20px"
        }
        var moveInstructionTopStyle = {
            width: "40px",
            height: "40px",
            backgroundColor: this.props.data.type == "task" ? "rgb(184, 193, 211)" : "rgb(202, 198, 198)"
        }
        var moveInstructionBottomStyle = {
            width: "40px",
            height: "40px",
            backgroundColor: this.props.data.type == "task" ? "rgb(198, 208, 227)" : "rgb(217, 212, 212)"
        }
        return (<div style={{margin:"5px 0 5px 0"}}>
                <label className="demo--label"><input className="demo--radio" type="checkbox" name="demo-checkbox1" id={this.props.data.id}/>
                <span className="demo--checkbox demo--radioInput"></span></label>
                <div style={this.state.move?this.moveWithMouse():this.inTheLine()} >
                         <Motion defaultStyle={{x: this.state.deletelineDefault}} style={{x: spring(this.state.deleteline?700:0)}}>
                                 {({x}) => <div id="deleteline" style={_.extend({width:x},deletelineStyle)}></div>}
                         </Motion>
                    <div style={leftBorderStyle} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                        <div style={{height:"50px"}}>
                        <div style={nameStyle}>
                        <div style={{float:"left"}}>{this.props.data.name}</div>
                        <img style={imgStyle} src={this.imgSrc()}/>
                        </div>
                        </div>
                        <div>{this.createTag()}</div>
                        <div style={timeStyle}>{this.props.data.startTime + "-" + this.props.data.endTime}</div>
                    </div>
                    <div style={{float:"left"}}>
                    <div style={moveInstructionTopStyle} onMouseDown={this.mouseDown}>
                         <i className="material-icons" style={{margin:"8px 0 0 8px"}}>reorder</i>
                    </div>
                    <div style={moveInstructionBottomStyle} id="addtask" onClick={this.mouseClick}>
                    <i className="material-icons md-24"style={{margin:"8px 0 0 8px",color:"white"}}>add_circle_outline</i>
                    </div>
                    </div>
                         <Motion defaultStyle={{x: 0.3}} style={{x: spring(this.state.noteVisible?1:0.3)}}>
                                 {({x}) => <div style={_.extend({opacity:x},noteStyle)}>{this.props.data.note}</div>}
                         </Motion>
                </div> 
                <div style={this.state.move?this.inTheLine():null}></div>
            </div>)
    }
});

var nameStyle = {
    float: "left",
    fontFamily: "cursive",
    width: "500px",
    color: "#312c2c",
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
var tagStyle = {
    height: "20px",
    lineHeight: "15px",
    backgroundColor: "#e1fdbc",
    borderRadius: "10px",
    float: "left",
    textAlign: "center",
    textIndent: "0",
    margin: "5px 0 5px 0",
    color: "#72c964"
};
var deletelineStyle = {
    zIndex: "4",
    height: "20px",
    boderBottom: "3px solid black",
    marginTop: "40px"
}