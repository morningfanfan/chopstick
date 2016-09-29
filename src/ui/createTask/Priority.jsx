import React from "react";
import _ from "lodash";
import {
    spring,
    Motion
} from "react-motion"
export var Priority = React.createClass({
    getInitialState: function() {
        return {
            click: false
        }
    },
    handleClick: function(q) {
        if (!this.state.click) {
            this.setState({
                beClicked: q,
                click: true
            })
        } else {
            if (this.state.beClicked == q) {
                this.setState({
                    ["open" + q]: false,
                    click: false
                })
            } else {
                this.setState({
                    ["open" + q]: true,
                    ["open" + this.state.beClicked]: false,
                    beClicked: q
                })
            }
        }
        this.props.returnValue("priority", q);
    },
    mouseOver: function(q) {
        if ((this.state.click && q != this.state.beClicked) || (!this.state.click)) {
            this.setState({
                ["open" + q]: true
            })
        }
    },
    mouseOut: function(q) {
        if ((this.state.click && q != this.state.beClicked) || (!this.state.click)) {
            this.setState({
                ["open" + q]: false
            })
        }
    },
    componentDidUpdate: function(prevprops, prevstate) {
        if (!prevprops.shouldClearTag && this.props.shouldClearTag) {
            this.setState({
                click: false,
                open1: false,
                open2: false,
                open3: false
            })
        }
    },
    render: function() {

        return (<div style={priorityFirstStyle}>
                <div style={numberStyle}>3</div>
                <div style={prioritySecondStyle}>
                    <div style={priorityNameStyle}>priority</div>
                    <div style={{float:"left",marginLeft:"20px"}}>
                        <Motion defaultStyle={{x: 0.3}} style={{x: spring(this.state.open1?1:0.3)}}>
        {({x}) => <img style={_.extend({opacity:x},imgStyle)} src="./statics/img/low.png" onMouseOver={this.mouseOver.bind(this,1)} onMouseOut={this.mouseOut.bind(this,1)} onClick={this.handleClick.bind(this,1)}></img>}</Motion>
                        <Motion defaultStyle={{x: 0.3}} style={{x: spring(this.state.open2?1:0.3)}}>
        {({x}) => <img style={_.extend({opacity:x},imgStyle)} src="./statics/img/middle.png" onMouseOver={this.mouseOver.bind(this,2)} onMouseOut={this.mouseOut.bind(this,2)} onClick={this.handleClick.bind(this,2)}></img>}</Motion>
                        <Motion defaultStyle={{x: 0.3}} style={{x: spring(this.state.open3?1:0.3)}}>
        {({x}) => <img style={_.extend({opacity:x},imgStyle)} src="./statics/img/high.png" onMouseOver={this.mouseOver.bind(this,3)} onMouseOut={this.mouseOut.bind(this,3)} onClick={this.handleClick.bind(this,3)}></img>}</Motion>
                    </div>
                </div>
                </div>)
    }
});

var priorityFirstStyle = {
    width: "419px",
    height: "40px",
    margin: "0 auto",
    position: "relative",
};
var numberStyle = {
    width: "40px",
    height: "40px",
    borderColor: "#e2e7ec",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "4px",
    color: "rgb(200,206,213)",
    fontSize: "20px",
    fontFamily: "Lato, Arial, serif",
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: "40px"
};
var prioritySecondStyle = {
    position: "relative",
    bottom: "44px",
    left: "69px",
    width: "350px",
    height: "40px",
    borderColor: "#e2e7ec",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "4px",
    color: "rgb(200,206,213)"
};
var priorityNameStyle = {
    float: "left",
    width: "100px",
    height: "40px",
    borderColor: "#e2e7ec",
    borderWidth: "0 2px 0 0",
    borderStyle: "solid",
    color: "rgb(74,83,116)",
    fontSize: "15px",
    letterSpacing: "1px",
    fontFamily: "Lato, Arial, serif",
    fontWeight: "bold",
    lineHeight: "40px",
    textAlign: "center"
};
var imgStyle = {
    marginLeft: "40px",
    marginTop: "10px",
    width: "19px",
    height: "19px",
};