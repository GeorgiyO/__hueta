import React from "react";
import ReactDom from "react-dom";

import {Data} from "./Data";
import {InputPanel} from "./InputPanel";
import {Info} from "./Info";
import {Graph} from "./Graph";

export {createRoot, draw}

let root;

class Root extends React.Component {
    render() {
        let {data, inputPanel, info, graph} = this.props._;
        return (
            <div className={this.constructor.name}>
                <InputPanel _={inputPanel}/>
                <Data _={data}/>
                <Graph _={graph}/>
            </div>
        );
    }
}

function createRoot(props) {
    root = <Root _={props}/>;
}

function draw() {
    ReactDom.render(
        root,
        document.getElementById("root")
    );
}