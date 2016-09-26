import ReactDOM from "react-dom";
import React from "react";
import PubSub from "pubsub-js"
export var Add = React.createClass({
    createATask: function() {
        PubSub.publish("new!")
    },
    render: function() {
        return <div style={addStyleDiv}>
                    <button onClick={this.createATask}  className="btn btn-2 btn-2a">+ ONE
                    </button>
                    </div>
    }
})
var addStyleDiv = {
    backgroundColor: "#d7d5d5",
    height: "80px",
    width: "100%",
    position: "fixed",
    zIndex: "7"
}
var addStyle = {
    backgroundColor: "red",
    height: "40px",
    width: "10px"
}