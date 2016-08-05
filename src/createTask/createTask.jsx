import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import _ from "lodash";

var text = {
    left:'TASK',
    right:'PROJECT'
};
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
            fontSize: '15px',
            fontFamily:'Lato,Arial,serif',
            float:'left',
            fontWeight: 'bold',
            letterSpacing: '1px',
            width:'100px'
        };
        var unClick = {
            backgroundColor: '#8a98b8',
            color:'#fbfcfd',
        };
        var clicked = {
            backgroundColor: '#4a5374',
            color:'#8a98b8',
        };
        var clickStyle = this.props.data.clickDown?'clicked':'unClick';
        return <div className={'slideStyle'+' '+clickStyle} onClick={this.props.data.onClick}> {this.props.data.text} </div>
    }
});
var Content = React.createClass({
    render: function() {

        var informationStyle = {
            width:'5px'
        };
        return <div style = {informationStyle}> </div>
    }
});
var Container = React.createClass({
    render: function() {
        var wholeStyle = {
            boxShadow:'0 0 20px rgba(132,131,131,0.8)',
            width:'500px',
            height:'600px',
            margin:'0 auto'
        };
        return (<div id='container' style = {wholeStyle}><Slide_toggle text={text}/><Content/></div>)
    }
});

ReactDOM.render((<Container/>), document.getElementById('content'));