var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var _require = require("./TextBlock"),
    TextBlock = _require.TextBlock;

export var Postcard = function (_React$Component) {
    _inherits(Postcard, _React$Component);

    function Postcard(props) {
        _classCallCheck(this, Postcard);

        var _this = _possibleConstructorReturn(this, (Postcard.__proto__ || Object.getPrototypeOf(Postcard)).call(this, props));

        _this.state = props._.state;
        props._.setState = _this.setState.bind(_this);
        return _this;
    }

    _createClass(Postcard, [{
        key: "render",
        value: function render() {
            var _state = this.state,
                source = _state.source,
                textBlocks = _state.textBlocks;

            var style = {
                backgroundImage: "url(" + source + ")"
            };
            var tb = [];
            for (var key in textBlocks) {
                tb.push(React.createElement(TextBlock, { key: key + "tb", _: textBlocks[key] }));
            }
            return React.createElement(
                "div",
                { className: this.constructor.name, style: style },
                tb
            );
        }
    }]);

    return Postcard;
}(React.Component);