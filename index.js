
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const path = require('path')
const config = require("./config.json");
const chalk = require('chalk');
var YouTube = require('youtube-node');
var google = require('google')
var rand = getRandomIntInclusive(1, 100);
var base64url = require('base64-url');
var tcom = require('thesaurus-com');
const randomWord = require('random-word');
var youTube = new YouTube();
const youtubeKey = config.yt;
youTube.setKey(youtubeKey)
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./');
const embed = new Discord.RichEmbed()
var pastebin = require('./node_modules/pastebin/src/pastebin.js')(config.pastebin);
const { binary } = require('./util.js')
var wolfram = require('wolfram').createClient(config.wolfram)
require('./util/eventLoader')(client);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

client.on("presenceUpdate", (oldMember, newMember) => {
    let guild = newMember.guild;
    let playrole = guild.roles.find("name", "Playing Minecraft");
    if (!playrole) return;
    
    if (newMember.user.presence.game && newMember.user.presence.game.name === "Minecraft") {
        newMember.addRole(playrole);
    }
    else if(!newMember.user.presence.game && newMember.roles.has(playrole.id)) {
        newMember.removeRole(playrole);
    }
});

//TODO: https://youtu.be/Znvxk14Tg6A
//TODO: https://youtu.be/8AiZBdcPKOM?t=29m10s
//TODO: https://youtu.be/zdQplH3fwbU?t=16m1s
////https://youtu.be/qEDhVKFWoVg?t=18m21s
//https://youtu.be/1AjBVocSQhM?t=24m58s

// const getDefaultChannel = async (guild) => {
//     // get "original" default channel
//     if(guild.channel.has(guild.id))
//       return guild.channels.get(guild.id)

//     // Check for a "general" channel, which is often default chat
//     if(guild.channels.exists("name", "general"))
//       return guild.channels.find("name", "general");

//     // Now we get into the heavy stuff: first channel in order where the bot can speak
//     // hold on to your hats!
//     return guild.channels
//       .filter(c => c.type === "text" &&
//        c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
//      .sort((a, b) => a.position - b.position || 
//        Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
//      .first();
//   }

var reload = (message, cmd) => {
    delete require.cache[require.resolve('./commands/' + cmd)];
    try {
        let cmdFile = require('./commands/' + cmd);
    } catch (error) {
        message.channel.send(`Problem loading ${cmd}: ${error}`).then(
            response => response.delete(1000).catch(error => console.log(error.stack))
        ).catch(error => console.log(error.stack));
    }
    message.channel.send(`${cmd} reload was a success!`).then(
        response => response.delete(1000).catch(error => console.log(error.stack))
    ).catch(error => console.log(error.stack));
};
exports.reload = reload;

client.on("message", message => {  //message handler starts here!
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);
    let args = message.content.split(" ").slice(1);
    let args2 = message.content.split(" ").slice(2);
    let cmd = args.join(' ');
    let cmd2 = args2.join(' ');
    var res = cmd.slice(0, 1)

    // if (command === "outer-reload") {
    //     if (message.author.id === config.owner) {
    //         if (!args || args.size < 1) return message.reply("Must provide a command name to reload.");
    //         // the path is relative to the *current folder*, so just ./filename.js
    //         delete require.cache[require.resolve(`./${args[0]}.js`)];
    //         message.reply(`:white_check_mark: The command ${args[0]} has been reloaded`);
    //     }
    //     else {
    //         message.reply(":x: Insufficant Permissions!")
    //     }
    // }
    
    if (command === "wolfram") { //WIP
        wolfram.query(args.join(' '), function (err, result) {
            if (err) throw err
            localStorage.setItem('Wolfram-Results.json', result);
            message.channel.send({ files: ['Wolfram-Results.json'] });
            message.channel.send("**Solution: **" + result)
            console.log(result)
        })
    }
    // if (command === "userid") {
    //     let user = message.mentions.users.first()
    //     message.channel.send(user.id)
    // }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    if (command === "stuff") {
        const embed1010 = new Discord.RichEmbed()
            .setColor("#f0ffff")
            .addField("Synonyms: ", tcom.search(args.join(' ')).synonyms)
        console.log(tcom.search(args.join(' ')));
        message.channel.send({ embed: embed1010 })
        message.channel.send(tcom.search(args.join(' ')).antonyms);

    }

    // if (command === "randword") {
    //     message.channel.send(randomWord())
    // }

    if (command === "killall") {
        if (message.author.id === config.owner) {
            var check = base64url.encode(rand.toString())
            if (!args.join(' ')) {
                message.channel.send('Please get a password! It has been Directly Messaged to you!')
                message.author.send("Base 64 of " + rand)
                message.author.send("Then remove any equal signs(=) from the result!")
            }
            else if (args.join(' ') === check) {
                message.channel.send("Success! View host console for more information. PowerBot shutting down...")
                console.log(chalk.green("PowerBot has been shutdown via Discord Chatbox."))
                console.log(chalk.green("Here are some Information:"))
                console.log(chalk.green(`Auth: ${message.author.username}#${message.author.discriminator} ID: ${message.author.id}`))
                console.log(chalk.green(`Timestamp: ${Date()}`))
                setTimeout(function () {
                    process.abort();
                }, 3000);
            }
            else {
                console.log(check)
                message.channel.send("Incorrect Password")
            }
        } else {
            message.channel.send("Insufficant Permissions")
        }
    }
    if (command == "game") {
        let user = message.mentions.users.first();
       message.channel.send(user.presence.game.name);
    }
    if (command === "eval") {
        if (message.author.id === config.owner) {
            var x = Date.now();
            try {
                var jvs = args.join(" ");
                var done = eval(jvs);
                if (typeof done !== "string")
                    done = require("util").inspect(done);
                message.channel.send(":white_check_mark: **Output:**\n" + "```" + `${clean(done)}` + "```");
                localStorage.setItem('Eval-Results.json', clean(done));
                message.channel.send({ files: ['Eval-Results.json'] });
                pastebin.new({ title: 'Eval Results', content: clean(done) }, function (err, ret) {
                    if (err)
                        message.channel.send(err);
                    else
                        message.channel.send(ret);
                });
                var y = Date.now();
                var noplz = y - x
                message.channel.send("Time used: " + noplz + " ms");
            }
            catch (e) {
                message.channel.send(":x: **Output:**\n" + `\`ERROR\` \`\`\`x1\n${clean(e)}\n\`\`\``);
                localStorage.setItem('Eval-Results.json', clean(e));
                message.channel.send({ files: ['Eval-Results.json'] });
                pastebin.new({ title: 'Eval Results', content: clean(e) }, function (err, ret) {
                    if (err)
                        message.channel.send(err);
                    else
                        message.channel.send(ret);
                });
                var y = Date.now();
                var noplz = y - x
                message.channel.send("Time used: " + noplz + " ms");
            }
        }
        else {
            message.channel.send("HEY! Stop trying to get into Fusion's computer!")
        }
    }

});  //message HANDLER ENDS HERE

function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;

}





var token = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on("debug", error => {
    console.log(chalk.cyan(error.replace(token, "HIDDEN")));
});
client.on("warn", error => {
    console.log(chalk.yellow(error.replace(token, "HIDDEN")));
});
client.on("error", error => {
    console.log(chalk.red(error.replace(token, "HIDDEN")));
});


client.login(config.token);