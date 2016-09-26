import React from "react";
import ReactDOM from "react-dom";
import {
    TodoElement
} from "./HandleMove";
import _ from "lodash";
import update from 'react-addons-update';
import {
    Container
} from "../createTask/createTask";
import PubSub from "pubsub-js"

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
var i = 40 //indent danwei
var h = 80 //height danwei
var oneMove = 1
var oneHeight = 1
export var Form = React.createClass({
    getInitialState: function() {
        return {
            toDoList: result,
            offsetIndent: 0,
            onCreate: false,
            arrivingData: null,
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
    findChidrenWhoIsMoving: function() {
        var index = -1
        this.state.toDoList.map(function(it) {
            if (it.move) {
                index = it.index
            }
        })
        return index
    },
    exchange: function(a, b) {
        //交换除index以外的内容
        var indexA = this.state.toDoList[a].index
        var indexB = this.state.toDoList[b].index
        var tmp = this.state.toDoList[a]
        var newData = update(this.state, {
            toDoList: {
                [a]: {
                    $set: this.state.toDoList[b]
                }
            }
        })
        var newData = update(newData, {
            toDoList: {
                [b]: {
                    $set: tmp
                }
            }
        })
        var newData = update(newData, {
            toDoList: {
                [a]: {
                    index: {
                        $set: indexA
                    }
                }
            }
        })
        var newData = update(newData, {
            toDoList: {
                [b]: {
                    index: {
                        $set: indexB
                    }
                }
            }
        })
        this.setState(newData)

    },
    a: function(e, X) {
        var index = this.findChidrenWhoIsMoving()
        if (index != 0) {
            var n = parseInt(X / i)
            console.log(n)
            var max = this.state.toDoList[index - 1].indent / i - this.state.movingXIndent / i + 1
            max > 0 ? (max >= n ?
                    this.setState({
                        offsetIndent: n * i
                    }) :
                    this.setState({
                        offsetIndent: max * i
                    })) :
                this.setState({
                    offsetIndent: 0
                })
        }
    },
    b: function(X) {
        var index = this.findChidrenWhoIsMoving()

        if (index != 0) {
            var n = Math.abs(parseInt(X / i))
            console.log("b" + n)
            var max = this.state.movingXIndent / i
            max > 0 ? (max >= n ?
                    this.setState({
                        offsetIndent: -n * i
                    }) :
                    this.setState({
                        offsetIndent: -max * i
                    })) :
                this.setState({
                    offsetIndent: 0
                })
        }
    },
    c: function(X) {
        this.setState({
            offsetIndent: 0
        })
    },
    d: function(Y) {
        var index = this.findChidrenWhoIsMoving()
        if (Y < -h / oneHeight && index != 0) {
            this.exchange(index, index - 1)
            this.setState({
                initPositionX: this.state.itState.mouseX,
                initPositionY: this.state.itState.mouseY
            })
        }
        if (Y > h / oneHeight && index != this.state.toDoList.length - 1) {
            this.exchange(index, index + 1)
            this.setState({
                initPositionX: this.state.itState.mouseX,
                initPositionY: this.state.itState.mouseY
            })
        }
    },
    componentDidUpdate: function(prevprops, prevstate) {
        if (prevstate.offsetIndent !== this.state.offsetIndent) {
            var index = this.findChidrenWhoIsMoving()
            var toDoList = this.state.toDoList
            toDoList[index].indent = toDoList[index].indent + this.state.offsetIndent
            this.setState({
                toDoList: toDoList
            })
        }
        if (!prevstate.arrivingData && this.state.arrivingData) {
            this.resort()
        }
        if (prevstate.doneToDoList != this.state.doneToDoList) {
            //$.cookie('doneTask', this.state.doneToDoList, {
            //     expires: 365
            //   });
        }
    },
    componentWillMount: function() {
        PubSub.subscribe("done!", function(msg, data) {
            try {
                this.setState({
                    arrivingData: data
                })
            } catch (e) {
                console.log(e)
            }
        }.bind(this))
        PubSub.subscribe("new!", function(msg, data) {
            try {
                PubSub.publish("hello!");
                this.setState({
                    beClick: -1
                })
            } catch (e) {
                console.log(e)
            }
        }.bind(this))
    },
    sortToDoList: function(X, Y) {
        X > i / oneMove ?
            this.a(X) :
            X < -i / oneMove ?
            this.b(X) :
            this.c(X);
        this.d(Y);
    },
    changeFatherMoveState: function(id) {
        var index = this.findChidrenById(id)
        var newData = update(this.state, {
            toDoList: {
                [index]: {
                    move: {
                        $set: true
                    }
                }
            },
        })
        var newData = update(newData, {
            click: {
                $set: true
            }
        })
        var newData = update(newData, {
            movingXIndent: {
                $set: this.state.toDoList[index].indent
            }
        })
        this.setState(newData)
        this.init()
    },
    mouseUp: function() {
        var newData = update(this.state, {
            toDoList: {
                [0]: {
                    move: {
                        $set: false
                    }
                }
            }
        })
        for (var i = 1; i < this.state.toDoList.length; i++) {
            var newData = update(newData, {
                toDoList: {
                    [i]: {
                        move: {
                            $set: false
                        }
                    }
                },
            })
        }
        var newData = update(newData, {
            offsetIndent: {
                $set: 0
            }
        })
        var newData = update(newData, {
            click: {
                $set: false
            }
        })
        this.setState(newData)
    },
    mouseMove: function(e) {
        this.setState({
            itState: {
                mouseX: e.pageX,
                mouseY: e.pageY
            }
        })
        if (this.state.click) {
            this.distanceCount()
        }
    },
    init: function() {
        this.setState({
            initPositionX: this.state.itState.mouseX,
            initPositionY: this.state.itState.mouseY
        })
    },
    distanceCount: function() {
        if (this.state.initPositionX) {
            var Y = this.state.itState.mouseY - this.state.initPositionY //+ this.state.offsetY;
            var X = this.state.itState.mouseX - this.state.initPositionX;
            this.sortToDoList(X, Y)
        }
    },
    callbackParent: function(index) {
        PubSub.publish("hello!");
        this.setState({
            beClick: index
        })
    },
    deleteme: function(id) {
        var index = this.findChidrenById(id)
        if (index != undefined) {
            var beDeleted = this.state.toDoList[index]
            var doneDeleteIndexElem = this.state.toDoList
            if (this.state.toDoList[index].type == "project") {
                var x = this.howManyBelongsToThisProject(index)
                doneDeleteIndexElem.splice(index, x)
                this.setState({
                    toDoList: this.sortIndex(doneDeleteIndexElem),
                    //doneToDoList: this.state.doneToDoList.push(beDeleted)
                })
            } else {
                doneDeleteIndexElem.splice(index, 1)
                this.setState({
                    toDoList: this.sortIndex(doneDeleteIndexElem),
                    //doneToDoList: this.state.doneToDoList.push(beDeleted)
                })
            }

        }
    },
    howManyBelongsToThisProject: function(index) {
        var count = 1
        for (var i = 1; i < this.state.toDoList.length - index; i++) {
            if (this.state.toDoList[index + i].indent > this.state.toDoList[index].indent) {
                console.log("kek")
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
    resort: function() {
        var data = this.state.arrivingData
        data.id = this.state.toDoList.length + 10; //random?
        data.move = false;
        data.indent = this.state.beClick == -1 ? 40 : this.state.toDoList[this.state.beClick].indent + i;
        var tmp = this.state.toDoList
        if (this.state.beClick == -1)
            tmp.splice(this.state.toDoList.length, 0, data)
        else
            tmp.splice(this.state.beClick + 1, 0, data)
        var final = this.sortIndex(tmp)
        this.setState({
            toDoList: final,
            arrivingData: false
        })
    },
    eachElement: function(it) {
        return <TodoElement key={it.id} itState={this.state.itState} data={it} deleteme={this.deleteme}changeFatherMoveState={this.changeFatherMoveState} callbackParent={this.callbackParent}/>
    },
    render: function() {
        var shelterStyle = {
            backgroundColor: this.state.onCreate ? "#fff" : "none",
            zIndex: "2",
            opacity: "0.4"
        }
        return <div>
        <div style={taskDisplayStyle} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}>
        <div style={boderStyle}><i className="material-icons" style={{marginRight:"5px"}}>face</i>TODOLIST
        </div>
        {this.state.toDoList.map(this.eachElement)}</div>
        <div style={shelterStyle}></div>
        </div>
    }
})
var taskDisplayStyle = {
    backgroundColor: "#fff",
    position: "relative",
    left: "200px",
    top: "100px"
}
var boderStyle = {
    width: "200px",
    height: "30px",
    marginBottom: "50px",
    color: "#dcd4d4",
    fontFamily: "fantasy",
    fontSize: "30px"
}