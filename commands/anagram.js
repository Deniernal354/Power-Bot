exports.run = function (client, message, args, args2, cmd) {
    var first = args.join(' ');
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}anagram`)
        .addField("**Usage:**", `${config.prefix}anagram <first word> <second word>`)
        .addField("**Example:**", `${config.prefix}anagram aaab baaa`)
        .addField("**Expected Result From Example:**", "Anagram")
    var second = args2.join(' ');
    if (!first || !second) return message.channel.send({embed: embed})
        // message.channel.send("You need to provide the first word!")
        // stop();
    
    // else if (!second) {
    //     message.channel.send("You need to provide the second word!")
    //     stop();
    // }
    first = first.replace(second, "")
    first = first.replace(" ", "")
    var reverse = first.split("").reverse().join("");

    if (reverse === second) {
        message.channel.send("Anagram");
    } else {
        message.channel.send("Not Anagram");
    }

};