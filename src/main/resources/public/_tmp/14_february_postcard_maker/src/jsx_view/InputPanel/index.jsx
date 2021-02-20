const React = require("react");
const {InputForTextBlock} = require("./InputForTextBlock");
const {InputForPostcard} = require("./InputForPostcard");

export class InputPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
    }

    render() {
        let textInputs = [];
        let tbi = this.state.textBlocksInputs;
        for (let key in tbi) textInputs.push(<InputForTextBlock key={key + "ip"} _={tbi[key]}/>);
        console.log(textInputs);
        return (
            <div className={this.constructor.name}>
                <InputForPostcard _={this.props._.imageInput}/>
                {textInputs}
            </div>
        );
    }
}