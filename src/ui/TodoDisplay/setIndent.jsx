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
    //data -> array !!!!!!!把result变成一个array!!!!!!
export var Form = React.createClass({
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
        /* var max = result[e.id].id;
         for(var m=1;m<max;m++){
             if(Y<-m*h/2 && e.id!=0){
                 exchange(e.id-1,e.id)
             }
         }
         for(var j=1;j<result.length-max;j++){
             if(Y>j*h/2 && e.id!=result.length-1){
                 exchange(e.id,e.id+1)
             }
         }*/
        if (Y < -h / 2 && e.id != 0) {
            exchange(e.id - 1, e.id)
        }
        if (Y > h / 2 && e.id != result.length - 1) {
            exchange(e.id, e.id + 1)
        }

    },
    getInitialState: function() {
        return {
            toDoList: result
        }
    },
    sortToDoList: function(e, X, Y) { //e.type=task -left +right -up +down
        X > i / 2 ?
            this.a(e, X) :
            X < -i / 2 ?
            this.b(e, X) :
            this.c(e, X);
        this.d(e, Y);
    },
    mouseMove: function(e) {
        this.setState({
            mouse: {
                mouseX: e.pageX,
                mouseY: e.pageY
            }
        })
        this.distanceCount()
    },
    mouseUp: function() {
        this.setState({
            up: {
                clicked: false,
                move: false,
                init: true,
                disappear: true
            }
        })
    },
    distanceCount: function() {
        if (this.state.clicked) {
            if (this.state.init) {
                this.setState({
                    initPositionX: this.state.mouse.mouseX,
                    initPositionY: this.state.mouse.mouseY,
                    init: false
                })
                console.log("initX:" + this.state.initPositionX)
                console.log("X:" + X)
                console.log(this.state.mouse.mouseX)
                var Y = this.props.mouse.mouseY - this.state.initPositionY;
                var X = this.props.mouse.mouseX - this.state.initPositionX;
                this.sortToDoList(e, X, Y)
            }
        }
    },
    getChidrenState: function(n) {
        this.setState({
            clicked: n.clicked,
            init: n.init
        })
    },
    eachElement: function(it) {
        return <TodoElement mouse={this.state.mouse} up={this.state.up} getChidrenState={this.getChidrenState} data={it}/>
    },
    render: function() {
        var result = this.state.toDoList;
        return <div onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}>{this.state.toDoList.map(this.eachElement)}</div>
    }
})

ReactDOM.render(<Form/>, document.getElementById("content"));