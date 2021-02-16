const React = require("react");
const ReactDom = require("react-dom");

const {Description} = require("./Description");
const {Postcard} = require("./Postcard");
const {InputPanel} = require("./InputPanel");

export {createRoot, draw}

let root;

class Root extends React.Component {
    render() {
        let {description, inputPanel, postcard} = this.props._;
        return (
            <div className={this.constructor.name}>
                <Description _={description}/>
                <div className="Workplace">
                    <InputPanel _={inputPanel}/>
                    <Postcard _={postcard}/>
                </div>
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