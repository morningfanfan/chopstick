import React from "react";
import {
    Next
} from "./Next"
export var Note = React.createClass({
    returnValue: function(who) {
        this.props.returnValue(who, this.refs[who].value)
    },
    render: function() {
        return <div><div style={{position: "relative",left: "90px"}}>
        <div style={numberStyle}>4</div>
        <textarea id="inputForNote" ref="note" maxLength="80" style={noteStyle} type="text"  onBlur={this.returnValue.bind(this,"note")} placeholder="Taking notes here..."/>
        </div>
        <Next data={data} callbackParent={this.props.callbackParent}/>
        </div>
    }
})

var noteStyle = {
    borderColor: "#e2e7ec",
    borderWidth: "2px",
    borderStyle: "solid",
    width: "419px",
    height: "300px",
    fontSize: "16px",
    fontWeight: "bold",
    fontFamily: "cursive"
};
var data = {
    word: "SUBMIT",
    imgSrc1: "arrow_forward",
    imgSrc2: "inbox",
    slideTo: "basicInformation",
    ifSubmitHover: "#d85170",
    ifSubmitNotHover: "#ef6c8a",
    ifNoteHover: "#d96c93",
    ifNoteNotHover: "#c5587f",
    clickLeftButton: "slide",
    clickRightButton: "submit"
}
var numberStyle = {
    width: "40px",
    height: "40px",
    borderColor: "#e2e7ec",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "4px",
    color: "rgb(200,206,213)",
    fontSize: "20px",
    fontFamily: "Lato, Arial, serif",
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: "40px",
    marginBottom: "10px"
};