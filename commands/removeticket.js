const Discord = require('discord.js')
const { ticketperms, ticketcategory, embedcolor } = require('../package.json')

module.exports = {
	name: 'removeticket',
	description: 'Verwijder de ticket.',

	async execute(client, message) {
		if(message.author.bot) return;

	let ticketverwijderd = new Discord.MessageEmbed()
            .setTitle('Ticket Word Verwijderd! :wastebasket:')
            .setDescription(`Je ticket is gepland voor verwijdering door ${message.member}. Reageer met 🗑️ om de ticket te sluiten.`)
            .setColor(embedcolor)
            .setTimestamp();

        let ticketverwijderdbericht = new Discord.MessageEmbed()
            .setTitle('Ticket Verwijderd! :wastebasket:')
            .setDescription(`Je ticket is verwijderd!`)
            .setColor(embedcolor)
            .setTimestamp();

        if(message.member.roles.cache.get(ticketperms)){
            if(message.channel.parentID == ticketcategory){

                message.channel.send(ticketverwijderd).then(msg => {
                    msg.react('🗑️')

                    const removeFilter = (reaction, user) => reaction.emoji.name === '🗑️' && user.id !== client.user.id;
                    const remove = msg.createReactionCollector(removeFilter);

                    remove.on("collect", async(r, u) => {
                        let channelmember = message.channel.name.split('-')[1]
                        let filteredusername = u.username
                        .replace(/\{/g, '')
                        .replace(/\}/g, '')
                        .replace(/\!/g, '')
                        .replace(/\@/g, '')
                        .replace(/\#/g, '')
                        .replace(/\$/g, '')
                        .replace(/\%/g, '')
                        .replace(/\^/g, '')
                        .replace(/\&/g, '')
                        .replace(/\*/g, '')
                        .replace(/\(/g, '')
                        .replace(/\)/g, '')
                        .replace(/\+/g, '')
                        .replace(/\=/g, '')
                        .replace(/\\/g, '')
                        .replace(/\|/g, '')
                        .replace(/\;/g, '')
                        .replace(/\:/g, '')
                        .replace(/\'/g, '')
                        .replace(/\"/g, '')
                        .replace(/\`/g, '')
                        .replace(/\~/g, '')
                        .replace(/\?/g, '')
                        .replace(/\./g, '')
                        .replace(/\,/g, '')
                        .replace(/\>/g, '')
                        .replace(/\</g, '')
                        .replace(/\//g, '')

                        if(filteredusername.toLowerCase() == channelmember){
                        r.users.remove(u.id)

                        message.channel.delete()
                        await u.send(ticketverwijderdbericht).catch(()=>{ message.reply("Kon de gebruiker geen bericht sturen :cry:") })
                        } else {
                            r.users.remove(u.id)
                            message.reply('Jij kan dit niet doen!')
                        }
                    })
                })
            } else return message.reply('Dit is geen ticket!')
        } else return message.reply('Dit kan jij niet doen!')
    },
};
