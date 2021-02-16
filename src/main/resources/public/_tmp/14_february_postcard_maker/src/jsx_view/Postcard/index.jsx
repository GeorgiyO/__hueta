const React = require("react");
const {TextBlock} = require("./TextBlock");

let log = (str) => console.log("Postcard: ", str);

export class Postcard extends React.Component {
    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
    }

    render() {
        let style = {
            backgroundImage: `url(${this.state.source})`,
        };
        let textBlocks = this.state.textBlocks.map((textBlockProps) =>
                <TextBlock key={textBlockProps.id.toString()} _={textBlockProps}/>
        );
        console.log(textBlocks);
        return (
            <div className={this.constructor.name} style={style}>
                {textBlocks}
            </div>
        );
    }
}