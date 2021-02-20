const React = require("react");

export class InputForPostcard extends React.Component {
    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
    }

    render() {
        return (
            <div className={this.constructor.name}>
                <p>Ссылочка на фоновую картиночку:</p>
                <input type="text" value={this.state.value} onChange={this.props._.handleChange}/>
            </div>
        );
    }
}