import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import _ from "lodash";

var text = {
    left:'ONETASK',
    right:'PROJECT'
};
var Slide_toggle = React.createClass({
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
    render: function() {
        var dataL = {
            clickDown: this.state.leftClickDown,
            text: this.props.text.left,
            onClick: this.clickLeft,
            img:'./src/createTask/img/f.png',
            imgLeft:'60%'
        };
        var dataR = {
            clickDown: this.state.rightClickDown,
            text: this.props.text.right,
            onClick: this.clickRight,
            img:'./src/createTask/img/d.png',
            imgLeft:'10%'
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
            width:'45%',
            paddingTop:'17px',
            paddingBottom:'18px',
            paddingLeft:'5%',
            textAlign:'center',
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
            width:'22px',
            height:'22px',
            marginRight:'2%',
            position:'absolute',
            left:this.props.data.imgLeft,
            top:'13px'
        };
        var clickStyle = this.props.data.clickDown?clicked:unClick;
        return <div><img src={this.props.data.img}style={imgStyle}></img><div style={_.extend(slideStyle,clickStyle)} onClick={this.props.data.onClick}>{this.props.data.text}</div></div>
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
            width:'600px',
            height:'600px',
            margin:'0 auto'
        };
        var smallStyle = {
            width:'100%',
            height:'85px',
            backgroundColor:'#8a98b8'
        };
        var padding = {
            paddingTop:'10px'
        };
        var smallerStyle = {
            width:'70%',
            height:'52px',
            margin:'0 auto',
            borderColor:'#4a5374',
            borderWidth:'3px',
            borderStyle:'solid',
            borderRadius:'4px',
            boxShadow:'rgb(74, 83, 116) 0px 0px 20px'
        };
        return (<div style={wholeStyle}>
        <div style={smallStyle}>
        <div style={padding}>
        <div style={smallerStyle}>
        <Slide_toggle text={text}/>
        </div></div></div>
        <Content/>
        </div>)
    }
});
var Content = React.createClass({
    render: function() {
        var informationOutStyle = {
            width:'419px',
            height:'120px',
            margin:'0 auto',
            marginTop:'30px',
            borderColor:'#e2e7ec',
            borderWidth:'2px',
            borderStyle:'solid',
            borderRadius:'4px',
        };
        var informationInnerLeftStyle = {
            width:'20%',
            height:'100%',
            borderRightColor:'#e2e7ec',
            borderRightWidth:'2px',
            borderRightStyle:'solid',
            float:'left'
        };
        var informationInnerRightStyle = {
            width:'79.5%',
            height:'100%',
            float:'left'
        };
        var informationInnerTopStyle = {
            width:'100%',
            height:'50%',
            backgroundColor:'#f1f3f9',
            borderBottomColor:'#e2e7ec',
            borderBottomWidth:'2px',
            borderBottomStyle:'solid',
            position:'relative'
        };
        var informationInnerBottomStyle = {
            width:'100%',
            height:'50%',
            position:'relative'
        };
        var imgStyle = {
            position:'absolute',
            top:'15px',
            left:'10px',
            width:'22px',
            height:'22px'
        };
        var textStyle = {
            fontSize: '15px',
            fontFamily:'Lato,Arial,serif',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textAlign:'left',
            textIndent:'40px',
            lineHeight:'52px',
            color:'rgb(74,83,116)'
        };
        return (<div style={informationOutStyle}>
        <div style={informationInnerLeftStyle}></div>
        <div style={informationInnerRightStyle}>
        <div style={_.extend(informationInnerTopStyle,textStyle)}><img style={imgStyle} src='./src/createTask/img/nn.png'></img>name</div>
        <div style={_.extend(informationInnerBottomStyle,textStyle)}><img style={imgStyle} src='./src/createTask/img/tt.png'></img>tags</div>
        </div></div>);
    }
});

ReactDOM.render((<Container/>), document.getElementById('content'));