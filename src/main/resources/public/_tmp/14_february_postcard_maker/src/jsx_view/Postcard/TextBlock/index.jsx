const React = require("react");

export class TextBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
    }

    set = (key, value) => {
        let o = {};
        o[key] = value;
        this.setState(o);
    }

    setText = (text) => {this.setState({text})}
    setFontSize = (fontSize) => {this.setState({fontSize})}
    setColor = (color) => {this.setState({color})}
    setBackground = (background) => {this.setState({background})}
    setPosition = (position) => {this.setState({position})}
    setWidth = (width) => {this.setState({width})}

    render() {
        let {text, color, background, fontSize} = this.state;
        let style = {fontSize};
        {
            let {r, g, b} = color;
            style.color = `rgb(${r}, ${g}, ${b})`;
        }
        {
            let {r, g, b, a} = background;
            style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        }
        return (
            <div style={style}>
                {text}
            </div>
        );
    }
}