import React from "react";

export var SlideButton = React.createClass({
    render: function() {

        var slideStyle = {
            fontSize: '15px',
            fontFamily: 'Lato,Arial,serif',
            float: 'left',
            fontWeight: 'bold',
            letterSpacing: '1px',
            width: '45%',
            paddingTop: '17px',
            paddingBottom: '18px',
            paddingLeft: '5%',
            textAlign: 'center',
        };
        var unClick = {
            backgroundColor: '#8a98b8',
            color: '#fbfcfd',
        };
        var clicked = {
            backgroundColor: '#4a5374',
            color: '#8a98b8',
        };
        var imgStyle = {
            width: '22px',
            height: '22px',
            marginRight: '2%',
            position: 'absolute',
            left: this.props.data.imgLeft,
            top: '13px'
        };
        var clickStyle = this.props.data.clickDown ? clicked : unClick;
        return <div><img src={this.props.data.img}style={imgStyle}></img><div style={_.extend(slideStyle,clickStyle)} onClick={this.props.data.onClick}>{this.props.data.text}</div></div>
    }
});