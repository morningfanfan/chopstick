import React from "react";
import $ from "jquery";
import Datetime from "react-datetime";
export var TimeChooseBox = React.createClass({
    returnValue: function(who) {
        this.props.returnValue(who, this.refs[who].value)
    },
    render: function() {
        return <Datetime ref="time" onBlur={this.returnValue.bind(this,"time")}/>
    }
})