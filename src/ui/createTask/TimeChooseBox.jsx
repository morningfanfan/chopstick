import React from "react";
import ReactDOM from "react-dom";
var Datetime = require('react-datetime');
import moment from "moment"
export var TimeChooseBox = React.createClass({
    getInitialState: function() {
        return {
            date: undefined
        }
    },
    returnValue: function(selected) {
        var value = selected.format("ddd,MMM Do,HH:mm")
        this.props.returnValue(this.props.id, value)
    },
    componentWillReceiveProps: function(nextprops) {
        if (!this.props.shouldClearTag && nextprops.shouldClearTag) {
            this.setState({
                date: undefined
            })
        }
    },
    render: function() {
        return <Datetime
            value={this.state.date}
            onChange={function(date){this.setState({date: date})}.bind(this)}
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