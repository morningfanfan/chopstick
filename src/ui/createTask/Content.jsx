
import React from "react";

export var Content = React.createClass({
    render: function() {
        var informationOutStyle = {
            width: '419px',
            height: '120px',
            margin: '0 auto',
            marginTop: '30px',
            borderColor: '#e2e7ec',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '4px',
            position: 'relative'
        };
        var informationInnerLeftStyle = {
            width: '10%',
            height: '100%',
            borderRightColor: '#e2e7ec',
            borderRightWidth: '2px',
            borderRightStyle: 'solid',
            float: 'left'
        };
        var informationInnerRightStyle = {
            width: '89.5%',
            height: '100%',
            float: 'left'
        };
        var informationInnerTopStyle = {
            width: '100%',
            height: '50%',
            backgroundColor: '#f1f3f9',
            borderBottomColor: '#e2e7ec',
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid',
            position: 'relative'
        };
        var informationInnerBottomStyle = {
            width: '100%',
            height: '50%',
            position: 'relative'
        };
        var imgStyle = {
            position: 'absolute',
            top: '18px',
            left: '10px',
            width: '22px',
            height: '22px'
        };
        var textStyle = {
            fontSize: '15px',
            fontFamily: 'Lato,Arial,serif',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textAlign: 'left',
            textIndent: '40px',
            lineHeight: '60px',
            color: 'rgb(74,83,116)'
        };
        var numberStyle = {
            fontSize: '20px',
            fontFamily: 'Lato,Arial,serif',
            fontWeight: 'bold',
            fontStyle: 'oblique',
            textAlign: 'left',
            textIndent: '15px',
            lineHeight: '120px',
            color: 'rgb(200,206,213)'
        };
        return (<div style={informationOutStyle}>
        <div style={_.extend(informationInnerLeftStyle,numberStyle)}>1</div>
        <div style={informationInnerRightStyle}>
        <div style={_.extend(informationInnerTopStyle,textStyle)}><img style={imgStyle} src='./statics/img/nn.png'></img>name</div>
        <div style={_.extend(informationInnerBottomStyle,textStyle)}><img style={imgStyle} src='./statics/img/tt.png'></img>tags</div>
        </div></div>);
    }
});