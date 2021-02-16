const view = require("./view");
const model = require("./model");
const controller = require("./controller");

view.createRoot(model.props);
view.draw();

console.log("hello from main");