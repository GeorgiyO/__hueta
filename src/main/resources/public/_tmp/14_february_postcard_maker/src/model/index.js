export {props};

let getDate = () => new Date().toLocaleTimeString();

let id = (function* () {
    let id = 0;
    while (true) yield id++;
})();

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

    },
    postcard: {
        state: {
            source: "https://images11.esquire.ru/upload/img_cache/dc2/dc223a5bbea7559f8a58bd5edc4686b4_ce_1878x1171x650x366.jpg",
            textBlocks: [
                {
                    id: id.next().value,
                    state: {
                        text: "example text",
                        fontSize: "30px",
                        color: {
                            r: 0,
                            g: 0,
                            b: 0,
                        },
                        background: {
                            r: 255,
                            g: 255,
                            b: 255,
                            a: 0.5,
                        },
                        position: 3, // 0-top, 1-right, 2-bottom, 3-left
                        width: "400px",
                    },
                    updateState: function() {
                        this.setState(this.state);
                    },
                }
            ],
        },
        updateState: function() {
            this.setState(this.state);
        },
    }
}

setInterval(() => {
    let _ = props.description;
    _.state.date = getDate();
    _.updateState();
}, 1000);

setTimeout(() => {
    let _ = props.postcard.state.textBlocks[0];
    _.state.color = {r: 255, g: 0, b: 0};
    _.state.fontSize = "100px";
    _.state.background = {r: 0, g: 255, b: 255, a: 0.3}
    _.updateState();
}, 3000);

setTimeout(() => {
    let _ = props.postcard;
    _.state.source = "https://images7.memedroid.com/images/UPLOADED582/5d51f48494f44.jpeg";
    _.updateState();
}, 10000);
