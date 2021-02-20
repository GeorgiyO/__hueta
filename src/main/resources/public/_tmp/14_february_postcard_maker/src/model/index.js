export {props};

let getDate = () => new Date().toLocaleTimeString();

let idGen = (function* (){
    let i = 0;
    while (true) yield i++;
})();
let nextId = () => idGen.next().value;

let props = {
    description: {
        header: "14 February postcard maker",
        text: "Create custom 14 February postcard for your sweetheart",
        state: {
            date: getDate(),
        },
        updateState: function() {
            this.setState(this.state);
        },
    },
    inputPanel: {
        imageInput: {
            handleChange: function (e) {
                let url = e.target.value;
                props.postcard.state.source = url;
                props.inputPanel.imageInput.state.value = url;
                props.postcard.updateState();
                props.inputPanel.imageInput.updateState();
            },
            state: {
                value: "https://images11.esquire.ru/upload/img_cache/dc2/dc223a5bbea7559f8a58bd5edc4686b4_ce_1878x1171x650x366.jpg",
            },
            updateState: function() {
                this.setState(this.state);
            },
        },
        state: {
            textBlocksInputs: {},
        },
        updateState: function() {
            this.setState(this.state);
        },
    },
    postcard: {
        state: {
            source: "https://images11.esquire.ru/upload/img_cache/dc2/dc223a5bbea7559f8a58bd5edc4686b4_ce_1878x1171x650x366.jpg",
            textBlocks: {},
        },
        updateState: function() {
            this.setState(this.state);
        },
    }
}

function addTextBlocks() {
    let tb = props.postcard.state.textBlocks;
    let ip = props.inputPanel.state.textBlocksInputs;
    let id = nextId();
    tb[id] = {
        state: {
            position: "left",
            text: `${id} `.repeat(30),
            fontSize: 40,
            color: "#000000",
            background: {
                color: "#ffffff",
                a: 128,
            },
            width: 33,
        },
        updateState: function () {
            tb[id].setState(tb[id].state);
        },
    };
    ip[id] = {
        key: id,
        state: tb[id].state,                                // те же самые параметры, что и для textBlocks
        updateState: function () {                          // но своя функция для обновления локального стейта
            ip[id].setState(ip[id].state);
        },
        handleTextChange: function (e) {
            ip[id].state.text = e.target.value;
            ip[id].updateState();
            tb[id].updateState();
        },
        handleFontSizeChange: function (e) {
            ip[id].state.fontSize = e.target.value;
            ip[id].updateState();
            tb[id].updateState();
        },
        handleColorChange: function (e) {
            ip[id].state.color = e.target.value;
            ip[id].updateState();
            tb[id].updateState();
        },
        handleBackgroundColorChange: function (e) {
            ip[id].state.background.color = e.target.value;
            ip[id].updateState();
            tb[id].updateState();
        },
        handleBackgroundOpacityChange: function (e) {
            ip[id].state.background.a = e.target.value;
            ip[id].updateState();
            tb[id].updateState();
        },
        handleWidthChange: function (e) {
            ip[id].state.width = e.target.value;
            ip[id].updateState();
            tb[id].updateState();
        },
        handlePositionChange: function (e) {
            console.log(e.target.value);
            ip[id].state.position = e.target.value;
            ip[id].updateState();
            tb[id].updateState();
        }
    }
}

setInterval(() => {
    props.description.state.date = getDate();
    props.description.updateState();
}, 1000);
addTextBlocks();