const Discord = require('discord.js');
const config = require('./config.js');
const client = new Discord.Client({autoReconnect:true});
const TOKEN = require('./token.json').token;
const fs = require('fs');

client.commands = new Discord.Collection();
client.log = require('./logger').log;

fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(file => file.split('.').pop() === 'js');
    if(jsfile.length <= 0) {
        client.log('Couldn\'t find commands!');
        return;
    }
    else {
        client.log(`${jsfile.length} commands found.`);
    }
    jsfile.forEach((file,i) => {
        let props = require(`./commands/${file}`);
        console.log(`${i + 1} : ${file} loaded.`);
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
    let command = messageArr[0];
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
            console.log('test');
            let VoiceChannel = message.member.guild.channels.filter(channel => channel.type === 'voice');
        }
    }
});

client.login(TOKEN);
