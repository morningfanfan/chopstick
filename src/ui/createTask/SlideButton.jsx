import React from "react";

export var SlideButton = React.createClass({
    getInitialState: function() {
        return {
            over: false
        }
    },
    mouseOver: function() {
        this.setState({
            over: true
        })
    },
    mouseOut: function() {
        this.setState({
            over: false
        })
    },
    render: function() {
        let position = this.props.data.position
        let icon = position == "left" ? "insert_drive_file" : "style"
        var slideStyle = {
            fontFamily: "Lato,Arial,serif",
            float: "left",
            fontWeight: "bold",
            letterSpacing: "1px",
            width: "45%",
            paddingTop: "16px",
            paddingBottom: "16px",
            paddingLeft: "5%",
            textAlign: "center",
            lineHeight: "20px",
            backgroundColor: this.props.data.clickDown ? "#4a5374" : this.state.over ? "#535c70" : "#8a98b8",
            color: this.props.data.clickDown ? "#8a98b8" : "#fbfcfd"
        };
        var iconStyle = {
            position: "absolute",
            left: position == "left" ? "30px" : "240px",
            color: "inherit",
            fontSize: "20px"
        }

        return <div style={slideStyle} onClick={this.props.data.onClick} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <i className="material-icons" style={iconStyle}>{icon}</i>
        {this.props.data.text}</div>
    }
});