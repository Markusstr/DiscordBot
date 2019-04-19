const Discord = require('discord.js');
const config = require('./config.js');
const client = new Discord.Client({autoReconnect:true});
const fs = require('fs');

const koputus = require('./commands/koputus');

client.commands = new Discord.Collection();
client.log = require('./logger').log;
client.tokens = require('./token.json');

client.serverVariables = new Discord.Collection();


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
        if (typeof props.help !== 'undefined' && typeof props.help.name !== 'undefined' ) client.commands.set(props.help.name, props);
    });
});

client.on('ready', () => {
    client.log('Botti on päällä');

    client.guilds.forEach(guild => client.serverVariables.set(guild.id, {
        isPlaying: false
    }));

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
            //tästä koputukseen
            koputus.koputa(client, message);
        }
    }
});

client.login(client.tokens.token);
