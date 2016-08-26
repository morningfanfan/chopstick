import React from "react";

export var Priority = React.createClass({
    render: function() {
        var priorityFirstStyle = {
            width: "419px",
            height: "40px",
            margin: "0 auto",
            position: "relative",
        };
        var numberStyle = {
            width: "40px",
            height: "40px",
            borderColor: "#e2e7ec",
            borderWidth: "2px",
            borderStyle: "solid",
            borderRadius: "4px",
            color: "rgb(200,206,213)",
            fontSize: "20px",
            fontFamily: "Lato, Arial, serif",
            fontWeight: "bold",
            fontStyle: "oblique",
            textAlign: "center",
            lineHeight: "40px"
        };
        var prioritySecondStyle = {
            position: "relative",
            bottom: "44px",
            left: "69px",
            width: "250px",
            height: "40px",
            borderColor: "#e2e7ec",
            borderWidth: "2px",
            borderStyle: "solid",
            borderRadius: "4px",
            color: "rgb(200,206,213)"
        };
        var priorityNameStyle = {
            float: "left",
            width: "100px",
            height: "40px",
            borderColor: "#e2e7ec",
            borderWidth: "0 2px 0 0",
            borderStyle: "solid",
            color: "rgb(74,83,116)",
            fontSize: "15px",
            letterSpacing: "1px",
            fontFamily: "Lato, Arial, serif",
            fontWeight: "bold",
            lineHeight: "40px",
            textAlign: "center"
        };
        var imgStyle = {
            marginLeft: "20px",
            marginTop: "10px",
            width: "19px",
            height: "19px"
        };
        return (<div style={priorityFirstStyle}>
                <div style={numberStyle}>3</div>
                <div style={prioritySecondStyle}>
                    <div style={priorityNameStyle}>priority</div>
                    <div style={{float:"left",marginLeft:"5px"}}>
                        <img style={imgStyle} src="./statics/img/low.png"></img>
                        <img style={imgStyle} src="./statics/img/middle.png"></img>
                        <img style={imgStyle} src="./statics/img/high.png"></img>
                    </div>
                </div>
                </div>)
    }
});