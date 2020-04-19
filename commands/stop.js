exports.run = async (client,message,args) => {

    if (message.guild.me.voice.connection.dispatcher) {
        message.guild.me.voice.connection.dispatcher.end();
    } else {
        message.reply('en tällä hetkellä soita missään.')
    }

};

exports.help = {
    name: 'stop'
};