import React from "react";
import {
    Next
} from "./Next"
export var Note = React.createClass({
    render: function() {
        var noteStyle = {
            borderColor: "#e2e7ec",
            borderWidth: "2px",
            borderStyle: "solid",
            width: "419px",
            height: "300px",
            position: "relative",
            left: "90px"
        };
        var data = {
            word: "SUBMIT",
            imgSrc: "./statics/img/yes.png",
            slideTo: "basicInformation",
            ifSubmitHover: "#d85170",
            ifSubmitNotHover: "#ef6c8a",
            ifNoteHover: "#fff",
            ifNoteNotHover: "#c3094c",
            clickLeftButton: "slide",
            clickRightButton: "submit"
        }
        return <div><div style={noteStyle}></div>
        <Next data={data} callbackParent={this.props.callbackParent}/>
        </div>
    }
})