exports.run = (client,message,args) => {
    let channel = message.guild.channels.cache.find(channel => channel.type === 'text' && channel.name === args[0]);
    if (channel) {
        args.shift();
        channel.send(args.join(' '));
    }
    else {
        message.channel.send('Tätä kanavaa ei ole olemassa.');
    }
};

exports.help = {
    name: 'say'
};