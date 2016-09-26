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
import {
    Note
}
from "./Note";
import {
    spring,
    Motion
} from "react-motion";

export var SlidePage = React.createClass({
    getInitialState: function() {
        return {
            page: 1,
            slide: false
        };
    },
    callbackParent: function(e) {
        if (e == "basicInformation") {
            this.setState({
                page: 1
            })
        }
        if (e == "note") {
            this.setState({
                page: 2
            })
        }
        if (e == "submit") {
            this.props.closeCreateWindow()
        }
    },
    componentDidUpdate: function(prevprops, prevstate) {
        if (prevstate.page == 1 && this.state.page == 2) {
            this.setState({
                slideLeft: true
            })
        }
        if (prevstate.page == 2 && this.state.page == 1) {
            this.setState({
                slideLeft: false
            })
        }
        if (this.props.shouldClearTag) {
            this.setState({
                page: 1
            })
        }
    },
    render: function() {

        return <Motion defaultStyle={{x: 0}} style={{x: spring(this.state.slideLeft ? 600 : 0)}}>
        {({x}) =><div><div style={{left:x,position:"relative"}}>
                        <Content returnValue={this.props.returnValue} shouldClearTag={this.props.shouldClearTag} clearTagDone={this.props.clearTagDone}/>
                        <Time returnValue={this.props.returnValue}/>
                        <Priority returnValue={this.props.returnValue} shouldClearTag={this.props.shouldClearTag}/>
                        <Next callbackParent={this.callbackParent} data={data} returnValue={this.props.returnValue}/>
                        </div><div style={{left:x-600,bottom:"480px",position:"relative"}}>
                        <Note callbackParent={this.callbackParent} returnValue={this.props.returnValue}/>
                        </div>
                        </div>
        
        }
        </Motion>
    }
});
var data = {
    word: "OR ADD SOME NOTE",
    imgSrc1: "check",
    imgSrc2: "broken_image",
    slideTo: "note",
    ifSubmitHover: "#42a39b",
    ifSubmitNotHover: "rgb(54,135,128)",
    ifNoteHover: "rgb(2,228,209)",
    ifNoteNotHover: "#00d4c3",
    clickLeftButton: "submit",
    clickRightButton: "slide"
}