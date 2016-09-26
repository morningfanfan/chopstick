import React from "react";
import ReactDOM from "react-dom";
import {
    DoneElement
} from "./DoneElement";
import _ from "lodash";

var result = [{
    name: "task1",
    type: "task",
    id: 0,
    index: 0,
    indent: 40,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am",
    tag: ["xx", "hh", "qqqqq"]
}, {
    name: "project1",
    type: "project",
    id: 1,
    index: 1,
    indent: 40,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am",
    tag: ["xx", "hh", "qqqqq"]
}, {
    name: "task2",
    type: "task",
    id: 2,
    index: 2,
    indent: 80,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am",
    tag: ["xx", "hh", "qqqqq"]
}, {
    name: "project2",
    type: "project",
    id: 3,
    index: 3,
    indent: 80,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am",
    tag: ["xx", "hh", "qqqqq"]
}, {
    name: "task4",
    type: "task",
    id: 4,
    index: 4,
    indent: 120,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am",
    tag: ["xxxxxx", "hhxxxx", "qqqqxq"]
}, {
    name: "task5",
    type: "task",
    id: 5,
    index: 5,
    indent: 120,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am",
    tag: ["xx", "hh", "qqqqq"]
}, {
    name: "task3",
    type: "task",
    id: 6,
    index: 6,
    indent: 120,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am",
    tag: ["xx", "hh", "qqqqq"]
}, {
    name: "project3",
    type: "project",
    id: 7,
    index: 7,
    indent: 160,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am",
    tag: ["xx", "hh", "qqqqq"]
}, {
    name: "project2",
    type: "project",
    id: 8,
    index: 8,
    indent: 40,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am",
    tag: ["xx", "hh", "qqqqq"]
}, {
    name: "task4",
    type: "task",
    id: 9,
    index: 9,
    indent: 40,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am",
    tag: ["xx", "hh", "qqqqq"]
}];

export var DeleteForm = React.createClass({
    getInitialState: function() {
        return {
            toDoList: result,
            offsetIndent: 0,
            beClick: 0,
            //doneToDoList: $.cookie('doneTask')
        }
    },
    findChidrenById: function(id) {
        var index = -1
        this.state.toDoList.map(function(it) {
            if (it.id == id) {
                index = it.index
            }
        })
        return index
    },
    restoreme: function(id) {
        var index = this.findChidrenById(id)
        if (index) {
            var beDeleted = this.state.toDoList[index]
            var doneDeleteIndexElem = this.state.toDoList
            doneDeleteIndexElem.splice(index, 1)
            this.setState({
                toDoList: this.sortIndex(doneDeleteIndexElem),
                //doneToDoList: this.state.doneToDoList.push(beDeleted)
            })
        }
    },
    sortIndex: function(arr) {
        var changeArr = arr
        for (var i = 0; i < arr.length; i++) {
            changeArr[i].index = i;
        }
        return changeArr
    },
    eachElement: function(it) {
        return <DoneElement key={it.id} data={it} restoreme={this.restoreme}/>
    },
    render: function() {
        return <div>
        <div style={taskDisplayStyle} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}>
        <div style={boderStyle}><i className="material-icons" style={{marginRight:"5px"}}>delete</i>ALREADYDONE
        </div>
        {this.state.toDoList.map(this.eachElement)}</div>
        </div>
    }
})
var taskDisplayStyle = {
    backgroundColor: "#fff",
    position: "relative",
    left: "200px",
    top: "250px"
}
var boderStyle = {
    width: "200px",
    height: "30px",
    marginBottom: "50px",
    color: "#d8d4dc",
    fontFamily: "fantasy",
    fontSize: "30px"
}