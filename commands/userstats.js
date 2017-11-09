var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("./config.json");
    const embed19 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}userstats`)
        .addField("**Usage:**", `${config.prefix}userstats <@username>`)
        .addField("**Example:**", `${config.prefix}userstats @AirFusion`)
        .addField("**Expected Result From Example:**", "Mentioned user's stats & information should be returned.")
    if (args.join(' ') == "") return message.channel.send({ embed: embed19 })
    let user = message.mentions.users.first()
    let game = ''
    if (user.presence.game === null) {
        game = 'Nothing'
    }
    else {
        game = user.presence.game.name
    }
    const userInfo = new Discord.RichEmbed()
        .setAuthor('User Info For ' + user.username)
        .setColor('#2D7FFF')
        .setThumbnail(user.avatarURL)
        //.setDescription('do `pls serverinfo` to see detailed info about the server')
        .addField('Discriminator: ', user.discriminator)
        .addField('Status', user.presence.status, true)
        .addField('Playing', game, true)
        //.addField('Joined Server', message.mentions.users.first().joinedAt)
        .addField('Created Account', user.createdAt)

    // .addField('Roles', message.member.roles.size > 0 ? message.member.roles.map(d => d.name).join(', ') : 'None')

    message.channel.send({ embed: userInfo })
    logger.log('info', `Userstats command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()}`)    
    
};
