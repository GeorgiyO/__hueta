const React = require("react");

export class InputForTextBlock extends React.Component {
    constructor(props) {
        super(props);
        this.key = props._.key;
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
        console.log(props._);
    }

    render() {
        let {text, fontSize, color, background, width, position} = this.state;
        let positionInputs = ["left", "top", "right", "bottom"].map((pos) =>
            <div key={"radio-pos-" + pos}>
                <span>{pos}</span>
                <input value={pos} type="radio" name="position" checked={position === pos} onChange={this.props._.handlePositionChange}/>
            </div>
        );
        return (
            <div className={this.constructor.name}>
                <p>{this.key + ":"}</p>
                <div className="inputs">
                    <p>text:</p>
                    <input type="text" value={text} onChange={this.props._.handleTextChange}/>
                    <p>font size:</p>
                    <input type="range" min={0} max={100} value={fontSize} onChange={this.props._.handleFontSizeChange}/>
                    <p>text color:</p>
                    <input type="color" value={color} onChange={this.props._.handleColorChange}/>
                    <p>background color:</p>
                    <input type="color" value={background.color} onChange={this.props._.handleBackgroundColorChange}/>
                    <p>background opacity:</p>
                    <input type="range" min={0} max={255} value={background.a} onChange={this.props._.handleBackgroundOpacityChange}/>
                    <p>width:</p>
                    <input type="range" min={0} max={100} value={width} onChange={this.props._.handleWidthChange}/>
                    <p>position:</p>
                    <div className="positions">
                        {positionInputs}
                    </div>
                </div>
            </div>
        );
    }
}