import ReactDOM from "react-dom";
import React from "react";
import {Motion, spring} from 'react-motion';



export var TodoElement = React.createClass({
    getInitialState: function() {
        return {
            indent: this.props.data.indent,
            offSetX: 0,
            offSetY: 0,
            offsetIndent:0,
            init: true,
            move: false
        }
    },
    componentDidMount: function () {
        var init = this.getDOMNode();
        setState({
            initX:init.pageX,
            initY:init.pageY
        })  
    },
    ifTask: function() {
        return move ? 
               fillStyle :
               this.props.data.type==task ?
               taskStyle : projectStyle;
    },
    handleMove: function(e) {

        e.onMouseMove = function(e){
            if(init){
            setState({
                initPositionX: e.pageX,
                initPositionY: e.pageY,                 
                init: false,
                move: true
                })
            }
            var Y = e.pageY-this.state.initPositionY;
            var X = e.pageX-this.state.initPositionX;
            this.props.sortToDoList(e,X,Y)
            setState({
                offSetY:Y,
                offSetX:X
            })
        }
    },
    render: function() {
        var taskMovingStyle = {
            width:'200px',
            height:'50px',
            backgroundColor:'#0e58c2',
            top: this.state.offSetY+this.state.initY,
            left: this.state.indent+this.state.offSetX,
            position:'relative'
        };
        var projectMovingStyle = {
            width:'200px',
            height:'50px',
            backgroundColor:'#4ab7e9',
            top: this.state.offSetY+this.state.initY,
            left: this.state.indent+this.state.offSetX,
            position:'relative'
        };//随鼠标位置挪动
        var taskStyle = {
            width:'200px',
            height:'50px',
            backgroundColor:'#0e58c2',
            top: this.state.offSetY,
            left: this.state.indent+this.state.offSetIndent,
            position:'relative'
        };
        var projectStyle = {
            width:'200px',
            height:'50px',
            backgroundColor:'#4ab7e9',
            top: this.state.offSetY,
            left: this.state.indent+this.state.offSetIndent,
            position:'relative'
        };
        var fillStyle = {
            width:'200px',
            height:'50px',
            backgroundColor:'#c3c7cc',
            top: this.state.initY,
            left: this.state.initX,
            position:'absolute',
        };
        return <div>
        <div style={movingStyle} onMouseDown={this.handleMove.bind(this)}></div>
        <div style={this.ifTask}>{this.props.data.name}</div>
        </div>
    }
});

