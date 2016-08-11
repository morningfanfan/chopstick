import React from "react";

export var Next = React.createClass({
    getInitialState: function() {
        return {
            noteHover: false
        };
    },
    changeColor1: function(e) {
        if (e == 1) {
            this.setState({
                noteHover: true
            });
        }
        if (e == 2) {
            this.setState({
                noteHover: false
            });
        }
    },
    changeColor2: function(e) {
        if (e == 1) {
            this.setState({
                submitHover: true
            });
        }
        if (e == 2) {
            this.setState({
                submitHover: false
            });
        }
    },
    handleClick: function(e) {
        if (e == 1) {
            this.setState({
                page: 2
            });
        };
        if (e == 2) {
            this.setState({
                page: 3
            });
        };
        this.props.callbackParent(this.state.page);
    },
    render: function() {
        var nextStyle = {
            width: '530px',
            height: '70px',
            backgroundColor: this.state.noteHover ? 'rgb(2,228,209)' : '#00d4c3',
            color: '#fff',
            fontSize: '20px',
            fontFamily: 'Lato,Arial,serif',
            fontWeight: 'bold',
            letterSpacing: '3px',
            textAlign: 'center',
            lineHeight: '70px',
            marginTop: '57px',
            position: 'relative',
            textIndent: '-70px',
            left: '70px'
        };
        var submitStyle = {
            width: '70px',
            height: '70px',
            backgroundColor: this.state.submitHover ? '#42a39b' : 'rgb(54,135,128)',
            float: 'left'
        };
        var imgStyle = {
            position: 'relative',
            left: '20px',
            width: '15px',
            height: '14px'
        };
        var submitImgStyle = {
            margin: '20px',
            width: '30px',
            height: '30px'
        };

        return <div>
        <div style={submitStyle} onClick={this.handleClick.bind(this,2)} onMouseOver={this.changeColor2.bind(this,1)} onMouseOut={this.changeColor2.bind(this,2)}><img style={submitImgStyle} src='./statics/img/yes.png'></img></div>
        <div style={nextStyle} onClick={this.handleClick.bind(this,1)} onMouseOver={this.changeColor1.bind(this,1)} onMouseOut={this.changeColor1.bind(this,2)}>OR ADD SOME NOTE
        <img style={imgStyle} src='./statics/img/arrow.png'></img>
        </div></div>
    }
});