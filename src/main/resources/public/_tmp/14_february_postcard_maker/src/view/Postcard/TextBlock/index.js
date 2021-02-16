var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

export var TextBlock = function (_React$Component) {
    _inherits(TextBlock, _React$Component);

    function TextBlock(props) {
        _classCallCheck(this, TextBlock);

        var _this = _possibleConstructorReturn(this, (TextBlock.__proto__ || Object.getPrototypeOf(TextBlock)).call(this, props));

        _this.set = function (key, value) {
            var o = {};
            o[key] = value;
            _this.setState(o);
        };

        _this.setText = function (text) {
            _this.setState({ text: text });
        };

        _this.setFontSize = function (fontSize) {
            _this.setState({ fontSize: fontSize });
        };

        _this.setColor = function (color) {
            _this.setState({ color: color });
        };

        _this.setBackground = function (background) {
            _this.setState({ background: background });
        };

        _this.setPosition = function (position) {
            _this.setState({ position: position });
        };

        _this.setWidth = function (width) {
            _this.setState({ width: width });
        };

        _this.state = props._.state;
        props._.setState = _this.setState.bind(_this);
        return _this;
    }

    _createClass(TextBlock, [{
        key: "render",
        value: function render() {
            var _state = this.state,
                text = _state.text,
                color = _state.color,
                background = _state.background,
                fontSize = _state.fontSize;

            var style = { fontSize: fontSize };
            {
                var r = color.r,
                    g = color.g,
                    b = color.b;

                style.color = "rgb(" + r + ", " + g + ", " + b + ")";
            }
            {
                var _r = background.r,
                    _g = background.g,
                    _b = background.b,
                    a = background.a;

                style.backgroundColor = "rgba(" + _r + ", " + _g + ", " + _b + ", " + a + ")";
            }
            return React.createElement(
                "div",
                { style: style },
                text
            );
        }
    }]);

    return TextBlock;
}(React.Component);