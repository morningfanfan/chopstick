import React from "react";

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

var data = [
            {name:task1,type:task,id:0},
            {name:project1,type:project,
                tasks:[{name:task2,type:task,belong:project1},{name:task3,type:task,belong:project1}],
                projects:[{name:project2,type:project,belong:project1,tasks:[{name:task4,type:task,belong:project2},{name:task5,type:task,belong:project2}]},{name:project3,type:project,belong:project2,tasks:[]}]
            },
            {name:project2,type:project,
                tasks:[]
            },
            {name:task4,type:task}
        ];
    
var result = setIndent(data,0);
var i = 40//indent danwei
var h = 50//height danwei
//data -> array !!!!!!!把result变成一个array!!!!!!
export var Form = React.createClass({
    exchange: function(array,a,b){
        // return new array to state gaibianshunxuheid
    },
    a: function(X){
        var n = (X+(i/2))/i//x%20取整数部分,daiding
        var max = result[e.id-1].indent % i - result[e.id].indent % i
        max >= n ?
        setState({offsetIndent:n*i}):
        setState({offsetIndent:max*i})
    },
    b: function(X){
        var n = (X-(i/2))/i
        result[e.id].indent + n*i >= 0 ?
        setState({offsetIndent:n*i}):
        setState({offsetIndent:-result[e.id].indent})
    },
    c: function(X){
        setState({offsetIndent:0})
    },
    d: function(e,Y){
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
        if(Y<-h/2 && e.id!=0){
                exchange(e.id-1,e.id)
            }
        if(Y>h/2 && e.id!=result.length-1){
                exchange(e.id,e.id+1)
            }
        
    },
    getInitialState: function(){
        return toDoList = result; 
    },
    sortToDoList:function(e,X,Y){//e.type=task -left +right -up +down
        X>i/2?
        this.a(X):
        X<-i/2?
        this.b(X):
        this.c(X);
        this.d(e,Y);
    },
    eachElement: function(it){
        return <TodoElement sortToDoList={this.sortToDoList} data={it}/>
    },
    render: function() {
        return this.state.toDoList.map(this.eachElement(it))
    }
});
ReactDOM.render((<Form/>), document.getElementById('content'));