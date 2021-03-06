const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
module.exports = member => {
    let guild = member.guild;
    // const getDefaultChannel = async (guild) => {
    //     //    let guild = member.guild;
    //     // get "original" default channel

    //     // if (guild.channel.has(guild.id))
    //     //     return guild.channels.get(guild.id)

    //     // Check for a "general" channel, which is often default chat

    //     if (guild.channels.exists("name", "general"))
    //         return guild.channels.find("name", "general");

    //     // Now we get into the heavy stuff: first channel in order where the bot can speak
    //     // hold on to your hats!
    //     return guild.channels
    //         .filter(c => c.type === "text" &&
    //             c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
    //         .sort((a, b) => a.position - b.position ||
    //             Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
    //         .first();
    // }


    function getDefaultChannel(guild) {
        // if(guild.channel.has(guild.id))
        // return guild.channels.get(guild.id)

        if (guild.channels.exists("name", "general"))
            return guild.channels.find("name", "general");

        // Now we get into the heavy stuff: first channel in order where the bot can speak
        // hold on to your hats!
        return guild.channels
            .filter(c => c.type === "text" &&
                c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
            .sort((a, b) => a.position - b.position ||
                Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
            .first();
    }

    //  let where = getDefaultChannel;
    // console.log(getDefaultChannel(guild));
    // console.log(member.guild)
    if (member.user.bot) {
        getDefaultChannel(member.guild).send(`A Wild Bot Has Appeared On The Server... \n The Bot's Name Is: ${member.user} OHHHHHHH... :/`)
        logger.log('info', `guildMemberAdd (new member join a guild-Bot) (presence update) triggered by ${member.user.tag} ID: ${member.user.id} Time: ${Date()} Guild: ${guild}`)
    }
    else {
        getDefaultChannel(member.guild).send(`Welcome ${member.user} to ${guild.name}`)  // channels.find("name", "general")
        logger.log('info', `guildMemberAdd (new member join a guild-user/human) (presence update) triggered by ${member.user.tag} ID: ${member.user.id} Time: ${Date()} Guild: ${guild}`)
    }
}