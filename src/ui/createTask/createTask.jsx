import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import {SlideToggle} from "./SlideToggle";
import {SlidePage} from "./SlidePage";



export var Container = React.createClass({
    render: function() {
        var wholeStyle = {
            boxShadow: '0 0 20px rgba(74,83,116,0.8)',
            width: '600px',
            height: '600px',
            margin: '0 auto',
            visibility: 'hidden'
        };
        var smallStyle = {
            width: '100%',
            height: '85px',
            backgroundColor: '#8a98b8'
        };
        var padding = {
            paddingTop: '13px'
        };
        var smallerStyle = {
            width: '70%',
            height: '52px',
            margin: '0 auto',
            borderColor: '#4a5374',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderRadius: '4px',
            boxShadow: 'rgb(225, 225, 225) 0px 0px 10px'
        };
        return (<div style={wholeStyle}>
        <div style={smallStyle}>
        <div style={padding}>
        <div style={smallerStyle}>
        <SlideToggle/>
        </div></div></div>
        <SlidePage/>
        </div>)
    }
});