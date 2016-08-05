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
            onClick: this.clickLeft,
            img:'./img/Documents.png'
        };
        var dataR = {
            clickDown: this.state.rightClickDown,
            text: this.props.text.right,
            onClick: this.clickRight,
            img:'./img/Briefcase.png'
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
            width:'40%',
            paddingTop:'10px',
            paddingBottom:'10px',
            textAlign:'center',
            paddingLeft:'10%'
        };
        var unClick = {
            backgroundColor: '#8a98b8',
            color:'#fbfcfd',
        };
        var clicked = {
            backgroundColor: '#4a5374',
            color:'#8a98b8',
        };
        var imgStyle = {
            src:this.props.data.img,
            width:'10px',
            height:'10px'
        };
        var clickStyle = this.props.data.clickDown?clicked:unClick;
        return <div style={_.extend(slideStyle,clickStyle)} onClick={this.props.data.onClick}><img style={imgStyle}></img> {this.props.data.text} </div>
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
        var smallStyle = {
            width:'100%',
            height:'50px',
            backgroundColor:'#8a98b8'
        };
        var padding = {
            paddingTop:'5px'
        };
        var smallerStyle = {
            width:'80%',
            height:'37px',
            margin:'0 auto',
            borderColor:'#4a5374',
            borderWidth:'1px',
            borderStyle:'double'
        };
        return (<div style={wholeStyle}><div style={smallStyle}><div style={padding}><div style={smallerStyle}><Slide_toggle text={text}/></div></div></div></div>)
    }
});

ReactDOM.render((<Container/>), document.getElementById('content'));