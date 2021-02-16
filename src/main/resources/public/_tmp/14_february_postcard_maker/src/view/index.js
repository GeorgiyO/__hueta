var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var ReactDom = require("react-dom");

var _require = require("./Description"),
    Description = _require.Description;

var _require2 = require("./Postcard"),
    Postcard = _require2.Postcard;

var _require3 = require("./InputPanel"),
    InputPanel = _require3.InputPanel;

export { createRoot, draw };

var root = void 0;

var Root = function (_React$Component) {
    _inherits(Root, _React$Component);

    function Root() {
        _classCallCheck(this, Root);

        return _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).apply(this, arguments));
    }

    _createClass(Root, [{
        key: "render",
        value: function render() {
            var _props$_ = this.props._,
                description = _props$_.description,
                inputPanel = _props$_.inputPanel,
                postcard = _props$_.postcard;

            return React.createElement(
                "div",
                { className: this.constructor.name },
                React.createElement(Description, { _: description }),
                React.createElement(
                    "div",
                    { className: "Workplace" },
                    React.createElement(InputPanel, { _: inputPanel }),
                    React.createElement(Postcard, { _: postcard })
                )
            );
        }
    }]);

    return Root;
}(React.Component);

function createRoot(props) {
    root = React.createElement(Root, { _: props });
}

function draw() {
    ReactDom.render(root, document.getElementById("root"));
}