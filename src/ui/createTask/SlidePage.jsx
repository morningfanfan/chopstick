import React from "react";
import {
    Priority
} from "./Priority";
import {
    Time
} from "./Time";
import {
    Next
} from "./Next";
import {
    Content
} from "./Content";

export var SlidePage = React.createClass({
    getInitialState: function() {
        return {
            page: 1
        };
    },
    setPage: function(page) {
        this.setState({
            page: page
        })
    },
    render: function() {
        var animateStyle = {
            width: "70px",
            height: "70px",
            backgroundColor: this.state.submitHover ? "#42a39b" : "rgb(54,135,128)",
            float: "left"
        };
        if (this.state.page == 1) {
            return (<div>        
                <Content/>
                <Time/>
                <Priority/>
                <Next callbackParent={this.setPage}/>
                </div>)
        };
        if (this.state.page == 2) {
            return (<div style={animateStyle}>        
                <Content/>
                <Time/>
                <Priority/>
                <Next callbackParent={this.setPage}/>
                </div>)
        }
    }
});