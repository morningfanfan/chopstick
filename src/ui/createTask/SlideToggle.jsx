import React from "react";
import {
    SlideButton
} from "./SlideButton";

export var SlideToggle = React.createClass({
    getInitialState: function() {
        return {
            leftClickDown: true,
            rightClickDown: false,
        };
    },
    clickLeft: function() {
        this.changeClick("left");
    },
    clickRight: function() {
        this.changeClick("right");
    },
    changeClick: function(n) {
        if (n == "left") {
            if (this.state.rightClickDown) {
                this.setState({
                    leftClickDown: true,
                    rightClickDown: false
                })
            } else {
                this.setState({
                    leftClickDown: true
                })
            }
        } else {
            if (this.state.leftClickDown) {
                this.setState({
                    leftClickDown: false,
                    rightClickDown: true
                })
            } else {
                this.setState({
                    rightClickDown: true
                })
            }
        }
    },
    componentDidUpdate: function(prveprops, prevstate) {
        if (prevstate.leftClickDown != this.state.leftClickDown) {
            var trueButton = this.state.leftClickDown ? "left" : "right"
            this.props.returnValue("type", trueButton)
        }
    },
    render: function() {
        var dataL = {
            clickDown: this.state.leftClickDown,
            text: text.left,
            onClick: this.clickLeft,
            img: "./statics/img/f.png",
            imgLeft: "60%"
        };
        var dataR = {
            clickDown: this.state.rightClickDown,
            text: text.right,
            onClick: this.clickRight,
            img: "./statics/img/d.png",
            imgLeft: "10%"
        }
        return (<div style={{position:"relative"}}>
                    <SlideButton data={dataL}/> 
                    <SlideButton data={dataR}/> 
                </div>);
    }
});

var text = {
    left: "ONETASK",
    right: "PROJECT"
};