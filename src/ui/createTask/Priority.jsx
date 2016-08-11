import React from "react";

export var Priority = React.createClass({
    render: function() {
        var priorityFirstStyle = {
            width: '419px',
            height: '40px',
            margin: '0 auto',
            position: 'relative',
        };
        var numberStyle = {
            width: '40px',
            height: '40px',
            borderColor: '#e2e7ec',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '4px',
            color: 'rgb(200,206,213)',
            fontSize: '20px',
            fontFamily: 'Lato, Arial, serif',
            fontWeight: 'bold',
            fontStyle: 'oblique',
            textAlign: 'center',
            lineHeight: '40px'
        };
        var prioritySecondStyle = {
            position: 'relative',
            bottom: '44px',
            left: '69px',
            width: '350px',
            height: '40px',
            borderColor: '#e2e7ec',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '4px',
            color: 'rgb(200,206,213)'
        };
        return (<div style={priorityFirstStyle}>
                <div style={numberStyle}>3</div>
                <div style={prioritySecondStyle}>
                <div></div>
                <div></div>
                <div></div>
                </div>
                </div>)
    }
});
