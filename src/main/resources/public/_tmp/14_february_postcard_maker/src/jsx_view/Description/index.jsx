const React = require("react");

export class Description extends React.Component {

    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
    }

    render() {
        let {header, text} = this.props._;
        return (
            <div className={this.constructor.name}>
                <h1>{header}</h1>
                <p>{text}</p>
                <p>{this.state.date}</p>
            </div>
        );
    }

}