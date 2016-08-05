import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import _ from "lodash";

var Container = React.createClass({
    render: function() {
        var wholeStyle = {
            boxShadow:'0 0 20px rgba(132,131,131,0.8)',
            width:'500px',
            height:'600px'
        };
        return <div style = {wholeStyle}></div>
    }
});
var Slide_toggle = React.createClass({
    getInitialState: function() {
        return {
            leftClickDown: false,
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
    render: function() {
        var dataL = {
            clickDown: this.state.leftClickDown,
            text: this.props.text.left,
            onClick: this.clickLeft
        };
        var dataR = {
            clickDown: this.state.rightClickDown,
            text: this.props.text.right,
            onClick: this.clickRight
        };
        return (<div style={{position:'relative'}}>
                    <Slide_button data={dataL}/> 
                    <Slide_button data={dataR}/> 
                </div>);
    }
});

var Slide_button = React.createClass({
    render: function() {

        var slideStyle = {
            backgroundColor: '#3bb3e0',
            fontSize: '13px',
            padding: '10px 20px',
            paddingRight: '50px',
            borderRadius: '5px',
            float:'left',
            boxShadow: 'inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785, 0px 10px 5px #999',
            backgroundImage: '-webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(44,160,202)), color-stop(1, rgb(62,184,229)) )',
            '::before': {
                backgroundColor: '#2591b4',
                backgroundImage: 'url(../img/hi.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                content: '',
                width: '20px',
                height: '20px',
                position: 'absolute',
                right: '15px',
                top: '50%',
                marginTop: '-9px',
                borderRadius: '50%',
                boxShadow: 'inset 0px 1px 0px #052756, 0px 1px 0px #60c9f0',
            },
            ':active': {
                top: '3px',
                boxShadow: 'inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #156785, 0px 5px 3px #999',
                backgroundImage: '-webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(62,184,229)), color-stop(1, rgb(44,160,202)) )',
                backgroundColor: '#3bb3e0',
                padding: '10px 20px',
                paddingRight: '50px',
                borderRadius: '5px',
                float:'left',
                fontSize:'13px',
            },
            ':active::before':{
                backgroundColor: '#2591b4',
                backgroundImage: 'url(../img/hi.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                content: '',
                width: '20px',
                height: '20px',
                position: 'absolute',
                right: '15px',
                top: '50%',
                marginTop: '-9px',
                borderRadius: '50%',
                boxShadow: 'inset 0px 1px 0px #052756, 0px 1px 0px #60c9f0',
            }
        };
        return <a style = {slideStyle} onClick={this.props.data.onClick}> {this.props.data.text} </a>
    }
});
var Content = React.createClass({
    render: function() {

        var informationStyle = {
            backgroundColor: '#3bb3e0',
            '::before': {
                backgroundColor: '#2591b4',
            }
        };
        return <div style = {informationStyle}> this.props.data.text </div>
    }
});
var text = {
    left:'TASK',
    right:'PROJECT'
};
ReactDOM.render(<Container/>, document.getElementById('container'));
ReactDOM.render(<Slide_toggle text = {text}/>, document.getElementById('taskOrProject'));
ReactDOM.render(<Content/>, document.getElementById('content'));