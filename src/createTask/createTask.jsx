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
        <Time/>
        <Next/>
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
            position:'relative'
        };
        var informationInnerLeftStyle = {
            width:'10%',
            height:'100%',
            borderRightColor:'#e2e7ec',
            borderRightWidth:'2px',
            borderRightStyle:'solid',
            float:'left'
        };
        var informationInnerRightStyle = {
            width:'89.5%',
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
        var numberStyle = {
            fontSize: '20px',
            fontFamily:'Lato,Arial,serif',
            fontWeight: 'bold',
            fontStyle:'oblique',
            textAlign:'left',
            textIndent:'15px',
            lineHeight:'120px',
            color:'rgb(200,206,213)'
        };
        return (<div style={informationOutStyle}>
        <div style={_.extend(informationInnerLeftStyle,numberStyle)}>1</div>
        <div style={informationInnerRightStyle}>
        <div style={_.extend(informationInnerTopStyle,textStyle)}><img style={imgStyle} src='./src/createTask/img/nn.png'></img>name</div>
        <div style={_.extend(informationInnerBottomStyle,textStyle)}><img style={imgStyle} src='./src/createTask/img/tt.png'></img>tags</div>
        </div></div>);
    }
});
var Time = React.createClass({
    render: function() {

        var timeFirstStyle = {
            width:'419px',
            height:'40px',
            margin:'0 auto',
            marginTop:'20px',
            borderColor:'#e2e7ec',
            borderWidth:'2px',
            borderStyle:'solid',
            borderRadius:'4px',
            position:'relative'
        };
        var positionBox = {
            width:'422px',
            height:'130px',
            margin:'0 auto',
            position:'relative'
        };
        var timeSecondStyle = {
            width:'350px',
            height:'50px',
            borderColor:'#e2e7ec',
            borderWidth:'2px',
            borderStyle:'solid',
            borderRadius:'4px',
            float:'right',
            fontSize: '15px',
            fontFamily:'Lato,Arial,serif',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textAlign:'left',
            textIndent:'40px',
            lineHeight:'52px',
            color:'rgb(74,83,116)'
        };
        var startTimeStyle = {
        };
        var endTimeStyle = {
            marginTop:'10px'
        };
        var repeatStyle = {
            marginTop:'10px'
        };
        var img1Style = {
            position:'absolute',
            top:'28px',
            left:'80px',
            width:'19px',
            height:'19px'
        };
        var img2Style = {
            position:'absolute',
            top:'92px',
            left:'80px',
            width:'19px',
            height:'19px'
        };
        var img3Style = {
            position:'absolute',
            top:'156px',
            left:'80px',
            width:'19px',
            height:'19px'
        };
        return (<div><div style={timeFirstStyle}></div>
        <div style={positionBox}>
        <div style={_.extend(timeSecondStyle,startTimeStyle)}><img style={img1Style} src='./src/createTask/img/time.png'></img>start time</div>
        <div style={_.extend(timeSecondStyle,endTimeStyle)}><img style={img2Style} src='./src/createTask/img/time.png'></img>end time</div>
        <div style={_.extend(timeSecondStyle,repeatStyle)}><img style={img3Style} src='./src/createTask/img/time.png'></img>repeat</div>
        </div>
        </div>)
    }
});
var Next = React.createClass({
    render: function() {
        var nextStyle = {
            width:'100%',
            height:'70px',
            backgroundColor:'#00d4c3',
            color:'#fff',
            fontSize: '20px',
            fontFamily:'Lato,Arial,serif',
            fontWeight: 'bold',
            letterSpacing: '3px',
            textAlign:'center',
            lineHeight:'70px',
            position:'relative',
            top:'100px'
        };
        var imgStyle = {
            position:'absolute',
            top:'156px',
            left:'80px',
            width:'19px',
            height:'19px'
        };
        return <div style={nextStyle}>ADD SOME NOTE</div>
    }
});

ReactDOM.render((<Container/>), document.getElementById('content'));