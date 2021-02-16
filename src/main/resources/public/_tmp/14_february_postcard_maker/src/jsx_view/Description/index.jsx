const React = require("react");

export class Description extends React.Component {

    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
    }

    render() {
        let {header, text} = this.props._
        let state = this.state;
        return (
            <div className={this.constructor.name}>
                <h1>{header}</h1>
                <p>{text}</p>
                <p>{state.date}</p>
            </div>
        );
    }

}