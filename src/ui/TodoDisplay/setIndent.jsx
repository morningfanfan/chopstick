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
import PubSub from "pubsub-js";
import UUID from "uuid-js";
import {
    dealParentRelationship
} from "./dealParentRelationship"

var result = [{
    name: "I am a task",
    type: "task",
    id: UUID.create().toString(),
    index: 0,
    indent: 40,
    move: false,
    priority: 1,
    startTime: "Wed, Sep 28th 10:00",
    endTime: "Wed, Sep 28th 10:00",
    tag: ["cute"],
    note: "I am the basic element of a todo list/can be reordered."
}, {
    name: "I am a project",
    type: "project",
    id: UUID.create().toString(),
    index: 1,
    indent: 40,
    move: false,
    priority: 3,
    startTime: "Wed, Sep 28th 10:00",
    endTime: "Wed, Sep 28th 10:00",
    tag: ["love", "noodles"],
    note: "I am a collection of tasks with similiar goals/can be added more tasks."
}, {
    name: "CLICK REORDER SYMBOL TO MOVE ME",
    type: "task",
    id: UUID.create().toString(),
    index: 2,
    indent: 80,
    move: false,
    priority: 2,
    startTime: "Wed, Sep 28th 10:00",
    endTime: "Wed, Sep 28th 10:00",
    tag: ["ok"],
    note: "I belong to the project above/click checkbox to delete me."
}];
var i = 40 //indent danwei
var h = 80 //height danwei
var oneMove = 1
var oneHeight = 1

if (!localStorage.getItem('live')) {
    var initToDo = result
} else
    var initToDo = JSON.parse(localStorage.getItem('live'))

export var Form = React.createClass({
    getInitialState: function() {
        return {
            toDoList: initToDo,
            offsetIndent: 0,
            onCreate: false,
            arrivingData: null,
            beClick: 0
        }
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
    a: function(X) {
        var index = this.findChidrenWhoIsMoving()
        if (index != 0 && this.state.toDoList[index - 1].type == "project") {
            var n = parseInt(X / i)
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
            var max = this.state.movingXIndent / i - 1 //-1因为默认初始indent=40
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
    parentRelationship: function(arr) {
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
    componentDidUpdate: function(prevprops, prevstate) {
        var that = this
        if (prevstate.offsetIndent !== this.state.offsetIndent) {
            var index = this.findChidrenWhoIsMoving()
            var newData = update(this.state, {
                toDoList: {
                    [index]: {
                        indent: {
                            $set: this.state.movingXIndent + this.state.offsetIndent
                        }
                    }
                },
            })
            this.setState(newData)
        }

        if (prevstate.toDoList !== this.state.toDoList) {
            var data = JSON.stringify(this.state.toDoList)
            localStorage.setItem('live', data)
        }
    },
    componentWillReceiveProps: function(nextprops) {
        if (nextprops.up != this.props.up)
            this.mouseUp()
    },
    componentWillMount: function() {
        PubSub.subscribe("done!", function(msg, data) {
            try {
                var newTodo = this.resort(data)
                this.setState({
                    toDoList: newTodo
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
        PubSub.subscribe("restore", function(msg, data) {
            try {
                var changeElem = data
                var live = dealParentRelationship(changeElem, this.state.toDoList)
                this.setState({
                    toDoList: live
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
        var index = this.findChidrenWhoIsMoving();
        if (index != -1) {
            if (index == 0 || this.state.toDoList[index - 1].type == "task") {
                var newData = update(this.state, {
                    toDoList: {
                        [index]: {
                            indent: {
                                $set: index == 0 ? 40 : this.state.toDoList[index - 1].indent
                            }
                        }
                    },
                })
                for (var i = 0; i < this.state.toDoList.length; i++) {
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
            } else {
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
        }

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
    parentRelationship: function(arr) {
        var that = this
        var arr = arr.map(
            function(elem) {
                var parent = []
                for (var i = 0; i < elem.index; i++) {
                    if (elem.indent > that.state.toDoList[i].indent && that.state.toDoList[i].type == "project") {
                        parent.push(that.state.toDoList[i].id)
                    }
                }
                elem.parent = parent
                return elem
            }
        )
        return arr
    },
    deleteme: function(id) {
        var index = this.findChidrenById(id)
        if (index != -1) {
            var doneDeleteIndexElem = _.cloneDeep(this.state.toDoList)
            var x = 1
            if (this.state.toDoList[index].type == "project")
                x = this.howManyBelongsToThisProject(index)
            var beDeleted = doneDeleteIndexElem.splice(index, x)
            beDeleted = this.parentRelationship(beDeleted)
            doneDeleteIndexElem = this.sortIndex(doneDeleteIndexElem)
            this.setState({
                toDoList: doneDeleteIndexElem,
                beDeleted: beDeleted
            })
            PubSub.publish("delete", this.state.beDeleted);
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
    resort: function(data) {
        data.id = UUID.create().toString();
        data.move = false;
        data.indent = this.state.beClick == -1 ? 40 : this.state.toDoList[this.state.beClick].indent + i;
        var tmp = _.cloneDeep(this.state.toDoList)
        if (this.state.beClick == -1)
            tmp.splice(this.state.toDoList.length, 0, data)
        else
            tmp.splice(this.state.beClick + 1, 0, data)
        var final = this.sortIndex(tmp)
        return final
    },
    eachElement: function(it) {
        return <TodoElement key={it.id} itState={this.state.itState} data={it} deleteme={this.deleteme}changeFatherMoveState={this.changeFatherMoveState} callbackParent={this.callbackParent}/>
    },
    render: function() {
        var forMouseUpStyle = {
            width: "100%",
            height: 280 + this.state.toDoList.length * 80 + "px"
        }
        return <div  draggable="false">
        <div style={forMouseUpStyle} onMouseMove={this.mouseMove}>
        <div style={taskDisplayStyle}>
        <div style={boderStyle}><i className="material-icons" style={{marginRight:"5px"}}>face</i>TODOLIST
        </div>
        {this.state.toDoList.map(this.eachElement)}</div>
        </div> </div>
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