const Discord = require("discord.js");

let discord = new Discord.Client();

discord.on("ready", () => {
    console.log("Logged in as " + discord.user.tag);
});

discord.on("message", (msg) => {
    if (msg.author.bot) return;

    msg.reply("Ты написал мне: " + msg.content + "\nЯ отвечу тебе: пошел нахуй")
})

discord.login("ODIxMDA1MDAwMjkzMjIwMzcy.YE9afQ.WdHPOn21L2XVdhpD7R5k_dz39IU");