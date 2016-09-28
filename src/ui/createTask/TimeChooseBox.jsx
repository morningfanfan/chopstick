import React from "react";
import ReactDOM from "react-dom";
var Datetime = require('react-datetime');
import moment from "moment"
export var TimeChooseBox = React.createClass({
    getInitialState: function() {
        return {
            show: false
        }
    },
    returnValue: function(selected) {
        var value = selected.format("ddd,MMM Do,HH:mm")
        this.props.returnValue(this.props.id, value)
    },
    render: function() {
        return <Datetime
            inputProps={{id:this.props.id}}
            onBlur={this.returnValue}
            dateFormat={"ddd, MMM Do"}
            timeFormat={"HH:mm"}
            renderDay={ this.renderDay }
            renderMonth={ this.renderMonth }
            renderYear={ this.renderYear }
        />;
    },
    renderDay: function(props, currentDate, selectedDate) {
        return <td {...props}>{ currentDate.date() }</td>;
    },
    renderMonth: function(props, month, year, selectedDate) {
        return <td {...props}>{ month }</td>;
    },
    renderYear: function(props, year, selectedDate) {
        return <td {...props}>{ year % 100 }</td>;
    }
})