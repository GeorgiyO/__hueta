init();

const view = require("./view");
const model = require("./model");

view.createRoot(model.props);
view.draw();
model.updateTable();

function init() {
    if (!Array.prototype.last) {
        Array.prototype.last = function() {
            return this[this.length - 1];
        }
    }
}