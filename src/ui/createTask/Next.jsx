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
    handleClick: function(q) {
        if (q == "slide")
            this.props.callbackParent(this.props.data.slideTo);
        if (q == "submit") {}
        ///////////////
    },
    render: function() {
        var nextStyle = {
            width: "530px",
            height: "70px",
            backgroundColor: this.state.noteHover ? this.props.data.ifNoteHover : this.props.data.ifNoteNotHover,
            color: "#fff",
            fontSize: "20px",
            fontFamily: "Lato,Arial,serif",
            fontWeight: "bold",
            letterSpacing: "3px",
            textAlign: "center",
            lineHeight: "70px",
            marginTop: "57px",
            position: "relative",
            textIndent: "-110px",
            left: "70px"
        };
        var submitStyle = {
            width: "70px",
            height: "70px",
            backgroundColor: this.state.submitHover ? this.props.data.ifSubmitHover : this.props.data.ifSubmitNotHover,
            float: "left"
        };
        var imgStyle = {
            position: "relative",
            left: "20px",
            width: "15px",
            height: "14px"
        };
        var submitImgStyle = {
            margin: "20px",
            width: "30px",
            height: "30px"
        };

        return <div>
        <div style={submitStyle} onClick={this.handleClick.bind(this,this.props.data.clickLeftButton)} onMouseOver={this.changeColor2.bind(this,1)} onMouseOut={this.changeColor2.bind(this,2)}><img style={submitImgStyle} src={this.props.data.imgSrc}></img></div>
        <div style={nextStyle} onClick={this.handleClick.bind(this,this.props.data.clickRightButton)} onMouseOver={this.changeColor1.bind(this,1)} onMouseOut={this.changeColor1.bind(this,2)}>{this.props.data.word}
        <img style={imgStyle} src="./statics/img/arrow.png"></img>
        </div></div>
    }
});