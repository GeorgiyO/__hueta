const view = require("./view");
const model = require("./model");

view.createRoot(model.props);
view.draw();
