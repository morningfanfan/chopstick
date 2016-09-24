import ReactDOM from "react-dom";
import React from "react";
import PubSub from "pubsub-js"
export var Add = React.createClass({
    createATask: function() {
        PubSub.publish("new!")
    },
    render: function() {
        return <div style={addStyleDiv}>
                    <div onClick={this.createATask} style={addStyle}></div>
                    </div>
    }
})
var addStyleDiv = {
    backgroundColor: "black",
    height: "80px",
    width: "100%",
    position: "fixed",
    zIndex: "1"
}
var addStyle = {
    backgroundColor: "red",
    height: "40px",
    width: "10px"
}