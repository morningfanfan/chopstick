export var dealParentRelationship = function(changeElem, e) {
    var index = -1
    var toDoList = _.cloneDeep(e)
    var tmp = _.cloneDeep(toDoList)
        //首元素在todolist中有没有爸爸
        //遍历所有子元素toolist中有没有儿子
    for (var l = 0; l < toDoList.length; l++) {
        var a = -1
        if (toDoList[l].parent && toDoList[l].parent.length > 0) {
            for (var i = 0; i < toDoList[l].parent.length; i++) {
                var count = 1
                for (var m = 0; m < changeElem.length; m++) {
                    if (toDoList[l].parent[i] == changeElem[m].id) {
                        if (toDoList[l].type == "project") {
                            count = howManyBelongsToThisProject(l, toDoList)
                        }
                        var indent = changeElem[m].indent - toDoList[l].indent + 40
                        var deleted = tmp.splice(l, count)
                        tmp = sortIndex(tmp)
                        for (var k = 0; k < deleted.length; k++) {
                            deleted[k].indent += indent
                        }
                        var insert = findChidrenById(changeElem[m].id, changeElem)
                        var changeElemLeft = _.take(changeElem, insert + 1)
                        var changeElemRight = _.takeRight(changeElem, changeElem.length - insert - 1)
                        changeElem = changeElemLeft.concat(deleted, changeElemRight)
                        changeElem = sortIndex(changeElem)
                    }
                }

            }
        }
    }
    if (changeElem[0].parent && changeElem[0].parent.length > 0) {
        for (var i = 0; i < changeElem[0].parent.length; i++) {
            index = findChidrenById(changeElem[0].parent[i], toDoList)
            if (index != -1)
                break
        }
    }
    if (index != -1) {
        var indent = tmp[index].indent + 40 - changeElem[0].indent
        for (var n = 0; n < changeElem.length; n++) {
            changeElem[n].indent = changeElem[n].indent + indent
        }
        var tmpLeft = _.take(tmp, index + 1)
        var tmpRight = _.takeRight(tmp, tmp.length - index - 1)
        tmp = tmpLeft.concat(changeElem, tmpRight)
        tmp = sortIndex(tmp)
    } else {
        var indent = 40 - changeElem[0].indent
        for (var n = 0; n < changeElem.length; n++) {
            changeElem[n].indent = changeElem[n].indent + indent
        }
        tmp = tmp.concat(changeElem)
        tmp = sortIndex(tmp)
    }

    return tmp

}
var sortIndex = function(arr) {
    var changeArr = arr
    for (var i = 0; i < arr.length; i++) {
        changeArr[i].index = i;
    }
    return changeArr
}
var findChidrenById = function(id, arr) {
    var index = -1
    arr.map(function(it) {
        if (it.id == id) {
            index = it.index
        }
    })
    return index
}
var howManyBelongsToThisProject = function(index, arr) {
    var count = 1
    for (var i = 1; i < arr.length - index; i++) {
        if (arr[index + i].indent > arr[index].indent) {
            count++
        } else break
    }
    return count
}