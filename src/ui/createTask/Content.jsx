import React from "react";

export var Content = React.createClass({
    getInitialState: function() {
        return {
            tagValue: [],
            createTag: false
        }
    },
    pressEnter: function(e) {
        if (e.keyCode == 13 || e.which == 13) {
            var tagValue = this.state.tagValue;
            tagValue.push(this.refs.tag.tagValue)
            this.setState({
                tagValue: tagValue,
                createTag: true
            })
        }
    },
    createTag: function() {
        if (this.state.createTag) {
            var tagStyle = {
                width: "10px",
                height: "10px",
                backgroundColor: "red",
                float: "left"
            }
            var i = 1
            var why = this.state.tagValue.map(function(each) {
                console.log("au")
                i = i + 1
                var heng = <div key={i} style={tagStyle}>{each}</div>
                console.log(heng)
                return heng
            })
            return why
            console.log(why)
        }
    },
    returnValue: function(who) {
        if (who == "tag") {
            this.props.returnValue(who, this.state.tagValue)
        } else
            this.props.returnValue(who, this.refs[who].value)
    },
    componentDidUpdate: function(prevprops, prevstate) {
        if (!prevstate.createTag && this.state.createTag)
            this.setState({
                createTag: false
            })
    },
    render: function() {
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
            width: "250px",
            marginLeft: "10px"
        };
        var inputStyle2 = {
            border: "0",
            outline: "medium",
            backgroundColor: "inherit",
            fontSize: "20px",
            width: "250px",
            marginLeft: "18px"
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
        return (<div style={informationOutStyle}>
        <div style={_.extend(informationInnerLeftStyle,numberStyle)}>1</div>
        <div style={informationInnerRightStyle}>
        <div style={_.extend(informationInnerTopStyle,textStyle)}><img style={imgStyle} src="./statics/img/nn.png"></img>name
        <input type="text" autoFocus style={inputStyle1} ref="name" onBlur={this.returnValue.bind(this,"name")}></input>
        </div>
        <div style={_.extend(informationInnerBottomStyle,textStyle)}><img style={imgStyle} src="./statics/img/tt.png"></img>tags
        {this.createTag()} 
        <input type="text" style={inputStyle2} onBlur={this.returnValue.bind(this,"tag")} onKeyPress={this.pressEnter} ref="tag"></input>
        </div>
        </div></div>);
    }
});