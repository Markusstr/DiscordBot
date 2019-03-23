exports.run = (client,message,args) => {
    message.channel.send('Sammutetaan!');
    client.destroy();
    process.exit();
};

exports.help = {
    name: 'sammuta'
};