import React, { Component } from 'react';
import Prism from 'prismjs';
export default class PrismCode extends Component {
    componentDidMount() {
        Prism.highlightAll();
    }
    componentDidUpdate() {
        Prism.highlightAll();
    }
    render() {
        return (React.createElement("pre", { "data-testid": "prism-code", style: this.props.style },
            React.createElement("code", { className: `language-${this.props.language || 'javascript'}` }, this.props.code)));
    }
}