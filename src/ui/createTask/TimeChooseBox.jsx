import React from "react";
import rome from "rome";
export var TimeChooseBox = React.createClass({
    returnValue: function(who) {
        this.props.returnValue(who, this.refs[who].value)
        console.log(this.refs[who].value)
    },
    render: function() {
        rome(this.props.id, {
            initialValue: '2014-12-08 08:36'
        });
        return <div id={this.props.id} ref="time" onBlur={this.returnValue.bind(this,"time")}>  </div>
    }
})