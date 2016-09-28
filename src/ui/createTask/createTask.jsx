import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import {
    SlideToggle
} from "./SlideToggle";
import {
    SlidePage
} from "./SlidePage";
import PubSub from "pubsub-js"
export var Container = React.createClass({
    getInitialState: function() {
        return {
            name: null,
            type: "task",
            tag: [],
            startTime: " ",
            endTime: " ",
            priority: 1,
            note: " ",
            visibility: "hidden",
            shouldClearTag: false
        }
    },
    returnValue: function(who, value) {
        switch (who) {
            case "type":
                this.setState({
                    type: value
                })
                break;
            case "name":
                this.setState({
                    name: value
                })
                break;
            case "tag":
                this.setState({
                    tag: value
                })
                break;
            case "startTime":
                this.setState({
                    startTime: value
                })
                break;
            case "endTime":
                this.setState({
                    endTime: value
                })
                break;
            case "priority":
                this.setState({
                    priority: value
                })
                break;
            case "note":
                this.setState({
                    note: value
                })
                break;
        }
    },
    clearTagDone: function() {
        this.setState({
            shouldClearTag: false
        })
    },
    closeCreateWindow: function() {
        document.getElementById("inputForName").value = ""
        document.getElementById("inputForTag").value = ""
        document.getElementById("inputForNote").value = ""
        document.getElementById("startTime").value = ""
        document.getElementById("endTime").value = ""
        if (this.state.name) {
            PubSub.publish("done!", {
                name: this.state.name,
                type: this.state.type,
                priority: this.state.priority,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                tag: this.state.tag,
                note: this.state.note
            })
        } else
            alert("can not create task/project without name!")
        this.setState({
            visibility: "hidden",
            name: null,
            type: "task",
            tag: [],
            startTime: " ",
            endTime: " ",
            priority: 1,
            note: " ",
            shouldClearTag: true
        })
    },
    componentWillMount: function() {
        PubSub.subscribe("hello!", function(msg, data) {
            this.setState({
                visibility: "visible"
            })
        }.bind(this))
    },
    render: function() {
        var x = screen.availWidth
        var wholeStyle = {
            boxShadow: "0 0 20px rgba(74,83,116,0.8)",
            width: "600px",
            height: "600px",
            overflow: "hidden",
            position: "fixed",
            top: "15%",
            left: x >= 600 ? (x - 600) / 2 + "px" : "0px",
            backgroundColor: "white",
            zIndex: "10",
            visibility: this.state.visibility
        };
        return (<div style={wholeStyle}>
        <div style={smallStyle}>
        <div style={padding}>
        <div style={smallerStyle}>
        <SlideToggle returnValue={this.returnValue} shouldClearTag={this.state.shouldClearTag}/>
        </div></div></div>
        <SlidePage returnValue={this.returnValue} closeCreateWindow={this.closeCreateWindow} shouldClearTag={this.state.shouldClearTag} clearTagDone={this.clearTagDone}/>
        </div>)
    }
});

var smallStyle = {
    width: "100%",
    height: "85px",
    backgroundColor: "#8a98b8"
};
var padding = {
    paddingTop: "13px"
};
var smallerStyle = {
    width: "70%",
    height: "52px",
    margin: "0 auto",
    borderColor: "#4a5374",
    borderWidth: "3px",
    borderStyle: "solid",
    borderRadius: "4px",
    boxShadow: "rgb(225, 225, 225) 0px 0px 10px"
};