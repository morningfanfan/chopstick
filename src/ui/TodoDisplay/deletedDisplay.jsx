import React from "react";
import ReactDOM from "react-dom";
import {
    DoneElement
} from "./DoneElement";
import _ from "lodash";
import UUID from "uuid-js";
import PubSub from "pubsub-js";
import {
    dealParentRelationship
} from "./dealParentRelationship"

var result = [{
    name: "I am a deleted task",
    type: "task",
    id: UUID.create().toString(),
    index: 0,
    indent: 40,
    move: false,
    priority: 1,
    startTime: "Wed, Sep 28th 10:00",
    endTime: "Wed, Sep 28th 10:00",
    tag: ["hello", "world"],
    note: "click checkbox to restore me."
}];

if (!localStorage.getItem('dead')) {
    var initToDo = result
} else
    var initToDo = JSON.parse(localStorage.getItem('dead'))

export var DeleteForm = React.createClass({
    getInitialState: function() {
        return {
            toDoList: initToDo,
            offsetIndent: 0,
            beClick: 0,
            renderDog: 0
        }
    },
    componentDidUpdate: function(prevstate, prevprops) {
        if (prevstate.toDoList !== this.state.toDoList) {
            var data = JSON.stringify(this.state.toDoList)
            localStorage.setItem('dead', data)
        }
    },
    componentWillMount: function() {
        PubSub.subscribe("delete", function(msg, data) {
            try {
                var changeElem = data
                var dead = dealParentRelationship(changeElem, this.state.toDoList)
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
                return elem
            }
        )
        return arr
    },
    restoreme: function(id) {
        var index = this.findChidrenById(id)
        if (index != -1) {
            var doneDeleteIndexElem = _.cloneDeep(this.state.toDoList)
            var x = 1
            if (this.state.toDoList[index].type == "project")
                x = this.howManyBelongsToThisProject(index)
            var beDeleted = doneDeleteIndexElem.splice(index, x)
            beDeleted = this.parentRelationship(beDeleted, this.state.toDoList)
            this.setState({
                toDoList: this.sortIndex(doneDeleteIndexElem),
                beDeleted: beDeleted
            })
            PubSub.publish("restore", this.state.beDeleted);
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
    left: "200px"
}
var boderStyle = {
    width: "600px",
    height: "30px",
    marginBottom: "50px",
    color: "#d8d4dc",
    fontFamily: "fantasy",
    fontSize: "30px"
}