import React from "react";
import ReactDOM from "react-dom";
import {
    DoneElement
} from "./DoneElement";
import _ from "lodash";
import UUID from "uuid-js"
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

if (!localStorage.getItem('dead')) {
    var initToDo = result
} else
    var initToDo = localStorage.getItem('dead')

export var DeleteForm = React.createClass({
    getInitialState: function() {
        return {
            toDoList: initToDo,
            offsetIndent: 0,
            beClick: 0,
            renderDog: 0
        }
    },
    dealParentRelationship: function(changeElem) {

        var index = -1
        var toDoList = this.state.toDoList
        var tmp = this.state.toDoList
            //首元素在todolist中有没有爸爸
            //遍历所有子元素toolist中有没有儿子
        for (var l = 0; l < toDoList.length; l++) {
            var a = -1
            if (toDoList[l].parent.length > 0) {
                for (var i = 0; i < toDoList[l].parent.length; i++) {
                    var count = 1
                    for (var m = 0; m < changeElem.length; m++) {
                        if (toDoList[l].parent[i] == changeElem[m].id) {
                            if (toDoList[l].type == "project") {
                                count = that.howManyBelongsToThisProject(that.findChidrenById(ooDoList[l].id))
                            }
                            var indent = changeElem[m].indent - toDoList[l].indent + 40
                            var deleted = tmp.splice((that.findChidrenById(toDoList[l].id), tmp), count)
                            deleted = deleted.map(function(elem) {
                                elem.indent = elem.indent + indent
                            })
                            changeElem.splice(that.findChidrenById(changeElem[m].id, changeElem) + 1, 0, deleted)
                            tmp = this.sortIndex(tmp)
                            changeElem = this.sortIndex(changeElem)
                        }
                    }

                }
            }
        }

        if (changeElem[0].parent.length > 0) {
            for (var i = 0; i < changeElem[0].parent.length; i++) {
                index = that.findChidrenById(changeElem[0].parent[i])
                if (index != -1)
                    break
            }
        }
        if (index != -1) {
            var indent = tmp[index].indent + 40 - changeElem[0].indent
            for (var n = 0; n < changeElem.length; n++) {
                changeElem[n].indent = changeElem[n].indent + indent
            }
            tmp = tmp.splice(index + 1, 0, changeElem)
            tmp = this.sortIndex(tmp)
        } else {
            tmp = tmp.splice(tmp.length, 0, changeElem)
            tmp = this.sortIndex(tmp)
        }
        return tmp

    },
    componentDidUpdate: function(prevstate, prevprops) {
        if (prevstate.toDoList != this.state.toDoList) {
            localStorage.setItem('dead', this.state.toDoList)
        }
        if (prevstate.timeStamp != this.state.timeStamp) {
            PubSub.publish("restore", this.state.beDeleted);

        }
    },
    componentWillMount: function() {
        console.log("31")
        PubSub.subscribe("delete", function(msg, data) {
            try {
                console.log("3")
                var changeElem = data
                var dead = this.dealParentRelationship(changeElem)
                this.setState({
                    toDoList: dead
                })
            } catch (e) {
                console.log(e)
            }
        }.bind(this))
    },
    findChidrenById: function(id, arr) {
        var index = -1
        if (arr == undefined)
            arr = this.state.toDoList
        arr.map(function(it) {
            if (it.id == id) {
                index = it.index
            }
        })
        return index
    },
    parentRelationship: function(arr) {
        var that = this
        var arr = arr.map(
            function(elem) {
                var parent = []
                for (var i = 0; i <= elem.index; i++) {
                    if (elem.indent > that.state.toDoList[i].indent && that.state.toDoList[i].type == "project") {
                        parent.push(that.state.toDoList[i].id)
                    }
                }
                elem.parent = parent
            }
        )
        return arr
    },
    restoreme: function(id) {
        var index = this.findChidrenById(id)
        if (index != undefined) {
            var doneDeleteIndexElem = _.cloneDeep(this.state.toDoList)
            if (this.state.toDoList[index].type == "project") {
                var x = this.howManyBelongsToThisProject(index)
                var beDeleted = doneDeleteIndexElem.splice(index, x)
                beDeleted = this.parentRelationship(beDeleted)
                this.setState({
                    toDoList: this.sortIndex(doneDeleteIndexElem),
                    beDeleted: beDeleted,
                    timeStamp: UUID.create()
                })
            } else {
                var beDeleted = doneDeleteIndexElem.splice(index, 1)
                beDeleted = this.parentRelationship(beDeleted)
                this.setState({
                    toDoList: this.sortIndex(doneDeleteIndexElem),
                    beDeleted: beDeleted,
                    timeStamp: UUID.create()
                })
            }

        }
    },
    howManyBelongsToThisProject: function(index) {
        var count = 1
        for (var i = 1; i < this.state.toDoList.length - index; i++) {
            if (this.state.toDoList[index + i].indent > this.state.toDoList[index].indent) {
                count++
            } else break
        }
        return count
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