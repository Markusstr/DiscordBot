const Discord = require('discord.js');
const config = require('./config.js');
const client = new Discord.Client({autoReconnect:true});
const fs = require('fs');
const userCooldown = new Set();

client.commands = new Discord.Collection();
client.log = require('./logger').log;
client.tokens = require('./token.json');

fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(file => file.split('.').pop() === 'js');
    if(jsfile.length <= 0) {
        client.log('Komentoja ei löytynyt!');
        return;
    }
    else {
        client.log(`${jsfile.length} komentoa ladattu.`);
    }
    jsfile.forEach((file,i) => {
        let props = require(`./commands/${file}`);
        console.log(`${i + 1} : ${file} ladattu.`);
        client.commands.set(props.help.name, props);
    });
});

client.on('ready', () => {
    client.log('Botti on päällä');
});

client.on('message', message => {
    if(message.author.bot) return;
    let prefix = config.prefix;
    let messageArr = message.content.split(' ');
    let command = messageArr[0].toLowerCase();
    let args = messageArr.slice(1);

    let cmd = client.commands.get(command.slice(prefix.length));
    if (cmd) {
        cmd.run(client,message,args);
    }
    else {
        if (message.content.startsWith(prefix)) {
            message.channel.send(`Komentoa ${message} ei ole olemassa.`);
            return;
        }
        if (message.content.startsWith(message.guild.emojis.find(emoji => emoji.name === 'kopkopsaatana'))) {
            let VoiceChannel = message.guild.channels
                .filter(channel => channel.type === 'voice') // Suodatetaan vain äänikanavat
                .sort((a,b) => b.members.size-a.members.size) // Järjestetään laskevaan järjestykseen.
                .first(); // Otetaan ensimmäinen, tässä tapauksessa isoin.

            //VoiceChannel.forEach(ch => console.log(ch.name));


            if (VoiceChannel.full) {
                if (userCooldown.has(message.author.id)) {
                    message.channel.send('Voit koputtaa kanavalle vain kerran 10 minuutissa. ' + message.author);
                }
                else {
                    client.log('Kopotus');
                    userCooldown.add(message.author.id);
                    setTimeout(() => {
                        userCooldown.delete(message.author.id);
                    }, 600000);
                }
                /*message.member.setVoiceChannel(VoiceChannel.id)
                    .then(client.log)
                    .catch(client.log);*/
            } else if (VoiceChannel.members.size === 0) {
                message.reply('*Koputuksesi kaikuvat tyhjillä kanavilla...* Kaikki kanavat ovat tyhjiä.');
            } else {
                message.reply('Kanava ei ole täynnä, voit liittyä sinne itse.');
            }
        }
    }
});

client.login(client.tokens.token);
