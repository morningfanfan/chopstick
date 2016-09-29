import ReactDOM from "react-dom";
import React from "react";
import {
    Motion,
    spring
} from "react-motion";
import _ from "lodash";

export var DoneElement = React.createClass({
    getInitialState: function() {
        return {
            noteVisible: false,
            deletelineDefault: 600,
            deleteline: true,
            checked: true
        }
    },
    inTheLine: function() {
        var taskStyle = {
            backgroundColor: "#fefffe",
        };
        var projectStyle = {
            backgroundColor: "#fefffe",
        };
        var moveStyle = {
            width: "563px",
            height: "80px",
            position: "relative",
            left: this.props.data.indent,
            WebkitUserSelect: 'none'
        }
        return this.props.data.type == "task" ?
            _.extend(taskStyle, moveStyle) :
            _.extend(projectStyle, moveStyle);
    },
    changeCheckbox: function() {
        this.setState({
            deleteline: false,
            checked: false
        })
        setTimeout(this.props.restoreme.bind(null, this.props.data.id), 1000)
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
    mouseOut: function() {
        this.setState({
            noteVisible: false
        })
    },
    render: function() {
        var noteStyle = {
            visibility: this.state.noteVisible ? "visible" : "hidden",
            position: "absolute",
            left: "583px",
            width: "250px",
            height: "80px",
            backgroundColor: "#e2e2f6",
            zIndex: "4",
            borderRadius: "10px",
            textIndent: "20px",
            fontFamily: "comic sans ms",
            wordBreak: 'break-all',
            wordWrap: 'break-word'
        }
        var leftBorderStyle = {
            float: "left",
            width: "500px",
            borderLeft: this.props.data.type == "task" ? "3px solid rgb(172, 186, 215)" : "3px solid rgb(178, 172, 172)",
            paddingLeft: "20px"
        }
        return (<div style={{margin:"5px 0 5px 0"}}>
                <label className="demo--label"><input className="demo--radio" type="checkbox" name="demo-checkbox1" onChange={this.changeCheckbox} defaultChecked/>
                <span className="demo--checkbox demo--radioInput"></span></label>
                <div style={this.state.move?this.moveWithMouse():this.inTheLine()} >
                         <Motion defaultStyle={{x: this.state.deletelineDefault}} style={{x: spring(this.state.deleteline?600:0)}}>
                                 {({x}) => <div style={_.extend({width:x},deletelineStyle)}></div>}
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
    fontFamily: "comic sans ms",
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
    fontFamily: "Arial,helvetica",
    fontStyle: "italic",
    margin: "5px 5px 0 0",
    letterSpacing: "-1px"
}
var tagStyle = {
    height: "20px",
    lineHeight: "20px",
    backgroundColor: "#e1fdbc",
    borderRadius: "10px",
    float: "left",
    textAlign: "center",
    textIndent: "0",
    margin: "5px 0 5px 0",
    color: "#72c964"
};
var deletelineStyle = {
    zIndex: "5",
    height: "20px",
    borderBottom: "1px solid",
    margin: "20px 0 0 -50px",
    position: "absolute"
}