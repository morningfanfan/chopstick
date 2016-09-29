import React from "react";
import {
    TimeChooseBox
} from "./TimeChooseBox";

export var Time = React.createClass({
    render: function() {

        return (<div><div style={timeFirstStyle}>2</div>
        <div style={positionBox}>
        <div style={_.extend(line1Style,lineStyle)}></div><div style={_.extend(line2Style,lineStyle)}></div>
        <div style={_.extend(timeSecondStyle,startTimeStyle)}>
        <i style={img1Style} className="material-icons">access_time</i>
        from
        <TimeChooseBox id={data.id1} returnValue={this.props.returnValue} shouldClearTag={this.props.shouldClearTag}/>
        </div>
        <div style={_.extend(timeSecondStyle,endTimeStyle)}>
        <i style={img2Style} className="material-icons">access_time</i>
        to
        <TimeChooseBox id={data.id2} returnValue={this.props.returnValue} shouldClearTag={this.props.shouldClearTag}/>
        </div>
        </div>
        </div>)
    }
});
var timeFirstStyle = {
    width: "419px",
    height: "40px",
    margin: "0 auto",
    marginTop: "20px",
    borderColor: "#e2e7ec",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "4px",
    position: "relative",
    color: "rgb(200,206,213)",
    fontSize: "20px",
    fontFamily: "Lato, Arial, serif",
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "left",
    textIndent: "15px",
    lineHeight: "40px"
};
var positionBox = {
    width: "422px",
    height: "130px",
    margin: "0 auto",
    position: "relative"
};
var timeSecondStyle = {
    width: "350px",
    height: "40px",
    borderColor: "#e2e7ec",
    borderWidth: "2px",
    borderStyle: "solid",
    float: "right",
    fontSize: "15px",
    fontFamily: "Consolas, monaco, monospace",
    fontWeight: "bold",
    letterSpacing: "1px",
    textAlign: "left",
    textIndent: "40px",
    lineHeight: "40px",
    color: "rgb(74,83,116)"
};
var startTimeStyle = {
    borderRadius: "100px",
};
var endTimeStyle = {
    marginTop: "10px",
};
var img1Style = {
    position: "absolute",
    top: "19px",
    left: "40px",
};
var img2Style = {
    position: "absolute",
    top: "74px",
    left: "40px",
};
var img3Style = {
    position: "absolute",
    top: "151px",
    left: "80px",
    width: "19px",
    height: "19px"
};

var lineStyle = {
    position: "absolute",
    borderColor: "#e2e7ec",
    borderWidth: "0 0 2px 2px",
    borderStyle: "solid",
    left: "30px",
    width: "38px",
};
var line1Style = {
    height: "35px"
};
var line2Style = {
    top: "35px",
    height: "55px"
};
var data = {
    id1: "startTime",
    id2: "endTime"
}