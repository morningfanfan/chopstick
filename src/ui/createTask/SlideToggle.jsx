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
    componentDidUpdate: function(prevprops, prevstate) {
        if (prevstate.leftClickDown != this.state.leftClickDown) {
            var trueButton = this.state.leftClickDown ? "task" : "project"
            this.props.returnValue("type", trueButton)
        }
        if (!prevprops.shouldClearTag && this.props.shouldClearTag) {
            this.setState({
                leftClickDown: true,
                rightClickDown: false
            })
        }

    },

    render: function() {
        var dataL = {
            clickDown: this.state.leftClickDown,
            text: text.left,
            onClick: this.clickLeft,
            img: "./statics/img/f.png",
            imgLeft: "60%",
            position: "left"
        };
        var dataR = {
            clickDown: this.state.rightClickDown,
            text: text.right,
            onClick: this.clickRight,
            img: "./statics/img/d.png",
            imgLeft: "10%",
            position: "right"
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