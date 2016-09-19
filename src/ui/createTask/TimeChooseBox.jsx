import React from "react";
import $ from "jquery";
import Datetime from "react-datetime";
export var TimeChooseBox = React.createClass({
    returnValue: function(who, value) {
        this.props.returnValue(who, value)
    },
    render: function() {
        return <Datetime ref="time" onBlur={this.returnValue.bind(this,"name",refs.time.value)}/>
    }
})