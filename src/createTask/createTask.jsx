import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import _ from "lodash";

var Slide_toggle = React.createClass({
    getInitialState: function() {
        return {
            leftClickDown: false,
            rightClickDown: false,
        };
    },
    clickLeft: function() {
        this.changeClick(left);
    },
    clickRight: function() {
        this.changeClick(right);
    },
    changeClick: function(n) {
            n == left ? (!this.state.rightClickDown ?
            this.setState({
                leftClickDown: true
            }) :
            this.setState({
                leftClickDown: true,
                rightClickDown: false
            })
        ) : (!this.state.leftClickDown ?
            this.setState({
                rightClickDown: true
            }) :
            this.setState({
                leftClickDown: false,
                rightClickDown: true
            })

        )

    },
    render: function() {
        var dataL = {
            clickDown: this.state.leftClickDown,
            text: this.props.text.left
        };
        var dataR = {
            clickDown: this.state.rightClickDown,
            text: this.props.text.right
        };
        return (<div>
                    <Slide_button data={dataL} onClick={this.clickLeft}/> 
                    <Slide_button data={dataR} onClick={this.clickRight}/> 
                </div>);
    }
});
var Slide_button = React.createClass({
    render: function() {
        var slideStyleClicked = {
            top: '3px',
            boxShadow: 'inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #156785, 0px 5px 3px #999',
            backgroundImage: '-webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(62,184,229)), color-stop(1, rgb(44,160,202)) )',
            backgroundColor: '#3bb3e0',
            padding: '10px 20px',
            paddingRight: '50px',
            borderRadius: '5px',
            position: 'relative',
            '::before': {
                backgroundColor: '#2591b4',
                backgroundImage: 'url(../images/right_arrow.png)',
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

        var slideStyle = {
            backgroundColor: '#3bb3e0',
            fontSize: '12px',
            // width:'40px',
            padding: '10px 20px',
            paddingRight: '50px',
            position: 'relative',
            borderRadius: '5px',
            boxShadow: 'inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785, 0px 10px 5px #999',
            backgroundImage: '-webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(44,160,202)), color-stop(1, rgb(62,184,229)) )',
            '::before': {
                backgroundColor: '#2591b4',
                backgroundImage: 'url(../images/right_arrow.png)',
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
        return <div style = {slideStyle}> this.props.data.text </div>
    }
});

var text = 'a';
ReactDOM.render(<Slide_toggle text = {text}/>, document.getElementById('content'));