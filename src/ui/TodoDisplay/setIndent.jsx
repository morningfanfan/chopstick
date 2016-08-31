import React from "react";
import ReactDOM from "react-dom";
import {
    TodoElement
} from "./HandleMove";

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
var oneMove = 4
var oneHeight = 1
export var Form = React.createClass({
    getInitialState: function() {
        return {
            toDoList: result,
            offsetIndent: 0,
            itState: {
                count: 0,
                offsetY: 0,
                move: true
            }
        }
    },
    exchange: function(a, b) {
        console.log("exchange happened!")
        var id = this.state.toDoList[a].id
        this.state.toDoList[a].id = this.state.toDoList[b].id;
        this.state.toDoList[b].id = id;
        var tmp = this.state.toDoList[a];
        this.state.toDoList[a] = this.state.toDoList[b];
        this.state.toDoList[b] = tmp;
    },
    a: function(e, X) {
        var n = parseInt((X + (i / oneMove)) / i)
        var max = this.state.toDoList[e.id - 1].indent / i - this.state.toDoList[e.id].indent / i + 1
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
    b: function(e, X) {
        var n = Math.abs(parseInt((X - (i / oneMove)) / i))
        var max = this.state.toDoList[e.id].indent / i
            //console.log("max:" + max)
            //console.log("n:" + n)
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
    c: function(e, X) {
        this.setState({
            offsetIndent: 0
        })
    },
    d: function(e, Y) {
        if (Y < -h / oneHeight && e.id != 0) {
            this.exchange(e.id - 1, e.id)
            this.setState({
                itState: {
                    count: this.state.itState.count + 1,
                    offsetY: h / oneHeight
                }
            })
        }
        if (Y > h / oneHeight && e.id != this.state.toDoList.length - 1) {
            this.exchange(e.id, e.id + 1)
            this.setState({
                itState: {
                    count: this.state.itState.count + 1,
                    offsetY: -h / oneHeight
                }
            })
        }
    },
    componentDidUpdate: function(prevprops, prevstate) {
        if (prevstate.offsetIndent !== this.state.offsetIndent && this.state.e) {
            var toDoList = this.state.toDoList
            toDoList[this.state.e.id].indent = toDoList[this.state.e.id].indent + this.state.offsetIndent
                //console.log("1:" + this.state.toDoList[this.state.e.id].indent)
            this.setState({
                toDoList: toDoList
            })
        }
    },
    sortToDoList: function(e, X, Y) {
        X > i / oneMove ?
            this.a(e, X) :
            X < -i / oneMove ?
            this.b(e, X) :
            this.c(e, X);
        this.d(e, Y);
        this.setState({
            e: e
        })
    },
    changeFatherMoveState: function() {
        this.setState({
            itState: {
                move: true
            }
        })
    },
    mouseUp: function() {
        this.setState({
            offsetIndent: 0,
            itState: {
                move: false
            }
        })
    },
    mouseMove: function(e) {
        this.setState({
            itState: {
                mouseX: e.pageX,
                mouseY: e.pageY,
                count: 0
            }
        })
    },
    eachElement: function(it) {
        return <TodoElement itState={this.state.itState} data={it} sortToDoList={this.sortToDoList} changeFatherMoveState={this.changeFatherMoveState}/>
    },
    render: function() {
        return <div onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}>{this.state.toDoList.map(this.eachElement)}</div>
    }
})

ReactDOM.render(<Form/>, document.getElementById("content"));