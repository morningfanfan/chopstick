import React from "react";
import update from 'react-addons-update';
export var Content = React.createClass({
    getInitialState: function() {
        return {
            tagValues: [],
            createTag: false,
            deleteTag: [],
            wordLength: 0
        }
    },
    pressEnter: function(e) {
        if (e.keyCode == 13 || e.which == 13) {
            var verify = this.refs.tag.value.trim()
            if (verify != "") {
                var tagValues = this.state.tagValues;
                tagValues.push(this.refs.tag.value)
                this.setState({
                    tagValues: tagValues,
                    createTag: true,
                    wordLength: this.state.wordLength + this.refs.tag.value.length
                })
            }
            document.getElementById("inputForTag").value = ""
        }
    },
    mouseAction: function(q, num) {
        if (q == "over") {
            var newData = update(this.state, {
                deleteTag: {
                    [num]: {
                        $set: true
                    }
                }
            })
            this.setState(newData)
        }
        if (q == "out") {
            var newData = update(this.state, {
                deleteTag: {
                    [num]: {
                        $set: false
                    }
                }
            })
            this.setState(newData)
        }
        if (q == "click") {
            var tagValues = this.state.tagValues
            var deleteValue = tagValues.splice(num, 1)
            this.setState({
                wordLength: this.state.wordLength - deleteValue[0].length,
                tagValues: tagValues
            })
        }
    },
    createTag: function() {
        var that = this
        var why = this.state.tagValues.map(function(elem, idx) {
            var tagWidth = {
                width: 20 + elem.length * 10 + "px"
            }
            var deleteStyle = {
                height: "10px",
                width: "10px",
                backgroundColor: !that.state.deleteTag[idx] ? "#7d9857" : "#ff7ca3",
                lineHeight: '5px',
                color: 'white',
                position: 'relative',
                bottom: '30px',
                left: 10 + elem.length * 10 + "px",
                WebkitUserSelect: "none"
            }
            return <div key={idx} style={_.extend(tagWidth,tagStyle)}>{elem}
            <div onMouseOver={that.mouseAction.bind(that,"over",idx)} 
            onMouseOut={that.mouseAction.bind(that,"out",idx)} 
            onClick={that.mouseAction.bind(that,"click",idx)} 
            style={deleteStyle}>
            X</div>
            </div>
        })
        return why
    },
    returnValue: function(who) {
        if (who == "tag") {
            this.props.returnValue(who, this.state.tagValues)
        } else
            this.props.returnValue(who, this.refs[who].value)
    },
    componentDidUpdate: function(prevprops, prevstate) {
        if (!prevstate.createTag && this.state.createTag)
            this.setState({
                createTag: false
            })
        if (!prevprops.shouldClearTag && this.props.shouldClearTag) {
            this.setState({
                tagValues: []
            })
            this.props.clearTagDone();
        }
    },
    render: function() {
        let elems = this.createTag()
        var inputLength = 270 - this.state.wordLength * 10 - this.state.tagValues.length * 30
        var inputStyle2 = {
            border: "0",
            outline: "medium",
            backgroundColor: "inherit",
            fontSize: "20px",
            width: this.state.wordLength == 0 ? "270px" : inputLength >= 30 ? inputLength + "px" : "0px",
            margin: "16px 0 0 10px",
            float: "left"
        };
        var maxLength = function() {
            if (inputLength >= 30 && inputLength <= 70)
                return (inputLength - 20) / 10
            if (inputLength < 30)
                return 0
            else
                return 6
        }
        return (
            <div style={informationOutStyle}>
                <div style={_.extend(informationInnerLeftStyle,numberStyle)}>1</div>
                <div style={informationInnerRightStyle}>
                    <div style={_.extend(informationInnerTopStyle,textStyle)}>
                        <img style={imgStyle} src="./statics/img/nn.png"/>name
                        <input id="inputForName" type="text" autoFocus style={inputStyle1} ref="name" onBlur={this.returnValue.bind(this,"name")}/>
                    </div>
                    <div style={_.extend(informationInnerBottomStyle,textStyle)}>
                        <img style={imgStyle} src="./statics/img/tt.png"/>
                        <div style={{position:"absolute"}}>tags</div>
                        <div style={{position:"absolute",left:"90px"}}>
                        {elems} 
                        <input type="text" id="inputForTag" style={inputStyle2} onBlur={this.returnValue.bind(this,"tag")} onKeyPress={this.pressEnter} ref="tag" maxLength={maxLength()}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var informationOutStyle = {
    width: "419px",
    height: "120px",
    margin: "0 auto",
    marginTop: "30px",
    borderColor: "#e2e7ec",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "4px",
    position: "relative"
};
var informationInnerLeftStyle = {
    width: "10%",
    height: "100%",
    borderRightColor: "#e2e7ec",
    borderRightWidth: "2px",
    borderRightStyle: "solid",
    float: "left"
};
var informationInnerRightStyle = {
    width: "89.5%",
    height: "100%",
    float: "left"
};
var informationInnerTopStyle = {
    width: "100%",
    height: "50%",
    backgroundColor: "#f1f3f9",
    borderBottomColor: "#e2e7ec",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    position: "relative"
};
var informationInnerBottomStyle = {
    width: "100%",
    height: "50%",
    position: "relative"
};
var imgStyle = {
    position: "absolute",
    top: "18px",
    left: "10px",
    width: "22px",
    height: "22px"
};
var textStyle = {
    fontSize: "15px",
    fontFamily: "Lato,Arial,serif",
    fontWeight: "bold",
    letterSpacing: "1px",
    textAlign: "left",
    textIndent: "40px",
    lineHeight: "60px",
    color: "rgb(74,83,116)"
};
var inputStyle1 = {
    border: "0",
    outline: "medium",
    backgroundColor: "inherit",
    fontSize: "20px",
    width: "270px",
    marginLeft: "10px"
};
var numberStyle = {
    fontSize: "20px",
    fontFamily: "Lato,Arial,serif",
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "left",
    textIndent: "15px",
    lineHeight: "120px",
    color: "rgb(200,206,213)"
};
var tagStyle = {
    height: "30px",
    lineHeight: "30px",
    backgroundColor: "#e1fdbc",
    borderRadius: "15px",
    float: "left",
    textAlign: "center",
    textIndent: "0",
    margin: "14px 0 0 10px",
    color: "#72c964"
};