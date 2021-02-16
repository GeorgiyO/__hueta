const React = require("react");

export class InputPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.constructor.name}>
                <p>input panel</p>
            </div>
        );
    }
}