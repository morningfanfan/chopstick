import React from "react";
import ReactDOM from "react-dom";
import {
    TodoElement
} from "./HandleMove";
import _ from "lodash";
import update from 'react-addons-update';

var result = [{
    name: "task1",
    type: "task",
    id: 0,
    index: 0,
    indent: 40,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am"
}, {
    name: "project1",
    type: "project",
    id: 1,
    index: 1,
    indent: 40,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am"
}, {
    name: "task2",
    type: "task",
    id: 2,
    index: 2,
    indent: 80,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am"
}, {
    name: "project2",
    type: "project",
    id: 3,
    index: 3,
    indent: 80,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am"
}, {
    name: "task4",
    type: "task",
    id: 4,
    index: 4,
    indent: 120,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am"
}, {
    name: "task5",
    type: "task",
    id: 5,
    index: 5,
    indent: 120,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am"
}, {
    name: "task3",
    type: "task",
    id: 6,
    index: 6,
    indent: 120,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am"
}, {
    name: "project3",
    type: "project",
    id: 7,
    index: 7,
    indent: 160,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am"
}, {
    name: "project2",
    type: "project",
    id: 8,
    index: 8,
    indent: 40,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am"
}, {
    name: "task4",
    type: "task",
    id: 9,
    index: 9,
    indent: 40,
    move: false,
    priority: 1,
    startTime: "2013.6.19 5:30pm",
    endTime: "2013.11.11 1:00am"
}];
var i = 40 //indent danwei
var h = 50 //height danwei
var oneMove = 4
var oneHeight = 1
export var Form = React.createClass({
    getInitialState: function() {
        return {
            toDoList: result,
            offsetIndent: 0
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
        var n = parseInt((X + (i / oneMove)) / i)
        var max = this.state.toDoList[index - 1].indent / i - this.state.toDoList[index].indent / i + 1 //meikaolvshouwei
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
    },
    b: function(X) {
        var index = this.findChidrenWhoIsMoving()
        var n = Math.abs(parseInt((X - (i / oneMove)) / i))
        var max = this.state.toDoList[index].indent / i
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
    eachElement: function(it) {
        return <TodoElement key={it.id} itState={this.state.itState} data={it} changeFatherMoveState={this.changeFatherMoveState}/>
    },
    render: function() {
        return <div onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}>{this.state.toDoList.map(this.eachElement)}</div>
    }
})

ReactDOM.render(<Form/>, document.getElementById("content1"));