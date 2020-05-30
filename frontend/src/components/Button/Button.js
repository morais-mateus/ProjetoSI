import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    render() {
        return(
            <button 
                type={this.props.type}
                name={this.props.name}
                className={className()}
                onAction={this.props.action}>
                    {this.props.text}
                </button>
        );
    }
}

function className() {
    return(
        "btn input"
    );
}

export default Button;