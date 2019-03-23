/* eslint-disable no-console */
const Discord = require('discord.js');
const config = require('./config.js');
const client = new Discord.Client({autoReconnect:true});
const TOKEN = 'NTU3NTgyNjMyMDk1OTczMzg2.D3eM9w.DsvEF-egAgAm16O0NsLgiyu67PI';
const fs = require('fs');

client.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(file => file.split('.').pop() === 'js');
    if(jsfile.length <= 0) {
        console.log('Couldn\'t find commands!');
        return;
    }
    else {
        console.log(`${jsfile.length} commands found.`);
    }
    jsfile.forEach((file,i) => {
        let props = require(`./commands/${file}`);
        console.log(`${i + 1} : ${file} loaded.`);
        client.commands.set(props.help.name, props);
    });
});

client.on('ready', () => {
    console.log('Botti on päällä');
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
        if (message.content.startsWith('!')) {
            message.channel.send(`Komentoa ${message} ei ole olemassa.`);
            return;
        }
    }
});

client.login(TOKEN);