import React from "react";

export var Time = React.createClass({
    render: function() {

        var timeFirstStyle = {
            width: '419px',
            height: '40px',
            margin: '0 auto',
            marginTop: '20px',
            borderColor: '#e2e7ec',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '4px',
            position: 'relative',
            color: 'rgb(200,206,213)',
            fontSize: '20px',
            fontFamily: 'Lato, Arial, serif',
            fontWeight: 'bold',
            fontStyle: 'oblique',
            textAlign: 'left',
            textIndent: '15px',
            lineHeight: '40px'
        };
        var positionBox = {
            width: '422px',
            height: '130px',
            margin: '0 auto',
            position: 'relative'
        };
        var timeSecondStyle = {
            width: '350px',
            height: '40px',
            borderColor: '#e2e7ec',
            borderWidth: '2px',
            borderStyle: 'solid',
            float: 'right',
            fontSize: '15px',
            fontFamily: 'Lato,Arial,serif',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textAlign: 'left',
            textIndent: '40px',
            lineHeight: '40px',
            color: 'rgb(74,83,116)'
        };
        var startTimeStyle = {
            borderRadius: '100px',
        };
        var endTimeStyle = {
            marginTop: '10px',
        };
        var img1Style = {
            position: 'absolute',
            top: '23px',
            left: '80px',
            width: '19px',
            height: '19px'
        };
        var img2Style = {
            position: 'absolute',
            top: '77px',
            left: '80px',
            width: '19px',
            height: '19px'
        };
        var img3Style = {
            position: 'absolute',
            top: '151px',
            left: '80px',
            width: '19px',
            height: '19px'
        };
        var imgdown1Style = {
            position: 'absolute',
            top: '23px',
            left: '390px',
            width: '15px',
            height: '15px'
        };
        var imgdown2Style = {
            position: 'absolute',
            top: '77px',
            left: '390px',
            width: '15px',
            height: '15px'
        };
        var imgdown3Style = {
            position: 'absolute',
            top: '151px',
            left: '390px',
            width: '15px',
            height: '15px'
        };
        var lineStyle = {
            position: 'absolute',
            borderColor: '#e2e7ec',
            borderWidth: '0 0 2px 2px',
            borderStyle: 'solid',
            left: '30px',
            width: '38px',
        };
        var line1Style = {
            height: '35px'
        };
        var line2Style = {
            top: '35px',
            height: '55px'
        };
        return (<div><div style={timeFirstStyle}>2</div>
        <div style={positionBox}>
        <div style={_.extend(line1Style,lineStyle)}></div><div style={_.extend(line2Style,lineStyle)}></div>
        <div style={_.extend(timeSecondStyle,startTimeStyle)}><img style={img1Style} src='./statics/img/time.png'></img>from<img style={imgdown1Style} src='./statics/img/down.png'></img></div>
        <div style={_.extend(timeSecondStyle,endTimeStyle)}><img style={img2Style} src='./statics/img/time.png'></img>to<img style={imgdown2Style} src='./statics/img/down.png'></img></div>
        </div>
        </div>)
    }
});