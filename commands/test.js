exports.run = (client,message,args) => {
    message.channel.send(`Kirjoitit komentoon ${args} : ${message}`);
};

exports.help = {
    name: 'test'
};
