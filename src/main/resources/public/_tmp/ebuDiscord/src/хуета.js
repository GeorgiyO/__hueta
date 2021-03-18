
const fetch = require("node-fetch");

const http = require("http");

let bot = "Bot ODIxMDA1MDAwMjkzMjIwMzcy.YE9afQ.WdHPOn21L2XVdhpD7R5k_dz39IU";
let Ahwassa = "ODE1NTk2NTczODUzMDg5ODIz.YDuuLw.0cLk_SoTzFt-fyood1ac5EjFwW4";

let sendMessage = prepeareToSending(bot);

sendMessage(channelUrlTemplate("820704898345730131"), "Желтые груши")
    .catch((e) => {
        console.log(e);
    })
    .then((r) => {
        return r.json();
    }).then((data) => {
        console.log(data);
    });

function getLastMessage() {
    return fetch("https://discord.com/api/v8/channels/820704898345730131/messages?limit=1", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB",
            "authorization": "ODE1NTk2NTczODUzMDg5ODIz.YDuuLw.0cLk_SoTzFt-fyood1ac5EjFwW4",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-fingerprint": "820703404271337502.IEOaq7WS7ORNyluF36PiDIY3pMc",
            "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg5LjAuNDM4OS44MiBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiODkuMC40Mzg5LjgyIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL3d3dy5nb29nbGUuY29tLyIsInJlZmVycmluZ19kb21haW4iOiJ3d3cuZ29vZ2xlLmNvbSIsInNlYXJjaF9lbmdpbmUiOiJnb29nbGUiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6Nzk1MDAsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
            "cookie": "_ga=GA1.2.219494788.1610277150; __cfduid=d35e00ff0df896aec9cc12bfe5be783351613929795; _gid=GA1.2.8088628.1615664936; __stripe_mid=efb446d7-706a-4608-a8c7-00e530f6ea3ef5de44; locale=en-GB"
        },
        "referrer": "https://discord.com/channels/820704898345730128/820704898345730131",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
    }).then((res) => {
        return res.json();
    });
}

function channelUrlTemplate(id) {
    return `https://discord.com/api/v8/channels/${id}/messages`;
}

function prepeareToSending(sender) {
    let msgTemplate = function (msg) {
        return {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-GB",
                "authorization": sender,
                "content-type": "application/json",
                "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-fingerprint": "820703404271337502.IEOaq7WS7ORNyluF36PiDIY3pMc",
                "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg5LjAuNDM4OS44MiBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiODkuMC40Mzg5LjgyIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL3d3dy5nb29nbGUuY29tLyIsInJlZmVycmluZ19kb21haW4iOiJ3d3cuZ29vZ2xlLmNvbSIsInNlYXJjaF9lbmdpbmUiOiJnb29nbGUiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6Nzk0NzgsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `{\"content\":\"${msg}\",\"tts\":false}`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        }
    };
    return function (url, msg) {
        return fetch(url, msgTemplate(msg));
    }
}