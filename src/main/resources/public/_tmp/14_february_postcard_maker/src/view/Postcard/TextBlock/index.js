var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var _hex2rgb = require("hex-rgb");
var hex2rgb = function hex2rgb(hex) {
    return _hex2rgb(hex, { format: "css" });
};

export var TextBlock = function (_React$Component) {
    _inherits(TextBlock, _React$Component);

    function TextBlock(props) {
        _classCallCheck(this, TextBlock);

        var _this = _possibleConstructorReturn(this, (TextBlock.__proto__ || Object.getPrototypeOf(TextBlock)).call(this, props));

        _this.state = props._.state;
        props._.setState = _this.setState.bind(_this);
        return _this;
    }

    _createClass(TextBlock, [{
        key: "render",
        value: function render() {
            var _state = this.state,
                text = _state.text,
                fontSize = _state.fontSize,
                color = _state.color,
                background = _state.background,
                width = _state.width,
                position = _state.position;

            var aHex = Number(background.a).toString(16);
            if (aHex.length === 1) aHex = "0" + aHex;
            var backgroundHex = background.color + aHex;
            var style = {
                fontSize: fontSize + "px",
                color: hex2rgb(color),
                background: hex2rgb(backgroundHex)
            };
            style[position] = "0";
            if (position === "right" || position === "left") {
                style.height = "100%";
                style.width = width + "%";
            } else {
                style.width = "100%";
                style.height = width + "%";
            }
            return React.createElement(
                "div",
                { className: this.constructor.name, style: style },
                text
            );
        }
    }]);

    return TextBlock;
}(React.Component);