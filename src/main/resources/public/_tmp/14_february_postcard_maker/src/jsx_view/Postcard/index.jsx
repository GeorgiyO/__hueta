const React = require("react");
const {TextBlock} = require("./TextBlock");

export class Postcard extends React.Component {
    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
    }

    render() {
        let {source, textBlocks} = this.state;
        let style = {
            backgroundImage: `url(${source})`,
        };
        let tb = [];
        for (let key in textBlocks) {
            tb.push(<TextBlock key={key + "tb"} _={textBlocks[key]}/>);
        }
        return (
            <div className={this.constructor.name} style={style}>
                {tb}
            </div>
        );
    }
}