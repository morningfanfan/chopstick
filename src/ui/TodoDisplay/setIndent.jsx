import React from "react";
import ReactDOM from "react-dom";
import {
    TodoElement
} from "./HandleMove";
/*export var setIndent = function(data,init) {
    data.map(function(e){
        if(e.type==task)
          e.indent = init;
        if(e.type==project){
            e.indent = init;
            if(e.tasks){
                setIndent(e.tasks,init+2)
            }
            if(e.projects){
                setIndent(e.tasks,init+2)
            }
        }
    })
    return data;
};*/
/*
var data = [{
    name: "task1",
    type: task,
    id: 0
}, {
    name: "project1",
    type: "project",
    tasks: [{
        name: "task2",
        type: task,
        belong: project1
    }, {
        name: "task3",
        type: task,
        belong: project1
    }],
    projects: [{
        name: "project2",
        type: "project",
        belong: project1,
        tasks: [{
            name: "task4",
            type: task,
            belong: project2
        }, {
            name: "task5",
            type: task,
            belong: project2
        }]
    }, {
        name: "project3",
        type: "project",
        belong: project2,
        tasks: []
    }]
}, {
    name: "project2",
    type: "project",
    tasks: []
}, {
    name: "task4",
    type: task
}];*/

var result = [{
    name: "task1",
    type: "task",
    id: 0,
    indent: 40
}, {
    name: "project1",
    type: "project",
    id: 1,
    indent: 40
}, {
    name: "task2",
    type: "task",
    id: 2,
    indent: 80
}, {
    name: "project2",
    type: "project",
    id: 3,
    indent: 80
}, {
    name: "task4",
    type: "task",
    id: 4,
    indent: 120
}, {
    name: "task5",
    type: "task",
    id: 5,
    indent: 120
}, {
    name: "task3",
    type: "task",
    id: 6,
    indent: 120
}, {
    name: "project3",
    type: "project",
    id: 7,
    indent: 160
}, {
    name: "project2",
    type: "project",
    id: 8,
    indent: 40
}, {
    name: "task4",
    type: "task",
    id: 9,
    indent: 40
}];
var i = 40 //indent danwei
var h = 50 //height danwei

export var Form = React.createClass({
    getInitialState: function() {
        return {
            toDoList: result,
            itState: {
                move: false,
                init: false,
                offsetIndent: 0
            }
        }
    },
    exchange: function(a, b) {
        console.log("exchange happened!")
        var tmp = this.state.toDoList[a];
        this.state.toDoList[a] = this.state.toDoList[b];
        this.state.toDoList[b] = tmp;
    },
    a: function(e, X) {
        var n = (X + (i / 2)) / i //x%20取整数部分,daiding
        console.log(result[e.id])
        var max = result[e.id - 1].indent % i - result[e.id].indent % i
        max >= n ?
            setState({
                offsetIndent: n * i
            }) :
            setState({
                offsetIndent: max * i
            })
    },
    b: function(e, X) {
        var n = (X - (i / 2)) / i
        result[e.id].indent + n * i >= 0 ?
            this.setState({
                offsetIndent: n * i
            }) :
            this.setState({
                offsetIndent: -result[e.id].indent
            })
    },
    c: function(e, X) {
        this.setState({
            offsetIndent: 0
        })
    },
    d: function(e, Y) {
        if (Y < -h / 2 && e.id != 0) {
            this.exchange(e.id - 1, e.id)
        }
        if (Y > h / 2 && e.id != result.length - 1) {
            this.exchange(e.id, e.id + 1)
        }

    },
    sortToDoList: function(e, X, Y) { //e.type=task -left +right -up +down
        X > i / 2 ?
            this.a(e, X) :
            X < -i / 2 ?
            this.b(e, X) :
            this.c(e, X);
        this.d(e, Y);
        this.state.toDoList[e.id].indent = this.state.toDoList[e.id].indent + this.state.offsetIndent
        this.setState({
            toDoList: this.state.toDoList
        })
    },
    mouseMove: function(e) {
        this.setState({
            itState: {
                mouseX: e.pageX,
                mouseY: e.pageY
            }
        })
    },
    mouseUp: function() {
        this.setState({
            itState: {
                move: false
            }
        })
    },
    mouseDown: function(it) {
        this.setState({
            itState: {
                move: true,
                init: true //?
            }
        })
        this.distanceCount(it)
    },
    distanceCount: function(it) {
        if (this.state.move) {
            if (this.state.init) {
                this.setState({
                    initPositionX: this.state.itState.mouseX,
                    initPositionY: this.state.itState.mouseY,
                    init: false
                })
                console.log("initX:" + this.state.initPositionX)
                console.log("X:" + X)
                console.log(this.state.itState.mouseX)
                var Y = this.state.itState.mouseY - this.state.initPositionY;
                var X = this.state.itState.mouseX - this.state.initPositionX;
                this.sortToDoList(it, X, Y)
            }
        }
    },
    eachElement: function(it) {
        return <TodoElement  onMouseUp={this.mouseUp} onMouseDown={this.mouseDown(it)} itState={this.state.itState} data={it}/>
    },
    render: function() {
        return <div onMouseMove={this.mouseMove}>{this.state.toDoList.map(this.eachElement)}</div>
    }
})

ReactDOM.render(<Form/>, document.getElementById("content"));