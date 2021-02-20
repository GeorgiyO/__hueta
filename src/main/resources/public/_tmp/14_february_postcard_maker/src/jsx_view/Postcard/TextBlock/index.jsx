const React = require("react");
const _hex2rgb = require("hex-rgb");
const hex2rgb = (hex) => _hex2rgb(hex, {format: "css"});

export class TextBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
    }

    render() {
        let {text, fontSize, color, background, width, position} = this.state;
        let aHex = Number(background.a).toString(16);
        if (aHex.length === 1) aHex = "0" + aHex;
        let backgroundHex = background.color + aHex;
        let style = {
            fontSize: fontSize + "px",
            color: hex2rgb(color),
            background: hex2rgb(backgroundHex),
        };
        style[position] = "0";
        if (position === "right" || position === "left") {
            style.height = "100%";
            style.width = width + "%";
        } else {
            style.width = "100%";
            style.height = width + "%";
        }
        return (
            <div className={this.constructor.name} style={style}>
                {text}
            </div>
        );
    }
}