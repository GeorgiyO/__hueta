const WebSocket = require("websocket").w3cwebsocket;
const zlib = require("zlib");

let socket = new WebSocket("wss://gateway.discord.gg/?encoding=json&v=8");

socket.binaryType = "arraybuffer";

socket.onerror = function () {
    console.log("error");
}

socket.onopen = function () {
    console.log("connected");

    setInterval(() => {
        socket.send(JSON.stringify({
            "op": 1,
            "d": 251
        }));
    }, 40000);
}

socket.onclose = function () {
    console.log("socket closed");
}

socket.onmessage = function (e) {
    console.log(JSON.parse(e.data));
}
