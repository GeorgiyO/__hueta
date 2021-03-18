const fetch = require("node-fetch");

function sendMessage(msg) {
    return fetch("https://discord.com/api/v8/channels/820379423701729340/messages", {
        headers: {
            "accept": "*/*",
            "accept-language": "en-GB",
            "authorization": "ODE1NTk2NTczODUzMDg5ODIz.YDuuLw.0cLk_SoTzFt-fyood1ac5EjFwW4",
            "content-type": "application/json",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg5LjAuNDM4OS44MiBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiODkuMC40Mzg5LjgyIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL3d3dy5nb29nbGUuY29tLyIsInJlZmVycmluZ19kb21haW4iOiJ3d3cuZ29vZ2xlLmNvbSIsInNlYXJjaF9lbmdpbmUiOiJnb29nbGUiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6Nzk0NzgsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
            "cookie": "_ga=GA1.2.219494788.1610277150; __cfduid=d35e00ff0df896aec9cc12bfe5be783351613929795; _gid=GA1.2.8088628.1615664936; __stripe_mid=efb446d7-706a-4608-a8c7-00e530f6ea3ef5de44; locale=en-GB"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"content\":\"${msg}\",\"tts\":false}`,
        "method": "POST",
        "mode": "cors"
    });
}

fetch("https://discord.com/channels/661943356787654666/820379423701729340")
    .catch((e) => {
        console.log(e);
    })
    .then((res) => {
        console.log(res);
    });

/*
sendMessage("красные яблоки").catch((e) => {
    console.log(e);
}).then((res) => {
    console.log(res);
}).finally(() => {
    console.log("pizda");
});*/

