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
    move: false
}, {
    name: "project1",
    type: "project",
    id: 1,
    index: 1,
    indent: 40,
    move: false
}, {
    name: "task2",
    type: "task",
    id: 2,
    index: 2,
    indent: 80,
    move: false
}, {
    name: "project2",
    type: "project",
    id: 3,
    index: 3,
    indent: 80,
    move: false
}, {
    name: "task4",
    type: "task",
    id: 4,
    index: 4,
    indent: 120,
    move: false
}, {
    name: "task5",
    type: "task",
    id: 5,
    index: 5,
    indent: 120,
    move: false
}, {
    name: "task3",
    type: "task",
    id: 6,
    index: 6,
    indent: 120,
    move: false
}, {
    name: "project3",
    type: "project",
    id: 7,
    index: 7,
    indent: 160,
    move: false
}, {
    name: "project2",
    type: "project",
    id: 8,
    index: 8,
    indent: 40,
    move: false
}, {
    name: "task4",
    type: "task",
    id: 9,
    index: 9,
    indent: 40,
    move: false
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
                var index = it.index
            }
        })
        console.log(index)
            //  console.log(this.state.toDoList)
        return index
    },
    exchange: function(a, b) {
        console.log(this.state.click)
        console.log(a)
            //console.log(this.state.toDoList)
            //交换除index以外的内容
        var toDoList = this.state.toDoList
        var indexA = this.state.toDoList[a].index
        var indexB = this.state.toDoList[b].index
        var tmp = toDoList[a]
        toDoList[a] = toDoList[b]
        toDoList[b] = tmp
        toDoList[a].index = indexA
        toDoList[b].index = indexB
        this.setState({
            toDoList: toDoList,
        })

    },
    a: function(e, X) {
        var index = this.findChidrenWhoIsMoving()
            //console.log(index)
            //console.log(this.state.toDoList)
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
        }
        if (Y > h / oneHeight && index != this.state.toDoList.length - 1) {
            this.exchange(index, index + 1)
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
        console.log(index)
        var newData = update(this.state, {
            toDoList: {
                index: {
                    move: {
                        $set: true
                    }
                }
            },
            click: true
        })
        this.setState(newData)
        this.init()
    },
    mouseUp: function() {
        //all move into false
        var i = 0
        var toDoList = this.state.toDoList
        for (i = 0; i < toDoList.length; i++) {
            toDoList[i].move = false
        }
        this.setState({
            offsetIndent: 0,
            toDoList: toDoList,
            click: false
        })
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
            initPositionY: this.state.itState.mouseY,
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
        return <TodoElement itState={this.state.itState} data={it} changeFatherMoveState={this.changeFatherMoveState}/>
    },
    render: function() {
        console.log(this.state.click)
        return <ul onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}>{this.state.toDoList.map(this.eachElement)}</ul>
    }
})

ReactDOM.render(<Form/>, document.getElementById("content"));